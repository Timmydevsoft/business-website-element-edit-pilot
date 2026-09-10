/**
 * Lets the builder point at a section of this page.
 *
 * The preview is served from a different origin to the builder — a Daytona
 * proxy host against the platform's own — so the builder cannot reach into this
 * document to work out what the user clicked. It has to ask, and this is what
 * answers.
 *
 * The script is inert until the builder enables it, so a published site carries
 * a few hundred bytes that never run and never listen. It only replies to its
 * own embedder (`event.source === window.parent`) and only to the origin that
 * message came from, so a page embedded by something else reports nothing. The
 * builder checks the origin of every reply against the preview URL it loaded,
 * which is the other half of that.
 *
 * Written as a raw script rather than React effects on purpose: it must work on
 * a page that has not hydrated yet, and it is deliberately readable in the page
 * source by anyone auditing what a preview is doing.
 */

const BRIDGE = `(function(){
  var enabled = false;
  var parentOrigin = null;
  try { parentOrigin = new URL(document.referrer).origin; } catch (_) { return; }
  if (!parentOrigin || parentOrigin === 'null' || window.parent === window) return;
  var box = null;

  function outline(){
    if (box) return box;
    box = document.createElement('div');
    box.setAttribute('data-ion-outline','');
    box.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;'
      + 'border:2px solid #2563eb;border-radius:4px;background:rgba(37,99,235,.08);'
      + 'transition:all .08s ease-out;display:none';
    document.body.appendChild(box);
    return box;
  }

  function sectionAt(target){
    return target && target.closest ? target.closest('[data-section]') : null;
  }

  function targetAt(target){
    var section = sectionAt(target);
    if (!section) return null;
    var element = target && target.closest ? target.closest('[data-edit-id]') : null;
    // An edit marker is valid only inside the section that owns the click.
    if (element && !section.contains(element)) element = null;
    return { section: section, element: element };
  }

  function describe(target){
    var section = target.section;
    var element = target.element;
    var highlighted = element || section;
    var r = highlighted.getBoundingClientRect();
    var description = {
      id: section.getAttribute('data-section'),
      sectionId: section.getAttribute('data-section'),
      rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
      // A short sample so the builder can show what was pointed at without
      // shipping the whole section back on every hover.
      text: (highlighted.innerText || '').trim().slice(0, 120)
    };
    if (element) {
      description.elementId = element.getAttribute('data-edit-id');
      description.elementType = element.getAttribute('data-edit-type') || 'element';
      description.elementLabel = element.getAttribute('data-edit-label') || description.elementId;
    }
    return description;
  }

  function send(type, payload){
    if (!parentOrigin) return;
    window.parent.postMessage(Object.assign({ type: type }, payload), parentOrigin);
  }

  function onMove(e){
    if (!enabled) return;
    var target = targetAt(e.target);
    var b = outline();
    if (!target) { b.style.display = 'none'; return; }
    var r = (target.element || target.section).getBoundingClientRect();
    b.style.display = 'block';
    b.style.left = r.left + 'px';
    b.style.top = r.top + 'px';
    b.style.width = r.width + 'px';
    b.style.height = r.height + 'px';
  }

  function onClick(e){
    if (!enabled) return;
    var target = targetAt(e.target);
    if (!target) return;
    // The click is for choosing a section, not for following a link out of the
    // page the user is annotating.
    e.preventDefault();
    e.stopPropagation();
    send('ion:section:click', describe(target));
  }

  function onLeave(){ if (box) box.style.display = 'none'; }

  window.addEventListener('message', function(event){
    // Only this frame's embedder, and only ever replied to at its own origin.
    if (event.source !== window.parent || event.origin !== parentOrigin) return;
    var data = event.data;
    if (!data || typeof data !== 'object') return;

    if (data.type === 'ion:annotate:enable') {
      enabled = true;
      document.documentElement.style.cursor = 'crosshair';
      send('ion:sections', { sections: Array.prototype.map.call(
        document.querySelectorAll('[data-section]'), function(el){ return describe({ section: el, element: null }); }) });
    } else if (data.type === 'ion:annotate:disable') {
      enabled = false;
      document.documentElement.style.cursor = '';
      onLeave();
    } else if (data.type === 'ion:ping') {
      // How the builder learns this template can be annotated at all. A
      // template without this script simply never answers, and the builder
      // falls back to its section list.
      send('ion:pong', { sections: Array.prototype.map.call(
        document.querySelectorAll('[data-section]'), function(el){ return el.getAttribute('data-section'); }) });
    }
  });

  document.addEventListener('mousemove', onMove, true);
  document.addEventListener('click', onClick, true);
  document.addEventListener('mouseleave', onLeave);
  window.addEventListener('scroll', function(){ if (enabled) onLeave(); }, true);
})();`;

export function AnnotationBridge() {
  return <script dangerouslySetInnerHTML={{ __html: BRIDGE }} />;
}

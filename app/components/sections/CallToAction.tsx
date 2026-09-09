import { Link } from 'react-router';

import { Button } from '~/components/ui/button';

/**
 * The closing call to action, in three layouts.
 *
 * The layout is data: it lives in `app/content/home.cta.json` as `variant`,
 * and the manifest describes when each one is the right choice. An
 * unrecognised variant falls back to `banner`.
 *
 * Every prop keeps a default because most pages render `<CallToAction />` with
 * no content of their own.
 */
export type CallToActionVariant = 'banner' | 'stacked' | 'panel';

interface CallToActionProps {
  variant?: string;
  title?: string;
  description?: string;
  action?: { label: string; to: string };
}

export function CallToAction({
  variant = 'banner',
  title = 'Have a project in mind?',
  description = 'Tell us what you are trying to build and we will tell you honestly whether we are the right studio for it.',
  action = { label: 'Start a conversation', to: '/contact' },
}: CallToActionProps) {
  if (variant === 'stacked') {
    return (
      <section data-section="section.cta" className="border-b bg-foreground text-background last:border-b-0">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-background/70 text-pretty">{description}</p>
          <Button asChild size="lg" variant="secondary" className="mt-9">
            <Link to={action.to}>{action.label}</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (variant === 'panel') {
    return (
      <section data-section="section.cta" className="border-b last:border-b-0">
        {/* Inset and on the page background rather than full-bleed and dark:
            this one is meant to sit at the end of a long page without
            announcing itself as a different kind of thing. */}
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-col items-start gap-6 rounded-xl border bg-accent/40 px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance">
                {title}
              </h2>
              <p className="mt-3 text-muted-foreground text-pretty">{description}</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link to={action.to}>{action.label}</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-section="section.cta" className="border-b bg-foreground text-background last:border-b-0">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-background/70 text-pretty">{description}</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="shrink-0">
          <Link to={action.to}>{action.label}</Link>
        </Button>
      </div>
    </section>
  );
}

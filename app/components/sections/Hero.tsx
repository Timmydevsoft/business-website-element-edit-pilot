import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { sectionAppearance, type SectionAppearance } from '~/lib/section-appearance';

/**
 * The hero, in four layouts.
 *
 * The layout is data: it lives in `app/content/home.hero.json` as `variant`,
 * and the manifest describes when each one is the right choice. That
 * description is what the platform's classifier reads, so it is written for a
 * reader deciding — "when the page's substance is below" — rather than as a
 * name for the shape.
 *
 * An unrecognised variant falls back to `left` instead of rendering nothing,
 * because a hero is the first thing on the page and a blank one is worse than
 * the wrong one.
 */
export type HeroVariant = 'centered' | 'left' | 'split' | 'banner';

interface Action {
  label: string;
  to: string;
}

interface HeroProps {
  variant?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: Action;
  secondaryAction?: Action;
  appearance?: SectionAppearance & {
    eyebrowVisible?: boolean;
    primaryActionVisible?: boolean;
    secondaryActionVisible?: boolean;
  };
}

function Actions({
  primaryAction,
  secondaryAction,
  className = '',
  size = 'lg',
  primaryActionVisible = true,
  secondaryActionVisible = true,
}: {
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
  size?: 'default' | 'lg';
  primaryActionVisible?: boolean;
  secondaryActionVisible?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button asChild size={size}>
        <Link
          to={primaryAction.to}
          data-edit-id="hero.primary-action"
          data-edit-type="button"
          data-edit-label="Primary button"
          className={primaryActionVisible ? undefined : 'hidden'}
        >
          {primaryAction.label}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      {secondaryAction ? (
        <Button asChild size={size} variant="outline">
          <Link
            to={secondaryAction.to}
            data-edit-id="hero.secondary-action"
            data-edit-type="button"
            data-edit-label="Secondary button"
            className={secondaryActionVisible ? undefined : 'hidden'}
          >
            {secondaryAction.label}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export function Hero({
  variant = 'left',
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  appearance,
}: HeroProps) {
  const shell = 'border-b bg-gradient-to-b from-accent/60 to-background';
  const styled = sectionAppearance(appearance);
  const actionVisibility = {
    primaryActionVisible: appearance?.primaryActionVisible,
    secondaryActionVisible: appearance?.secondaryActionVisible,
  };
  const eyebrowTarget = {
    'data-edit-id': 'hero.eyebrow',
    'data-edit-type': 'text',
    'data-edit-label': 'Eyebrow',
  } as const;

  if (variant === 'centered') {
    return (
      <section data-section="section.hero" data-edit-id="hero.container" data-edit-type="container" data-edit-label="Hero container" className={`${shell} ${styled.root}`}>
        <div className={`mx-auto max-w-6xl px-6 py-24 text-center sm:py-32 ${styled.body}`}>
          <div className="mx-auto max-w-3xl">
            {eyebrow ? <Badge {...eyebrowTarget} variant="secondary" className={`mb-6 ${appearance?.eyebrowVisible === false ? 'hidden' : ''}`}>{eyebrow}</Badge> : null}
            {/* One h1 per page, and it is here. Every other section heading is
                an h2, which keeps the document outline correct for crawlers and
                screen readers alike. */}
            <h1 data-edit-id="hero.heading" data-edit-type="text" data-edit-label="Hero heading" className={`font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl ${styled.heading}`}>
              {title}
            </h1>
            {description ? (
              <p data-edit-id="hero.description" data-edit-type="text" data-edit-label="Hero description" className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
                {description}
              </p>
            ) : null}
            <Actions primaryAction={primaryAction} secondaryAction={secondaryAction} className="mt-9 justify-center" {...actionVisibility} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section data-section="section.hero" data-edit-id="hero.container" data-edit-type="container" data-edit-label="Hero container" className={`${shell} ${styled.root}`}>
        <div className={`mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-16 ${styled.body}`}>
          <div>
            {eyebrow ? <Badge {...eyebrowTarget} variant="secondary" className={`mb-6 ${appearance?.eyebrowVisible === false ? 'hidden' : ''}`}>{eyebrow}</Badge> : null}
            <h1 data-edit-id="hero.heading" data-edit-type="text" data-edit-label="Hero heading" className={`font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl ${styled.heading}`}>
              {title}
            </h1>
          </div>
          {/* The rule carries the split on wide screens and disappears on
              narrow ones, where the two halves are simply stacked. */}
          <div className="lg:border-l lg:pl-16">
            {description ? (
              <p data-edit-id="hero.description" data-edit-type="text" data-edit-label="Hero description" className="text-lg text-muted-foreground text-pretty sm:text-xl">{description}</p>
            ) : null}
            <Actions primaryAction={primaryAction} secondaryAction={secondaryAction} className="mt-8" {...actionVisibility} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'banner') {
    return (
      <section data-section="section.hero" data-edit-id="hero.container" data-edit-type="container" data-edit-label="Hero container" className={`border-b bg-accent/40 ${styled.root}`}>
        <div className={`mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14 ${styled.body}`}>
          <div className="max-w-2xl">
            {eyebrow ? (
              <p {...eyebrowTarget} className={`mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase ${appearance?.eyebrowVisible === false ? 'hidden' : ''}`}>{eyebrow}</p>
            ) : null}
            <h1 data-edit-id="hero.heading" data-edit-type="text" data-edit-label="Hero heading" className={`font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl ${styled.heading}`}>
              {title}
            </h1>
          </div>
          <Actions primaryAction={primaryAction} secondaryAction={secondaryAction} size="default" className="shrink-0" {...actionVisibility} />
        </div>
      </section>
    );
  }

  return (
    <section data-section="section.hero" data-edit-id="hero.container" data-edit-type="container" data-edit-label="Hero container" className={`${shell} ${styled.root}`}>
      <div className={`mx-auto max-w-6xl px-6 py-24 sm:py-32 ${styled.body}`}>
        <div className="max-w-3xl">
          {eyebrow ? <Badge {...eyebrowTarget} variant="secondary" className={`mb-6 ${appearance?.eyebrowVisible === false ? 'hidden' : ''}`}>{eyebrow}</Badge> : null}
          <h1 data-edit-id="hero.heading" data-edit-type="text" data-edit-label="Hero heading" className={`font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl ${styled.heading}`}>
            {title}
          </h1>
          {description ? (
            <p data-edit-id="hero.description" data-edit-type="text" data-edit-label="Hero description" className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
              {description}
            </p>
          ) : null}
          <Actions primaryAction={primaryAction} secondaryAction={secondaryAction} className="mt-9" {...actionVisibility} />
        </div>
      </div>
    </section>
  );
}

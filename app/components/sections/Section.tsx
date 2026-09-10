import type { ReactNode } from 'react';

import { cn } from '~/lib/utils';

/**
 * The page rhythm.
 *
 * Every section on every page goes through this, so vertical spacing and the
 * content width are decided once. A page is a stack of `<Section>`s; nothing
 * sets its own max-width or padding.
 */
export function Section({
  children,
  className,
  rootClassName,
  width = 'default',
  tone = 'default',
  as: Tag = 'section',
  // The platform reads this to know which section a click landed in. It is a
  // plain attribute rather than anything React-specific on purpose: React 19
  // removed the fiber source information such tooling used to rely on.
  'data-section': dataSection,
}: {
  children: ReactNode;
  className?: string;
  rootClassName?: string;
  width?: 'default' | 'narrow' | 'wide';
  tone?: 'default' | 'muted';
  as?: 'section' | 'div' | 'article';
  'data-section'?: string;
}) {
  return (
    <Tag
      data-section={dataSection}
      className={cn(tone === 'muted' && 'bg-muted/40', 'border-b last:border-b-0', rootClassName)}
    >
      <div
        className={cn(
          'mx-auto px-6 py-16 sm:py-20',
          width === 'narrow' && 'max-w-3xl',
          width === 'default' && 'max-w-6xl',
          width === 'wide' && 'max-w-7xl',
          className,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  headingClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  headingClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      ) : null}
      <h2 className={cn('font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl', headingClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn('max-w-2xl text-lg text-muted-foreground text-pretty', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

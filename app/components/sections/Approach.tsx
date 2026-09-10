import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Section, SectionHeading } from '~/components/sections/Section';
import { sectionAppearance, type SectionAppearance } from '~/lib/section-appearance';

/**
 * The "how we work" section, in three layouts.
 *
 * The layout is data: it lives in `app/content/home.approach.json` as
 * `variant`, and the manifest describes when each one is the right choice.
 * An unrecognised variant falls back to `columns` rather than rendering
 * nothing, on the same reasoning as the hero.
 */
export type ApproachVariant = 'columns' | 'aside' | 'steps';

export interface ApproachItem {
  term: string;
  detail: string;
}

interface ApproachProps {
  variant?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: ApproachItem[];
  appearance?: SectionAppearance;
}

export function Approach({ variant = 'columns', eyebrow, title, description, items, appearance }: ApproachProps) {
  const styled = sectionAppearance(appearance);
  if (variant === 'aside') {
    return (
      <Section tone="muted" data-section="section.approach" rootClassName={styled.root} className={styled.body}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} headingClassName={styled.heading} />
          {/* Rules between the rows rather than around each one: the points
              read as one continuous argument instead of separate boxes. */}
          <dl className="divide-y">
            {items.map((item) => (
              <div key={item.term} className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8">
                <dt className="font-heading text-lg font-semibold">{item.term}</dt>
                <dd className="text-muted-foreground text-pretty">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    );
  }

  if (variant === 'steps') {
    return (
      <Section tone="muted" data-section="section.approach" rootClassName={styled.root} className={styled.body}>
        <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} headingClassName={styled.heading} />
        {/* An ordered list, not a description list: this layout asserts that
            the points happen in sequence, which is the whole reason to number
            them. */}
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.term}>
              <Card className="h-full gap-4">
                <CardHeader>
                  <span className="font-heading text-3xl font-semibold text-primary/60 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{item.term}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty">{item.detail}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Section>
    );
  }

  return (
    <Section tone="muted" data-section="section.approach" rootClassName={styled.root} className={styled.body}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} headingClassName={styled.heading} />
      <dl className="mt-12 grid gap-8 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.term}>
            <dt className="font-heading text-lg font-semibold">{item.term}</dt>
            <dd className="mt-2 text-muted-foreground text-pretty">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

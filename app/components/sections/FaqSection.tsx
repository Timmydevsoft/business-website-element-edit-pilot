import { Faq, FaqJsonLd, type FaqEntry } from '~/components/sections/Faq';
import { Section, SectionHeading } from '~/components/sections/Section';
import { sectionAppearance, type SectionAppearance } from '~/lib/section-appearance';

/**
 * The homepage FAQ, in three layouts.
 *
 * The layout is data: it lives in `app/content/home.faq.json` as `variant`,
 * and the manifest describes when each one is the right choice. An
 * unrecognised variant falls back to `accordion`, the shape that copes with
 * any number of questions.
 *
 * `Faq` itself stays a plain accordion because `/pricing` renders it directly;
 * only the homepage section wraps it in alternative arrangements.
 */
export type FaqSectionVariant = 'accordion' | 'split' | 'open';

interface FaqSectionProps {
  variant?: string;
  eyebrow?: string;
  title: string;
  entries: FaqEntry[];
  appearance?: SectionAppearance;
}

export function FaqSection({ variant = 'accordion', eyebrow, title, entries, appearance }: FaqSectionProps) {
  const styled = sectionAppearance(appearance);
  if (variant === 'split') {
    return (
      <Section tone="muted" data-section="section.faq" rootClassName={styled.root} className={styled.body}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} headingClassName={styled.heading} />
          <Faq entries={entries} className="mt-0" />
        </div>
      </Section>
    );
  }

  if (variant === 'open') {
    return (
      <Section tone="muted" data-section="section.faq" rootClassName={styled.root} className={styled.body}>
        <FaqJsonLd entries={entries} />
        <SectionHeading eyebrow={eyebrow} title={title} headingClassName={styled.heading} />
        <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.question}>
              <dt className="font-heading text-base font-semibold text-balance">{entry.question}</dt>
              <dd className="mt-2 text-muted-foreground text-pretty">{entry.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    );
  }

  return (
    <Section width="narrow" tone="muted" data-section="section.faq" rootClassName={styled.root} className={styled.body}>
      <SectionHeading align="center" eyebrow={eyebrow} title={title} headingClassName={styled.heading} />
      <Faq entries={entries} />
    </Section>
  );
}

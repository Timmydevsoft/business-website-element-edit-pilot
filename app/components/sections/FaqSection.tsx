import { Faq, FaqJsonLd, type FaqEntry } from '~/components/sections/Faq';
import { Section, SectionHeading } from '~/components/sections/Section';

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
}

export function FaqSection({ variant = 'accordion', eyebrow, title, entries }: FaqSectionProps) {
  if (variant === 'split') {
    return (
      <Section tone="muted" data-section="section.faq">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Faq entries={entries} className="mt-0" />
        </div>
      </Section>
    );
  }

  if (variant === 'open') {
    return (
      <Section tone="muted" data-section="section.faq">
        <FaqJsonLd entries={entries} />
        <SectionHeading eyebrow={eyebrow} title={title} />
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
    <Section width="narrow" tone="muted" data-section="section.faq">
      <SectionHeading align="center" eyebrow={eyebrow} title={title} />
      <Faq entries={entries} />
    </Section>
  );
}

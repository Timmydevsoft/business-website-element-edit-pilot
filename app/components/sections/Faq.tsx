import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { JsonLd } from '~/components/seo/JsonLd';

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * An FAQ is one of the few section types with a schema.org form that search
 * engines actually surface, so the structured data is emitted alongside the
 * markup rather than being left to whoever remembers.
 *
 * It is exported on its own because the layouts in `FaqSection` that do not
 * use the accordion still owe search engines the same markup.
 */
export function FaqJsonLd({ entries }: { entries: FaqEntry[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entries.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
      }}
    />
  );
}

export function Faq({ entries, className = 'mt-10' }: { entries: FaqEntry[]; className?: string }) {
  return (
    <>
      <FaqJsonLd entries={entries} />
      <Accordion type="single" collapsible className={`w-full ${className}`}>
        {entries.map((entry, index) => (
          <AccordionItem key={entry.question} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-heading text-base">
              {entry.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {entry.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

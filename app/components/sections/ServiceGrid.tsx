import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Service } from '~/lib/content';
import servicesContent from '~/content/services.json';
import { sectionAppearance, type SectionAppearance } from '~/lib/section-appearance';

export function ServiceGrid({ services, appearance = servicesContent.appearance }: { services: Service[]; appearance?: SectionAppearance }) {
  const styled = sectionAppearance(appearance);
  return (
    <ul data-section="content.services" className={`mt-12 grid gap-6 sm:grid-cols-2 ${styled.root} ${styled.body} ${styled.heading}`}>
      {services.map((service) => (
        <li key={service.slug}>
          <Card className="group relative h-full transition-colors hover:border-primary/40">
            <CardHeader>
              <CardTitle className={`font-heading text-xl ${styled.heading}`}>
                {/* The whole card is the target, but the link stays on the
                    heading so the accessible name is the service name. */}
                <Link to={`/services/${service.slug}`} className="after:absolute after:inset-0">
                  {service.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-base">{service.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">From {service.startingAt}</span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

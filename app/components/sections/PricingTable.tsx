import { Link } from 'react-router';
import { Check } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import type { Plan } from '~/lib/content';
import plansContent from '~/content/plans.json';
import { sectionAppearance, type SectionAppearance } from '~/lib/section-appearance';

export function PricingTable({ plans, appearance = plansContent.appearance }: { plans: Plan[]; appearance?: SectionAppearance }) {
  const styled = sectionAppearance(appearance);
  return (
    <ul data-section="content.plans" className={`mt-12 grid items-start gap-6 lg:grid-cols-3 ${styled.root} ${styled.body} ${styled.heading}`}>
      {plans.map((plan) => (
        <li key={plan.name}>
          <Card className={cn('h-full', plan.highlighted && 'border-primary shadow-lg')}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className={`font-heading text-xl ${styled.heading}`}>{plan.name}</CardTitle>
                {plan.highlighted ? <Badge>Most chosen</Badge> : null}
              </div>
              <CardDescription className="text-base">{plan.summary}</CardDescription>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-semibold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                <Link to="/contact">Enquire about {plan.name}</Link>
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}

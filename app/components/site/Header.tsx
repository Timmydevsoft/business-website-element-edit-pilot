import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { Separator } from '~/components/ui/separator';
import { primaryNav, site } from '~/config/site';
import { cn } from '~/lib/utils';
import { ThemeToggle } from '~/components/site/ThemeToggle';

function Wordmark() {
  return (
    <Link
      to="/"
      data-section="site.brand"
      className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
    >
      {site.logoPath ? (
        <img
          src={site.logoPath}
          alt=""
          aria-hidden
          data-edit-id="brand.logo"
          data-edit-type="image"
          data-edit-label="Logo"
          className="size-7 rounded-md object-contain"
        />
      ) : (
        <span
          aria-hidden
          data-edit-id="brand.mark"
          data-edit-type="icon"
          data-edit-label="Brand mark"
          className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold"
        >
          {site.nameParts.lead.charAt(0)}
        </span>
      )}
      <span>
        <span data-edit-id="brand.name-lead" data-edit-type="text" data-edit-label="Business name, first word">
          {site.nameParts.lead}
        </span>
        <span
          data-edit-id="brand.name-accent"
          data-edit-type="text"
          data-edit-label="Business name, second word"
          className="text-muted-foreground"
        >
          {' '}{site.nameParts.accent}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Start a project</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">{site.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2 text-sm font-medium',
                        isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Separator className="my-3" />
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/contact">Start a project</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

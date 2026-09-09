import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import { Header } from '~/components/site/Header';
import { Footer } from '~/components/site/Footer';
import { Button } from '~/components/ui/button';
import { JsonLd } from '~/components/seo/JsonLd';
import { organizationSchema } from '~/lib/seo';
import { site } from '~/config/site';
import { THEME_STORAGE_KEY } from '~/components/site/ThemeToggle';
import { AnnotationBridge } from '~/components/site/AnnotationBridge';
import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={site.defaultTheme === 'dark' ? 'dark' : undefined}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Organisation schema belongs on every page, so it lives in the
            document rather than being repeated by each route. */}
        <JsonLd data={organizationSchema()} />
        {/* Runs before first paint so a returning visitor's own choice is
            applied without the flash of the build-time default. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)},v=localStorage.getItem(k);if(v==='dark'||v==='light'){document.documentElement.classList.toggle('dark',v==='dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {/* Inert unless the builder enables it, so a published site carries a
            script that never runs and never listens. */}
        <AnnotationBridge />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let heading = 'Something went wrong';
  let detail = 'An unexpected error occurred. Please try again.';

  if (isRouteErrorResponse(error)) {
    heading = error.status === 404 ? 'Page not found' : `${error.status} ${error.statusText}`;
    detail =
      error.status === 404
        ? 'The page you asked for does not exist. It may have moved, or the link may be wrong.'
        : error.data || detail;
  } else if (import.meta.env.DEV && error instanceof Error) {
    detail = error.message;
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-5 px-6 py-24">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{heading}</h1>
      <p className="text-muted-foreground">{detail}</p>
      <Button asChild>
        <Link to="/">Back to the homepage</Link>
      </Button>
    </section>
  );
}

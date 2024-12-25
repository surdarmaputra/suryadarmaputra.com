import './styles/global.css';

import type { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import ColorModeScript from './modules/core/components/base/ColorModeScript';
import PiwikScript from './modules/core/components/base/PiwikScript';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'style',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    crossOrigin: 'anonymous',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="container relative mx-auto min-h-screen px-6 text-slate-700 selection:bg-amber-500 selection:text-slate-900 dark:bg-slate-900 dark:text-slate-400 lg:max-w-5xl">
        {children}
        <PiwikScript />
        <ColorModeScript />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

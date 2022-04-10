import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

import ColorModeScript from './components/base/ColorModeScript';
import PiwikScript from './components/base/PiwikScript';
import styles from './styles/app.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,900&display=swap',
    },
  ];
}

export default function App() {
  return (
    <html className="dark" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body
        className="
          relative container mx-auto px-6 min-h-screen lg:max-w-4xl
          dark:bg-slate-900 text-slate-700 dark:text-slate-400
          selection:bg-amber-500 selection:text-slate-900
        "
      >
        <PiwikScript />
        <ColorModeScript />
        <div className="hidden dark:block -z-10 absolute rounded-full w-1/2 h-1/3 md:w-96 md:h-96 bg-sky-700 blur-3xl opacity-10 left-0 md:-left-6 top-14"></div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

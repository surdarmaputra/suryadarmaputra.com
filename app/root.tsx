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
          container relative mx-auto min-h-screen px-6 text-slate-700
          selection:bg-amber-500 selection:text-slate-900 dark:bg-slate-900
          dark:text-slate-400 lg:max-w-5xl
        "
      >
        <PiwikScript />
        <ColorModeScript />
        <div className="absolute left-0 top-14 -z-10 hidden h-1/3 w-1/2 rounded-full bg-sky-700 opacity-10 blur-3xl dark:block md:-left-6 md:h-96 md:w-96"></div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

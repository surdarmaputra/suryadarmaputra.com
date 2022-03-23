import { useEffect, useRef } from 'react';
import type { MetaFunction } from 'remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

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

export const meta: MetaFunction = () => {
  return {
    title: 'Surya Darma Putra',
    description:
      'Surya Darma Putra is a software engineer based in Bali, Indonesia. Experienced in web development and product engineering.',
  };
};

export default function App() {
  const headScript = useRef(null);

  useEffect(() => {
    if (headScript.current) {
      // @ts-ignore
      headScript.current.innerHTML = `
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      `;
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <script ref={headScript}></script>
      </head>
      <body
        className="
          relative container mx-auto px-6 min-h-screen
          dark:bg-slate-900 text-slate-700 dark:text-slate-400
        "
      >
        <div className="hidden dark:block -z-10 absolute rounded-full w-1/2 h-1/3 md:w-96 md:h-96 bg-sky-700 blur-3xl opacity-10 left-0 md:-left-6 top-14"></div>
        <div className="hidden dark:block -z-10 absolute rounded-full w-1/2 h-1/3 md:w-96 md:h-96 bg-emerald-400 blur-3xl opacity-5 right-0 md:-right-6 top-1/3"></div>
        <div className="hidden dark:block -z-10 absolute rounded-full w-1/2 h-1/3 md:w-96 md:h-96 bg-amber-100 blur-3xl opacity-5 left-0 md:-left-6 bottom-14"></div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

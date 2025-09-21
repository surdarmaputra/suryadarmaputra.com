import './styles/global.css';

import type { LinksFunction } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';

import ColorModeScript from './modules/core/components/base/ColorModeScript';
import GTagScript from './modules/core/components/base/GTagScript';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: 'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: 'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: 'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'style',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional',
    crossOrigin: 'anonymous',
  },
];

export async function loader() {
  return {
    googleAnalyticsMeasurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { googleAnalyticsMeasurementId } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <style>
          {`
          .break-words {
            overflow-wrap: break-word;
          }
          .container {
            width: 100%;
          }
          .flex {
            display: flex;
          }
          .font-extrabold {
            font-weight: 800;
          }
          .font-semibold {
            font-weight: 600;
          }
          .items-center {
            align-items: center;
          }
          .mb-1 {
            margin-bottom: 0.25rem;
          }
          .mb-32 {
            margin-bottom: 8rem;
          }
          .min-h-screen {
            min-height: 100vh;
          }
          .mt-14 {
            margin-top: 3.5rem;
          }
          .mt-4 {
            margin-top: 1rem;
          }
          .mx-auto {
            margin-left: auto;
            margin-right: auto;
          }
          .pb-16 {
            padding-bottom: 4rem;
          }
          .pt-16 {
            padding-top: 4rem;
          }
          .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .relative {
            position: relative;
          }
          .text-slate-700 {
            color: #334155;
          }
          .tracking-tight {
            letter-spacing: -0.025em;
          }
          .w-full {
            width: 100%;
          }
          @media (min-width: 640px) {
            .container {
              max-width: 640px;
            }
          }
          @media (min-width: 768px) {
            .container {
              max-width: 768px;
            }
            .md:mt-4{
              margin-top:1rem;
            }
            .md:pt-28{
              padding-top:7rem;
            }
          }
          @media (min-width: 1024px) {
            .container {
              max-width: 1024px;
            }
            .lg:max-w-5xl {
              max-width: 64rem;
            }
          }
        `}
        </style>
      </head>
      <body className="relative mx-auto flex min-h-screen flex-col justify-between break-words px-6 text-slate-700 selection:bg-amber-500 selection:text-slate-900 data-[scroll-locked]:px-6 dark:bg-slate-900 dark:text-slate-400">
        {children}
        <ColorModeScript />
        <ScrollRestoration />
        <Scripts />
        {googleAnalyticsMeasurementId ? (
          <GTagScript measurementId={googleAnalyticsMeasurementId} />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

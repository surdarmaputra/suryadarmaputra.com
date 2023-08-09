import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import SingleColumnPageLayout from '@/libs/core/components/templates/SingleColumnPageLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Surya Darma Putra - Software engineer based in Bali, Indonesia',
  description:
    "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems.",
  keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
        ${inter.className}
        container relative mx-auto min-h-screen px-6 text-slate-700
        selection:bg-amber-500 selection:text-slate-900 dark:bg-slate-900
        dark:text-slate-400 lg:max-w-5xl
      `}
      >
        <SingleColumnPageLayout>{children}</SingleColumnPageLayout>
      </body>
    </html>
  );
}

import React from 'react';

import { Footer } from '~/components/sections/Footer';
import { Header } from '~/components/sections/Header';

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

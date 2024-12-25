import React from 'react';

import { Footer } from '~/modules/core/components/sections/Footer';
import { Header } from '~/modules/core/components/sections/Header';

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

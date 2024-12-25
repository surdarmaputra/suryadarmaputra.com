import React from 'react';

import { Footer } from '~/modules/core/components/sections/Footer';
import { Header } from '~/modules/core/components/sections/Header';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  isFooterLinksVisible?: boolean;
}

export function DefaultLayout({ children, isFooterLinksVisible }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer isLinksVisible={isFooterLinksVisible} />
    </>
  );
}

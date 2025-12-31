import React from 'react';

import { Footer } from '~/modules/core/components/sections/Footer';
import { Header } from '~/modules/core/components/sections/Header';

import { useDefaultWindowListeners } from '../../hooks/use-default-window-listeners';
import { FloatingNavigation } from '../base/FloatingNavigation';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  isFooterLinksVisible?: boolean;
}

export function DefaultLayout({
  children,
  isFooterLinksVisible,
}: DefaultLayoutProps) {
  useDefaultWindowListeners();
  return (
    <>
      <Header />
      {children}
      <FloatingNavigation />
      <Footer isLinksVisible={isFooterLinksVisible} />
    </>
  );
}

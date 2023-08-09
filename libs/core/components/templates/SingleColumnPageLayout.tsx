import { HTMLAttributes, ReactElement } from 'react';

import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';

export default function SingleColumnPageLayout({
  children,
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

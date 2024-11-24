import type { MetaFunction } from '@remix-run/react';

import AboutPage from '~/modules/introduction/pages/AboutPage';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Surya Darma Putra - About me',
    },
    {
      name: 'description',
      content:
        "👋 Hello, I'm Surya, a software engineer based in Bali, Indonesia. I do web development using JavaScript, React and Vue ecosystems.",
    },
    {
      keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export default function About() {
  return <AboutPage />;
}

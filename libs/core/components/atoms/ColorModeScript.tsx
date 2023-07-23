import { ReactElement } from 'react';

import InlineScript from './InlineScript';

export default function ColorModeScript(): ReactElement {
  return (
    <InlineScript
      body={`
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }  
      `}
    />
  );
}

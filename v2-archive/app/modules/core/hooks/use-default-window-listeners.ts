import { useEffect } from 'react';
import { forceCheck } from 'react-lazyload';

export function useDefaultWindowListeners() {
  function handleWindowResize() {
    forceCheck();
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
}

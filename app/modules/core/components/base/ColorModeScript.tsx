import InlineScript from './InlineScript';

export default function ColorModeScript() {
  return (
    <InlineScript
      body={`
        if (localStorage.theme === 'light' || !('theme' in localStorage)) {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
          
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light')
        }  
      `}
    />
  );
}

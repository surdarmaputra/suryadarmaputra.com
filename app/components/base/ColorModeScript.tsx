import InlineScript from './InlineScript';

export default function ColorModeScript() {
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

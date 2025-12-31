interface GTagScriptProps {
  measurementId: string;
}

export default function GTagScript({ measurementId }: GTagScriptProps) {
  if (!measurementId) return null;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}');
        </script>
      `,
      }}
    />
  );
}

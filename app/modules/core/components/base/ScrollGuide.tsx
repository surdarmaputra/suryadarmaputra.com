export interface ScrollGuideProps {
  className?: string;
  onClick?: () => void;
}

export default function ScrollGuide({
  className,
  onClick,
}: ScrollGuideProps) {
  return (
    <button
      aria-label="Scroll down"
      className={`w-full flex flex-col justify-center items-center ${className}`}
      onClick={onClick}
      type="button"
    >
      <div className="arrow animate-scroll-guide-fade-1">
        <svg
          className="h-8 w-8 dark:text-slate-800 text-slate-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="arrow animate-scroll-guide-fade-2 -mt-6">
        <svg
          className="h-8 w-8 dark:text-slate-700 text-slate-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="arrow animate-scroll-guide-fade-3 -mt-6">
        <svg
          className="h-8 w-8 dark:text-slate-600 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
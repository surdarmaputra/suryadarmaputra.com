export interface ScrollGuideProps {
  className?: string;
  onClick?: () => void;
}

export default function ScrollGuide({ className, onClick }: ScrollGuideProps) {
  return (
    <button
      aria-label="Scroll down"
      className={`flex w-full flex-col items-center justify-center ${className}`}
      onClick={onClick}
      type="button"
    >
      <div className="arrow animate-scroll-guide-fade-1">
        <svg
          className="h-4 w-4 text-slate-200 dark:text-slate-800 lg:h-8 lg:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="arrow -mt-6 animate-scroll-guide-fade-2">
        <svg
          className="h-4 w-4 text-slate-300 dark:text-slate-700 lg:h-8 lg:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="arrow -mt-6 animate-scroll-guide-fade-3">
        <svg
          className="h-4 w-4 text-slate-400 dark:text-slate-600 lg:h-8 lg:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

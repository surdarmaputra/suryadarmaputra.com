export function GeneralErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <span className="animate-bounce text-8xl font-extrabold text-amber-400 drop-shadow-lg">
          Oops
        </span>
      </div>
      <h1 className="animate-fade-in mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
        Something wrong :(
      </h1>
      <p className="animate-fade-in mb-6 text-lg text-slate-600 delay-100 dark:text-slate-400">
        Sorry, something went wrong on our end. Please try refreshing the page,
        or come back later.
      </p>
      <button
        className="group inline-flex items-center rounded-lg bg-amber-400 px-6 py-2 font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:text-slate-900"
        onClick={() => window.location.reload()}
        type="button"
      >
        <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110">
          ↻
        </span>
        Refresh Page
      </button>
    </div>
  );
}

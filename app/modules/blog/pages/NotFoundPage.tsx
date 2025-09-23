import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <span className="animate-bounce text-8xl font-extrabold text-amber-400 drop-shadow-lg">
          404
        </span>
      </div>
      <h1 className="animate-fade-in mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
        Page Not Found
      </h1>
      <p className="animate-fade-in mb-6 text-lg text-slate-600 delay-100 dark:text-slate-400">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        className="group inline-flex items-center rounded-lg bg-amber-400 px-6 py-2 font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:text-slate-900"
        to="/"
      >
        <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110">
          ←
        </span>
        Back to Home
      </Link>
    </div>
  );
}

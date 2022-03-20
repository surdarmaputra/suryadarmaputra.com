export default function Header() {
  return (
    <header className="mb-4 py-4 flex items-center justify-between">
      <img
        alt="Site logo"
        className="border-2 border-slate-100 rounded-md"
        src="/site-logo.png"
        width="40"
      />
      <nav className="flex">
        <a className="mr-3 hover:underline px-2 py-1" href="/">
          Blog
        </a>
        <a className="hover:underline px-4 py-1" href="/about">
          About
        </a>
      </nav>
    </header>
  );
}

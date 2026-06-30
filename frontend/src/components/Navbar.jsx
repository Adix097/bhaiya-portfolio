import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 lg:px-18 bg-(--background) border-b border-(--border)">
      <Link
        to="/"
        className="text-lg font-semibold tracking-tight text-(--hero-text)"
      >
        SV
      </Link>

      <ul className="flex items-center gap-8">
        {LINKS.map(({ label, to }) => {
          const active = isActive(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className={`text-base transition-colors duration-200 ${
                  active
                    ? "font-semibold text-(--primary-cta)"
                    : "font-normal text-(--muted-text) hover:text-(--hero-text)"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;

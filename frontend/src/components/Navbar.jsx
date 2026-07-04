import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 lg:px-18 bg-(--background) border-b border-(--border)">
      <Link
        to="/"
        className="text-lg font-semibold tracking-tight text-(--hero-text)"
      >
        SV
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        {LINKS.map(({ label, to }) => {
          const active = isActive(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className={`text-button font-semibold transition-colors duration-200 ${
                  active
                    ? "text-(--primary-cta)"
                    : "font-normal text-(--muted-text) hover:text-(--hero-text)"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-(--background) border-b border-(--border) md:hidden flex flex-col items-start px-6 py-4 gap-4">
          {LINKS.map(({ label, to }) => {
            const active = isActive(to);
            return (
              <li key={to} className="w-full">
                <Link
                  to={to}
                  className={`text-button font-semibold transition-colors duration-200 ${
                    active
                      ? "text-(--primary-cta)"
                      : "font-normal text-(--muted-text) hover:text-(--hero-text)"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

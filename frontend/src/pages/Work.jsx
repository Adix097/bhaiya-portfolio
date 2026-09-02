import { Link, useLocation } from "react-router-dom";
import BrandIdentity from "./BrandIdentity";
import TypedCollections from "./TypedCollections";

const TABS = [
  { key: "book-covers", label: "Book Covers", path: "/work/book-covers" },
  { key: "illustrations", label: "Illustrations", path: "/work/illustrations" },
  { key: "sketch-book", label: "Sketch Book", path: "/work/sketch-book" },
  { key: "collections", label: "Collections", path: "/work/collections" },
  { key: "brand-campaigns", label: "Branding/Campaigns", path: "/work/brand" },
];

const Work = () => {
  const location = useLocation();

  const activeTab =
    TABS.find((tab) => location.pathname.startsWith(tab.path))?.key ?? "book-covers";

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24">
      <nav className="mb-12 flex justify-center">
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {TABS.map(({ key, label, path }) => (
            <Link
              key={key}
              to={path}
              className={`pb-2 text-button font-semibold cursor-pointer transition-colors duration-200 ${activeTab === key
                  ? "border-b-2 border-(--hero-text) text-(--hero-text)"
                  : "font-normal text-(--muted-text) hover:text-(--hero-text)"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {activeTab === "brand-campaigns" ? <BrandIdentity /> : <TypedCollections type={activeTab} />}
    </main>
  );
};

export default Work;

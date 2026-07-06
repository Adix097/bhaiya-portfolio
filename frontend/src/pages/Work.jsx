import { Link, useLocation } from "react-router-dom";
import BrandIdentity from "./BrandIdentity";
import Collections from "./Collections";

const TABS = [
  { key: "brand", label: "Branding/Campaigns" },
  { key: "collections", label: "Collections" },
];

const Work = () => {
  const location = useLocation();

  const activeTab = location.pathname.includes("/work/collections")
    ? "collections"
    : "brand";

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24">
      <nav className="mb-12 flex justify-center">
        <div className="flex items-center gap-12">
          {TABS.map(({ key, label }) => (
            <Link
              key={key}
              to={key === "brand" ? "/work/brand" : "/work/collections"}
              className={`pb-2 text-button font-semibold cursor-pointer transition-colors duration-200 ${
                activeTab === key
                  ? "border-b-2 border-(--hero-text) font-semibold text-(--hero-text)"
                  : "font-normal text-(--muted-text) hover:text-(--hero-text)"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {activeTab === "brand" && <BrandIdentity />}
      {activeTab === "collections" && <Collections />}
    </main>
  );
};

export default Work;

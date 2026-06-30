import { useState } from "react";
import BrandIdentity from "./BrandIdentity";
import Collections from "./Collections";

const TABS = [
  { key: "brand", label: "Brand Identity" },
  { key: "collections", label: "Collections" },
];

const Work = () => {
  const [activeTab, setActiveTab] = useState("brand");

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24">
      <nav className="mb-12 flex justify-center">
        <div className="flex items-center gap-12">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-2 text-button font-semibold cursor-pointer transition-colors duration-200 ${
                activeTab === key
                  ? "border-b-2 border-(--hero-text) font-semibold text-(--hero-text)"
                  : "font-normal text-(--muted-text) hover:text-(--hero-text)"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {activeTab === "brand" && <BrandIdentity />}
      {activeTab === "collections" && <Collections />}
    </main>
  );
};

export default Work;

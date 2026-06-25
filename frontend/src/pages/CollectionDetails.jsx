import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ArrowRight from "../components/ArrowRight";

// Temporary static data — replace with API call once backend is ready
const COLLECTIONS = {
  "fold-studio": {
    title: "Fold Studio",
    year: "2024",
    medium: "Digital Illustration",
    description:
      "A series exploring geometric form and negative space through editorial illustration.",
    images: Array.from({ length: 8 }, (_, i) => ({
      id: i,
      src: `https://picsum.photos/1200/800?random=${i + 10}`,
    })),
  },
  "ashwild-books": {
    title: "Ashwild Books",
    year: "2023",
    medium: "Ink & Digital",
    description:
      "Cover illustrations for an independent literary publisher with a focus on texture and mood.",
    images: Array.from({ length: 6 }, (_, i) => ({
      id: i,
      src: `https://picsum.photos/1200/800?random=${i + 20}`,
    })),
  },
  "linea-press": {
    title: "Linea Press",
    year: "2023",
    medium: "Pencil & Digital",
    description:
      "Editorial illustrations built around fine line work and minimal colour palettes.",
    images: Array.from({ length: 7 }, (_, i) => ({
      id: i,
      src: `https://picsum.photos/1200/800?random=${i + 30}`,
    })),
  },
};

const CollectionDetail = () => {
  const { id } = useParams();
  const collection = COLLECTIONS[id];
  const [activeImage, setActiveImage] = useState(0);

  if (!collection) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-lg text-(--muted-text)">Collection not found.</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-(--primary-cta) hover:text-(--hero-text) transition-colors"
        >
          <HiChevronLeft size={16} /> Back to Work
        </Link>
      </main>
    );
  }

  const total = collection.images.length;

  const next = () => setActiveImage((prev) => (prev + 1) % total);
  const prev = () => setActiveImage((prev) => (prev - 1 + total) % total);

  return (
    <main className=" md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
      {/* Back link */}
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm text-(--muted-text) hover:text-(--hero-text) transition-colors mb-12"
      >
        <HiChevronLeft size={16} /> Back to Work
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Image viewer */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-(--border)">
            <img
              key={activeImage}
              src={collection.images[activeImage].src}
              alt={collection.title}
              className="max-h-[70vh] w-full object-cover"
            />
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={prev}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors"
            >
              <HiChevronLeft size={18} />
            </button>

            <div className="flex gap-2 overflow-x-auto">
              {collection.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    activeImage === index
                      ? "border-(--primary-cta)"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="h-16 w-16 object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors"
            >
              <HiChevronRight size={18} />
            </button>
          </div>

          {/* Position indicator */}
          <p className="mt-3 text-sm text-(--muted-text)">
            {activeImage + 1} / {total}
          </p>
        </div>

        {/* Metadata */}
        <aside>
          <h1 className="font-outfit text-4xl font-bold text-(--hero-text)">
            {collection.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-(--muted-text)">
            {collection.description}
          </p>

          <div className="mt-8 border-t border-(--border) pt-6 space-y-4">
            {[
              { label: "Year", value: collection.year },
              { label: "Medium", value: collection.medium },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-(--muted-text)">{label}</span>
                <span className="text-(--hero-text)">{value}</span>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-6 py-3 text-sm font-medium text-white transition-all duration-300"
          >
            Request similar work
            <ArrowRight
              size={16}
              className="transition-all duration-300 group-hover:translate-x-2"
            />
          </Link>
        </aside>
      </div>
    </main>
  );
};

export default CollectionDetail;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ArrowRight from "../components/ArrowRight";
import useFetch from "../hooks/useFetch";
import { getCollection } from "../lib/api";
import Lightbox from "../components/Lightbox";

const CollectionDetail = () => {
  const { slug } = useParams();
  const {
    data: collection,
    loading,
    error,
  } = useFetch(() => getCollection(slug), [slug]);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (loading) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
        <div className="h-4 w-24 rounded bg-(--surface-hover) animate-pulse mb-12" />
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="h-[70vh] rounded-2xl bg-(--surface-hover) animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-(--surface-hover) animate-pulse" />
            <div className="h-4 w-full rounded bg-(--surface-hover) animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-(--surface-hover) animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !collection) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-lg text-(--muted-text)">Collection not found.</p>
        <Link
          to="/work/collections"
          className="inline-flex items-center gap-2 text-secondary text-(--primary-cta) hover:text-(--hero-text) transition-colors"
        >
          <HiChevronLeft size={16} /> Back to Work
        </Link>
      </main>
    );
  }

  const images = collection.images ?? [];
  const total = images.length;

  const next = () => setActiveImage((prev) => (prev + 1) % total);
  const prev = () => setActiveImage((prev) => (prev - 1 + total) % total);

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
      <Link
        to="/work/collections"
        className="inline-flex items-center gap-2 text-secondary text-(--muted-text) hover:text-(--hero-text) transition-colors mb-12"
      >
        <HiChevronLeft size={16} /> Back to Work
      </Link>

      <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
        {/* Image viewer */}
        <div>
          <div
            className="flex items-center justify-center max-h-[70vh] overflow-hidden cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              className="max-h-[70vh] w-full object-contain"
              key={activeImage}
              src={images[activeImage]?.url ?? collection.coverImage.url}
              alt={collection.title}
            />
          </div>

          {total > 1 && (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={prev}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors"
              >
                <HiChevronLeft size={18} />
              </button>

              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={image._id}
                    onClick={() => setActiveImage(index)}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${activeImage === index
                      ? "border-(--primary-cta)"
                      : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={image.url}
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
          )}

          {total > 1 && (
            <p className="mt-3 text-sm text-(--muted-text)">
              {activeImage + 1} / {total}
            </p>
          )}
        </div>

        {/* Metadata */}
        <aside>
          <h1 className="text-3xl font-semibold text-(--hero-text)">
            {collection.title}
          </h1>

          {collection.metadata?.length > 0 && (
            <div className="mt-8 border-t border-(--border) pt-6 space-y-4">
              {collection.metadata.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-(--muted-text)">{label}</span>
                  <span className="text-(--hero-text)">{value}</span>
                </div>
              ))}
            </div>
          )}

          {collection.description && (
            <div className="mt-8 border-t border-(--border) pt-6">
              <p className="mt-4 text-base text-justify leading-relaxed text-(--muted-text) whitespace-pre-wrap">
                {collection.description}
              </p>
            </div>
          )}

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

      {lightboxOpen && (
        <Lightbox
          src={images[activeImage]?.url ?? collection.coverImage.url}
          alt={collection.title}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
          hasMultiple={total > 1}
        />
      )}
    </main>
  );
};

export default CollectionDetail;

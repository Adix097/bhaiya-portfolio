import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getCollectionsByType } from "../lib/api";

const TypedCollections = ({ type }) => {
  const { data: collections, loading, error } = useFetch(
    () => getCollectionsByType(type),
    [type],
  );

  if (loading) {
    return (
      <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="mb-3 h-48 w-full rounded-xl bg-(--surface-hover) animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-(--muted-text) py-12">Failed to load.</p>
    );
  }

  if (!collections?.length) {
    return (
      <p className="text-center text-(--muted-text) py-12">Nothing here yet.</p>
    );
  }

  return (
    <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
      {collections.map((collection) => (
        <Link
          key={collection.slug}
          to={`/work/${type}/${collection.slug}`}
          className="group relative mb-3 block break-inside-avoid overflow-hidden rounded-xl"
        >
          <img
            src={collection.coverImage.url}
            alt={collection.title}
            loading="lazy"
            className="w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          <span className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-label="Open project"
            >
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TypedCollections;
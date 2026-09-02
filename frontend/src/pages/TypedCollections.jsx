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
      {collections.map((collection) => {
        const title = collection.metadata?.find((m) => m.label === "Category")?.value ?? collection.title;

        return (
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
              <h3 className="p-5 text-xl font-semibold text-white">{title}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TypedCollections;
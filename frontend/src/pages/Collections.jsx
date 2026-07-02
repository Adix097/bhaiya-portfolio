import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getCollections } from "../lib/api";

const Collections = () => {
  const { data: collections, loading, error } = useFetch(getCollections);

  if (loading) {
    return (
      <div className="grid columns-2 gap-3 md:columns-3 xl:columns-4">
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
      <p className="text-center text-(--muted-text) py-12">
        Failed to load collections.
      </p>
    );
  }

  if (!collections?.length) {
    return (
      <p className="text-center text-(--muted-text) py-12">
        No collections yet.
      </p>
    );
  }

  return (
    <div className="columns-2 gap-3 md:columns-3 xl:columns-4">
      {collections.map((collection) => {
        const category = collection.metadata?.find(
          (m) => m.label === "Category",
        )?.value;

        return (
          <Link
            key={collection.slug}
            to={`/work/collections/${collection.slug}`}
            className="group relative mb-3 block break-inside-avoid overflow-hidden"
          >
            <img
              src={collection.coverImage.url}
              alt={category}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center text-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-card-heading p-5 font-thin text-white">
                {category}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Collections;

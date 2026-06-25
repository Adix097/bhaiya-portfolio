import { Link } from "react-router-dom";

const IMAGES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  title: `Collection ${i + 1}`,
  src: `https://picsum.photos/500/${400 + (i % 5) * 60}?random=${i}`,
}));

const Collections = () => {
  return (
    <div className="mx-auto">
      <div className="gap-3 columns-3 xl:columns-4">
        {IMAGES.map((image) => (
          <Link
            key={image.id}
            to={`/collections/${image.id}`}
            className="group relative mb-4 block break-inside-avoid overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              className="w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
              <h3 className="font-outfit text-xl font-semibold text-white">
                {image.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;

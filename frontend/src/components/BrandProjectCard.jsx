import { Link } from "react-router-dom";
import ArrowRight from "./ArrowRight";

const BrandProjectCard = ({ title, category, image, slug }) => {
  return (
    <Link to={`/work/${slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-(--border)">
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <h3 className="font-outfit text-2xl font-bold text-(--hero-text)">
            {title}
          </h3>
          <p className="mt-1 text-sm text-(--muted-text)">{category}</p>
        </div>

        <ArrowRight
          size={20}
          className="text-(--muted-text) transition-all duration-300 group-hover:text-(--hero-text) group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
};

export default BrandProjectCard;

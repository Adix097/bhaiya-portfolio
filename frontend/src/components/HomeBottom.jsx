import { Link } from "react-router-dom";
import ArrowRight from "./ArrowRight";

const HomeBottom = () => {
  return (
    <div className="relative z-20 w-full px-6 pb-12 sm:px-8 md:px-12 lg:px-18 lg:pt-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-center animate-[fadeUp_0.8s_ease-out]">
        <h1 className="text-hero font-semibold sm:leading-none text-(--hero-text)">
          <span className="leading-tight sm:leading-none">
            I'm Saurav Vishwakarma,
          </span>{" "}
          <br />
          <span className="text-(--primary-cta) leading-tight sm:leading-none">
            Graphic Designer <br />& Illustrator
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300"
          >
            View Work
            <ArrowRight
              size={18}
              className="transition-all duration-300 group-hover:translate-x-2"
            />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-(--border) px-7 py-3 text-sm text-(--hero-text) transition-all duration-300 hover:border-(--hero-text)"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBottom;

import { Link } from "react-router-dom";
import ArrowRight from "./ArrowRight";

const HomeLeftSide = () => {
  return (
    <div className="relative z-20 flex min-h-screen items-center px-6 md:px-12 lg:px-18">
      <div className="max-w-4xl animate-[fadeUp_0.8s_ease-out]">
        <h1 className="font-bold leading-tight tracking-tight text-[clamp(40px,6vw,74px)] text-(--hero-text)">
          I'm Saurav Vishwakarma, <br />
          <span className="text-(--primary-cta)">
            Graphic Designer <br />& Illustrator
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-(--muted-text)">
          Building brand identities that hold their nerve and illustrations that
          say what words don't. Based in Delhi, available worldwide.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium font-cta text-white transition-all duration-300"
          >
            View Work
            <ArrowRight
              size={18}
              className="transition-all duration-300 group-hover:translate-x-2"
            />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center text-(--hero-text) rounded-lg border border-(--border) px-7 py-3 text-sm font-cta transition-all duration-300 hover:border-(--hero-text)"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeLeftSide;

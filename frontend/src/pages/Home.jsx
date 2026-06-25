import { Link } from "react-router-dom";
import HomeRightSide from "../components/HomeRightSide";
import HomeLeftSide from "../components/HomeLeftSide";
import ArrowRight from "../components/ArrowRight";

const SELECTED_WORK = [
  {
    id: "fold-studio",
    title: "Fold Studio",
    category: "Illustration",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  },
  {
    id: "ashwild-books",
    title: "Ashwild Books",
    category: "Illustration",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    id: "linea-press",
    title: "Linea Press",
    category: "Illustration",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="antialiased scroll-smooth">
      <section className="relative min-h-screen overflow-hidden">
        <HomeRightSide />
        <HomeLeftSide />

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-18 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-px bg-(--border) animate-[scrollPulse_1.8s_ease-in-out_infinite]" />
            <span className="text-xs uppercase tracking-[0.25em] text-(--muted-text)">
              Scroll
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-(--background) to-transparent z-10 pointer-events-none" />
      </section>

      {/* Selected Work */}
      <section className="px-6 md:px-12 lg:px-18 pt-24 pb-24">
        <div className="flex items-end justify-between mb-10">
          <p className="text-base font-semibold font-outfit uppercase tracking-[0.3em] text-(--primary-cta)">
            Selected Work
          </p>

          <Link
            to="/work"
            className="hidden md:inline-flex items-center gap-2 text-base text-(--muted-text) hover:text-(--hero-text) transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="w-full border border-(--border) rounded-4xl p-5 md:p-6 bg-(--surface-raised)">
          {/* Featured */}
          <Link to="/work" className="group block">
            <div className="relative overflow-hidden rounded-3xl border border-(--border)">
              <div className="aspect-21/6 bg-(--surface-hover)">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80"
                  alt="Verda Organics"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-xs tracking-[0.25em] uppercase text-(--primary-cta)">
                  Brand Identity
                </p>
                <h3 className="mt-2 text-4xl font-bold text-(--hero-text)">
                  Verda Organics
                </h3>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {SELECTED_WORK.map((project) => (
              <Link
                key={project.id}
                to={`/collections/${project.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--surface-hover)">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="border-t border-(--border) p-5">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-(--primary-cta)">
                      {project.category}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-(--hero-text)">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-sm text-(--muted-text)">
                      {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

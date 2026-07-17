import { useRef } from "react";
import { Link } from "react-router-dom";
import HomeTop from "../components/HomeTop";
import HomeBottom from "../components/HomeBottom";
import HomeRightSide from "../components/HomeRightSide";
import HomeLeftSide from "../components/HomeLeftSide";
import ArrowRight from "../components/ArrowRight";
import useFetch from "../hooks/useFetch";
import { getCollections, getProjects } from "../lib/api";

export default function Home() {
  const heroRef = useRef(null);
  const workRef = useRef(null);

  const { data: collections } = useFetch(getCollections);
  const { data: projects } = useFetch(getProjects);

  const featuredProjects =
    projects?.filter((p) => p.featured).slice(0, 2) ?? [];
  const selectedWork = collections?.filter((c) => c.featured).slice(0, 3) ?? [];

  return (
    <div className="antialiased">
      {/* Hero */}

      <div className="block sm:hidden">
        <section
          ref={heroRef}
          className="relative min-h-screen overflow-hidden pb-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_42%)]" />
          <HomeTop />
          <HomeBottom />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-(--background) to-transparent z-10 pointer-events-none" />
        </section>
      </div>

      <div className="hidden sm:block">
        <section
          ref={heroRef}
          className="relative min-h-screen overflow-hidden"
        >
          <HomeRightSide />
          <HomeLeftSide />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-(--background) to-transparent z-10 pointer-events-none" />
        </section>
      </div>

      {/* Selected Work */}
      <section ref={workRef} className="px-6 md:px-12 lg:px-18 pt-24 pb-24">
        <div className="flex items-end justify-between mb-10">
          <p className="text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
            Selected Work
          </p>

          <Link
            to="/work"
            className="hidden md:inline-flex items-center gap-2 text-secondary text-(--muted-text) hover:text-(--hero-text) transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="w-full border border-(--border) rounded-4xl p-5 md:p-6 bg-(--surface-raised)">
          {/* Featured brand projects */}
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/brand/${project.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--surface-hover)">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.coverImage.url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="border-t border-(--border) p-5">
                      <p className="text-label font-medium tracking-[0.2em] uppercase text-(--primary-cta)">
                        Brand Identity
                      </p>
                      <h4 className="mt-2 text-card-heading font-semibold text-(--hero-text)">
                        {project.title}
                      </h4>
                      {project.category && (
                        <p className="mt-1 text-secondary text-(--muted-text)">
                          {project.category}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-3xl bg-(--surface-hover) animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Collections grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {selectedWork.length > 0
              ? selectedWork.map((collection) => (
                  <Link
                    key={collection.slug}
                    to={`/work/collections/${collection.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--surface-hover)">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={collection.coverImage.url}
                          alt={collection.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="border-t border-(--border) p-5">
                        <p className="text-label font-medium tracking-[0.2em] uppercase text-(--primary-cta)">
                          Collection
                        </p>
                        <h4 className="mt-2 text-card-heading font-semibold text-(--hero-text)">
                          {collection.title}
                        </h4>
                        {collection.metadata?.[0] && (
                          <p className="mt-1 text-secondary text-(--muted-text)">
                            {collection.metadata[0].value}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-3xl bg-(--surface-hover) animate-pulse"
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

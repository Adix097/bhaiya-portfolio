import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const featuredProject = projects?.find((p) => p.featured) ?? null;
  const selectedWork = collections?.filter((c) => c.featured).slice(0, 3) ?? [];

  return (
    <div className="antialiased">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <HomeRightSide />
        <HomeLeftSide />

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
      <section ref={workRef} className="px-6 md:px-12 lg:px-18 pt-24 pb-24">
        <div className="flex items-end justify-between mb-10">
          <p className="text-base font-semibold  uppercase tracking-[0.3em] text-(--primary-cta)">
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
          {/* Featured brand project */}
          {featuredProject ? (
            <Link to={`/work/${featuredProject.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-3xl border border-(--border)">
                <div className="aspect-21/6 bg-(--surface-hover)">
                  <img
                    src={featuredProject.coverImage.url}
                    alt={featuredProject.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-(--primary-cta)">
                    {featuredProject.category}
                  </p>
                  <h3 className="mt-2 text-4xl font-bold text-(--hero-text)">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>
            </Link>
          ) : (
            <div className="aspect-21/6 rounded-3xl bg-(--surface-hover) animate-pulse" />
          )}

          {/* Collections grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {selectedWork.length > 0
              ? selectedWork.map((collection) => (
                  <Link
                    key={collection.slug}
                    to={`/collections/${collection.slug}`}
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
                        <p className="text-[11px] tracking-[0.2em] uppercase text-(--primary-cta)">
                          Collection
                        </p>
                        <h4 className="mt-2 text-lg font-semibold text-(--hero-text)">
                          {collection.title}
                        </h4>
                        {collection.metadata?.[0] && (
                          <p className="mt-1 text-sm text-(--muted-text)">
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

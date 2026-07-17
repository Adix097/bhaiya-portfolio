import { useParams, Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import ArrowRight from "../components/ArrowRight";
import useFetch from "../hooks/useFetch";
import { getProject } from "../lib/api";

const BrandProjectDetail = () => {
  const { slug } = useParams();
  const {
    data: project,
    loading,
    error,
  } = useFetch(() => getProject(slug), [slug]);

  if (loading) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
        <div className="h-4 w-24 rounded bg-(--surface-hover) animate-pulse mb-12" />
        <div className="aspect-video w-full rounded-2xl bg-(--surface-hover) animate-pulse mb-12" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-(--surface-hover) animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-(--surface-hover) animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-48 rounded bg-(--surface-hover) animate-pulse" />
            <div className="h-4 w-32 rounded bg-(--surface-hover) animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-lg text-(--muted-text)">Project not found.</p>
        <Link
          to="/work/brand"
          className="inline-flex items-center gap-2 text-secondary text-(--muted-text) hover:text-(--hero-text) transition-colors mb-12"
        >
          <HiChevronLeft size={16} /> Back to Work
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
      <Link
        to="/work/brand"
        className="inline-flex items-center gap-2 text-secondary text-(--muted-text) hover:text-(--hero-text) transition-colors mb-12"
      >
        <HiChevronLeft size={16} /> Back to Work
      </Link>

      {/* Cover */}
      <div className="relative overflow-hidden rounded-3xl border border-(--border) mb-12">
        <img
          src={project.coverImage.url}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-12">
          <h1 className="text-base md:text-5xl font-semibold md:font-semibold text-(--hero-text)">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Project Info*/}
      {(project.description || project.metadata?.length > 0) && (
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-[1fr_320px] mb-16 pb-16">
          {/* Description */}
          {project.description && (
            <div>
              <p className="mb-3 text-label font-medium uppercase text-(--primary-cta)">
                Description
              </p>
              <p className="text-body font-normal text-(--muted-text)">
                {project.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          {project.metadata?.length > 0 && (
            <div className="space-y-6">
              {project.metadata.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-label font-medium uppercase text-(--primary-cta) mb-1">
                    {label}
                  </p>
                  <p className="text-body font-normal text-(--hero-text)">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Presentation image */}
      {project.presentation?.url && (
        <div className="mb-16">
          <img
            src={project.presentation.url}
            alt={`${project.title} presentation`}
            className="w-full object-contain"
          />
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-(--border) pt-12">
        <p className="text-sm font-medium  uppercase tracking-[0.3em] text-(--primary-cta) mb-4">
          Interested in working together?
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300"
        >
          Get in Touch
          <ArrowRight
            size={18}
            className="transition-all duration-300 group-hover:translate-x-2"
          />
        </Link>
      </div>
    </main>
  );
};

export default BrandProjectDetail;

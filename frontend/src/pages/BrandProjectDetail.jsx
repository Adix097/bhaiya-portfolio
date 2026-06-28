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
        <div className="h-[50vh] w-full rounded-2xl bg-(--surface-hover) animate-pulse mb-8" />
        <div className="space-y-4 max-w-2xl">
          <div className="h-8 w-64 rounded bg-(--surface-hover) animate-pulse" />
          <div className="h-4 w-full rounded bg-(--surface-hover) animate-pulse" />
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-lg text-(--muted-text)">Project not found.</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-(--primary-cta) hover:text-(--hero-text) transition-colors"
        >
          <HiChevronLeft size={16} /> Back to Work
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 md:px-12 lg:px-18 pt-32 pb-24 min-h-screen">
      {/* Back */}
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm text-(--muted-text) hover:text-(--hero-text) transition-colors mb-12"
      >
        <HiChevronLeft size={16} /> Back to Work
      </Link>

      {/* Cover */}
      <div className="relative overflow-hidden rounded-3xl border border-(--border) mb-16">
        <img
          src={project.coverImage.url}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <p className="text-xs tracking-[0.25em] uppercase text-(--primary-cta) mb-2">
            {project.category} · {project.year}
          </p>
          <h1 className="font-outfit text-4xl md:text-6xl font-bold text-(--hero-text)">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Presentation */}
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
        <p className="text-sm font-medium font-outfit uppercase tracking-[0.3em] text-(--primary-cta) mb-4">
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

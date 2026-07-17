import BrandProjectCard from "../components/BrandProjectCard";
import useFetch from "../hooks/useFetch";
import { getProjects } from "../lib/api";

const BrandIdentity = () => {
  const { data: projects, loading, error } = useFetch(getProjects);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-10">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video w-full rounded-2xl bg-(--surface-hover) animate-pulse" />
            <div className="h-6 w-48 rounded bg-(--surface-hover) animate-pulse" />
            <div className="h-4 w-24 rounded bg-(--surface-hover) animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-(--muted-text) py-12">
        Failed to load projects.
      </p>
    );
  }

  if (!projects?.length) {
    return (
      <p className="text-center text-(--muted-text) py-12">No projects yet.</p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {projects.map((project) => {
        console.log(project);
        return (
          <BrandProjectCard
            key={project.slug}
            title={project.title}
            category={`${project.category} · ${project.year}`}
            image={project.coverImage.url}
            slug={project.slug}
          />
        );
      })}
    </div>
  );
};

export default BrandIdentity;

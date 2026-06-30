import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { API_URL as API } from "../../lib/api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem("adminToken");
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API}/api/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await fetch(`${API}/api/admin/projects/${slug}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      alert("Failed to delete. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-2 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
            Manage
          </p>
          <h1 className="text-section-heading font-semibold text-(--hero-text)">
            Brand Projects
          </h1>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-5 py-2.5 text-sm font-medium font-cta text-white transition-all duration-300"
        >
          <HiOutlinePlus size={16} />
          New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-(--muted-text)">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-(--border) p-12 text-center">
          <p className="text-(--muted-text)">No projects yet.</p>
          <Link
            to="/admin/projects/new"
            className="mt-4 inline-flex items-center gap-2 text-sm text-(--primary-cta) hover:text-(--hero-text) transition-colors"
          >
            <HiOutlinePlus size={14} />
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface-raised) p-4 transition-colors hover:border-(--surface-hover)"
            >
              {/* Cover image */}
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-(--border)">
                <img
                  src={project.coverImage.url}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-(--hero-text) truncate">
                  {project.title}
                </h3>
                <div className="mt-0.5 flex items-center gap-3">
                  <p className="text-sm text-(--muted-text)">
                    {project.category}
                  </p>
                  <span className="text-(--border)">·</span>
                  <p className="text-sm text-(--muted-text)">{project.year}</p>
                </div>
              </div>

              <span className="hidden md:block rounded-full border border-(--border) px-3 py-1 text-xs text-(--muted-text)">
                {project.slug}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin/projects/${project.slug}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors"
                >
                  <HiOutlinePencilSquare size={16} />
                </Link>

                <button
                  onClick={() => handleDelete(project.slug)}
                  disabled={deleting === project.slug}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-red-400 hover:border-red-400 transition-colors disabled:opacity-50"
                >
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;

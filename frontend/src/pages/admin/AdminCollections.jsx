import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { API_URL } from "../../lib/api";

const AdminCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem("adminToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchCollections = async () => {
    try {
      const res = await fetch(`${API_URL}/api/collections`);
      const data = await res.json();
      setCollections(Array.isArray(data) ? data : []);
    } catch {
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await fetch(`${API_URL}/api/admin/collections/${slug}`, {
        method: "DELETE",
        headers,
      });
      setCollections((prev) => prev.filter((c) => c.slug !== slug));
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
          <h1 className="text-section-heading font-semibold text-(--hero-text)">Collections</h1>
        </div>

        <Link
          to="/admin/collections/new"
          className="inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-5 py-2.5 text-sm font-medium font-cta text-white transition-all duration-300"
        >
          <HiOutlinePlus size={16} />
          New Collection
        </Link>
      </div>

      {loading ? (
        <p className="text-(--muted-text)">Loading...</p>
      ) : collections.length === 0 ? (
        <div className="rounded-2xl border border-(--border) p-12 text-center">
          <p className="text-(--muted-text)">No collections yet.</p>
          <Link
            to="/admin/collections/new"
            className="mt-4 inline-flex items-center gap-2 text-sm text-(--primary-cta) hover:text-(--hero-text) transition-colors"
          >
            <HiOutlinePlus size={14} />
            Create your first collection
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {collections.map((collection) => (
            <div
              key={collection.slug}
              className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface-raised) p-4 transition-colors hover:border-(--surface-hover)"
            >
              {/* Cover image */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-(--border)">
                <img
                  src={collection.coverImage.url}
                  alt={collection.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-(--hero-text) truncate">
                  {collection.title}
                </h3>
                <p className="mt-0.5 text-sm text-(--muted-text)">
                  {collection.slug}
                </p>
              </div>

              {/* Metadata pills */}
              <div className="hidden md:flex items-center gap-2">
                {collection.metadata?.slice(0, 2).map((m) => (
                  <span
                    key={m.label}
                    className="rounded-full border border-(--border) px-3 py-1 text-xs text-(--muted-text)"
                  >
                    {m.label}: {m.value}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin/collections/${collection.slug}/edit`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors"
                >
                  <HiOutlinePencilSquare size={16} />
                </Link>

                <button
                  onClick={() => handleDelete(collection.slug)}
                  disabled={deleting === collection.slug}
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

export default AdminCollections;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  HiOutlinePhoto,
  HiOutlineRectangleStack,
  HiOutlinePlus,
} from "react-icons/hi2";
import { API_URL } from "../../lib/api";

const StatCard = ({ label, count, icon: Icon, to }) => (
  <Link
    to={to}
    className="group flex items-center justify-between rounded-2xl border border-(--border) bg-(--surface-raised) p-6 transition-colors duration-200 hover:border-(--primary-cta)"
  >
    <div>
      <p className="text-sm text-(--muted-text)">{label}</p>
      <p className="mt-2 text-4xl font-bold  text-(--hero-text)">
        {count ?? "—"}
      </p>
    </div>
    <Icon
      size={32}
      className="text-(--border) group-hover:text-(--primary-cta) transition-colors duration-200"
    />
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ collections: null, projects: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API_URL}/api/collections`, { headers }).then((r) => r.json()),
      fetch(`${API_URL}/api/projects`, { headers }).then((r) => r.json()),
    ])
      .then(([collections, projects]) => {
        setStats({
          collections: Array.isArray(collections) ? collections.length : 0,
          projects: Array.isArray(projects) ? projects.length : 0,
        });
      })
      .catch(() => setStats({ collections: 0, projects: 0 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium  uppercase tracking-[0.3em] text-(--primary-cta)">
          Overview
        </p>
        <h1 className="text-3xl font-bold text-(--hero-text)">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        <StatCard
          label="Collections"
          count={loading ? null : stats.collections}
          icon={HiOutlinePhoto}
          to="/admin/collections"
        />
        <StatCard
          label="Brand Projects"
          count={loading ? null : stats.projects}
          icon={HiOutlineRectangleStack}
          to="/admin/projects"
        />
      </div>

      <div>
        <p className="mb-4 text-sm font-medium  uppercase tracking-[0.3em] text-(--muted-text)">
          Quick Actions
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/collections/new"
            className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-5 py-2.5 text-sm text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors duration-200"
          >
            <HiOutlinePlus size={16} />
            New Collection
          </Link>

          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-5 py-2.5 text-sm text-(--muted-text) hover:text-(--hero-text) hover:border-(--hero-text) transition-colors duration-200"
          >
            <HiOutlinePlus size={16} />
            New Brand Project
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

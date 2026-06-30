import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "../../components/ArrowRight";
import { API_URL } from "../../lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch {
      setError("Could not reach server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-b border-(--border) bg-transparent py-4 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta)";

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--background) px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
            Admin
          </p>
          <h1 className="text-section-heading font-semibold text-(--hero-text)">
            Welcome back.
          </h1>
          <p className="mt-3 text-large-body text-(--muted-text)">
            Sign in to manage the portfolio.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClass}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && (
              <ArrowRight
                size={18}
                className="transition-all duration-300 group-hover:translate-x-2"
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import ArrowRight from "../../components/ArrowRight";
import { API_URL as API } from "../../lib/api";
import { HiOutlineTrash, HiOutlinePhoto, HiOutlinePlus } from "react-icons/hi2";

const AdminProjectEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const token = localStorage.getItem("adminToken");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [presentationFile, setPresentationFile] = useState(null);
  const [presentationPreview, setPresentationPreview] = useState("");
  const [description, setDescription] = useState("");
  const [metadata, setMetadata] = useState([{ label: "", value: "" }]);

  const [featured, setFeatured] = useState(false);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setProjectSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      );
    }
  };

  useEffect(() => {
    if (!isEditing) return;
    fetch(`${API}/api/projects/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title);
        setProjectSlug(data.slug);
        setCategory(data.category);
        setYear(data.year);
        setCoverPreview(data.coverImage?.url ?? "");
        setPresentationPreview(data.presentation?.url ?? "");
        setFeatured(data.featured ?? false);
        setDescription(data.description ?? "");
        setMetadata(
          data.metadata?.length ? data.metadata : [{ label: "", value: "" }],
        );
      })
      .finally(() => setLoading(false));
  }, [slug, isEditing]);

  const uploadFile = async (file, folder) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);
    const res = await fetch(`${API}/api/admin/upload`, {
      method: "POST",
      headers: authHeaders,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.message ?? "Upload failed");
    return data;
  };

  const updateMetadata = (index, field, value) => {
    setMetadata((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    );
  };

  const addMetadata = () =>
    setMetadata((prev) => [...prev, { label: "", value: "" }]);

  const removeMetadata = (index) =>
    setMetadata((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Cover image
      let coverData;
      if (coverFile) {
        coverData = await uploadFile(coverFile, "portfolio/covers");
      } else if (coverPreview) {
        coverData = { url: coverPreview, publicId: "" };
      } else {
        setError("Please upload a cover image.");
        return;
      }

      // Presentation PNG
      let presentationData = { url: "", publicId: "" };
      if (presentationFile) {
        presentationData = await uploadFile(
          presentationFile,
          "portfolio/presentations",
        );
      } else if (presentationPreview) {
        presentationData = { url: presentationPreview, publicId: "" };
      }

      const payload = {
        title,
        slug: projectSlug,
        category,
        year,
        coverImage: coverData,
        presentation: presentationData,
        featured: featured,
        description: description,
        metadata: metadata.filter((m) => m.label && m.value),
      };

      const res = await fetch(
        isEditing
          ? `${API}/api/admin/projects/${slug}`
          : `${API}/api/admin/projects`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { ...authHeaders, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Failed to save.");
        return;
      }

      navigate("/admin/projects");
    } catch (err) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta)";

  const UploadBox = ({
    preview,
    onFileChange,
    onClear,
    label,
    accept = "image/*",
  }) =>
    preview ? (
      <div className="relative overflow-hidden rounded-xl border border-(--border)">
        <img
          src={preview}
          alt={label}
          className="w-full object-contain max-h-64 bg-[url('/checkerboard.png')]"
        />
        <button
          type="button"
          onClick={onClear}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <HiOutlineTrash size={14} />
        </button>
      </div>
    ) : (
      <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-(--border) text-(--muted-text) hover:border-(--primary-cta) hover:text-(--hero-text) transition-colors">
        <HiOutlinePhoto size={24} />
        <span className="text-sm">{label}</span>
        <input
          type="file"
          accept={accept}
          onChange={onFileChange}
          className="hidden"
        />
      </label>
    );

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-(--muted-text)">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <p className="mb-2 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
          {isEditing ? "Edit" : "New"}
        </p>
        <h1 className="text-section-heading font-semibold text-(--hero-text)">
          {isEditing ? "Edit Project" : "New Brand Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Basic info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-label text-(--muted-text)">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-label text-(--muted-text)">Slug</label>
            <input
              type="text"
              value={projectSlug}
              onChange={(e) => setProjectSlug(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-label text-(--muted-text)">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label className="text-label text-(--muted-text)">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Cover image */}
        <div className="space-y-2">
          <label className="text-label text-(--muted-text)">Cover Image</label>
          <UploadBox
            preview={coverPreview}
            onFileChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setCoverFile(f);
              setCoverPreview(URL.createObjectURL(f));
            }}
            onClear={() => {
              setCoverFile(null);
              setCoverPreview("");
            }}
            label="Click to upload cover image"
          />
        </div>
        {/* Description */}
        <div className="space-y-2">
          <label className="text-label text-(--muted-text)">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a project summary..."
            rows={5}
            className="w-full rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta) resize-none"
          />
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <label className="text-sm text-(--muted-text)">
            Metadata{" "}
            <span className="text-xs opacity-60">
              (e.g. Segment: Logo & Branding, Niche: Health & Wellness)
            </span>
          </label>

          {metadata.map((m, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={m.label}
                onChange={(e) => updateMetadata(index, "label", e.target.value)}
                placeholder="Label"
                className={`${inputClass} flex-1`}
              />
              <input
                type="text"
                value={m.value}
                onChange={(e) => updateMetadata(index, "value", e.target.value)}
                placeholder="Value"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => removeMetadata(index)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--muted-text) hover:text-red-400 hover:border-red-400 transition-colors"
              >
                <HiOutlineTrash size={14} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMetadata}
            className="inline-flex items-center gap-2 text-secondary text-(--muted-text) hover:text-(--hero-text) transition-colors"
          >
            <HiOutlinePlus size={14} />
            Add field
          </button>
        </div>

        {/* Presentation PNG */}
        <div className="space-y-2">
          <label className="text-sm text-(--muted-text)">
            Presentation{" "}
            <span className="text-xs opacity-60">
              — transparent background PNG, will display full width
            </span>
          </label>
          <UploadBox
            preview={presentationPreview}
            onFileChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setPresentationFile(f);
              setPresentationPreview(URL.createObjectURL(f));
            }}
            onClear={() => {
              setPresentationFile(null);
              setPresentationPreview("");
            }}
            label="Click to upload presentation PNG"
            accept="image/png,image/jpeg,image/jpg"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Featured checkbox */}

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border border-(--border) accent-(--primary-cta)"
          />
          <span className="text-sm text-(--muted-text)">
            Feature in Selected Work on homepage
          </span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium font-cta text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Project"}
          {!saving && (
            <ArrowRight
              size={18}
              className="transition-all duration-300 group-hover:translate-x-2"
            />
          )}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminProjectEditor;

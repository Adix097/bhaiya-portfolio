import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import ArrowRight from "../../components/ArrowRight";
import { HiOutlineTrash, HiOutlinePlus, HiOutlinePhoto } from "react-icons/hi2";
import { API_URL as API } from "../../lib/api";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove, useSortable, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({ id, src, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative overflow-hidden rounded-xl border border-(--border) cursor-grab active:cursor-grabbing"
    >
      <img
        src={src}
        alt=""
        className="h-28 w-full object-cover pointer-events-none"
      />

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
      >
        <HiOutlineTrash size={12} />
      </button>
    </div>
  );
};

const AdminCollectionEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const token = localStorage.getItem("adminToken");
  const authHeaders = { Authorization: `Bearer ${token}` };

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [collectionSlug, setCollectionSlug] = useState("");
  const [type, setType] = useState("book-covers");
  const [metadata, setMetadata] = useState([{ label: "", value: "" }]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setImagePreviews((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setCollectionSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      );
    }
  };

  // Fetch existing data if editing
  useEffect(() => {
    if (!isEditing) return;
    fetch(`${API}/api/collections/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title);
        setCollectionSlug(data.slug);
        setType(data.type ?? "book-covers");
        setMetadata(
          data.metadata?.length ? data.metadata : [{ label: "", value: "" }],
        );
        setCoverPreview(data.coverImage?.url ?? "");
        setExistingImages(data.images ?? []);
        setImagePreviews(
          data.images?.map((img) => ({
            id: img.publicId || crypto.randomUUID(),
            src: img.url,
            type: "existing",
            data: img,
          })) ?? [],
        );
        setDescription(data.description ?? "");
        setFeatured(data.featured ?? false);
      })
      .finally(() => setLoading(false));
  }, [slug, isEditing]);

  // Metadata handlers
  const updateMetadata = (index, field, value) => {
    setMetadata((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    );
  };

  const addMetadata = () =>
    setMetadata((prev) => [...prev, { label: "", value: "" }]);

  const removeMetadata = (index) =>
    setMetadata((prev) => prev.filter((_, i) => i !== index));

  // Upload single file to Cloudinary via backend
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

    if (!res.ok || !data.url) {
      throw new Error(data.message ?? "Upload failed");
    }

    return data;
  };

  // Cover image
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // Gallery images
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      src: URL.createObjectURL(file),
      type: "new",
      file,
    }));

    setImagePreviews((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => {
      const image = prev[index];

      if (image.type === "new") {
        setImages((files) =>
          files.filter((file) => file !== image.file),
        );
      }

      if (image.type === "existing") {
        setExistingImages((prevExisting) =>
          prevExisting.filter(
            (existing) => existing !== image.data,
          ),
        );
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!coverImage && !coverPreview) {
        setError("Please upload a cover image.");
        return;
      }

      // Must upload cover if a new file was selected
      let coverData;
      if (coverImage) {
        coverData = await uploadFile(coverImage, "portfolio/covers");
      } else if (coverPreview) {
        coverData = { url: coverPreview, publicId: "" };
      } else {
        setError("Please upload a cover image.");
        return;
      }

      // Upload gallery images
      const allImages = [];

      for (const image of imagePreviews) {
        if (image.type === "existing") {
          allImages.push(image.data);
        }

        if (image.type === "new") {
          const uploaded = await uploadFile(
            image.file,
            "portfolio/collections",
          );

          allImages.push(uploaded);
        }
      }

      const payload = {
        title,
        slug: collectionSlug,
        type,
        coverImage: coverData,
        images: allImages,
        description: description,
        featured: featured,
        metadata: metadata.filter((m) => m.label && m.value),
      };

      const res = await fetch(
        isEditing
          ? `${API}/api/admin/collections/${slug}`
          : `${API}/api/admin/collections`,
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

      navigate("/admin/collections");
    } catch (err) {
      setError(err.message ?? "Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta)";

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-(--muted-text)">Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-label font-medium uppercase tracking-[0.3em] text-(--primary-cta)">
          {isEditing ? "Edit" : "New"}
        </p>
        <h1 className="text-section-heading font-semibold text-(--hero-text)">
          {isEditing ? "Edit Collection" : "New Collection"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Title */}
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

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm text-(--muted-text)">
            Slug{" "}
            <span className="text-xs opacity-60">
              (auto-generated, used in URL)
            </span>
          </label>
          <input
            type="text"
            value={collectionSlug}
            onChange={(e) => setCollectionSlug(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-(--muted-text)">Work Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={inputClass}
          >
            <option value="book-covers">Book Covers</option>
            <option value="illustrations">Illustrations</option>
            <option value="sketch-book">Sketch Book</option>
            <option value="collections">Collections</option>
          </select>
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <label className="text-label text-(--muted-text)">Cover Image</label>
          {coverPreview ? (
            <div className="relative w-full overflow-hidden rounded-xl border border-(--border)">
              <img
                src={coverPreview}
                alt="Cover"
                className="h-48 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setCoverPreview("");
                }}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <HiOutlineTrash size={14} />
              </button>
            </div>
          ) : (
            <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-(--border) text-(--muted-text) hover:border-(--primary-cta) hover:text-(--hero-text) transition-colors">
              <HiOutlinePhoto size={24} />
              <span className="text-sm">Click to upload cover image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm text-(--muted-text)">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-(--hero-text) outline-none placeholder:text-(--muted-text) transition-colors duration-200 focus:border-(--primary-cta) resize-none"
          />
        </div>

        {/* Gallery Images */}
        <div className="space-y-2">
          <label className="text-sm text-(--muted-text)">
            Gallery Images
          </label>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={imagePreviews.map((image) => image.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-3 gap-3">
                {imagePreviews.map((image, index) => (
                  <SortableImage
                    key={image.id}
                    id={image.id}
                    src={image.src}
                    index={index}
                    onRemove={removeImage}
                  />
                ))}

                <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-(--border) text-(--muted-text) hover:border-(--primary-cta) hover:text-(--hero-text) transition-colors">
                  <HiOutlinePlus size={20} />
                  <span className="text-xs">Add images</span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                </label>
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <label className="text-sm text-(--muted-text)">
            Metadata{" "}
            <span className="text-xs opacity-60">
              (e.g. Year: 2024, Medium: Pencil)
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
            className="inline-flex items-center gap-2 text-sm text-(--muted-text) hover:text-(--hero-text) transition-colors"
          >
            <HiOutlinePlus size={14} />
            Add field
          </button>
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

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="group inline-flex items-center gap-2 rounded-xl bg-(--primary-cta) px-7 py-3 font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Collection"}
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

export default AdminCollectionEditor;

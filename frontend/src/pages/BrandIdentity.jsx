import BrandProjectCard from "../components/BrandProjectCard";

const BRAND_PROJECTS = [
  {
    title: "Verda Organics",
    category: "Brand Identity · 2024",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
    slug: "verda-organics",
  },
  {
    title: "Cosmic Coffee",
    category: "Brand Identity · 2023",
    image:
      "https://cdn.logojoy.com/wp-content/uploads/20190606100723/cosmic_coffee_scene-1024x576.jpg",
    slug: "cosmic",
  },
];

const BrandIdentity = () => {
  return (
    <div className="mx-auto space-y-10">
      {BRAND_PROJECTS.map((project) => (
        <BrandProjectCard key={project.slug} {...project} />
      ))}
    </div>
  );
};

export default BrandIdentity;

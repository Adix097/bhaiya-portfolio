import heroImg from "../assets/hero-img.png";

const HomeTop = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-4xl bg-(--surface-raised) shadow-[0_25px_80px_rgba(0,0,0,0.18)]">
      <img
        src={heroImg}
        alt="Saurav Vishwakarma"
        className="h-[55vh] w-full object-cover object-center sm:h-[65vh] lg:h-[78vh] animate-[heroZoom_8s_ease-out_forwards]"
      />

      {/* Top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-(--background) to-transparent" />

      {/* Bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-(--background) to-transparent" />

      {/* Left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-(--background) to-transparent" />

      {/* Right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-(--background) to-transparent" />
    </div>
  );
};

export default HomeTop;

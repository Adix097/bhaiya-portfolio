import heroImg from "../assets/hero-img.png";

const HomeRightSide = () => {
  return (
    <>
      {/* Ambient glow */}
      <div className="absolute -left-40 top-20 h-125 w-125 rounded-full bg-(--primary-cta)/10 blur-3xl" />

      {/* Image */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[55%] overflow-hidden">
        <img
          src={heroImg}
          alt="Saurav Vishwakarma"
          className="h-full w-full object-cover object-right"
          style={{
            WebkitMaskImage:
              "linear-gradient(to left, black 72%, transparent 100%)",
            maskImage: "linear-gradient(to left, black 72%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.08))]" />

      {/* Fade layer */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-linear-to-r from-(--background) via-(--background) via-55% to-transparent" />

      {/* Additional soft overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.08))]" />
    </>
  );
};

export default HomeRightSide;

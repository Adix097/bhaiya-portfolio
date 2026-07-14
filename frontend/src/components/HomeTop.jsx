import phoneImg from "../assets/phone-img.png";

const HomeTop = () => {
  return (
    <div className="relative h-[55vh] overflow-hidden">
      <img
        src={phoneImg}
        alt=""
        className="absolute inset-0 h-[115%] w-full object-contain object-top"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default HomeTop;

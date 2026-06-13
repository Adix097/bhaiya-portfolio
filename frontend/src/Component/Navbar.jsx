import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#111111] px-8 py-5 flex items-start justify-between font-sans">
      <Link to={"/"}>
        <span className="text-white font-extrabold text-3xl tracking-tight leading-none select-none">
          SAURAV
        </span>
      </Link>
      <div className="flex items-center gap-5">
        <NavItem to="/work">Work</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </div>
      <button
        onClick={() => navigate("/contact")}
        className="rounded-3xl group relative overflow-hidden border border-white px-6 py-3 text-white cursor-pointer"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className=" absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 translate-y-[120%] fill-white transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-60%]
    "
        >
          <path d="M0,30 Q50,-5 100,30 L100,100 L0,100 Z" />
        </svg>

        <span
          className=" relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-black
    "
        >
          Lets Talk
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </nav>
  );
};

export default Navbar;

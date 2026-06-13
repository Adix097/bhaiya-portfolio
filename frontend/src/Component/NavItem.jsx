import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        inline-block
        relative
        after:absolute
        after:left-0
        after:bottom-0
        after:h-px
        after:bg-current
        after:transition-all
        after:duration-300
        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
        `
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;

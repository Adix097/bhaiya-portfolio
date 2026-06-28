import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlinePhoto,
  HiOutlineRectangleStack,
  HiArrowRightOnRectangle,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: HiOutlineSquares2X2,
  },
  {
    label: "Collections",
    to: "/admin/collections",
    icon: HiOutlinePhoto,
  },
  {
    label: "Brand Projects",
    to: "/admin/projects",
    icon: HiOutlineRectangleStack,
  },
];

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (to) =>
    to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);

  return (
    <div className="flex min-h-screen bg-(--background)">
      <aside className="fixed inset-y-0 left-0 w-60 flex flex-col border-r border-(--border) bg-(--surface-raised)">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-(--border)">
          <span className="font-outfit font-semibold text-(--hero-text)">
            SV{" "}
            <span className="text-(--muted-text) font-normal text-sm">
              admin
            </span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                  active
                    ? "bg-(--surface-hover) text-(--hero-text) font-medium"
                    : "text-(--muted-text) hover:text-(--hero-text) hover:bg-(--surface-hover)"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-(--border) space-y-1">
          <a
            href="/"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--muted-text) hover:text-(--hero-text) hover:bg-(--surface-hover) transition-colors duration-200"
          >
            <HiOutlineGlobeAlt size={18} />
            View Portfolio
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--muted-text) hover:text-(--hero-text) hover:bg-(--surface-hover) transition-colors duration-200"
          >
            <HiArrowRightOnRectangle size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-60 flex-1 px-8 py-10">{children}</main>
    </div>
  );
};

export default AdminLayout;

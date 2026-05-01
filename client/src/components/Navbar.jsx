import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold ${
      isActive ? "bg-blue-50 text-brand" : "text-slate-600 transition hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="rounded-md text-xl font-bold text-ink outline-none focus:ring-2 focus:ring-blue-100"
        >
          TaskFlow
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>
              <span className="hidden text-sm text-slate-500 sm:inline">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <Link
                to="/signup"
                className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

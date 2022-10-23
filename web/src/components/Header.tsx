import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  return (
    <header className="bg-slate-700 p-4 sticky top-0 flex justify-between w-full">
      <div>
        <Link to="/">
          <h1 className="text-4xl">Open</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {location.pathname === "/sessions" ? (
          <Link to="/session/create">
            <button className="bg-pink-600 hover:bg-pink-500">
              Create Session
            </button>
          </Link>
        ) : (
          <Link to="/sessions">
            <button className="bg-slate-50 text-slate-900 hover:bg-slate-100">
              Sessions
            </button>
          </Link>
        )}
        {location.pathname === "/login" ? (
          <Link to="/signup">
            <button className="bg-cyan-600 hover:bg-cyan-500">Signup</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="bg-cyan-600 hover:bg-cyan-500">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
}

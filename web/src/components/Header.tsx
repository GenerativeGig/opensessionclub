import { Link, useLocation } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export function Header() {
  const [{ data, fetching: meFetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const { pathname } = useLocation();

  let authenticationJsx;
  if (meFetching) {
    authenticationJsx = <></>;
  } else if (!data?.me) {
    authenticationJsx = (
      <>
        <Link to="/login">
          <button className="hover:text-slate-200">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-slate-500  hover:bg-slate-400">Signup</button>
        </Link>
      </>
    );
  } else {
    authenticationJsx = (
      <>
        <Link
          to={`/actor/${data.me.id}`}
          className="m-2 text-blue-500 hover:text-blue-400"
        >
          {data.me.name}
        </Link>
        <button
          className="hover:text-slate-200"
          onClick={() => {
            logout({});
          }}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <header className="bg-slate-700 p-4 sticky top-0 flex justify-between w-full">
      <div>
        <Link to="/">
          <h1 className="text-4xl">Open Session Club</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {pathname === "/sessions" ? (
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
        {authenticationJsx}
      </div>
    </header>
  );
}

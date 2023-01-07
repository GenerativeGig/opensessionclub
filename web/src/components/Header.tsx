import { Link, useLocation } from "react-router-dom";
import OpenSessionClubLogoWhite from "../assets/open-session-club-logo-white.png";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { ActorLink } from "./ActorLink";

function getRouteName(pathname: string) {
  const firstPartAfterSlash = pathname.split("/")[1];
  switch (firstPartAfterSlash) {
    case "":
      return "Open Session Club";
    case "about":
      return "About";
    case "impressum":
      return "Impressum";
    case "terms-of-service":
      return "Terms of Service";
    case "privacy-policy":
      return "Privacy Policy";
    case "sessions":
      return "Sessions";
    default:
      return "";
  }
}

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
        <div className="m-3">
          <ActorLink actor={data.me} />
        </div>
        <button
          className="hover:text-slate-200 p-0"
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
    <div>
      <h1 className="text-4xl break-words ml-24 my-7">
        {getRouteName(pathname)}
      </h1>
      <header className="transparent p-4 fixed top-0 flex justify-between w-full z-0 pointer-events-none bg-none">
        <div className="flex items-center">
          <Link to="/" className="pointer-events-auto">
            <div></div>
            <img className="h-16 w-16" src={OpenSessionClubLogoWhite} />
          </Link>
        </div>
        <div className="flex items-center pointer-events-auto">
          {pathname.includes("/sessions") ? (
            <Link to="/create-session">
              <button className="bg-pink-600 hover:bg-pink-500">
                Create Session
              </button>
            </Link>
          ) : (
            <Link to="/sessions/upcoming">
              <button className="bg-slate-50 text-slate-900 hover:bg-slate-100">
                Sessions
              </button>
            </Link>
          )}
          {authenticationJsx}
        </div>
      </header>
    </div>
  );
}

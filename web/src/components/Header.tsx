import { Link, useLocation } from "react-router-dom";
import OpenSessionClubLogoWhite from "../assets/open-session-club-logo-white.png";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { ActorLink } from "./ActorLink";

function getRouteTitle(pathname: string) {
  const firstPartAfterSlash = pathname.split("/")[1];
  switch (firstPartAfterSlash) {
    case "":
      return "Open Session Club";
    case "impressum":
      return "Impressum";
    case "terms-of-service":
      return "Terms of Service";
    case "privacy-policy":
      return "Privacy Policy";
    case "sessions":
      return "Sessions";
    default:
      return null;
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

  const routeTitle = getRouteTitle(pathname);

  return (
    <div>
      <header
        className={` ${
          routeTitle && "md:absolute"
        } p-4 top-0 flex justify-between w-full`}
      >
        <div className="flex items-center">
          <Link
            to="/"
            className="pointer-events-auto"
            aria-label="Go to the home page"
          >
            <div></div>
            <img
              alt="Open Session Club Logo"
              className="h-16 w-16"
              src={OpenSessionClubLogoWhite}
            />
          </Link>
        </div>
        <div className="flex items-center pointer-events-auto">
          {pathname.includes("/sessions") ? (
            <Link to="/create-session">
              <button className="bg-pink-600 hover:bg-pink-500 w-24 sm:w-auto">
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
      </header>{" "}
      {routeTitle && (
        <h1 className="text-4xl break-words md:ml-24 my-4 md:my-7 text-center md:text-left truncate ...">
          {routeTitle}
        </h1>
      )}
    </div>
  );
}

// TODO: Make header no longer sticky/fixed. This looks weird and broken when scrolling (since transparent).
// Come up with a nice idea for having the h1
// in the header though so that I save space

// TODO: fetching checks for logoutMutation (are there others that I don't check)
// Can the fetching check code be abstracted? Wrapped in my own hook

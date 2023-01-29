import { Link, useLocation } from "react-router-dom";
import OpenSessionClubLogoWhite from "../assets/open-session-club-logo-white.png";
import { HeaderActorButtons } from "./HeaderActorButtons";

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
  const { pathname } = useLocation();

  const routeTitle = getRouteTitle(pathname);

  return (
    <header className="top-0 flex w-full flex-col bg-slate-900 p-4 md:flex-row md:justify-between">
      <div className="flex items-center">
        <Link
          to="/"
          className="pointer-events-auto flex-shrink-0"
          aria-label="Go to the home page"
        >
          <img
            alt="Open Session Club Logo"
            className="h-16 w-16"
            src={OpenSessionClubLogoWhite}
          />
        </Link>
        {routeTitle && (
          <h1 className="... ml-4 truncate text-center text-4xl md:text-left">
            {routeTitle}
          </h1>
        )}
      </div>
      <div className="pointer-events-auto mt-4 flex items-center self-end md:mt-0 md:self-center">
        {pathname.includes("/sessions") ? (
          <Link to="/create-session">
            <button className="w-24 bg-pink-600 hover:bg-pink-500 sm:w-auto">
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
        <HeaderActorButtons />
      </div>
    </header>
  );
}

// TODO: Make new header design that makes sense for mobile as well

// TODO: fetching checks for logoutMutation (are there others that I don't check). Can the fetching check code be abstracted? Wrapped in my own hook

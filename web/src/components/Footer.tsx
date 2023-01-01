import { Link } from "react-router-dom";
import { GitHubLogo } from "./GitHubLogo";

export function Footer() {
  return (
    <footer className="flex justify-around items-center bg-[#0d1526] p-4">
      <div className="flex gap-4 justify-between">
        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>
        <a
          className="hover:text-blue-400"
          href="https://discord.gg/Wx8Bw77rwa"
          target="_blank"
        >
          Contact
        </a>
        <Link to="/impressum" className="hover:text-blue-400">
          Impressum
        </Link>
        <Link to="/terms-of-service" className="hover:text-blue-400">
          Terms of Service
        </Link>
        <Link to="/privacy-policy" className="hover:text-blue-400">
          Privacy Policy
        </Link>
      </div>
      <div>
        <a href="https://github.com/GenerativeGig/open" target="_blank">
          <GitHubLogo />
        </a>
      </div>
    </footer>
  );
}

// TODO MUST:
// (with email address: info@opensession.club (/info@opensessionclub.com as redirect)),
// Make contact be a mailto link -> info@opensession.club
// Flesh out the pages

import { Link } from "react-router-dom";
import { DiscordLogo } from "./DiscordLogo";
import { GitHubLogo } from "./GitHubLogo";

export function Footer() {
  return (
    <footer className="flex justify-around items-center bg-[#0d1526] p-4">
      <div className="flex flex-col md:flex-row md:gap-4 justify-between">
        <Link to="/impressum" className="hover:underline">
          Impressum
        </Link>
        <Link to="/terms-of-service" className="hover:underline">
          Terms of Service
        </Link>
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
      <div className="flex gap-4">
        <div>
          <a
            href="https://github.com/GenerativeGig/open"
            target="_blank"
            title="GitHub Repository"
          >
            <GitHubLogo />
          </a>
        </div>
        <div>
          <a
            href="https://discord.gg/Ms3HUBSKXv"
            target="_blank"
            title="Discord Server"
          >
            <DiscordLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}

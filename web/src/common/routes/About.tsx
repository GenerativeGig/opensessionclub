import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ExclamationTriangleIcon,
  ListBulletIcon,
  MapPinIcon,
  RocketLaunchIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function About() {
  return (
    <article className="flex flex-col">
      <div className="p-4">
        Open Session Club is your platform for learning and sharing ideas in an
        open format. Create your own or join a session to get started.
      </div>
      <div className="flex justify-between p-4">
        <div>
          <div className="flex items-center px-1">
            <ListBulletIcon className="h-8 w-8" />
            <h2 className="px-2">Steps</h2>
          </div>
          <ol>
            <li className="list-decimal">Join or create a session</li>
            <li className="list-decimal">Converse in the comments</li>
            <li className="list-decimal">
              Join the <SpeakerWaveIcon className="inline h-5 w-5" />
              voice channel or <MapPinIcon className="inline h-5 w-5" />
              location
            </li>
            <li className="list-decimal">Enjoy your session</li>
            <li className="list-decimal">Profit</li>
          </ol>
        </div>
        <div>
          <div className="flex items-center px-1">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2 className="px-2">important</h2>
          </div>
          <ol>
            <li className="list-disc">Don't be an asshole</li>
            <li className="list-disc">It's OK to leave an ongoing session</li>
          </ol>
        </div>
      </div>

      <h2 className="p-4"></h2>
      <div className="flex items-center self-center">
        <RocketLaunchIcon className="h-8 w-8" />
        <h2 className="py-4 px-2">Get started</h2>
      </div>
      <div className="flex items-center self-center">
        <ArrowLongRightIcon className="m-4 h-16 w-16" />
        <Link to="/sessions/upcoming">
          <div className="group rounded border-2 border-dashed py-3 px-4">
            <button className="bg-slate-50 text-slate-900 group-hover:bg-slate-100">
              Sessions
            </button>
          </div>
        </Link>
        <ArrowLongLeftIcon className="m-4 h-16 w-16" />
      </div>
    </article>
  );
}

// TODO: Don't use the same as root route. Instead give other info here

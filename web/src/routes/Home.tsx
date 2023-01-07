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

export function Home() {
  return (
    <article className="flex flex-col">
      <div className="p-4">
        Open Session Club is your platform for learning and sharing ideas in an
        open format. Create your own or join a session to get started.
      </div>

      <div className="p-4 flex justify-between">
        <div>
          <div className="flex items-center px-1">
            <ListBulletIcon className="h-8 w-8" />
            <h2 className="text-3xl px-2">Steps</h2>
          </div>
          <ol className="p-4">
            <li className="list-decimal">Join or create a session</li>
            <li className="list-decimal">Converse in the comments</li>
            <li className="list-decimal">
              Join the <SpeakerWaveIcon className="h-5 w-5 inline" />
              voice channel or <MapPinIcon className="h-5 w-5 inline" />
              location
            </li>
            <li className="list-decimal">Enjoy your session</li>
            <li className="list-decimal">Profit</li>
          </ol>
        </div>

        <div>
          <div className="flex items-center px-1">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2 className="text-3xl px-2">Important</h2>
          </div>
          <ol className="p-4">
            <li className="list-disc">Don't be an asshole</li>
            <li className="list-disc">It's OK to leave an ongoing session</li>
          </ol>
        </div>
      </div>

      <h2 className="text-3xl p-4"></h2>
      <div className="flex items-center self-center">
        <RocketLaunchIcon className="h-8 w-8" />
        <h2 className="text-3xl py-4 px-2">Get started</h2>
      </div>
      <div className="flex items-center self-center">
        <ArrowLongRightIcon className="h-16 w-16 m-4" />
        <Link to="/sessions/upcoming">
          <div className="border-2 border-dashed rounded py-3 px-4 group">
            <button className="bg-slate-50 text-slate-900 group-hover:bg-slate-100">
              Sessions
            </button>
          </div>
        </Link>
        <ArrowLongLeftIcon className="h-16 w-16 m-4" />
      </div>
    </article>
  );
}

// TODO: Add animations to make it more artsy -> header could have a changing background (gif)
// -> Welcome page: the arrows should move back and forward

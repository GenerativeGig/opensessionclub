import {
  ArchiveBoxIcon,
  BoltIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Outlet, useNavigate } from "react-router-dom";
import { TimeStatusText } from "../components/TimeStatus";

export function Sessions() {
  const navigate = useNavigate();

  return (
    <>
      <ol className="flex justify-center">
        <li>
          <button
            className="bg-green-500 hover:bg-green-400"
            onClick={() => {
              navigate("ongoing");
            }}
          >
            <BoltIcon className="inline h-5 w-5" />
            {TimeStatusText.ONGOING}
          </button>
        </li>
        <li>
          <button
            className="bg-purple-500 hover:bg-purple-400"
            onClick={() => {
              navigate("upcoming");
            }}
          >
            <CalendarDaysIcon className="inline h-5 w-5" />
            {TimeStatusText.UPCOMING}
          </button>
        </li>
        <li>
          <button
            className="bg-gray-500 hover:bg-gray-400"
            onClick={() => {
              navigate("archived");
            }}
          >
            <ArchiveBoxIcon className="inline h-5 w-5" />
            {TimeStatusText.PAST}
          </button>
        </li>
      </ol>
      <Outlet />
    </>
  );
}

import { Outlet, useNavigate } from "react-router-dom";
import { RouteTitle } from "../components/RouteTitle";
import { TimeStatusText } from "../components/TimeStatus";

export function Sessions() {
  const navigate = useNavigate();

  return (
    <>
      <RouteTitle>Sessions</RouteTitle>
      <ol className="flex justify-center">
        <li>
          <button
            className="bg-green-500 hover:bg-green-400"
            onClick={() => {
              navigate("ongoing");
            }}
          >
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
            {TimeStatusText.PAST}
          </button>
        </li>
      </ol>
      <Outlet />
    </>
  );
}

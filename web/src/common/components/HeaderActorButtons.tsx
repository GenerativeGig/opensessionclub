import { Link } from "react-router-dom";
import { ActorLink } from "../../actor/components/ActorLink";
import { useLogoutMutation, useMeQuery } from "../../generatedTypes";
import { DataProvider } from "./DataProvider";

export function HeaderActorButtons({}) {
  const [{}, logout] = useLogoutMutation();

  return (
    <DataProvider useQuery={useMeQuery}>
      {(data) => {
        if (!data.me) {
          return (
            <>
              <Link to="/login">
                <button className="hover:text-slate-200">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-slate-500  hover:bg-slate-400">
                  Signup
                </button>
              </Link>
            </>
          );
        }

        return (
          <>
            <div className="m-3">
              <ActorLink actor={data.me} />
            </div>
            <button
              className="p-0 hover:text-slate-200"
              onClick={() => {
                logout({});
              }}
            >
              Logout
            </button>
          </>
        );
      }}
    </DataProvider>
  );
}

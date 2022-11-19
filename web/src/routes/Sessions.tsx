import { useState } from "react";
import { RouteTitle } from "../components/RouteTitle";
import { SessionCard } from "../components/SessionCard";
import { useSessionsQuery } from "../generated/graphql";

export function Sessions() {
  const [variables, setVariables] = useState({
    limit: 25,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useSessionsQuery({ variables });

  if (!data && !fetching) {
    return <p>Failed loading data.</p>;
  }

  return (
    <>
      <RouteTitle>Sessions</RouteTitle>
      {!data && fetching ? (
        <span>Loading...</span>
      ) : (
        <ol className="flex flex-col w-full">
          {data!.sessions.sessions.map((session) => (
            <li
              key={session.id}
              className="m-1 p-4 first:mt-2 last:mb-2 w-full rounded-md bg-slate-800"
            >
              <SessionCard {...session} />
            </li>
          ))}
        </ol>
      )}
      {data && data.sessions.hasMore && (
        <button
          onClick={() =>
            setVariables({
              limit: variables.limit,
              cursor:
                data.sessions.sessions[data.sessions.sessions.length - 1].start,
            })
          }
        >
          Load more
        </button>
      )}
    </>
  );
}

// ongoing, upcoming & past tabs
// need new queries that add a where for checking for the

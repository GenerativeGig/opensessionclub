import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SessionDateTime } from "../components/SessionDateTime";
import {
  useJoinSessionMutation,
  useLeaveSessionMutation,
  useSessionQuery,
} from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function SessionDetails() {
  useIsAuthenticated();
  const { id } = useParams();
  if (!id) {
    useIsAuthenticated();
  }

  const [{ data, fetching }] = useSessionQuery({
    variables: { id: parseInt(id!) },
  });

  const navigate = useNavigate();
  const [, joinSession] = useJoinSessionMutation();
  const [, leaveSession] = useLeaveSessionMutation();

  useState();
  if (!data && fetching) {
    return <span>Loading...</span>;
  }

  if (data?.session) {
    const {
      id,
      title,
      start,
      end,
      text,
      numberOfAttendees,
      attendeeLimit,
      actorIsPartOfSession,
      timeStatus,
      creator,
    } = data.session;

    return (
      <article>
        <section>
          <div>
            <h1 className="text-2xl">{title}</h1>
          </div>
          <div className="flex flex-col items-end mr-1">
            <SessionDateTime start={start} end={end} />
          </div>
        </section>
        <section className="my-3 mx-1">{text}</section>
        <section>
          <div className="flex justify-between">
            <div>
              <Link
                className="text-blue-500 hover:text-blue-400"
                to={`/actor/${creator.id}`}
              >
                {creator.name}
              </Link>
              <span>{timeStatus}</span>
            </div>
            <div className="self-end flex items-center">
              <div>
                <span>{numberOfAttendees}</span>
                <span>/</span>
                <span>{attendeeLimit}</span>
              </div>
              {actorIsPartOfSession ? (
                <button
                  onClick={async () => {
                    const response = await leaveSession({ id });
                    if (response.data?.leaveSession) {
                      navigate(0);
                    }
                  }}
                  className="bg-red-500 hover:bg-red-400"
                >
                  Leave Session
                </button>
              ) : (
                <button
                  onClick={async () => {
                    const response = await joinSession({ id });
                    if (response.data?.joinSession) {
                      navigate(0);
                    }
                  }}
                  className="bg-green-500 hover:bg-green-400"
                >
                  Join Session
                </button>
              )}
            </div>
          </div>
        </section>
      </article>
    );
  }

  return <p>Failed loading data.</p>;
}

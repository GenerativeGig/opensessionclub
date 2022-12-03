import { Link } from "react-router-dom";
import { Actor } from "../generated/graphql";

export interface ActorLinkProps {
  actor: Actor;
}

export function ActorLink({ actor }: ActorLinkProps) {
  return (
    <div className="max-w-64">
      <div className="text-blue-500 hover:text-blue-400 truncate ...">
        <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
      </div>
    </div>
  );
}

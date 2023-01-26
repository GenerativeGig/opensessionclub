import { AtSymbolIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Actor } from "../../types/generatedTypes";

export interface ActorLinkProps {
  actor: Actor;
}

export function ActorLink({ actor }: ActorLinkProps) {
  return (
    <div className="group text-blue-500 hover:text-blue-400 truncate ...">
      <Link to={`/actor/${actor.id}`}>
        <AtSymbolIcon className="h-5 w-5 fill-blue-500 group-hover:fill-blue-400 inline" />
        {actor.name}
      </Link>
    </div>
  );
}

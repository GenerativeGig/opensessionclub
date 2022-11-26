import { Link } from "react-router-dom";

export interface ActorLinkProps {
  id: number;
  name: string;
}

export function ActorLink({ id, name }: ActorLinkProps) {
  return (
    <div className="max-w-64">
      <div className="text-blue-500 hover:text-blue-400 truncate ...">
        <Link to={`/actor/${id}`}>{name}</Link>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { RouteTitle } from "../components/RouteTitle";
import { useActorQuery } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function ActorDetails() {
  useIsAuthenticated();

  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }
  const [{ data: actorData, fetching: actorFetching }] = useActorQuery({
    variables: { id: parseInt(id!) },
  });

  if (!actorData && actorFetching) {
    return <Loading />;
  }

  if (!actorData && !actorFetching) {
    return <FailedLoadingData />;
  }

  if (actorData && !actorFetching) {
    if (!actorData.actor) {
      console.error("actor is undefined");
      return <></>;
    }

    const { name, createdAt } = actorData.actor;

    return (
      <div>
        <RouteTitle>{name}</RouteTitle>
        <div>{`Member since ${new Date(createdAt).toLocaleDateString()}.`}</div>
      </div>
    );
  }
  return <></>;
}

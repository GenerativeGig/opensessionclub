import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { RouteTitle } from "../components/RouteTitle";
import { useActorQuery } from "../generated/graphql";

export function ActorDetails() {
  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }
  const [{ data: sessionData, fetching: sessionFetching }] = useActorQuery({
    variables: { id: parseInt(id!) },
  });
  return <RouteTitle>actor details</RouteTitle>;
}

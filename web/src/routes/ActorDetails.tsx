import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { ForgetMe } from "../components/ForgetMe";
import { Loading } from "../components/Loading";
import { RouteTitle } from "../components/RouteTitle";
import { useActorQuery, useMeQuery } from "../generated/graphql";
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

  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  if ((!actorData && actorFetching) || (!meData && meFetching)) {
    return <Loading />;
  }

  if ((!actorData && !actorFetching) || (!meData && !meFetching)) {
    return <FailedLoadingData />;
  }

  if (actorData && !actorFetching && meData && !meFetching) {
    if (!actorData.actor) {
      console.error("actor is undefined");
      return <></>;
    }

    if (!meData.me) {
      console.log("me is undefined");
      return <></>;
    }

    const { name, createdAt } = actorData.actor;

    const isOwnDetails = meData?.me?.id === parseInt(id);

    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const createdAtDate = new Date(parseInt(createdAt));

    return (
      <div>
        <RouteTitle>{name}</RouteTitle>
        <div className="py-6">{`Member since ${
          weekday[createdAtDate.getDay()]
        } ${createdAtDate.toLocaleDateString()}.`}</div>
        {isOwnDetails && <ForgetMe />}
      </div>
    );
  }
  return <></>;
}

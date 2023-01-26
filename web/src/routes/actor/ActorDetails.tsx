import { useParams } from "react-router-dom";
import { ActorSettings } from "../../components/actor/ActorSettings";
import { FailedLoadingData } from "../../components/common/FailedLoadingData";
import { Loading } from "../../components/common/Loading";
import { RouteTitle } from "../../components/common/RouteTitle";
import { useActorQuery, useMeQuery } from "../../types/generatedTypes";
import { useIsAuthenticated } from "../../utils/useIsAuthenticated";
import { PageNotFound } from "../common/PageNotFound";

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
      return <PageNotFound />;
    }

    if (!meData.me) {
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
        <div className="py-6">
          {`Member since ${
            weekday[createdAtDate.getDay()]
          } ${createdAtDate.toLocaleDateString()}.`}
        </div>
        {isOwnDetails && <ActorSettings actor={actorData.actor} />}
      </div>
    );
  }

  return <></>;
}

import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../../common/components/FailedLoadingData";
import { Loading } from "../../common/components/Loading";
import { RouteTitle } from "../../common/components/RouteTitle";
import { useIsAuthenticated } from "../../common/hooks/useIsAuthenticated";
import { PageNotFound } from "../../common/routes/PageNotFound";
import { useActorQuery, useMeQuery } from "../../generatedTypes";
import { ActorSettings } from "../components/ActorSettings";

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

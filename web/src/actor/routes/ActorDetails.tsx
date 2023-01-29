import { DataProvider } from "../../common/components/DataProvider";
import { RouteTitle } from "../../common/components/RouteTitle";
import { useAuthentication } from "../../common/hooks/useAuthentication";
import { useIdParam } from "../../common/hooks/useIdParam";
import { PageNotFound } from "../../common/routes/PageNotFound";
import { useActorQuery } from "../../generatedTypes";
import { ActorSettings } from "../components/ActorSettings";

export function ActorDetails() {
  const { me } = useAuthentication();

  const { id } = useIdParam();

  if (!id) {
    return <PageNotFound />;
  }

  const isMe = me?.id === id;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <DataProvider useQuery={useActorQuery} variables={{ id }}>
      {(data) => {
        if (!data.actor) {
          return <PageNotFound />;
        }

        const createdAtDate = new Date(parseInt(data.actor.createdAt));

        return (
          <div>
            <RouteTitle>{data.actor.name}</RouteTitle>
            <div className="py-6">
              {`Member since ${
                weekdays[createdAtDate.getDay()]
              } ${createdAtDate.toLocaleString()}.`}
            </div>
            {isMe && <ActorSettings actor={me} />}
          </div>
        );
      }}
    </DataProvider>
  );
}

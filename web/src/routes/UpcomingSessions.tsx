import { useState } from "react";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { TimeStatus } from "../components/TimeStatus";
import { useUpcomingSessionsQuery } from "../generated/graphql";
import { SessionsBasedOnTimeStatus } from "./SessionsBasedOnTimeStatus";

export function UpcomingSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  const [{ data, fetching }] = useUpcomingSessionsQuery({
    variables: { limit, cursor },
  });

  if (!data && fetching) {
    <Loading />;
  }

  if (!data && !fetching) {
    <FailedLoadingData />;
  }

  if (data?.upcomingSessions) {
    const { sessions, hasMore } = data?.upcomingSessions;

    return (
      <SessionsBasedOnTimeStatus
        sessions={sessions}
        hasMore={hasMore}
        timeStatus={TimeStatus.UPCOMING}
        setCursor={setCursor}
      />
    );
  }
  return <></>;
}

import { useState } from "react";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { TimeStatus } from "../components/TimeStatus";
import { useOngoingSessionsQuery } from "../generated/graphql";
import { SessionsBasedOnTimeStatus } from "./SessionsBasedOnTimeStatus";

export function OngoingSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  const [{ data, fetching }] = useOngoingSessionsQuery({
    variables: { limit, cursor },
  });

  if (!data && fetching) {
    <Loading />;
  }

  if (!data && !fetching) {
    <FailedLoadingData />;
  }
  if (data?.ongoingSessions) {
    const { sessions, hasMore } = data?.ongoingSessions;

    return (
      <SessionsBasedOnTimeStatus
        sessions={sessions}
        hasMore={hasMore}
        timeStatus={TimeStatus.ONGOING}
        setCursor={setCursor}
      />
    );
  }
  return <></>;
}

import { useState } from "react";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { TimeStatus } from "../components/TimeStatus";
import { usePastSessionsQuery } from "../generated/graphql";
import { SessionsBasedOnTimeStatus } from "./SessionsBasedOnTimeStatus";

export function PastSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  const [{ data, fetching }] = usePastSessionsQuery({
    variables: { limit, cursor },
  });

  if (!data && fetching) {
    <Loading />;
  }

  if (!data && !fetching) {
    <FailedLoadingData />;
  }
  if (data?.pastSessions) {
    const { sessions, hasMore } = data?.pastSessions;

    return (
      <SessionsBasedOnTimeStatus
        sessions={sessions}
        hasMore={hasMore}
        timeStatus={TimeStatus.PAST}
        setCursor={setCursor}
      />
    );
  }
  return <></>;
}

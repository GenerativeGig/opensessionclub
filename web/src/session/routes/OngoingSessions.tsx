import { useState } from "react";
import { FailedLoadingData } from "../../common/components/FailedLoadingData";
import { Loading } from "../../common/components/Loading";
import { useOngoingSessionsQuery } from "../../generatedTypes";
import { SessionsBasedOnTimeStatus } from "../components/SessionsBasedOnTimeStatus";
import { TimeStatus } from "../components/TimeStatus";

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

  if (data && !fetching) {
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

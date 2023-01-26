import { useState } from "react";
import { FailedLoadingData } from "../../components/common/FailedLoadingData";
import { Loading } from "../../components/common/Loading";
import { SessionsBasedOnTimeStatus } from "../../components/session/SessionsBasedOnTimeStatus";
import { TimeStatus } from "../../components/session/TimeStatus";
import { useOngoingSessionsQuery } from "../../types/generatedTypes";

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

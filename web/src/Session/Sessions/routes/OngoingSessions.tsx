import { useState } from "react";
import { DataProvider } from "../../../Common/components/DataProvider";
import { useOngoingSessionsQuery } from "../../../generatedTypes";
import { TimeStatus } from "../../Common/components/TimeStatus";
import { SessionsBasedOnTimeStatus } from "../components/SessionsBasedOnTimeStatus";

export function OngoingSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  return (
    <DataProvider
      useQuery={useOngoingSessionsQuery}
      variables={{ limit, cursor }}
    >
      {(data) => {
        const { sessions, hasMore } = data.ongoingSessions;

        return (
          <SessionsBasedOnTimeStatus
            sessions={sessions}
            hasMore={hasMore}
            timeStatus={TimeStatus.ONGOING}
            setCursor={setCursor}
          />
        );
      }}
    </DataProvider>
  );
}

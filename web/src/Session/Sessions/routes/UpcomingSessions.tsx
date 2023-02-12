import { useState } from "react";
import { DataProvider } from "../../../Common/components/DataProvider";
import { useUpcomingSessionsQuery } from "../../../generatedTypes";
import { TimeStatus } from "../../Common/components/TimeStatus";
import { SessionsBasedOnTimeStatus } from "../components/SessionsBasedOnTimeStatus";

export function UpcomingSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  return (
    <DataProvider
      useQuery={useUpcomingSessionsQuery}
      variables={{ limit, cursor }}
    >
      {(data) => {
        const { sessions, hasMore } = data.upcomingSessions;

        return (
          <SessionsBasedOnTimeStatus
            sessions={sessions}
            hasMore={hasMore}
            timeStatus={TimeStatus.UPCOMING}
            setCursor={setCursor}
          />
        );
      }}
    </DataProvider>
  );
}

import { useState } from "react";
import { DataProvider } from "../../common/components/DataProvider";
import { usePastSessionsQuery } from "../../generatedTypes";
import { SessionsBasedOnTimeStatus } from "../components/SessionsBasedOnTimeStatus";
import { TimeStatus } from "../components/TimeStatus";

export function PastSessions() {
  const limit = 25;
  const [cursor, setCursor] = useState<null | string>(null);

  return (
    <DataProvider useQuery={usePastSessionsQuery} variables={{ limit, cursor }}>
      {(data) => {
        const { sessions, hasMore } = data.pastSessions;

        return (
          <SessionsBasedOnTimeStatus
            sessions={sessions}
            hasMore={hasMore}
            timeStatus={TimeStatus.PAST}
            setCursor={setCursor}
          />
        );
      }}
    </DataProvider>
  );
}

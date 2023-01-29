import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { DataProvider } from "../../common/components/DataProvider";
import { Actor, useSessionCommentsQuery } from "../../generatedTypes";
import { CreateSessionComment } from "./CreateSessionComment";
import { SessionCommentCard } from "./SessionCommentCard";

export interface SessionCommentSectionProps {
  sessionId: number;
  me?: Actor | null;
}

export function SessionCommentSection({
  sessionId,
  me,
}: SessionCommentSectionProps) {
  return (
    <DataProvider useQuery={useSessionCommentsQuery} variables={{ sessionId }}>
      {(data) => {
        return (
          <div className="p-4 md:p-16">
            <h2 className="p-5 text-center text-xl">
              <ChatBubbleLeftRightIcon className="inline h-5 w-5" />
              Comments
            </h2>
            <CreateSessionComment sessionId={sessionId} />
            <ol className="flex w-full flex-col">
              {data.sessionComments?.map((sessionComment) => (
                <li
                  key={sessionComment.id}
                  className={`m-1 w-full rounded-md py-5 first:mt-2 last:mb-2`}
                >
                  <SessionCommentCard sessionComment={sessionComment} me={me} />
                </li>
              ))}
            </ol>
          </div>
        );
      }}
    </DataProvider>
  );
}

// TODO: Proper error handling

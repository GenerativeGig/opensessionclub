import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Actor, useSessionCommentsQuery } from "../generated/graphql";
import { CreateSessionComment } from "./CreateSessionComment";
import { FailedLoadingData } from "./FailedLoadingData";
import { Loading } from "./Loading";
import { SessionCommentCard } from "./SessionCommentCard";

export interface SessionCommentSectionProps {
  sessionId: number;
  me?: Actor;
}

export function SessionCommentSection({
  sessionId,
  me,
}: SessionCommentSectionProps) {
  const [{ data, fetching }] = useSessionCommentsQuery({
    variables: { sessionId },
  });

  if (!data && fetching) {
    return <Loading />;
  }

  if (!data && !fetching) {
    return <FailedLoadingData />;
  }

  if (data && !fetching) {
    return (
      <div className="p-16">
        <h2 className="text-xl text-center p-5">
          <ChatBubbleLeftRightIcon className="h-5 w-5 inline" />
          Comments
        </h2>
        <CreateSessionComment sessionId={sessionId} />
        <ol className="flex flex-col w-full">
          {data.sessionComments?.map((sessionComment) => (
            <li
              key={sessionComment.id}
              className={`m-1 py-5 first:mt-2 last:mb-2 w-full rounded-md`}
            >
              <SessionCommentCard sessionComment={sessionComment} me={me} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return <></>;
}

// TODO: Reorganize code into domains: Actor (login etc.), Session (contains SessionComment?)
// TODO: Proper error handling

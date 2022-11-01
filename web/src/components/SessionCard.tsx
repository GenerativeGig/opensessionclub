import { SessionDateTime } from "./SessionDateTime";

export interface SessionCardProps {
  title: string;
}

export function SessionCard({ title }: SessionCardProps) {
  return (
    <article className="flex flex-col ml-1">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl">{title}</h1>
        </div>
        <div className="flex flex-col items-end mr-1">
          <SessionDateTime startDate={new Date()} endDate={new Date()} />
        </div>
      </div>
      <p className="my-3 mx-1">description</p>
      <div className="flex justify-between">
        <div></div>
        <div className="self-end flex items-center">
          <div>
            <span>participants.length</span>
            <span>/</span>
            <span>participantLimit</span>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-400">
            Join Session
          </button>
        </div>
      </div>
    </article>
  );
}

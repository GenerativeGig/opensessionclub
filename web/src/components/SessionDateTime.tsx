import { addMissingZeros } from "../utils/addMissingZeros";

export interface SessionDateTimeProps {
  start: string;
  stop: string;
  ongoing?: boolean;
  full?: boolean;
}
export function SessionDateTime({
  start,
  stop,
  ongoing = false,
  full = false,
}: SessionDateTimeProps) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startDate = new Date(parseInt(start));
  const stopDate = new Date(parseInt(stop));

  if (ongoing) {
    return <div className="self-end mr-1">Ongoing</div>;
  }

  return (
    <>
      {full ? (
        <div className="self-end flex flex-col">
          <div className="self-end mr-1">
            <span>{weekday[startDate.getDay()]}</span>
            <span> </span>
            <span>{startDate.toLocaleDateString()}</span>
            <span>, </span>
            <span>
              {addMissingZeros(startDate.getHours())}:
              {addMissingZeros(startDate.getMinutes())}
            </span>
            <span className="bg-slate-50 text-slate-900 px-1 rounded mx-1">
              Start
            </span>
          </div>
          <div className="self-end mr-1">
            <span>{weekday[stopDate.getDay()]}</span>
            <span> </span>
            <span>{stopDate.toLocaleDateString()}</span>
            <span>, </span>
            <span>
              {addMissingZeros(stopDate.getHours())}:
              {addMissingZeros(stopDate.getMinutes())}
            </span>
            <span className="bg-slate-50 text-slate-900 px-1 rounded mx-1">
              Stop
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="self-end mr-1">
            <span>{weekday[startDate.getDay()]}</span>
            <span> </span>
            <span>{startDate.toLocaleDateString()}</span>
            <span>, </span>
            <span>
              {addMissingZeros(startDate.getHours())}:
              {addMissingZeros(startDate.getMinutes())}
            </span>
          </div>
        </>
      )}
    </>
  );
}

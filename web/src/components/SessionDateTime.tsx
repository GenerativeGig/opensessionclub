import { addMissingZeros } from "../utils/addMissingZeros";

export enum SessionDateTimeKind {
  Ongoing,
  Compact,
  Full,
}

export interface SessionDateTimeProps {
  start: string;
  stop: string;
  kind: SessionDateTimeKind;
}

export function SessionDateTime({ start, stop, kind }: SessionDateTimeProps) {
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

  switch (kind) {
    case SessionDateTimeKind.Ongoing:
      return <div className="self-end mr-1">Ongoing</div>;
    case SessionDateTimeKind.Compact:
      return (
        <>
          <div className="self-end mr-1">
            <span className="text-slate-300">
              {weekday[startDate.getDay()]}
            </span>
            <span> </span>
            <span className="text-slate-300">
              {startDate.toLocaleDateString()}
            </span>
            <span className="text-slate-300">, </span>
            <span className="text-slate-300">
              {addMissingZeros(startDate.getHours())}:
              {addMissingZeros(startDate.getMinutes())}
            </span>
          </div>
        </>
      );
    case SessionDateTimeKind.Full:
      return (
        <div className="self-end flex flex-col">
          <div className="self-end mr-1">
            <span className="text-slate-300">
              {weekday[startDate.getDay()]}
            </span>
            <span> </span>
            <span className="text-slate-300">
              {startDate.toLocaleDateString()}
            </span>
            <span className="text-slate-300">, </span>
            <span className="text-slate-300">
              {addMissingZeros(startDate.getHours())}:
              {addMissingZeros(startDate.getMinutes())}
            </span>
            <span className="bg-slate-50 text-slate-900 px-1 rounded mx-1">
              Start
            </span>
          </div>
          <div className="self-end mr-1 text-slate-300">
            <span className="text-slate-300">{weekday[stopDate.getDay()]}</span>
            <span> </span>
            <span className="text-slate-300">
              {stopDate.toLocaleDateString()}
            </span>
            <span className="text-slate-300">, </span>
            <span className="text-slate-300">
              {addMissingZeros(stopDate.getHours())}:
              {addMissingZeros(stopDate.getMinutes())}
            </span>
            <span className="bg-slate-50 text-slate-900 px-1 rounded mx-1">
              Stop
            </span>
          </div>
        </div>
      );
  }
}

import { ClockIcon } from "@heroicons/react/24/solid";
import { addMissingZeros } from "../../utils/addMissingZeros";

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
      return (
        <div className="self-end">
          Ongoing
          <ClockIcon className="h-6 w-6 inline" />
        </div>
      );
    case SessionDateTimeKind.Compact:
      return (
        <>
          <div className="self-end">
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
            <ClockIcon className="h-6 w-6 inline" />
          </div>
        </>
      );
    case SessionDateTimeKind.Full:
      return (
        <div className="self-end flex flex-col">
          <div className="self-end">
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
            <ClockIcon className="h-6 w-6 inline" />
          </div>
          <div className="self-end text-slate-300">
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
            <ClockIcon className="h-6 w-6 inline" />
          </div>
        </div>
      );
  }
}

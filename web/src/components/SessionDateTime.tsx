import { addMissingZeros } from "../utils/addMissingZeros";

export interface SessionDateTimeProps {
  start: string;
  stop: string;
}
export function SessionDateTime({ start, stop }: SessionDateTimeProps) {
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

  if (startDate.getHours().toString().length) {
  }
  return (
    <div className="text-sm self-end mr-1">
      <span>{weekday[startDate.getDay()]}</span>
      <span> </span>
      <span>{startDate.toLocaleDateString()}</span>
      <span>, </span>
      <span>
        {addMissingZeros(startDate.getHours())}:
        {addMissingZeros(startDate.getMinutes())}
      </span>
      <span> - </span>
      <span>
        {addMissingZeros(stopDate.getHours())}:
        {addMissingZeros(stopDate.getMinutes())}
      </span>
    </div>
  );
}

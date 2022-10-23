export interface SessionDateTimeProps {
  startDate: Date;
  endDate: Date;
}
export function SessionDateTime({ startDate, endDate }: SessionDateTimeProps) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="text-sm">
      <span>{weekday[startDate.getDay()]}</span>
      <span> </span>
      <span>{startDate.toLocaleDateString()}</span>
      <span>, </span>
      <span>
        {startDate.getHours()}:{startDate.getMinutes()}
      </span>
      <span> - </span>
      <span>
        {endDate.getHours()}:{endDate.getMinutes()}
      </span>
    </div>
  );
}

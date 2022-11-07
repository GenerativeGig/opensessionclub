export interface SessionDateTimeProps {
  start: Date;
  end: Date;
}
export function SessionDateTime({ start, end }: SessionDateTimeProps) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate.getHours().toString().length) {
  }
  return (
    <div className="text-sm">
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
        {addMissingZeros(endDate.getHours())}:
        {addMissingZeros(endDate.getMinutes())}
      </span>
    </div>
  );
}

function addMissingZeros(time: number) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

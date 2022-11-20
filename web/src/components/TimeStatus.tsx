export enum TimeStatus {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
}

export enum TimeStatusText {
  PAST = "archived",
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
}

export interface TimeStatusProps {
  timeStatus: string;
}

export function TimeStatusTag({ timeStatus }: TimeStatusProps) {
  switch (timeStatus) {
    case TimeStatus.PAST:
      return (
        <span className="bg-gray-500 px-2 rounded">{TimeStatusText.PAST}</span>
      );
    case TimeStatus.UPCOMING:
      return (
        <span className="bg-purple-500 px-2 rounded">
          {TimeStatusText.UPCOMING}
        </span>
      );
    case TimeStatus.ONGOING:
      return (
        <span className="bg-green-500 px-2 rounded">
          {TimeStatusText.ONGOING}
        </span>
      );
    default:
      return <></>;
  }
}

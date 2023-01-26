import {
  ArchiveBoxIcon,
  BoltIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

export enum TimeStatus {
  PAST = "PAST",
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
}

export enum TimeStatusText {
  PAST = "Archived",
  UPCOMING = "Upcoming",
  ONGOING = "Ongoing",
}

export interface TimeStatusProps {
  timeStatus: string;
}

export function TimeStatusTag({ timeStatus }: TimeStatusProps) {
  switch (timeStatus) {
    case TimeStatus.PAST:
      return (
        <div className="bg-gray-500 px-2 rounded">
          <ArchiveBoxIcon className="h-5 w-5 inline" />
          {TimeStatusText.PAST}
        </div>
      );
    case TimeStatus.UPCOMING:
      return (
        <div className="bg-purple-500 px-2 rounded">
          <CalendarDaysIcon className="h-5 w-5 inline" />
          {TimeStatusText.UPCOMING}
        </div>
      );
    case TimeStatus.ONGOING:
      return (
        <div className="bg-green-500 px-2 rounded">
          <BoltIcon className="h-5 w-5 inline" />
          {TimeStatusText.ONGOING}
        </div>
      );
    default:
      return <></>;
  }
}

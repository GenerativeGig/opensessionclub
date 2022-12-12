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
        <div>
          <span className="bg-gray-500 px-2 py-1 rounded">
            <ArchiveBoxIcon className="h-5 w-5 inline" />
            {TimeStatusText.PAST}
          </span>
        </div>
      );
    case TimeStatus.UPCOMING:
      return (
        <div>
          <span className="bg-purple-500 px-2 py-1 rounded">
            <CalendarDaysIcon className="h-5 w-5 inline" />
            {TimeStatusText.UPCOMING}
          </span>
        </div>
      );
    case TimeStatus.ONGOING:
      return (
        <div>
          <span className="bg-green-500 px-2 py-1 rounded">
            <BoltIcon className="h-5 w-5 inline" />
            {TimeStatusText.ONGOING}
          </span>
        </div>
      );
    default:
      return <></>;
  }
}

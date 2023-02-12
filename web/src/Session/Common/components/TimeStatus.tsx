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
        <div className="rounded bg-gray-500 px-2">
          <ArchiveBoxIcon className="inline h-5 w-5" />
          {TimeStatusText.PAST}
        </div>
      );
    case TimeStatus.UPCOMING:
      return (
        <div className="rounded bg-purple-500 px-2">
          <CalendarDaysIcon className="inline h-5 w-5" />
          {TimeStatusText.UPCOMING}
        </div>
      );
    case TimeStatus.ONGOING:
      return (
        <div className="rounded bg-green-500 px-2">
          <BoltIcon className="inline h-5 w-5" />
          {TimeStatusText.ONGOING}
        </div>
      );
    default:
      return <></>;
  }
}

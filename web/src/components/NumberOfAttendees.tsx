import { UserGroupIcon } from "@heroicons/react/24/solid";

export interface NumberOfAttendeesProps {
  numberOfAttendees: number;
  attendeeLimit: number;
}

export function NumberOfAttendees({
  numberOfAttendees,
  attendeeLimit,
}: NumberOfAttendeesProps) {
  return (
    <div className="flex">
      <UserGroupIcon className="h-6 w-6" />
      <span>{numberOfAttendees}</span>
      <span>/</span>
      <span>{attendeeLimit}</span>
    </div>
  );
}

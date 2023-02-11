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
    <div>
      <span className="text-slate-300">{numberOfAttendees}</span>
      <span className="text-slate-300">/</span>
      <span className="text-slate-300">{attendeeLimit}</span>
      <UserGroupIcon className="inline h-6 w-6" />
    </div>
  );
}

import { MapPinIcon } from "@heroicons/react/24/solid";

export interface LocationProps {
  location: string;
}
export function Location({ location }: LocationProps) {
  return (
    <div className="flex pr-2">
      <MapPinIcon className="h-5 w-5" />
      {location}
    </div>
  );
}

// TODO: Move components that only display, no logic into folder in components
// TODO MUST: Use icons to represent information like "Remote", "Location:", Ongoing, DateTime

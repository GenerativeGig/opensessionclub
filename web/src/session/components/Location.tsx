import { MapPinIcon } from "@heroicons/react/24/solid";

export interface LocationProps {
  location: string;
}
export function Location({ location }: LocationProps) {
  return (
    <div className="... truncate pr-2">
      <span className="text-slate-300">{location}</span>
      <MapPinIcon className="inline h-5 w-5" />
    </div>
  );
}

// TODO: Move components that only display, no logic into folder in components

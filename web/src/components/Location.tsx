export interface LocationProps {
  location: string;
}
export function Location({ location }: LocationProps) {
  return <div className="pr-2">{location}</div>;
}

// TODO: Move components that only display, no logic into folder in components
// TODO: Use icons to represent information like "Remote" and "Location:"

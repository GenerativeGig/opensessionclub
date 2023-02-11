import { NoSymbolIcon } from "@heroicons/react/24/solid";

export function Cancelled() {
  return (
    <div className="h-6 rounded bg-rose-500 px-2">
      <NoSymbolIcon className="inline h-5 w-5 " />
      Cancelled
    </div>
  );
}

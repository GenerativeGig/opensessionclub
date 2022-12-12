import { NoSymbolIcon } from "@heroicons/react/24/solid";

export function Cancelled() {
  return (
    <div className="bg-rose-500 px-2 rounded h-6">
      <NoSymbolIcon className="h-5 w-5 inline " />
      Cancelled
    </div>
  );
}

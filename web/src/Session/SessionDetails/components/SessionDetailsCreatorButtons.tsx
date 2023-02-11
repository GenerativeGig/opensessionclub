import { NoSymbolIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import {
  useCancelSessionMutation,
  useDeleteSessionMutation,
} from "../../../generatedTypes";

export function SessionDetailsCreatorButtons() {
  const navigate = useNavigate();

  const [, cancelSession] = useCancelSessionMutation();

  const [, deleteSession] = useDeleteSessionMutation();

  return (
    <>
      {!isCancelled && !isPast && (
        <button
          className="bg-rose-400 hover:bg-rose-300"
          onClick={async () => {
            const response = await cancelSession({ id });
            if (response.data?.cancelSession) {
              navigate(0);
            }
          }}
        >
          <NoSymbolIcon className="inline h-6 w-6" />
          Cancel
        </button>
      )}
      <button
        className="bg-red-500 hover:bg-red-400"
        onClick={async () => {
          const response = await deleteSession({ id });
          if (response.data?.deleteSession) {
            navigate("/sessions");
          }
        }}
      >
        <TrashIcon className="inline h-5 w-5" />
        Delete
      </button>
      {!isCancelled && !isPast && (
        <Link to={`/session/${id}/edit`}>
          <button className="bg-yellow-500 hover:bg-yellow-400">
            <PencilIcon className="inline h-5 w-5" />
            Edit
          </button>
        </Link>
      )}
    </>
  );
}

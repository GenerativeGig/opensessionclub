import { useNavigate } from "react-router-dom";
import { useDeleteDiscordIntegrationMutation } from "../../../generatedTypes";

export function DeleteDiscordIntegration() {
  const navigate = useNavigate();

  const [, deleteDiscordIntegration] = useDeleteDiscordIntegrationMutation();

  return (
    <button
      className="bg-slate-500 hover:bg-slate-400"
      onClick={async () => {
        const response = await deleteDiscordIntegration({});
        if (response.data?.deleteDiscordIntegration) {
          navigate(0);
        } else {
          console.error("deleteDiscordIntegration failed");
        }
      }}
    >
      Remove Discord integration
    </button>
  );
}

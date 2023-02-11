import { useAuthentication } from "../../../Common/hooks/useAuthentication";
import { SessionForm } from "../components/SessionForm";

export function CreateSession() {
  useAuthentication();

  return <SessionForm />;
}

// TODO: Combine parts of redundant code in edit and create into functions / components / as hook?

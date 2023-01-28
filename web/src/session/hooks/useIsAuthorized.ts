import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Session, useMeQuery } from "../../generatedTypes";

export function useSessionCreatorAuthorization({ id, creator }: Session) {
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetching && data?.me?.id !== creator.id) {
      navigate(`/session/${id}`);
    }
  }, [fetching, data, navigate]);
}

// TODO: Is unused, so evaluate if this is needed

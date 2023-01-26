import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "../types/generatedTypes";

export function useIsAuthenticated() {
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetching && !data?.me) {
      navigate("/login");
    }
  }, [fetching, data, navigate]);
}

import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export function useIsAuthenticated() {
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() => {
    if (!fetching && !data?.me) {
      navigate("/login");
      setSearchParams({ next: location.pathname });
    }
  }, [fetching, data, navigate]);
}

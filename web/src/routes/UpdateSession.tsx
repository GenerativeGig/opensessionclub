import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { Loading } from "../components/Loading";
import { UpdateSessionForm } from "../components/UpdateSessionForm";
import { useSessionQuery } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function UpdateSession() {
  useIsAuthenticated();
  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id) },
  });

  if (!sessionData && sessionFetching) {
    return <Loading />;
  }

  if (sessionData?.session) {
    return <UpdateSessionForm session={sessionData.session} />;
  }
  return <FailedLoadingData />;
}

// TODO: Combine parts of redundant code in edit and create into functions / components / as hook?

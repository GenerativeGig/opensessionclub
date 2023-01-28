import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../../common/components/FailedLoadingData";
import { Loading } from "../../common/components/Loading";
import { useIsAuthenticated } from "../../common/hooks/useIsAuthenticated";
import { useSessionQuery } from "../../generatedTypes";
import { UpdateSessionForm } from "../components/UpdateSessionForm";

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

import { useParams } from "react-router-dom";
import { FailedLoadingData } from "../../components/common/FailedLoadingData";
import { Loading } from "../../components/common/Loading";
import { UpdateSessionForm } from "../../components/session/UpdateSessionForm";
import { useSessionQuery } from "../../types/generatedTypes";
import { useIsAuthenticated } from "../../utils/useIsAuthenticated";

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

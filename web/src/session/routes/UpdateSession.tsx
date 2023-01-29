import { DataProvider } from "../../common/components/DataProvider";
import { useAuthentication } from "../../common/hooks/useAuthentication";
import { useIdParam } from "../../common/hooks/useIdParam";
import { PageNotFound } from "../../common/routes/PageNotFound";
import { Unauthorized } from "../../common/routes/Unauthorized";
import { useSessionQuery } from "../../generatedTypes";
import { UpdateSessionForm } from "../components/UpdateSessionForm";

export function UpdateSession() {
  const { me } = useAuthentication();

  const { id } = useIdParam();
  if (!id) {
    return <PageNotFound />;
  }

  return (
    <DataProvider useQuery={useSessionQuery} variables={{ id }}>
      {(data) => {
        if (!data.session) {
          return <PageNotFound />;
        }

        if (data.session.creator.id !== me?.id) {
          return <Unauthorized />;
        }

        return <UpdateSessionForm session={data.session} />;
      }}
    </DataProvider>
  );
}

// TODO: Combine parts of redundant code in edit and create into functions / components / as hook?

import { DataProvider } from "../../../Common/components/DataProvider";
import { useAuthentication } from "../../../Common/hooks/useAuthentication";
import { useIdParam } from "../../../Common/hooks/useIdParam";
import { PageNotFound } from "../../../Common/routes/PageNotFound";
import { Unauthorized } from "../../../Common/routes/Unauthorized";
import { useSessionQuery } from "../../../generatedTypes";
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

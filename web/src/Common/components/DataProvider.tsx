import { AnyVariables, UseQueryArgs, UseQueryResponse } from "urql";
import { FailedLoadingData } from "./FailedLoadingData";
import { Loading } from "./Loading";

export type DataProviderProps<
  Data = any,
  Variables extends AnyVariables = AnyVariables
> = Omit<UseQueryArgs, "query"> & {
  // TODO: args: any
  useQuery: (args: any) => UseQueryResponse<Data, Variables>;
  children: (data: Data) => JSX.Element;
};

/**
 * The `DataProvider` takes care of loading and cases where data loading failed.
 *
 * Keep in mind that it does not handle page not found cases. Do that in the
 * component above or below it.
 *
 * @param param0
 * @returns
 */
export function DataProvider<
  Data = any,
  Variables extends AnyVariables = AnyVariables
>({ useQuery, children, variables }: DataProviderProps<Data, Variables>) {
  const [{ data, fetching }] = useQuery({ variables });

  if (fetching) {
    return <Loading />;
  }

  if (!data) {
    return <FailedLoadingData />;
  }

  return children(data);
}

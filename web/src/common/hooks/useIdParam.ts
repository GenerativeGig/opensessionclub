import { useParams } from "react-router-dom";

export function useIdParam() {
  const { id: idAsString } = useParams();

  if (typeof idAsString === "undefined") {
    return {};
  }

  const id = parseInt(idAsString);

  if (isNaN(id)) {
    return {};
  }

  return { id };
}

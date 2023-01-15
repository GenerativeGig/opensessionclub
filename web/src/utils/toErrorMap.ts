import { ActorFieldError } from "../generated/graphql";

export function toErrorMap(errors: ActorFieldError[]) {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
}

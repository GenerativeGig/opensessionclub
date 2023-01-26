import { ActorFieldError } from "../types/generatedTypes";

export function toErrorMap(errors: ActorFieldError[]) {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
}

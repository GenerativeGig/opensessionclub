import { Language } from "../../interfaces/Language";

export interface SessionLanguageListProps {
  languages: Language[];
}
export function SessionLanguageListView({
  languages,
}: SessionLanguageListProps) {
  return <div>lang</div>;
}

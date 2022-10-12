import { Language } from "../../interfaces/Language";

export interface SessionLanguageListProps {
  languages: Language[];
}
export function SessionLanguageListView({
  languages,
}: SessionLanguageListProps) {
  return (
    <div>
      {languages.map((language) => (
        <span className="text-sm px-1 last:pr-0 border-l first:border-l-0">
          {language.name}
        </span>
      ))}
    </div>
  );
}

import { languages } from "../../languages";

interface SelectLanguageProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export function SelectLanguageView({ ...props }: SelectLanguageProps) {
  return (
    <select {...props}>
      {languages.map((language) => (
        <option key={language.code}>{language.nativeName}</option>
      ))}
    </select>
  );
}

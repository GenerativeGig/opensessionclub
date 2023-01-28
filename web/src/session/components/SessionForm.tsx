import { useNavigate } from "react-router-dom";

export interface SessionFormProps {
  onSubmit: any;
  submitButtonText: string;
}

export function SessionForm({ onSubmit, submitButtonText }: SessionFormProps) {
  const navigate = useNavigate();
  return <></>;
}

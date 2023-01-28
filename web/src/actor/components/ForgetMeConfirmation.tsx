import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetMeMutation } from "../../generatedTypes";

export interface ForgetMeConfirmationProps {
  onCancel: () => void;
}

export function ForgetMeConfirmation({ onCancel }: ForgetMeConfirmationProps) {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  const [, forgetMe] = useForgetMeMutation();

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timerTimeout);
    };
  }, [timer, confirm]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-end items-center">
        {timer !== 0 && timer}
        <button
          disabled={timer !== 0}
          className={`${
            timer !== 0 ? "bg-gray-500" : "bg-red-500 hover:bg-red-400"
          }`}
          onClick={async () => {
            const response = await forgetMe({});

            if (response.data?.forgetMe) {
              navigate("/");
              navigate(0);
            } else {
              console.error("forgetMe failed");
            }
          }}
        >
          Yes, delete my account
        </button>
        <button
          className="bg-slate-500 hover:bg-slate-400"
          onClick={() => {
            setTimer(10);
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

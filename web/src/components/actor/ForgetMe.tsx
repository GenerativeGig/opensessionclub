import { useState } from "react";
import { ForgetMeConfirmation } from "./ForgetMeConfirmation";

export function ForgetMe() {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <p
        className={`py-2 font-bold underline ${
          confirm ? "visible" : "invisible"
        }`}
      >
        Are you sure you want to delete you account and all your data? This is
        irreversible!
      </p>
      {!confirm ? (
        <button
          className="bg-slate-500 hover:bg-slate-400"
          onClick={() => {
            setConfirm(true);
          }}
        >
          Forget me
        </button>
      ) : (
        <ForgetMeConfirmation onCancel={() => setConfirm(false)} />
      )}
    </div>
  );
}

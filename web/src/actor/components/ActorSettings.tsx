import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../common/components/InputField";
import { Actor, useUpdateActorMutation } from "../../generatedTypes";
import { toErrorMap } from "../utils/toErrorMap";
import { DeleteDiscordIntegration } from "./DeleteDiscordIntegration";
import { ForgetMe } from "./ForgetMe";

export interface ActorSettingsProps {
  actor: Actor;
}

export function ActorSettings({ actor }: ActorSettingsProps) {
  const navigate = useNavigate();

  const { name, email, hasDiscordIntegration } = actor;

  const [, updateActor] = useUpdateActorMutation();

  return (
    <>
      <h2 className="text-right p-4">Account Settings</h2>
      <Formik
        initialValues={{ name, email }}
        onSubmit={async ({ name, email }, { setErrors }) => {
          const response = await updateActor({
            input: {
              name,
              email,
            },
          });
          if (response.data?.updateActor.errors) {
            setErrors(toErrorMap(response.data.updateActor.errors));
          } else if (response.data?.updateActor.actor) {
            navigate(0);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col items-end pb-16">
              <InputField name="name" label="Name" placeholder="name" />
              <InputField name="email" label="Email" placeholder="email" />
              <button
                className={`bg-green-500 hover:bg-green-400`}
                type="submit"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex flex-col items-end">
        <button
          className="bg-slate-500 hover:bg-slate-400"
          onClick={() => navigate("/change-password")}
        >
          Change password
        </button>
        {hasDiscordIntegration && <DeleteDiscordIntegration />}
        <ForgetMe />
      </div>
    </>
  );
}

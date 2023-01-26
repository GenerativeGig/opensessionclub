import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { FormContent } from "../components/BasicFormContent";
import { InputField } from "../components/InputField";
import { RouteTitle } from "../components/RouteTitle";
import { useChangePasswordLoggedInMutation } from "../types/generatedTypes";
import { toErrorMap } from "../utils/toErrorMap";

export function ChangePasswordLoggedIn() {
  const [, changePasswordLoggedIn] = useChangePasswordLoggedInMutation();
  const navigate = useNavigate();

  return (
    <>
      <RouteTitle>Make it count.</RouteTitle>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        onSubmit={async ({ oldPassword, newPassword }, { setErrors }) => {
          const response = await changePasswordLoggedIn({
            oldPassword,
            newPassword,
          });
          if (response.data?.changePasswordLoggedIn.errors) {
            const errorMap = toErrorMap(
              response.data.changePasswordLoggedIn.errors
            );

            setErrors(errorMap);
          } else if (response.data?.changePasswordLoggedIn.actor) {
            navigate("/");
            location.reload();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormContent
              inputFieldChildren={
                <>
                  <InputField
                    name="oldPassword"
                    label="Old password"
                    placeholder="old password"
                    type="password"
                  />
                  <InputField
                    name="newPassword"
                    label="New password"
                    placeholder="password"
                    type="password"
                  />
                </>
              }
              submitButtonText="Change password"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

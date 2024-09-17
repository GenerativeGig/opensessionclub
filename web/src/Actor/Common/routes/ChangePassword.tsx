import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputField } from "../../../Common/components/InputField";
import { RouteTitle } from "../../../Common/components/RouteTitle";
import { useChangePasswordMutation } from "../../../generatedTypes";
import { FormContent } from "../components/BasicFormContent";
import { toErrorMap } from "../utils/toErrorMap";

export function ChangePassword() {
  const [, changePassword] = useChangePasswordMutation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [tokenError, setTokenError] = useState("");

  return (
    <>
      <RouteTitle>Make it count.</RouteTitle>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof token === "string" ? token : "",
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.actor) {
            navigate("/");
            location.reload();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormContent
              inputFieldChildren={
                <InputField
                  name="newPassword"
                  label="New password"
                  placeholder="password"
                  type="password"
                />
              }
              extraChildren={
                !tokenError ? (
                  <></>
                ) : (
                  <>
                    <span className="text-red-600">{tokenError}</span>
                    <Link
                      className="ml-2 hover:text-slate-400 hover:underline"
                      to="/forgot-password"
                    >
                      Click here to get a new one
                    </Link>
                  </>
                )
              }
              submitButtonText="Change password"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

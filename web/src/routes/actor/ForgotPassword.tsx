import { Form, Formik } from "formik";
import { useState } from "react";
import { FormContent } from "../../components/actor/BasicFormContent";
import { InputField } from "../../components/common/InputField";
import { RouteTitle } from "../../components/common/RouteTitle";
import { useForgotPasswordMutation } from "../../types/generatedTypes";

export function ForgotPassword() {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <>
      <RouteTitle>It happens to the best of us.</RouteTitle>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          !complete ? (
            <Form>
              <FormContent
                inputFieldChildren={
                  <InputField name="email" label="Email" placeholder="email" />
                }
                submitButtonText="Send reset password email"
              />
            </Form>
          ) : (
            <p>If an account with that email exists, we sent you an email.</p>
          )
        }
      </Formik>
    </>
  );
}

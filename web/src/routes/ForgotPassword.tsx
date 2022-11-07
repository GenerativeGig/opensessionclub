import { Formik, Form } from "formik";
import { useState } from "react";
import { FormContent } from "../components/BasicFormContent";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";

export function ForgotPassword() {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
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
  );
}

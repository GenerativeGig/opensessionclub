import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../Common/components/InputField";
import { RouteTitle } from "../../../Common/components/RouteTitle";
import { useSignupMutation } from "../../../generatedTypes";
import { FormContent } from "../components/BasicFormContent";
import { toErrorMap } from "../utils/toErrorMap";

export function Signup() {
  const [, signup] = useSignupMutation();
  const navigate = useNavigate();
  return (
    <>
      <RouteTitle>Welcome!</RouteTitle>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await signup(values);
          if (response.data?.signup.errors) {
            setErrors(toErrorMap(response.data.signup.errors));
          } else if (response.data?.signup.actor) {
            navigate("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormContent
              inputFieldChildren={
                <>
                  <InputField name="name" label="Name" placeholder="name" />
                  <InputField
                    name="email"
                    label="Email"
                    placeholder="email"
                    type="email"
                  />
                  <InputField
                    name="password"
                    label="Password"
                    placeholder="password"
                    type="password"
                  />
                </>
              }
              submitButtonText="Signup"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

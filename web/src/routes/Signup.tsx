import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { useSignupMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export function Signup() {
  const [{}, signup] = useSignupMutation();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await signup(values);
        console.log(response);
        if (response.data?.signup.errors) {
          setErrors(toErrorMap(response.data.signup.errors));
        } else if (response.data?.signup.actor) {
          navigate("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="name" label="Name" placeholder="name" />
          <InputField name="email" label="Email" placeholder="email" />
          <InputField
            name="password"
            label="Password"
            placeholder="password"
            type="password"
          />
          <button type="submit">Signup</button>
        </Form>
      )}
    </Formik>
  );
}

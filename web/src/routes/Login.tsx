import { Formik, Form } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormContent } from "../components/BasicFormContent";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export function Login() {
  const [, login] = useLoginMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <Formik
      initialValues={{ nameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.actor) {
          if (typeof searchParams.get("next") === "string") {
            navigate(searchParams.get("next")!);
          } else {
            navigate("/");
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormContent
            inputFieldChildren={
              <>
                <InputField
                  name="nameOrEmail"
                  label="Name or email"
                  placeholder="name or email"
                />
                <InputField
                  name="password"
                  label="Password"
                  placeholder="password"
                  type="password"
                />
              </>
            }
            extraChildren={
              <Link
                className="hover:text-slate-400 hover:underline"
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            }
            submitButtonText="Login"
          />
        </Form>
      )}
    </Formik>
  );
}

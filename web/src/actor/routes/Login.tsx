import { Form, Formik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { InputField } from "../../common/components/InputField";
import { RouteTitle } from "../../common/components/RouteTitle";
import { useLoginMutation } from "../../generatedTypes";
import { FormContent } from "../components/BasicFormContent";
import { toErrorMap } from "../utils/toErrorMap";

export function Login() {
  const [, login] = useLoginMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <>
      <RouteTitle>Welcome back!</RouteTitle>
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
                <>
                  <Link
                    className="hover:text-slate-400 hover:underline block text-right"
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                  <Link
                    className="hover:text-slate-400 hover:underline block text-right"
                    to="/signup"
                  >
                    Don't have an account yet?
                  </Link>
                </>
              }
              submitButtonText="Login"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

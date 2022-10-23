import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

export function Signup() {
  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="name" label="Name" placeholder="name" />
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

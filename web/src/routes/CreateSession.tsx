import { Formik } from "formik";
import { useNavigate, Form } from "react-router-dom";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";

export function CreateSession() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ nameOrEmail: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await createSession(values);
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.actor) {
          navigate("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="h-full w-full flex flex-col items-center">
          <div className="m-2  p-2 w-full max-w-[768px] bg-slate-800">
            <h1 className="text-2xl font-medium mx-8 mt-6 mb-4">
              Create your Session
            </h1>
            <form className="p-2 flex flex-col items-start">
              <InputField name="title" label="Title" placeholder="title" />
              <div className="flex">
                <label className="self-start" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="w-[500px] h-[200px]"
                  name="description"
                  placeholder="description"
                  required
                />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input name="date" type="date" required />
              </div>
              <div className="w-full flex justify-between">
                <div>
                  <div>
                    <label htmlFor="time">Time</label>
                    <input name="time" type="time" required />
                    <span> - </span>
                    <input name="time" type="time" required />
                  </div>
                  <div>
                    <label htmlFor="participantLimit">Participant limit</label>
                    <input
                      className="w-16"
                      name="participantLimit"
                      type="number"
                      min={0}
                      defaultValue={8}
                      required
                    />
                  </div>
                </div>
                <div className="self-end">
                  <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-500"
                  >
                    Create Session
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Form>
      )}
    </Formik>
  );
}

import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { InputTextArea } from "../components/InputTextArea";
import { InputTimePeriod } from "../components/InputTimePeriod";
import { useCreateSessionMutation } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function CreateSession() {
  const [, createSession] = useCreateSessionMutation();
  const navigate = useNavigate();

  useIsAuthenticated();

  return (
    <Formik
      initialValues={{
        title: "",
        text: "",
        date: "",
        startTime: "",
        endTime: "",
        attendeeLimit: 5,
      }}
      onSubmit={async (
        { title, text, date, startTime, endTime, attendeeLimit },
        { setErrors }
      ) => {
        const start = new Date(date + ", " + startTime);
        const end = new Date(date + ", " + endTime);
        const { error } = await createSession({
          input: { title, text, attendeeLimit, start, end },
        });
        if (!error) {
          navigate("/sessions");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="h-full w-full flex flex-col items-center">
          <div className="m-2  p-2 w-full max-w-[768px] bg-slate-800">
            <h1 className="text-2xl font-medium mx-8 mt-6 mb-4">
              Create your Session
            </h1>
            <div className="p-2 flex flex-col items-start">
              <InputField name="title" label="Title" placeholder="title" />
              <InputTextArea name="text" label="Text" placeholder="text" />
              <InputField name="date" label="Date" type="date" />
              <div className="w-full flex justify-between">
                <div>
                  <InputTimePeriod
                    startTimeName="startTime"
                    endTimeName="endTime"
                  />
                  <InputField
                    className="w-16"
                    name="attendeeLimit"
                    label="Attendee limit"
                    type="number"
                    min={0}
                    defaultValue={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="self-end bg-pink-600 hover:bg-pink-500"
                >
                  Create Session
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

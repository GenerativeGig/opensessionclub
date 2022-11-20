import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { InputTextArea } from "../components/InputTextArea";
import { InputTimePeriod } from "../components/InputTimePeriod";
import { RouteTitle } from "../components/RouteTitle";
import { useCreateSessionMutation } from "../generated/graphql";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function CreateSession() {
  const [, createSession] = useCreateSessionMutation();
  const navigate = useNavigate();

  useIsAuthenticated();

  return (
    <>
      <RouteTitle>Create your Session</RouteTitle>
      <Formik
        initialValues={{
          title: "",
          text: "",
          date: "",
          startTime: "",
          stopTime: "",
          attendeeLimit: 5,
        }}
        onSubmit={async (
          { title, text, date, startTime, stopTime, attendeeLimit },
          { setErrors }
        ) => {
          const start = new Date(date + ", " + startTime);
          const stop = new Date(date + ", " + stopTime);
          const { error } = await createSession({
            input: { title, text, attendeeLimit, start, stop },
          });
          if (!error) {
            navigate("/sessions/upcoming");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="h-full w-full flex flex-col items-center">
            <div className="m-2 p-8 w-full max-w-[768px] bg-slate-800 rounded-md border-solid border-2 border-pink-500">
              <div className="p-2 flex flex-col items-start">
                <InputField name="title" label="Title" placeholder="title" />
                <InputTextArea name="text" label="Text" placeholder="text" />
                <InputField name="date" label="Date" type="date" />
                <div className="w-full flex justify-between">
                  <div>
                    <InputTimePeriod
                      startTimeName="startTime"
                      stopTimeName="stopTime"
                    />
                    <InputField
                      className="w-16"
                      name="attendeeLimit"
                      label="Attendee limit"
                      type="number"
                      min={1}
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
    </>
  );
}

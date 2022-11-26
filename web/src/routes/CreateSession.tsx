import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { InputTextArea } from "../components/InputTextArea";
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
          startDate: "",
          startTime: "",
          stopDate: "",
          stopTime: "",
          attendeeLimit: 5,
          isRemote: true,
          location: "",
        }}
        onSubmit={async (
          {
            title,
            text,
            startDate,
            startTime,
            stopDate,
            stopTime,
            attendeeLimit,
            isRemote,
            location,
          },
          { setErrors }
        ) => {
          const start = new Date(startDate + ", " + startTime);
          const stop = new Date(stopDate + ", " + stopTime);

          const current = new Date();
          const currentWithoutTime = new Date(current.toLocaleDateString());

          const startWithoutTime = new Date(startDate);
          const stopWithoutTime = new Date(stopDate);

          if (startWithoutTime < currentWithoutTime) {
            setErrors({
              startDate: `Date has be or come after ${current.toLocaleDateString()}`,
            });
            return;
          }

          if (start < current) {
            setErrors({
              startTime: `Start time has to be in the future`,
            });
            return;
          }

          if (stopWithoutTime < startWithoutTime) {
            setErrors({
              stopDate: `Date has be or come after ${start.toLocaleDateString()}`,
            });
            return;
          }

          if (stop <= start) {
            setErrors({
              stopTime: `Stop time has to come after start time`,
            });
            return;
          }

          const { error } = await createSession({
            input: {
              title,
              text,
              attendeeLimit,
              start,
              stop,
              isRemote,
              location,
            },
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
                <InputTextArea
                  name="text"
                  label="Text"
                  placeholder="text (optional)"
                />
                <div className="flex justify-between">
                  <InputField name="startDate" label="Start date" type="date" />
                  <InputField name="startTime" label="Start time" type="time" />
                </div>
                <div className="flex justify-between">
                  <InputField name="stopDate" label="Stop date" type="date" />
                  <InputField name="stopTime" label="Stop time" type="time" />
                </div>
                <InputField
                  className="w-16"
                  name="attendeeLimit"
                  label="Attendee limit"
                  type="number"
                  min={1}
                  defaultValue={5}
                />
                <InputField
                  name="isRemote"
                  label="Remote"
                  type="checkbox"
                  required={false}
                />
                <InputField
                  name="location"
                  label="Location"
                  type="text"
                  placeholder="location (optional)"
                  required={false}
                />
                <button
                  type="submit"
                  className="self-end bg-pink-600 hover:bg-pink-500"
                >
                  Create Session
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

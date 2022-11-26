import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { InputField } from "../components/InputField";
import { InputTextArea } from "../components/InputTextArea";
import { InputTimePeriod } from "../components/InputTimePeriod";
import { Loading } from "../components/Loading";
import { RouteTitle } from "../components/RouteTitle";
import {
  useSessionQuery,
  useUpdateSessionMutation,
} from "../generated/graphql";
import { addMissingZeros } from "../utils/addMissingZeros";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function EditSession() {
  useIsAuthenticated();
  const { id } = useParams();
  if (!id) {
    return <FailedLoadingData />;
  }

  const [{ data: sessionData, fetching: sessionFetching }] = useSessionQuery({
    variables: { id: parseInt(id) },
  });

  const navigate = useNavigate();

  const [, updateSession] = useUpdateSessionMutation();

  if (!sessionData && sessionFetching) {
    return <Loading />;
  }

  if (sessionData?.session) {
    const { title, text, start, stop, attendeeLimit } = sessionData.session;

    const startDate = new Date(parseInt(start));
    const stopDate = new Date(parseInt(stop));

    const date =
      addMissingZeros(startDate.getFullYear()) +
      "-" +
      addMissingZeros(startDate.getMonth()) +
      "-" +
      addMissingZeros(startDate.getDate());

    const startTime =
      addMissingZeros(startDate.getHours()) +
      ":" +
      addMissingZeros(startDate.getMinutes());

    const stopTime =
      addMissingZeros(stopDate.getHours()) +
      ":" +
      addMissingZeros(stopDate.getMinutes());

    return (
      <>
        <RouteTitle>Edit your Session</RouteTitle>
        <Formik
          initialValues={{
            title,
            text,
            date,
            startTime,
            stopTime,
            attendeeLimit,
          }}
          onSubmit={async (
            { title, text, date, startTime, stopTime, attendeeLimit },
            { setErrors }
          ) => {
            const start = new Date(date + ", " + startTime);
            const stop = new Date(date + ", " + stopTime);
            const { error } = await updateSession({
              id: parseInt(id),
              input: { title, text, attendeeLimit, start, stop },
            });
            if (!error) {
              navigate(`/session/${id}`);
              navigate(0);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="h-full w-full flex flex-col items-center">
              <div className="m-2 p-8 w-full max-w-[768px] bg-slate-800 border-solid border-2 border-green-500">
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
                      className="self-end bg-green-500 hover:bg-green-400"
                    >
                      Save Changes
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
  return <FailedLoadingData />;
}

// TODO: Update form with new fields from CreateSession

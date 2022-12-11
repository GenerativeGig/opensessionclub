import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { FailedLoadingData } from "../components/FailedLoadingData";
import { InputField } from "../components/InputField";
import { InputTextArea } from "../components/InputTextArea";
import { Loading } from "../components/Loading";
import { RouteTitle } from "../components/RouteTitle";
import {
  useSessionQuery,
  useUpdateSessionMutation,
} from "../generated/graphql";
import { addMissingZeros } from "../utils/addMissingZeros";
import { useIsAuthenticated } from "../utils/useIsAuthenticated";

export function UpdateSession() {
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
    const { title, text, start, stop, attendeeLimit, isRemote, location } =
      sessionData.session;

    const startDate = new Date(parseInt(start));
    const stopDate = new Date(parseInt(stop));
    const formattedStartDate =
      startDate.getFullYear() +
      "-" +
      addMissingZeros(startDate.getMonth() + 1) +
      "-" +
      addMissingZeros(startDate.getDate());

    const formattedStopDate =
      stopDate.getFullYear() +
      "-" +
      addMissingZeros(stopDate.getMonth() + 1) +
      "-" +
      addMissingZeros(stopDate.getDate());

    const formattedStartTime =
      addMissingZeros(startDate.getHours()) +
      ":" +
      addMissingZeros(startDate.getMinutes());

    const formattedStopTime =
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
            startDate: formattedStartDate,
            startTime: formattedStartTime,
            stopDate: formattedStopDate,
            stopTime: formattedStopTime,
            attendeeLimit,
            isRemote,
            location,
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
                startDate: "Date has to be today or in the future",
              });
              return;
            }

            if (start < current) {
              setErrors({
                startTime: "Time has to be in the future",
              });
              return;
            }

            if (stopWithoutTime < startWithoutTime) {
              setErrors({
                stopDate: "Date has to be or come after start date",
              });
              return;
            }

            if (stop <= start) {
              setErrors({
                stopTime: "Time has to come after start time",
              });
              return;
            }

            const { error } = await updateSession({
              id: parseInt(id),
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
              navigate(`/session/${id}`);
              navigate(0);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="h-full w-full flex flex-col items-center">
              <div className="m-2 p-8 w-full max-w-[768px] bg-slate-800 rounded-md border-solid border-2 border-green-500">
                <div className="p-2 flex flex-col items-start">
                  <InputField name="title" label="Title" placeholder="title" />
                  <InputTextArea
                    name="text"
                    label="Text"
                    placeholder="text (optional)"
                  />
                  <div className="flex justify-between">
                    <InputField
                      name="startDate"
                      label="Start date"
                      type="date"
                    />
                    <InputField
                      name="startTime"
                      label="Start time"
                      type="time"
                    />
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
                    className="self-end bg-green-600 hover:bg-green-500"
                  >
                    Save
                  </button>
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

// TODO: Combine parts of redundant code in edit and create into functions / components / as hook?

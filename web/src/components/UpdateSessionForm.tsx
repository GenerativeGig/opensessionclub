import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Session, useUpdateSessionMutation } from "../generated/graphql";
import { addMissingZeros } from "../utils/addMissingZeros";
import { InputField } from "./InputField";
import { RouteTitle } from "./RouteTitle";

export interface UpdateSessionFormProps {
  session: Session;
}

export function UpdateSessionForm({ session }: UpdateSessionFormProps) {
  const navigate = useNavigate();

  const [, updateSession] = useUpdateSessionMutation();

  const { id, title, text, start, stop, attendeeLimit, isRemote, location } =
    session;

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "border-solid border m-2 p-1",
      },
    },
    content: text,
  });

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

          const text = editor?.getHTML();

          const { error } = await updateSession({
            id,
            input: {
              title,
              text: text || null,
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
                <InputField name="title" label="Title" placeholder="title" />{" "}
                <div className="flex items-center w-full">
                  <label htmlFor="text">Text</label>
                  <EditorContent
                    label="text"
                    className="w-[25.2em]"
                    editor={editor}
                  />
                </div>
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
                  info={isRemote ? "Creates a voice channel" : ""}
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

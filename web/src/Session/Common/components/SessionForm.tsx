import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../Common/components/InputField";
import { RouteTitle } from "../../../Common/components/RouteTitle";
import {
  Session,
  useCreateSessionMutation,
  useUpdateSessionMutation,
} from "../../../generatedTypes";
import { addMissingZeros } from "../utils/addMissingZeros";

export type UpdateSessionFormProps = {
  isEditing: true;
  session: Session;
};

export type CreateSessionFormProps = {
  isEditing?: false;
  session?: never;
};

export type SessionFormProps = UpdateSessionFormProps | CreateSessionFormProps;

export function SessionForm({ isEditing = false, session }: SessionFormProps) {
  const navigate = useNavigate();

  const [, updateSession] = useUpdateSessionMutation();

  const [, createSession] = useCreateSessionMutation();

  const startDate = new Date(parseInt(session?.start || ""));
  const stopDate = new Date(parseInt(session?.stop || ""));
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

  const editor = useEditor(
    isEditing
      ? {
          extensions: [StarterKit],
          editorProps: {
            attributes: {
              class: "border-solid border m-2 p-1",
            },
          },
          content: session?.text,
        }
      : {
          extensions: [
            StarterKit,
            Placeholder.configure({
              placeholder: "text (optional)",
              emptyEditorClass:
                "before:float-left before:h-0 before:content-[attr(data-placeholder)] before:pointer-events-none text-[#9ca3af]",
            }),
          ],
          editorProps: {
            attributes: {
              class: "border-solid border m-2 p-1",
            },
          },
        }
  );

  return (
    <>
      <RouteTitle>{`${isEditing ? "Edit" : "Create"} your Session`}</RouteTitle>
      <Formik
        initialValues={
          isEditing
            ? {
                title: session?.title || "",
                text: session?.text || "",
                startDate: formattedStartDate,
                startTime: formattedStartTime,
                stopDate: formattedStopDate,
                stopTime: formattedStopTime,
                attendeeLimit: session?.attendeeLimit || 5,
                isRemote: session?.isRemote || false,
                location: session?.location || null,
              }
            : {
                title: "",
                startDate: "",
                startTime: "",
                stopDate: "",
                stopTime: "",
                attendeeLimit: 5,
                isRemote: true,
                location: null,
              }
        }
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
          const startTimeArray = startTime.split(":");
          const start = new Date(startDate);
          start.setHours(parseInt(startTimeArray[0]));
          start.setMinutes(parseInt(startTimeArray[1]));

          const stopTimeArray = stopTime.split(":");
          const stop = new Date(stopDate);
          stop.setHours(parseInt(stopTimeArray[0]));
          stop.setMinutes(parseInt(stopTimeArray[1]));

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

          const { error } = isEditing
            ? await updateSession({
                id: session?.id || 0,
                input: {
                  title,
                  text: text || null,
                  attendeeLimit,
                  start,
                  stop,
                  isRemote,
                  location,
                },
              })
            : await createSession({
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
            if (isEditing) {
              navigate(`/session/${session?.id}`);
              navigate(0);
            } else {
              navigate("/sessions/upcoming");
            }
          }
        }}
      >
        {({ isSubmitting, values: { isRemote } }) => (
          <Form className="flex h-full w-full flex-col items-center">
            <div className="m-2 w-full max-w-[768px] rounded-md border-2 border-solid border-green-500 bg-slate-800 p-2 md:p-8">
              <div className="flex flex-col items-start p-2">
                <InputField name="title" label="Title" placeholder="title" />
                <div className="flex w-full items-center">
                  <label htmlFor="text">Text</label>
                  <EditorContent
                    label="text"
                    className="w-[11em] md:w-[25.2em]"
                    editor={editor}
                  />
                </div>
                <div className="flex flex-col justify-between md:flex-row">
                  <InputField name="startDate" label="Start date" type="date" />
                  <InputField name="startTime" label="Start time" type="time" />
                </div>
                <div className="flex flex-col justify-between md:flex-row">
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
                  className="w-auto"
                  name="isRemote"
                  label="Remote"
                  info={
                    isRemote ? (
                      <span className="hidden sm:inline">
                        Creates a voice channel
                      </span>
                    ) : (
                      ""
                    )
                  }
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
                {isEditing ? (
                  <button
                    type="submit"
                    className="self-end bg-green-600 hover:bg-green-500"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="self-end bg-pink-600 hover:bg-pink-500"
                  >
                    Create Session
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

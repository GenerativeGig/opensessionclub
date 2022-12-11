import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateSessionCommentMutation } from "../generated/graphql";
import { InputTextArea } from "./InputTextArea";

export interface CreateSessionCommentProps {
  sessionId: number;
}

export function CreateSessionComment({ sessionId }: CreateSessionCommentProps) {
  const [, createSessionComment] = useCreateSessionCommentMutation();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }, { setErrors }) => {
        const { error } = await createSessionComment({ text, sessionId });
        if (!error) {
          navigate(0);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col p-4">
          <InputTextArea
            name="text"
            label=""
            type="text"
            placeholder="Add a comment..."
            className="w-full"
            noLabel
            required
          />
          <button
            type="submit"
            className="self-end bg-pink-600 hover:bg-pink-500"
          >
            <ChatBubbleLeftIcon className="h-5 w-5 inline" />
            Comment
          </button>
        </Form>
      )}
    </Formik>
  );
}

// TODO: Load more comments

// TODO: Long term -> create a space that is used like a board. Anything can be put up on it.
// It could be called the Session Board. There ideas and suggestions are put to be remembered for
// when the session actually takes place. It's a way to do cooperative session preparation.

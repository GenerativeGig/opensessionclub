import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateSessionCommentMutation } from "../generated/graphql";

export interface CreateSessionCommentProps {
  sessionId: number;
}

export function CreateSessionComment({ sessionId }: CreateSessionCommentProps) {
  const [, createSessionComment] = useCreateSessionCommentMutation();

  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add a comment...",
        includeChildren: true,
      }),
    ],
    editorProps: {
      attributes: { class: "first:content-[attr(data-placeholder)]" },
    },
  });

  return (
    <Formik
      initialValues={{}}
      onSubmit={async ({}, { setErrors }) => {
        const text = editor?.getJSON();

        const { error } = await createSessionComment({
          sessionId,
          text,
        });

        if (!error) {
          // TODO: add to state without getting from server?
          navigate(0);
        }
      }}
    >
      <Form className="flex flex-col p-4">
        <EditorContent
          className="rounded border-solid border-2 my-4 p-1 focus:outline-none"
          editor={editor}
        />
        <button
          type="submit"
          className="self-end bg-pink-600 hover:bg-pink-500 disabled:bg-gray-500"
          disabled={editor?.getText() === ""}
        >
          Comment
        </button>
      </Form>
    </Formik>
  );
}

// TODO: Load more comments

// TODO: Long term -> create a space that is used like a board. Anything can be put up on it.
// It could be called the Session Board. There ideas and suggestions are put to be remembered for
// when the session actually takes place. It's a way to do cooperative session preparation.

// TODO IDEA: allow the actor to write notes on the left and right side of the website,
// like taking notes when reading a book

// TODO: Placeholder

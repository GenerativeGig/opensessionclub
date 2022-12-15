import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Actor,
  SessionComment,
  useDeleteSessionCommentMutation,
  useUpdateSessionCommentMutation,
} from "../generated/graphql";
import { ActorLink } from "./ActorLink";
import StarterKit from "@tiptap/starter-kit";

export interface SessionCommentCardProps {
  sessionComment: SessionComment;
  me?: Actor;
}

export function SessionCommentCard({
  sessionComment,
  me,
}: SessionCommentCardProps) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [textBeforeEdit, setTextBeforeEdit] = useState<
    JSONContent | undefined
  >();

  const [, deleteSessionComment] = useDeleteSessionCommentMutation();
  const [, updateSessionComment] = useUpdateSessionCommentMutation();

  const { id, creator, createdAt, text } = sessionComment;

  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    editable: isEditing,
  });

  useEffect(() => {
    if (isEditing) {
      setTextBeforeEdit(editor?.getJSON());
    }

    editor?.setEditable(isEditing);
  }, [editor, isEditing]);

  const isCreator = me && me.id === sessionComment.creator.id;

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={async ({}, { setErrors }) => {
          setIsEditing(false);

          const text = editor?.getJSON();

          const { error } = await updateSessionComment({ id, text });
          console.log({ error });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <div className="flex">
              <ActorLink actor={creator} />
              <div className="ml-4 text-slate-300">
                {new Date(parseInt(createdAt)).toLocaleDateString()}
              </div>
            </div>
            <div className="p-4">
              <EditorContent editor={editor} />
            </div>
            {isEditing && (
              <div className="self-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 disabled:bg-gray-500"
                  disabled={editor?.getText() === ""}
                >
                  Save
                </button>
                <button
                  className="bg-slate-500 hover:bg-slate-400"
                  onClick={() => {
                    setIsEditing(false);
                    editor?.commands.setContent(
                      textBeforeEdit ? textBeforeEdit : {}
                    );
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            {isCreator && !isEditing && (
              <div className="self-end">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={async () => {
                    const { error } = await deleteSessionComment({ id });
                    if (!error) {
                      navigate(0);
                    }
                  }}
                >
                  <TrashIcon className="h-5 w-5 inline" />
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-400"
                  onClick={() => {
                    setIsEditing(true);
                    setTextBeforeEdit(editor?.getJSON());
                  }}
                >
                  <PencilIcon className="h-5 w-5 inline" />
                  Edit
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

// TODO: Proper cache invalidation -> If I update / delete a comment -> invalidate the cache for
// SessionComment's

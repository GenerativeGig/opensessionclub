import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActorLink } from "../../actor/components/ActorLink";
import {
  Actor,
  SessionComment,
  useDeleteSessionCommentMutation,
  useUpdateSessionCommentMutation,
} from "../../generatedTypes";

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
  const [textBeforeEdit, setTextBeforeEdit] = useState<string | undefined>();

  const [, deleteSessionComment] = useDeleteSessionCommentMutation();
  const [, updateSessionComment] = useUpdateSessionCommentMutation();

  const { id, creator, createdAt, text } = sessionComment;

  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    editable: isEditing,
    editorProps: {
      attributes: {
        class: "m-1 p-1",
      },
    },
  });

  useEffect(() => {
    if (isEditing) {
      setTextBeforeEdit(editor?.getHTML());
      editor?.setOptions({
        editorProps: { attributes: { class: "border-solid border m-1 p-1" } },
      });
    } else {
      editor?.setOptions({
        editorProps: { attributes: { class: "m-1 p-1" } },
      });
    }

    editor?.setEditable(isEditing);
  }, [editor, isEditing]);

  const isCreator = me && me.id === sessionComment.creator.id;

  if (!editor) {
    return <></>;
  }

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={async ({}, { setErrors }) => {
          setIsEditing(false);

          const text = editor?.getHTML();

          const response = await updateSessionComment({ id, text });

          if (!response.data?.updateSessionComment) {
            editor.commands.setContent(textBeforeEdit || null);
          }
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
            <div className="pt-4">
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
                    editor?.commands.setContent(textBeforeEdit || null);
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
                  <TrashIcon className="inline h-5 w-5" />
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-400"
                  onClick={() => {
                    setIsEditing(true);
                    setTextBeforeEdit(editor?.getHTML());
                  }}
                >
                  <PencilIcon className="inline h-5 w-5" />
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

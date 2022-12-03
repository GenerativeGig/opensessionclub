import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Actor,
  SessionComment,
  useDeleteSessionCommentMutation,
  useUpdateSessionCommentMutation,
} from "../generated/graphql";
import { ActorLink } from "./ActorLink";
import { InputTextArea } from "./InputTextArea";

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

  const [, deleteSessionComment] = useDeleteSessionCommentMutation();
  const [, updateSessionComment] = useUpdateSessionCommentMutation();

  const { id, creator, createdAt, text } = sessionComment;

  const isCreator = me && me.id === sessionComment.creator.id;

  return (
    <>
      <Formik
        initialValues={{ text }}
        onSubmit={async ({ text }, { setErrors }) => {
          const { error } = await updateSessionComment({ text, id });
          console.log({ error });
          if (!error) {
            setIsEditing(false);
            navigate(0);
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
            {isEditing ? (
              <>
                <InputTextArea
                  name="text"
                  label=""
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full"
                  noLabel
                />
                <div className="self-end">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="p-5">{text}</div>
            )}
            {isCreator && !isEditing && (
              <div className="self-end">
                <button
                  type="button"
                  className="bg-red-500 hover-red-400"
                  onClick={async () => {
                    const { error } = await deleteSessionComment({ id });
                    if (!error) {
                      navigate(0);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-400"
                  onClick={() => setIsEditing(true)}
                >
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

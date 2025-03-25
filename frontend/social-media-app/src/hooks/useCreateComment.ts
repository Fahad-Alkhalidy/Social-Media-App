import { useState } from "react";
import { IComment } from "../Typescript Types/commentTypes";

const useCreateComment = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const createNewComment = async (commentContent: IComment) => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/comments/createNewComment", {
        signal,
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: commentContent.postId,
          content: commentContent.content,
        }),
      });
      if (!response.ok) setError("Error Occured");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, createNewComment };
};

export default useCreateComment;

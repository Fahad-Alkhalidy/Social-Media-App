import { useState } from "react";
import { IComment } from "../Typescript Types/commentTypes";

const useGetPostComments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [allComments, setAllComments] = useState<IComment[] | undefined>();
  const fetchComments = async (postId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/comments/${postId}`, {
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.data);
        setAllComments(result.data.friends);
      }
    } catch (error) {
      console.log(error);
      setError("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, allComments, fetchComments };
};

export default useGetPostComments;

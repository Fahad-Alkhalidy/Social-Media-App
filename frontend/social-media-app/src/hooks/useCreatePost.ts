import { useEffect, useState } from "react";
//import { IPost } from "../Typescript Types/postType";

const controller = new AbortController();
const signal = controller.signal;

const useCreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSubmission = async (post, media) => {
    const formInfo = new FormData();
    setLoading(true);
    const fullUserInfo = { user: localStorage.getItem("id"), ...post };
    console.log(fullUserInfo);
    formInfo.append("user", fullUserInfo.user);
    formInfo.append("content", fullUserInfo.message);
    formInfo.append("hashtag", fullUserInfo.hashtag);
    formInfo.append("visibility", fullUserInfo.visibility);
    post.append("media", media);
    console.log(media);
    try {
      const response = await fetch(`/api/v1/posts/createNewPost/`, {
        signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "No data available for such user");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError")
        setError("Fetch request was aborted");
      setError("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, handleSubmission };
};

export default useCreatePost;

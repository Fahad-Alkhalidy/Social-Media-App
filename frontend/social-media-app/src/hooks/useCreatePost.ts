import { useEffect, useState } from "react";
//import { IPost } from "../Typescript Types/postType";

const controller = new AbortController();
const signal = controller.signal;

const useCreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSubmission = async (post) => {
    const formInfo = new FormData();
    setLoading(true);
    const File = post.media.FileList[0];
    //const fullUserInfo = { user: localStorage.getItem("id"), ...post };
    console.log(File);
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

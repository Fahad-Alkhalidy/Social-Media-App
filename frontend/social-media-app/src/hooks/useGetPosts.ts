import { useEffect, useState } from "react";
import { IPost } from "../Typescript Types/postType";

const controller = new AbortController();
const signal = controller.signal;

const useGetPosts = () => {
  const [allUserPosts, setAllUserPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/posts/${localStorage.getItem("id")}`,
          { signal }
        );
        const result = await response.json();
        if (response.ok) {
          setAllUserPosts(result.data.userPosts);
        } else {
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
    fetchUserPosts();
  }, []);
  return { allUserPosts, loading, error };
};

export default useGetPosts;

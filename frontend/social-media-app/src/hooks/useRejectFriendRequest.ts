import { useEffect, useState } from "react";
import { ISender } from "../Typescript Types/friendRequestType";

const controller = new AbortController();
const signal = controller.signal;

const useRejectFriendRequest = ({ id }: ISender) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const Reject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/friendReqs/${id}`, {
          signal,
          method: "DELETE",
        });
        if (response.ok) {
          console.log("deleted successfully");
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError")
          console.log("Fetch request was aborted");
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    Reject();
  }, [id]);
  return { loading, error };
};

export default useRejectFriendRequest;

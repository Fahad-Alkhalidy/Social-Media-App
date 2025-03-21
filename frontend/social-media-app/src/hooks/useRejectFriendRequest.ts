import { useState } from "react";
import { ISender } from "../Typescript Types/friendRequestType";

const controller = new AbortController();
const signal = controller.signal;

const useRejectFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const rejectFriendRequest = async ({ id }: ISender) => {
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
  return { loading, error, rejectFriendRequest };
};

export default useRejectFriendRequest;

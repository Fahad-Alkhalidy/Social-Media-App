import { useEffect, useState } from "react";
import { ISender } from "../Typescript Types/friendRequestType";
const controller = new AbortController();
const signal = controller.signal;

const useAcceptFriendRequest = ({ id }: ISender) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const Accept = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/users/addAsFriend/${localStorage.getItem("id")}`,
          {
            signal,
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              acceptedFriendId: id,
            }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log("Added As A Friend", result);
        } else {
          console.log("The process was not successful");
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
    Accept();
  }, [id]);
  return { loading, error };
};
export default useAcceptFriendRequest;

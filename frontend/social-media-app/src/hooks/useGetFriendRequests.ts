import { useEffect, useState } from "react";
import { IFriendRequestComponents } from "../Typescript Types/friendRequestType";

const controller = new AbortController();
const signal = controller.signal;

const useGetFriendRequests = () => {
  //fetch the friend requests:
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allUserFriendRequests, setAllUserFriendRequests] =
    useState<IFriendRequestComponents[]>();

  useEffect(() => {
    const fetchUserReq = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/friendReqs/${localStorage.getItem("id")}`,
          { signal }
        );
        const result = await response.json();

        if (response.ok) {
          setAllUserFriendRequests(result.data.userRequests);
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
    fetchUserReq();
  }, []);
  return { allUserFriendRequests, loading, error };
};

export default useGetFriendRequests;

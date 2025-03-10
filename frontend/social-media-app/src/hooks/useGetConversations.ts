import { useEffect, useState } from "react";
import { IConversationType } from "../Typescript Types/conversationTypes";

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allFriends, setAllFriends] = useState<IConversationType[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/users/getAllFriends/${localStorage.getItem("id")}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log(result.data.friends);
          setAllFriends(result.data.friends);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);
  return { loading, allFriends };
};

export default useGetConversations;

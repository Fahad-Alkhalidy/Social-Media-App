import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/v1/messages/${
            selectedConversation._id
          }/?senderId=${localStorage.getItem("id")}`
        );
        const result = await response.json();
        if (response.ok) {
          setMessages(result);
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;

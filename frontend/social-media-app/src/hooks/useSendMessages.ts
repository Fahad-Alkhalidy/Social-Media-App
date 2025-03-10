import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/messages/sendMessage/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessages([...messages, result]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};
export default useSendMessage;

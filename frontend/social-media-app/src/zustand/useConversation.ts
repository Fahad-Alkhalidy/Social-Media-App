import { create } from "zustand";
import { IConversationType } from "../Typescript Types/conversationTypes";
import { IMessageType } from "../Typescript Types/messageType";
//conversation store
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: IConversationType) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: IMessageType) => set({ messages }),
}));

export default useConversation;

import React from "react";
import Button from "../Button";
import Message from "./Message";

const Conversation: React.FC = () => {
  return (
    <div className=" flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <Message></Message>
        <Message></Message>
      </div>
      <div className="flex-1"></div>
      <div className="flex justify-center items-center mb-5">
        <input
          type="text"
          placeholder="Primary"
          className="input input-primary"
        />
        <Button>Send</Button>
      </div>
    </div>
  );
};

export default Conversation;

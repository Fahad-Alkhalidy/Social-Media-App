import { extractTime } from "../../../utils/extractTime";
import useConversation from "../../../zustand/useConversation";

const Message = ({ message }) => {
  // const fetchProfilePictures = async () => {
  //   try {
  //     const response = await fetch(
  //       `/api/v1/users/${localStorage.getItem("id")}`
  //     );
  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log(result.data.doc.profilePicture);
  //       return result.data.doc.profilePicture;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchProfilePictures(message);
  const { selectedConversation } = useConversation();
  const me = message.sender === localStorage.getItem("id");
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = me ? "chat-end" : "chat-start";
  const profilePicture = me ? "" : selectedConversation?.profilePicture;
  console.log(message);
  const bubbleBackgroundColor = me ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`http://localhost:3000/image/users/${profilePicture}`}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBackgroundColor} ${shakeClass} pb-2`}
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

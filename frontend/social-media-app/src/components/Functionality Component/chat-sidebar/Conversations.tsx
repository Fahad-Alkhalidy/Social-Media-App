import Conversation from "./Conversation";
import useGetConversations from "../../../hooks/useGetConversations";
const Conversations = () => {
  const { loading, allFriends } = useGetConversations();
  console.log(allFriends);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {allFriends?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === allFriends.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;

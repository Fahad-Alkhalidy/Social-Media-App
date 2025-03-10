import Sidebar from "../Functionality Component/chat-sidebar/Sidebar";
import MessageContainer from "../Functionality Component/messages/MessageContainer";
const Chat: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="basis-1/3">
        <Sidebar />
      </div>
      <div className="basis-2/3">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Chat;

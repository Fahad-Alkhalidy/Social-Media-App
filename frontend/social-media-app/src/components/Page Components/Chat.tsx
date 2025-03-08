import { useState, useEffect } from "react";
import UserInfoBox from "../Functionality Component/userInfoBox";
import { IUserType } from "../../Typescript Types/userType";
import Conversation from "../Functionality Component/realTimeChat/Conversation";
import useConversation from "../../zustand/useConversation";

const Chat: React.FC = () => {
  const [allFriends, setAllFriends] = useState<[{ IUserType }]>();
  const [chat, setChat] = useState([]);
  //const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `/api/v1/users/getAllFriends/${localStorage.getItem("id")}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setAllFriends(result.data.friends);
          // console.log(result.data.friends);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);
  useEffect(() => {
    console.log(chat);
  }, [chat]);
  return (
    <div className="flex min-h-screen">
      <div className="basis-1/3">
        {/* {console.log(allFriends)} */}
        {allFriends?.map((friend: IUserType) => (
          <UserInfoBox
            User={friend}
            displayFollowButtonAndBio={false}
            setChat={setChat}
            key={friend._id}
          />
        ))}
      </div>
      <div className="basis-1/3">
        <Conversation></Conversation>
      </div>
      <div className="basis-1/3 absoulte bottom-1">Hello</div>
    </div>
  );
};

export default Chat;

import { useState, useEffect } from "react";
import Button from "../Functionality Component/Button";
import UserInfoBox from "../Functionality Component/userInfoBox";
import { IUserType } from "../../Typescript Types/userType";

const Chat: React.FC = () => {
  const [allFriends, setAllFriends] = useState<[{ IUserType }]>();
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
          console.log(result.data.friends);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);
  return (
    <div className="flex min-h-screen">
      <div className="basis-1/3">
        {console.log(allFriends)}
        {allFriends?.map((friend: IUserType) => (
          <UserInfoBox User={friend} displayFollowButtonAndBio={false} />
        ))}
      </div>
      <div className=" basis-1/3 flex flex-col">
        <div className="flex-1">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex justify-center items-center mb-5">
          <input
            type="text"
            placeholder="Primary"
            className="input input-primary"
          />
          <Button>Send</Button>
        </div>
      </div>
      <div className="basis-1/3 absoulte bottom-1">Hello</div>
    </div>
  );
};

export default Chat;

import { IFriendRequest } from "../../Typescript Types/friendRequestType";
import Button from "./Button";

const FriendReq: React.FC<IFriendRequest> = ({ friendRequest }) => {
  const Accept = () => {}; //Patch Request To Change The Status To Accept, and then remove req from UI
  const Reject = () => {}; //Patch Request To Change The Status To Reject, and then remove req from UI
  return (
    <div className="card bg-base-200 rounded-box w-full mb-5">
      <p>{`${friendRequest.sender.username} wants to be a friend with you!`}</p>
      <Button onClick={Accept}>Accept</Button>
      <Button onClick={Reject}>Reject</Button>
    </div>
  );
};

export default FriendReq;

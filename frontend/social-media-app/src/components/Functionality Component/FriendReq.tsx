import { IFriendRequest } from "../../Typescript Types/friendRequestType";
import Button from "./Button";

const FriendReq: React.FC<IFriendRequest> = ({ friendRequest }) => {
  //Patch Request To Change The Status To Accept, and then remove req from UI
  const Accept = async () => {
    try {
      const response = await fetch(
        `/api/v1/users/addAsFriend/${localStorage.getItem("id")}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            acceptedFriendId: friendRequest.sender,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("Added As A Friend", result);
      } else {
        console.log("The process was not successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Patch Request To Change The Status To Reject, and then remove req from UI
  const Reject = async () => {
    try {
      const response = await fetch(`/api/v1/friendReqs/${friendRequest._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-200 rounded-box w-full mb-5">
      <p>{`${friendRequest.sender.username} wants to be a friend with you!`}</p>
      <Button onClick={Accept}>Accept</Button>
      <Button onClick={Reject}>Reject</Button>
    </div>
  );
};

export default FriendReq;

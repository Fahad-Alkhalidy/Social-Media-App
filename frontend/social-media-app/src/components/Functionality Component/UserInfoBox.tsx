import { useState } from "react";
import { IUser } from "../../Typescript Types/userType";
const handleFollow = async (userId: string, setError) => {
  try {
    const response = await fetch("/api/v1/friendReqs/createAFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: localStorage.getItem("id"),
        receiver: userId,
      }),
    });
    const result = await response.json();
    if (response.ok) console.log(result);
  } catch (error) {
    setError(error);
  }
};

const UserInfoBox: React.FC<IUser> = ({ User }) => {
  const [error, setError] = useState<string>("");
  const userId = User._id;
  return (
    <div>
      <div className="card card-dash bg-base-100 w-96 hover:bg-gray-600">
        <div className="card-body">
          <img
            height={50}
            width={50}
            src={
              User.profilePicture
                ? `http://localhost:3000/image/users/${User.profilePicture}`
                : `http://localhost:3000/image/users/default.jpg`
            }
            className="rounded-full border-4 border-indigo-600"
          ></img>
          <h2 className="card-title">@{User.username}</h2>
          <div>
            <p>{User.bio}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleFollow(userId, setError)}
              >
                Follow
              </button>
              {error ? (
                <div>{"You have Already Sent A Friend Request!"}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;

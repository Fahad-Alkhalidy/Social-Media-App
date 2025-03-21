import PositionedSnackbar from "./Snackbar";
import { IUser } from "../../Typescript Types/userType";
import Profile from "../Page Components/Profile";
import { useNavigate } from "react-router-dom";

const UserInfoBox: React.FC<IUser> = ({ User }) => {
  const navigate = useNavigate();
  const userId = User._id;
  const displayUserProfile = () => {
    navigate(`/Profile/${userId}`);
  };
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
              <PositionedSnackbar user={userId} />
              <button className="btn btn-primary" onClick={displayUserProfile}>
                Discover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoBox;

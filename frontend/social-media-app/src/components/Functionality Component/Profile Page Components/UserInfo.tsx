import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import UserInfoSkeleton from "./UserInfoSkeleton";
import ProfileProps from "../../../Typescript Types/profileProps";
const UserInfo: React.FC<ProfileProps> = ({ currentUser }) => {
  const { loading, error, profileData } = useGetCurrentUser(currentUser);
  return (
    <div>
      {loading ? (
        <UserInfoSkeleton />
      ) : (
        <div className="card bg-base-300 rounded-box flex flex-col items-center justify-start h-fit basis-1/3 p-5 min-h-135">
          <div className="space-y-6">
            <p className="font-medium text-lg">{profileData.coverPhoto}</p>
            <div className="flex justify-center items-center">
              <img
                className="rounded-full border-4 border-indigo-600"
                height={100}
                width={100}
                src={`http://localhost:3000/image/users/${profileData.profilePicture}`}
                alt="Profile"
              />
            </div>
            <p>
              <strong>
                <BadgeOutlinedIcon></BadgeOutlinedIcon> Username:
              </strong>{" "}
              {profileData.username}
            </p>
            <p>
              <strong>
                <EmailOutlinedIcon></EmailOutlinedIcon> Email:
              </strong>{" "}
              {profileData.email}
            </p>
            <p>
              <strong>
                <DriveFileRenameOutlineOutlinedIcon></DriveFileRenameOutlineOutlinedIcon>{" "}
                Name:
              </strong>{" "}
              {profileData.fullname}
            </p>
            <p>
              <strong>
                <SupervisorAccountOutlinedIcon></SupervisorAccountOutlinedIcon>{" "}
                Role:
              </strong>{" "}
              {profileData.role}
            </p>
            <p>
              <strong>
                <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon> Joined:
              </strong>{" "}
              {profileData.createdAt}
            </p>
          </div>
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default UserInfo;

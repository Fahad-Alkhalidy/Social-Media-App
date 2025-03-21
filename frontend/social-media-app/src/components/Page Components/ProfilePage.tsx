import { useParams } from "react-router-dom";
import Profile from "./Profile";

const ProfilePage = () => {
  const { userId } = useParams();
  return <Profile currentUser={userId}></Profile>;
};

export default ProfilePage;

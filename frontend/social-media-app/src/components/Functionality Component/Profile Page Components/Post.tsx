import "../../../Styling/App.css";
import { useState } from "react";
import { IPostType } from "../../../Typescript Types/postType";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import CustomizedDialogs from "../CommentSection";
const Post: React.FC<IPostType> = ({ Post }) => {
  const [like, setLike] = useState<boolean>(false);
  const userId: string = Post.user;
  const { profileData } = useGetCurrentUser(userId);
  const handleLike = () => {
    setLike((like: boolean) => !like);
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="flex justify-start items-center mt-5 ml-5">
          <img
            className="rounded-full border-4 border-indigo-600"
            height={60}
            width={60}
            src={`http://localhost:3000/image/users/${profileData.profilePicture}`}
            alt="Profile"
          />
          <h2 className="card-title ml-4 text-2xl">@{Post.user.username}</h2>
        </div>
        <div className="divider divider-primary"></div>
        <figure>
          <img
            height={100}
            width={200}
            src={`http://localhost:3000/image/users/${Post.media}`}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <p className="text-xl">{Post.content}</p>
          <div className="card-actions justify-end">
            <p>0</p>
            <button
              onClick={handleLike}
              className="btn bg-base-100 border-0 outline-none"
            >
              {like ? (
                <FavoriteIcon></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon></FavoriteBorderIcon>
              )}
            </button>
          </div>
          <CustomizedDialogs postId={Post._id}></CustomizedDialogs>
        </div>
      </div>
    </div>
  );
};

export default Post;

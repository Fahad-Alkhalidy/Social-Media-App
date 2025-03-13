import { useState } from "react";
import { IPostType } from "../../../Typescript Types/postType";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Post: React.FC<IPostType> = ({ Post }) => {
  const [like, setLike] = useState<boolean>(false);
  const handleLike = () => {
    setLike((like: boolean) => !like);
  };
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Post.username</h2>
          <p>{Post.content}</p>
          <div className="card-actions justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default Post;

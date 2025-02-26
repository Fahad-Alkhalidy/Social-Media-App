import { IPostType } from "../../Typescript Types/postType";

const Post: React.FC<IPostType> = ({ Post }) => {
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
            <button className="btn btn-primary">Like</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

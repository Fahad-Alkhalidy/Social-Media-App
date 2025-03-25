import React from "react";
import { IComment } from "../../Typescript Types/commentTypes";
interface commentProps {
  comment: IComment;
}
const Comment: React.FC<commentProps> = ({ comment }) => {
  console.log(comment);
  return (
    <div>
      <h1>{comment.content}</h1>
      <h2>{comment.postId}</h2>
    </div>
  );
};

export default Comment;

import { IUserType } from "./userType";

export interface IPost {
  postId: string;
  user: IUserType;
  content: string;
  media: string;
  visiblity: string;
}

export interface IPostType {
  Post: IPost;
}

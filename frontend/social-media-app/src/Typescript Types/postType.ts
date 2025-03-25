import { IUserType } from "./userType";

export interface IPost {
  _id: string;
  user: IUserType;
  content: string;
  media: string;
  visiblity: string;
}

export interface IPostType {
  Post: IPost;
}

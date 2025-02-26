export interface IUserType {
  _id: string;
  username: string;
  profilePicture: string;
  bio?: string;
}

export interface IUser {
  User: IUserType;
}

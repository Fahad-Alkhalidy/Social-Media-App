export interface IFriendRequestComponents {
  _id: string;
  sender: ISender;
  receiver: IReceiver;
  status: string;
  createdAt: Date;
}

export interface IFriendRequest {
  friendRequest: IFriendRequestComponents;
  key: Date;
}

interface ISender {
  id: string;
  username: string;
  profilePicture: string;
}

interface IReceiver {
  id: string;
  username: string;
  profilePicture: string;
}

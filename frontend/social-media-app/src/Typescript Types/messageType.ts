//Used when geting the messages from the api, when sending we send the message as a string in the body
export interface IMessageType {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
}

// 定义聊天模块ts数据类型
export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 聊天记录数据ts类型
export interface Message {
  date: string;
  fromSelf: boolean;
  message: string;
  user_pic: string;
}

// 聊天用户数据ts类型
export interface User {
  nickname: string;
  senderId: number;
  user_pic: string;
  username: string;
}

export type UserContent = User[];

// 聊天用户接口返回的数据ts类型
export interface UserResponseData extends ResponseData {
  data: UserContent;
}

export type MessageContent = Message[];

// 聊天记录接口返回的数据ts类型
export interface MessageResponseData extends ResponseData {
  data: MessageContent;
}

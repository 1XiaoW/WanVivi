// 统一管理聊天模块接口
import request from '@/utils/request.ts';
import { ResponseData, MessageResponseData, UserResponseData } from './type';

// 通过枚举管理聊天模块的接口地址
enum API {
  // 发送聊天信息接口地址
  SENDMESSAGE_URL = '/chat/sendMessage',
  // 获取聊天信息接口地址
  ALLMESSAGE_URL = '/chat/getAllMessage',
  // 获取聊天用户接口地址
  ALLUSER_URL = '/chat/getAllUserList',
}

// 发送聊天信息
export const reqPostMessage = (data: Object) =>
  request.post<any, ResponseData>(API.SENDMESSAGE_URL, data);
// 获取聊天信息
export const reqAllMessage = (senderId: number, receiverId: number) =>
  request.get<any, MessageResponseData>(API.ALLMESSAGE_URL, {
    params: {
      senderId,
      receiverId,
    },
  });
// 获取聊天用户列表
export const reqAllUser = (receiverId: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL, {
    params: {
      receiverId,
    },
  });

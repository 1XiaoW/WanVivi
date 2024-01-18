// 统一管理消息模块接口
import request from '@/utils/request.ts';
import { MessageResponseData, PostMessageResponseData } from './type';
// 通过枚举管理消息模块的接口地址
enum API {
  // 发布和获取通知信息
  MESSAGE_URL = '/message',
}

// 发布信息
export const reqPostMessage = () =>
  request.post<any, PostMessageResponseData>(API.MESSAGE_URL);
// 获取信息
export const reqGetMessage = (message_category: string) =>
  request.get<any, MessageResponseData>(API.MESSAGE_URL, {
    params: {
      message_category: message_category,
    },
  });

// 统一管理消息模块接口
import request from '@/utils/request.ts';
import {
  MessageResponseData,
  PostMessageResponseData,
  ResponseData,
} from './type';
// 通过枚举管理消息模块的接口地址
enum API {
  // 发布和获取通知信息
  MESSAGE_URL = '/message',
  // 修改信息
  UPDATEMSG_URL = '/message/updateMsgById',
  // 删除信息
  DELETEMSG_URL = '/message/deleteById',
  // 按照消息标题进行模糊查找
  SEARCHMSG_URL = '/message/searchByTitle',
}

// 发布信息
export const reqPostMessage = (formData: any) =>
  request.post<any, PostMessageResponseData>(API.MESSAGE_URL, formData);

// 获取信息
export const reqGetMessage = (
  message_category: string,
  offset: number,
  limit: number
) =>
  request.get<any, MessageResponseData>(API.MESSAGE_URL, {
    params: {
      message_category,
      offset,
      limit,
    },
  });

// 修改信息
export const reqUpdateMessage = (formData: any) =>
  request.post<any, PostMessageResponseData>(API.UPDATEMSG_URL, formData);

// 删除信息
export const reqDeleteMessage = (message_id: number) =>
  request.delete<any, ResponseData>(API.DELETEMSG_URL, {
    params: { message_id },
  });

// 按照消息标题进行模糊查找
export const reqSearchMessage = (title: string) =>
  request.get<any, MessageResponseData>(API.SEARCHMSG_URL, {
    params: { title },
  });

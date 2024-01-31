// 定义信息模块ts数据类型
export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 信息数据ts类型
export interface MessageInfo {
  id: number;
  message_title: string;
  message_category: string;
  message_content: string;
  publisher: string;
  message_publish_time: string;
  message_update_time: null;
  message_status: number;
}

export type MessageContent = MessageInfo[];

// 消息接口返回的数据ts类型
export interface MessageResponseData extends ResponseData {
  data: MessageContent;
  total: number;
}

// 发布消息成功返回的数据ts类型
export interface PostMessageResponseData extends ResponseData {
  id: number;
}

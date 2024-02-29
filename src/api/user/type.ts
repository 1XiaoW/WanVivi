export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 用户登录/注册接口需要携带的参数类型
export interface DataParameter {
  username: string;
  password: string;
}

// 登录接口返回的数据类型
export interface UserInfo {
  userId: number;
  username: string;
  token: string;
  avatar: string;
  unread_message: number;
  role: string;
}

// 登录请求返回的数据类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

/**
 * 注册请求返回的数据类型就是ResponseData
 */

// 获取用户信息返回数据类型
export interface UserDetail {
  id: number;
  username: string;
  user_pic: string;
  reg_date: string;
  nickname: string;
  email: string;
  signature: string;
}

// 用户信息请求接口返回数据类型
export interface UserDetailResponseData extends ResponseData {
  data: UserDetail[];
}

// 修改用户头像接口返回数据类型
export interface ModifyUserAvatarResponseData extends ResponseData {
  fileUrl: string;
}

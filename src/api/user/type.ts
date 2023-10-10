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
  name: string;
  token: string;
  avatar: string;
}

// 登录接口返回的数据类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

/**
 * 注册接口返回的数据类型就是ResponseData
 */

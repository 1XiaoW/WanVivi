// 用户接口
import request from '@/utils/request.ts';
import {
  DataParameter,
  ResponseData,
  UserLoginResponseData,
  UserDetailResponseData,
} from './type.ts';
// 枚举接口地址
enum API {
  // 用户登录接口
  USERLOGIN_URL = '/user/login',
  // 用户注册接口
  USERREGISTER_URL = '/user/reguser',
  // 用户信息接口GET
  USERINFO_URL = '/user/auth/userInfo/',
  // 修改用户信息接口PUT
  MODIFYUSERINFO_URL = '/user/auth/userInfo/',
  // 修改用户头像接口
  MODIFYAVATAR_URL = '/user/auth/userAvatar/',
  // 修改用户密码接口
  MODIFYPASSWORD_URL = '/user/auth/userPwd/',
}

export const reqUserLogin = (data: DataParameter) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

export const reqUserRegister = (data: DataParameter) =>
  request.post<any, ResponseData>(API.USERREGISTER_URL, data);

export const reqUserInfo = (id: number = -1) =>
  request.get<any, UserDetailResponseData>(API.USERINFO_URL + id);

export const reqModifyUserInfo = (id: any, data: any) =>
  request.put<any>(API.MODIFYUSERINFO_URL + id, data);
export const reqModifyAvatar = (id: any, formData: any) =>
  request.put<any>(API.MODIFYAVATAR_URL + id, formData);
export const reqModifyPassword = (id: any, pwd: any) =>
  request.put<any>(API.MODIFYPASSWORD_URL + id, pwd);

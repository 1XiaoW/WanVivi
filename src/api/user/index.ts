// 用户接口
import request from '@/utils/request.ts';
import { DataParameter, ResponseData, UserLoginResponseData } from './type.ts';
// 枚举接口地址
enum API {
  // 用户登录接口
  USERLOGIN_URL = '/user/login',
  // 用户注册接口
  USERREGISTER_URL = '/user/reguser',
  // 用户信息接口
  USERINFO_URL = '/user/userInfo/',
}

export const reqUserLogin = (data: DataParameter) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

export const reqUserRegister = (data: DataParameter) =>
  request.post<any, ResponseData>(API.USERREGISTER_URL, data);

export const reqUserInfo = (id: any = -1) =>
  request.get<any>(API.USERINFO_URL + id);

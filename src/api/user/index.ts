// 用户接口
import request from '@/utils/request.ts';
import {
  DataParameter,
  ResponseData,
  UserLoginResponseData,
  UserDetailResponseData,
  ModifyUserAvatarResponseData,
  DynamicListResponseData,
} from './type.ts';
// 枚举接口地址
enum API {
  // 用户登录接口
  USERLOGIN_URL = '/user/login',
  // 用户注册接口
  USERREGISTER_URL = '/user/reguser',
  // 用户信息接口GET
  USERINFO_URL = '/user/auth/userInfo/',
  // 获取用户消息读取状态
  USERREADSTATE_URL = '/user/auth/userReadState/',
  // 获取其他用户信息接口GET
  USERINFO_OTHER_URL = '/user/userInfo/',
  // 修改用户信息接口PUT
  MODIFYUSERINFO_URL = '/user/auth/userInfo/',
  // 修改用户头像接口
  MODIFYAVATAR_URL = '/user/auth/userAvatar/',
  // 修改用户签名接口
  MODIFYSIGN_URL = '/user/auth/userSign/',
  // 修改用户密码接口
  MODIFYPASSWORD_URL = '/user/auth/userPwd/',
  // 更改用户是否阅读消息状态
  READMSGSTATE_URL = '/user/auth/readMsgState/',
  // 查询动态
  DYNAMIC_URL = '/user/dynamic/',
  // 添加动态
  ADDDYNAMIC_URL = '/user/auth/addDynamic/',
  // 删除动态
  DELETEDYNAMIC_URL = '/user/auth/deleteDynamic/',
}

export const reqUserLogin = (data: DataParameter) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

export const reqUserRegister = (data: DataParameter) =>
  request.post<any, ResponseData>(API.USERREGISTER_URL, data);

export const reqUserInfo = (id: number = -1) =>
  request.get<any, UserDetailResponseData>(API.USERINFO_URL + id);

export const reqUserReadState = (id: number) =>
  request.get<any, ResponseData & { unread_message: number }>(
    API.USERREADSTATE_URL + id
  );

export const reqOtherUserInfo = (id: number = -1) =>
  request.get<any, UserDetailResponseData>(API.USERINFO_OTHER_URL + id);

export const reqModifyUserInfo = (id: number, data: object) =>
  request.put<any, ResponseData>(API.MODIFYUSERINFO_URL + id, data);

export const reqModifyAvatar = (id: number, formData: FormData) =>
  request.put<any, ModifyUserAvatarResponseData>(
    API.MODIFYAVATAR_URL + id,
    formData
  );

export const reqModifySign = (id: number, sign: string) =>
  request.put<any, ResponseData>(API.MODIFYSIGN_URL + id, { sign });

export const reqModifyPassword = (id: number, pwd: object) =>
  request.put<any, ResponseData>(API.MODIFYPASSWORD_URL + id, pwd);

export const reqChangeReadMsgState = (id: number) =>
  request.put<any, ResponseData>(API.READMSGSTATE_URL + id);

export const reqGetDynamic = (id: number) =>
  request.get<any, DynamicListResponseData>(API.DYNAMIC_URL + id);

export const reqAddDynamic = (id: number, text: Text) =>
  request.post<any, ResponseData>(API.ADDDYNAMIC_URL + id, { text });

export const reqDeleteDynamic = (id: number) =>
  request.delete<any, ResponseData>(API.DELETEDYNAMIC_URL + id);

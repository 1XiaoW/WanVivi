// 统一管理首页模块接口
import request from '@/utils/request.ts';
import type { ChannelResponseData, BannerResponseData } from './type';
// 通过枚举管理首页模块的接口地址
enum API {
  // 获取频道信息接口地址
  CHANNEL_URL = '/home/channel/list',
  // 获取轮播图信息接口地址
  BANNER_URL = '/home/banner/info',
}

// 获取频道信息
export const reqChannel = () =>
  request.get<any, ChannelResponseData>(API.CHANNEL_URL);
// 获取轮播图信息
export const reqBanner = () =>
  request.get<any, BannerResponseData>(API.BANNER_URL);

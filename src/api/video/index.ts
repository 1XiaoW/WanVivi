// 统一管理视频模块接口
import request from '@/utils/request.ts';
import { VideoResponseData } from './type.ts';

// 通过枚举管理视频模块接口的地址
enum API {
  VIDEO_URL = '/video/channel/',
}

// 获取视频信息
export const reqVideo = (channelId: number = 0) =>
  request.get<any, VideoResponseData>(API.VIDEO_URL + channelId);

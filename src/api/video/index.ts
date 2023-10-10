// 统一管理视频模块接口
import request from '@/utils/request.ts';
import {
  VideoResponseData,
  CommentsResponseData,
  VideoInfoResponseData,
} from './type.ts';

// 通过枚举管理视频模块接口的地址
enum API {
  VIDEO_URL = '/video/channel/',
  VIDEO_COMMENTS_URL = '/video/comment',
  VIDEOBYID = '/video/',
  VIDEOSUBMIT_URL = '/video/upload',
}

// 获取视频信息(可按频道取值)
export const reqVideo = (channelId: number = 0) =>
  request.get<any, VideoResponseData>(API.VIDEO_URL + channelId);

// 获取视频信息通过id
export const reqVideoById = (vId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEOBYID + `?vId=${vId}`);

// 获取视频评论
export const reqVideoComment = (
  type: string,
  source: number,
  offset: number = 1,
  limit: number = 5
) =>
  request.get<any, CommentsResponseData>(
    API.VIDEO_COMMENTS_URL +
      `?type=${type}&source=${source}&offset=${offset}&limit=${limit}`
  );

// 发布视频

export const reqSubmitVideo = (formData: any) =>
  request.post(API.VIDEOSUBMIT_URL, formData);

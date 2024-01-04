// 统一管理视频模块接口
import request from '@/utils/request.ts';
import {
  VideoResponseData,
  CommentsResponseData,
  VideoInfoResponseData,
  ResponseData,
  LikeAndCollectResponseData,
} from './type.ts';

// 通过枚举管理视频模块接口的地址
enum API {
  VIDEO_URL = '/video/channel/',
  VIDEO_COMMENTS_URL = '/video/comment/',
  VIDEOBYID = '/video/',
  VIDEOSUBMIT_URL = '/video/auth/upload',
  VIDEO_LIKE = '/video/auth/like/',
  VIDEO_COLLECT = '/video/auth/collect/',
  VIDEO_ISLIKEANDCOLLECT = '/video/auth/isLikeAndCollect/',
  VIDEO_COMMENTS_POST = '/video/auth/comment/',
  VIDEO_BYAUTHORID = '/video/getVideoListByAuthorId/',
  VIDEO_COLLECTBYAUTHORID = '/video/getCollectVideoByAuthorId/',
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
  limit: number = 5,
  com_id?: number
) =>
  request.get<any, CommentsResponseData>(
    API.VIDEO_COMMENTS_URL +
      com_id +
      `?type=${type}&source=${source}&offset=${offset}&limit=${limit}`
  );

// 发布视频
export const reqSubmitVideo = (formData: FormData) =>
  request.post<any, ResponseData>(API.VIDEOSUBMIT_URL, formData);

// 点赞功能接口
export const reqVideoLike = (itemId: number) =>
  request.post<any, ResponseData>(API.VIDEO_LIKE + itemId);

// 视频收藏功能接口
export const reqVideoCollect = (itemId: number) =>
  request.post<any, ResponseData>(API.VIDEO_COLLECT + itemId);

// 获取当前用户对视频是否点赞和收藏
export const reqLikeAndCollect = (itemId: number) =>
  request.get<any, LikeAndCollectResponseData>(
    API.VIDEO_ISLIKEANDCOLLECT + itemId
  );

// 在视频下发布评论
export const reqVideoCommentPost = (data: any) =>
  request.post<any, ResponseData>(API.VIDEO_COMMENTS_POST, data);

// 通过用户id获取用户投稿视频
export const reqVideoByAuthorId = (authorId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_BYAUTHORID, {
    params: { authorId },
  });

// 通过用户id获取用户收藏视频
export const reqCollectVideoByAuthorId = (authorId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_COLLECTBYAUTHORID, {
    params: { authorId },
  });

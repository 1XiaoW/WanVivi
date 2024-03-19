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
  VIDEO_SEARCHBYKEYWORD = '/video/getSearchVideo/',
  VIDEO_STATE = '/video/changeVideoState/',
  VIDEO_DELETE = '/video/deleteVideo/',
  VIDEO_APPROVED = '/video/approvedVideos/',
  VIDEO_COMMENTS_TOTAL = '/video/getVideoCommentTotal/',
  VIDEO_HOT = '/video/hot',
  FIVEVIDEOS_CHANNEL = '/video/getFiveVideosOfChannel/',
}

// 获取视频信息(可按频道取值)
export const reqVideo = (
  channelId: number = 0,
  state: number = 0,
  offset: number = 1,
  limit: number = 10
) =>
  request.get<any, VideoResponseData>(API.VIDEO_URL, {
    params: {
      channelId,
      state,
      offset,
      limit,
    },
  });

// 获取视频信息通过id
export const reqVideoById = (vId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEOBYID + `?vId=${vId}`);

// 获取播放量前5视频
export const reqHotVideo = () =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_HOT);

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

// 通过关键字搜索相关视频
export const reqSearchByKeyword = (keyword: string) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_SEARCHBYKEYWORD, {
    params: { keyword },
  });

// 获取当前视频的评论数
export const reqVideoCommentTotal = (vId: number) =>
  request.post<any>(API.VIDEO_COMMENTS_TOTAL, { vId });

// 获取主页特定频道每个频道的5条数据
export const reqFiveVideosOfChannel = (channelId: Array<number>) =>
  request.post<any, any>(API.FIVEVIDEOS_CHANNEL, channelId);

// ------------------视频管理------------------

// 更改投稿视频状态 0通过 1审核中 2未通过 3删除
export const reqChangeVideoState = (videoId: number, state: number) =>
  request.post<any>(API.VIDEO_STATE, { videoId, state });
// 删除视频投稿
export const reqDeleteVideo = (authorId: number) =>
  request.get<any, VideoInfoResponseData>(API.VIDEO_COLLECTBYAUTHORID, {
    params: { authorId },
  });

// 获取审核完的视频信息列表
export const reqApprovedVideo = (
  offset: number = 1,
  limit: number = 10,
  state?: string
) =>
  request.get<any, VideoResponseData>(API.VIDEO_APPROVED, {
    params: {
      offset,
      limit,
      state,
    },
  });

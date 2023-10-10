// 定义视频模块ts数据类型
export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 视频数据ts类型
export interface VideoList {
  author_id: number;
  channel: string;
  channel_id: number;
  duration: number;
  like_count: number;
  resolution: string;
  review_count: number;
  title: string;
  upload_date: string;
  url: string;
  username: string;
  video_cover: string;
  video_id: number;
  view_count: number;
}

// 单条视频信息ts类型
export interface VideoInfo {
  video_id: number;
  resolution: string;
  url: string;
  video_cover: string;
  username: string;
  channel: string;
  id: number;
  title: string;
  duration: number;
  upload_date: Date;
  view_count: number;
  like_count: number;
  review_count: number;
  author_id: number;
  channel_id: number;
  brief: string;
}

// 评论result里的数据
export interface CommentsResult {
  com_id: number;
  aut_id: number;
  like_count: number;
  reply_count: number;
  pubdate: Date;
  content: string;
  is_top: false;
  is_liking: true;
  type: string;
  vid: number;
  username: string;
  nickname: string;
  user_pic: string;
}

export type CommentsResultContent = CommentsResult[];

// 评论数据ts类型
export interface Comments {
  total: number;
  page: number;
  result: CommentsResultContent;
}

export type VideoContent = VideoList[];

// 视频接口返回的ts数据类型
export interface VideoResponseData extends ResponseData {
  data: VideoContent;
}

// 一个视频信息接口返回的ts数据类型
export interface VideoInfoResponseData extends ResponseData {
  data: VideoInfo[];
}
// 评论接口返回的ts数据类型
export interface CommentsResponseData extends ResponseData {
  data: Comments;
}

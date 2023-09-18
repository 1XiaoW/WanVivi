// 定义视频模块ts数据类型
export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 视频数据ts类型
export interface VideoInfo {
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

export type VideoContent = VideoInfo[];

// 视频接口返回的ts数据类型
export interface VideoResponseData extends ResponseData {
  data: VideoContent;
}

// 定义首页模块ts数据类型
export interface ResponseData {
  status: number;
  message: string;
  success: boolean;
}

// 频道数据ts类型
export interface ChannelInfo {
  id: number;
  channel: string;
}

export type ChannelContent = ChannelInfo[];

// 频道接口返回的数据ts类型
export interface ChannelResponseData extends ResponseData {
  data: ChannelContent;
}

// 轮播图数据类型
export interface BannerInfo {
  id: number;
  title: string;
  sort_order: number;
  image_url: string;
  bottom_color: string;
}

export type BannerContent = BannerInfo[];

// 轮播图接口返回的数据ts类型
export interface BannerResponseData extends ResponseData {
  data: BannerContent;
}

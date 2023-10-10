// 定义用户相关的仓库
import { defineStore } from 'pinia';
import type { ChannelContent, ChannelResponseData } from '@/api/home/type.ts';

import { reqChannel } from '@/api/home/index.ts';

const useChannelStore = defineStore('Channel', {
  state: () => {
    return {
      channelList: <ChannelContent>[],
    };
  },
  actions: {
    async getChannelList() {
      let result: ChannelResponseData = await reqChannel();
      if (result.status == 200) {
        this.channelList = result.data;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
});

export default useChannelStore;

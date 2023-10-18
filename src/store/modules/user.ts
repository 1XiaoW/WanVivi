// 定义用户相关的仓库
import { defineStore } from 'pinia';

import { reqUserLogin } from '@/api/user';
import { DataParameter } from '@/api/user/type';

import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/user';
const useUserStore = defineStore('User', {
  state: () => {
    return {
      visible: false, // 用于控制登录注册组件的dialog显示与隐藏
      isLogin: false, // 用于控制是否为登录状态
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },
  actions: {
    // 用户登录方法
    async userLogin(dataParam: DataParameter) {
      //登录请求
      let result = await reqUserLogin(dataParam);
      console.log(result);
      if (result.status == 200) {
        this.userInfo = result.data;
        //本地存储持久化存储用户信息
        SET_TOKEN(JSON.stringify(this.userInfo));
        //返回一个成功的promise
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    //退出登录的方法
    async logout() {
      //清空仓库的数据
      this.userInfo = { name: '', token: '', userId: '', avatar: '' };
      //清空本地存储的数据
      REMOVE_TOKEN();
    },

    // 更新用户信息方法
    async updateUserInfo(userInfo: any) {
      if (userInfo) {
        REMOVE_TOKEN();
        this.userInfo = { ...this.userInfo, avatar: userInfo };
        SET_TOKEN(JSON.stringify(this.userInfo));
      }
    },
  },
});

export default useUserStore;

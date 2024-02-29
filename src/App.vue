<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <!-- <WanViviTop /> -->
    <!-- 展示路由组件区域 -->
    <!-- <div class="content">
      <router-view></router-view>
    </div> -->
    <!-- 底部全局组件 -->
    <!-- <WanViviBottom /> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import autofit from './utils/autofit.js';
import useUserStore from '@/store/modules/user';
import { onMounted } from 'vue';
import { GET_TOKEN } from './utils/user';
import request from '@/utils/request';

let userStore = useUserStore();

const loading = async () => {
  if (GET_TOKEN()) {
    try {
      await request.get('/auth');
    } catch (err) {
      userStore.logout();
    }
  } else {
    console.log('没有token');
  }
};
loading();

onMounted(async () => {
  // autofit.init({ dh: 768, dw: 1366, el: '#app', resize: true });
});
</script>

<style lang="scss" scoped>
.container {
  // margin: 0 auto;
  position: relative;
  .content {
    // margin-top: 70px;
    width: 1400px;
    // display: flex;
    // justify-content: center;
    margin: auto;
    // min-height: 600px;
    // .scaled-content {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    // }
  }
}
</style>

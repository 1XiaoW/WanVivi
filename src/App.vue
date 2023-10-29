<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <WanViviTop />
    <!-- 展示路由组件区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- 底部全局组件 -->
    <WanViviBottom />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import autofit from './utils/autofit.js';
import { onMounted } from 'vue';
import { GET_TOKEN, REMOVE_TOKEN } from './utils/user';
import request from '@/utils/request';
onMounted(async () => {
  if (GET_TOKEN()) {
    const res = await request.get('/auth');
    if (res.status === 200) return;
    else REMOVE_TOKEN();
  }
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

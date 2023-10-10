<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <WanViviTop />
    <!-- 展示路由组件区域 -->
    <div class="content scaled-content">
      <router-view></router-view>
    </div>
    <!-- 底部全局组件 -->
    <WanViviBottom />
  </div>
</template>

<script setup lang="ts"></script>

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
  // @media (max-width: 800px) {
  //   .scaled-content {
  //     transform: scale(0.8);
  //     transform-origin: center;
  //   }
  // }
}
</style>

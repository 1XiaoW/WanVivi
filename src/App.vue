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

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  // margin: 0 auto;
  position: relative;

  .content {
    // margin-top: 70px;
    width: 1400px;

    margin: 0 auto;
    // min-height: 600px;
  }
}
</style>

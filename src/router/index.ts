import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  // 路由的模式设置
  history: createWebHashHistory(),
  // 管理路由
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/music',
      component: () => import('@/pages/music/index.vue'),
    },
    {
      path: '/video',
      component: () => import('@/pages/video/index.vue'),
    },
    {
      path: '/',
      redirect: 'home',
    },
  ],
});

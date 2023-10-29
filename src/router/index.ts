import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  // 路由的模式设置
  history: createWebHashHistory(),
  // 管理路由
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/submit',
      component: () => import('@/pages/submit/index.vue'),
    },
    {
      path: '/video',
      component: () => import('@/pages/video/index.vue'),
    },
    {
      path: '/userInfo',
      component: () => import('@/pages/user/userInfo.vue'),
    },
    {
      path: '/',
      redirect: 'home',
    },
  ],
});

router.beforeEach((to: any, from: any, next: any) => {
  //判断该用户有没有登录过
  next();
});

export default router;

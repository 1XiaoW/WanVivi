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
      path: '/userSpace/:userId',
      component: () => import('@/pages/user/userSpace.vue'),
      redirect: { name: 'home' },
      children: [
        {
          path: 'dynamic',
          name: 'dynamic',
          component: () => import('@/pages/user/UserDynamic/index.vue'),
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/pages/user/UserHome/index.vue'),
        },
        {
          path: 'star',
          name: 'star',
          component: () => import('@/pages/user/UserStar/index.vue'),
        },
        {
          path: 'uploads',
          name: 'uploads',
          component: () => import('@/pages/user/UserUploads/index.vue'),
        },
      ],
    },
    {
      path: '/search',
      component: () => import('@/pages/search/index.vue'),
      props: (route) => ({ query: route.query.keyword }),
    },
    {
      path: '/',
      redirect: 'home',
    },
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: () => import('@/pages/404/index.vue'),
    },
  ],
});

router.beforeEach((to: any, from: any, next: any) => {
  //判断该用户有没有登录过
  next();
});

export default router;

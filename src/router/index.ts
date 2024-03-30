import { createRouter, createWebHashHistory } from 'vue-router';
import { GET_TOKEN } from '@/utils/user';
import { ElMessage } from 'element-plus';

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
      meta: { requiresAuth: true },
    },
    {
      path: '/video',
      component: () => import('@/pages/video/index.vue'),
    },
    {
      path: '/userInfo',
      component: () => import('@/pages/user/userInfo.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/userSpace/:userId',
      component: () => import('@/pages/user/userSpace.vue'),
      redirect: { name: 'home' },
      meta: { requiresAuth: true },
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
      props: (route) => ({
        query: route.query.keyword,
        channelId: route.query.channelId,
      }),
    },
    {
      path: '/message',
      component: () => import('@/pages/message/index.vue'),
      redirect: { name: 'system' },
      meta: { requiresAuth: true },
      children: [
        {
          name: 'system',
          path: 'system',
          component: () => import('@/pages/message/system/index.vue'),
        },
        {
          name: 'feedback',
          path: 'feedback',
          component: () => import('@/pages/message/feedback/index.vue'),
        },
      ],
    },
    {
      name: 'manage',
      path: '/manage',
      component: () => import('@/pages/manage/index.vue'),
      redirect: { name: 'message' },
      meta: { requiresAuth: true },
      children: [
        {
          name: 'message',
          path: 'message',
          component: () => import('@/pages/manage/message/index.vue'),
        },
        {
          path: 'review',
          component: () => import('@/pages/manage/video/reviewList.vue'),
        },
        {
          path: 'audited',
          component: () => import('@/pages/manage/video/audited.vue'),
        },
        {
          path: 'user',
          component: () => import('@/pages/manage/user/index.vue'),
        },
        {
          path: 'comment',
          component: () => import('@/pages/manage/comment/index.vue'),
        },
      ],
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
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    // 判断该路由是否需要登录验证
    if (!GET_TOKEN()) {
      // 如果用户未登录，则跳转到登录页面
      next('/home');
      ElMessage.error('用户未登录');
    } else {
      // 如果用户已登录，则允许进入路由
      next();
    }
  } else {
    // 如果不需要登录验证，则直接进入路由
    next();
  }
});

export default router;

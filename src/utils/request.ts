// 对axios函数进行二次封装
import axios from 'axios';
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';
// @ts-ignore
import { ElMessage } from 'element-plus';

// 利用axios.create方法创建一个axios实例：可以设置基础路径、超时时间
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(config => {
  // 获取用户仓库
  let userStore = useUserStore();
  // token：公共参数，如果用户登录了要携带
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  // 一定要将config返回出去不然会卡在这里
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 因为axios返回数据会套一层data，不想那么多data嵌套直接返回response.data
    return response.data;
  },
  error => {
    // 处理http网络错误
    let status = error.response?.status;
    switch (status) {
      case 404:
        //错误提示信息
        ElMessage({
          type: 'error',
          message: '请求失败，未找到此文件',
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: 'error',
          message: '服务器未响应',
        });
        break;
      case 402:
        ElMessage({
          type: 'error',
          message: '参数有误',
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

// 对外暴露axios
export default request;

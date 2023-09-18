// vue3框架提供的方法createApp方法，可以用来创建应用实例方法
import { createApp } from 'vue';
// 引入清除默认样式
import '@/style/reset.scss';
// 引入根组件App
import App from './App.vue';

// 引入vue-router核心插件并安装
import router from '@/router';

// 引入顶部组件
import WanViviTop from '@/components/WanVivi_top/index.vue';
// 引入小视频盒子组件
import VideoBox from '@/components/Video_box/index.vue';
// 引入底部组件
import WanViviBottom from '@/components/WanVivi_bottom/index.vue';
// 引入ElementUI
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//国际化文件
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

// 利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App);

app.component('WanViviTop', WanViviTop);
app.component('VideoBox', VideoBox);
app.component('WanViviBottom', WanViviBottom);

// 安装vue-router
app.use(router);
// 安装ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
});
// 挂载
app.mount('#app');

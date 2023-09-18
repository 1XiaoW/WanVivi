<template>
  <div class="carousel" @mouseover="stopAutoPlay()" @mouseout="startAutoPlay()">
    <!-- 存放要轮播的图片 -->
    <div class="img-box">
      <img
        :src="server_url + item.image_url"
        alt=""
        v-for="item in bannerArr"
        :key="item.sort_order" />
    </div>
    <!-- 轮播图底部 -->
    <div
      class="bottom-box"
      :style="{ '--b-color': bannerArr[active_index]?.bottom_color }">
      <!-- 轮播图左侧--小圆点 -->
      <div class="l-box">
        <div class="title">{{ bannerArr[active_index]?.title }}</div>
        <ul class="dots">
          <!-- 吃豆人 -->
          <li
            :class="[
              index == active_index ? 'pacman' : 'dot',
              is_prev ? 'l' : '',
            ]"
            v-for="(item, index) in bannerArr"
            :key="index"
            @click="changeBanner(index)">
            <div v-if="index == active_index"></div>
            <div v-if="index == active_index"></div>
          </li>
        </ul>
      </div>
      <!-- 轮播图右侧--箭头 -->
      <div class="r-box">
        <el-icon @click="changeBanner(-1, true)"><ArrowLeft /></el-icon>
        <el-icon @click="changeBanner(-1, false)"><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { reqBanner } from '@/api/home/index.ts';
import type { BannerContent, BannerResponseData } from '@/api/home/type.ts';

// 轮播图数据
let bannerArr = ref<BannerContent>([]);
let server_url = import.meta.env.VITE_SERVER_URL;
// 定时器
let timer: any = null;
// 当前轮播下标
let active_index = ref<number>(0);
// 是否点击上一张（控制吃豆人朝向）
let is_prev = ref<boolean>(false);
// 轮播图数据（json格式）
// let list = reactive([
//   {
//     title: '标题一',
//     image: `/src/assets/images/lb1.avif`,
//     bottom_color: '#AB2E3E',
//   },
//   {
//     title: '标题二',
//     image: '/src/assets/images/lb2.webp',
//     bottom_color: '#2c84cd',
//   },
//   {
//     title: '标题三',
//     image: '/src/assets/images/lb3.webp',
//     bottom_color: '#49a4d8',
//   },
//   {
//     title: '标题四',
//     image: '/src/assets/images/lb4.avif',
//     bottom_color: '#4e4e4e',
//   },
// ]);

// 停止轮播
const stopAutoPlay = () => {
  // 清空定时器
  clearInterval(timer);
};
// 开始轮播
const startAutoPlay = () => {
  // 停止轮播
  stopAutoPlay();
  timer = setInterval(() => {
    active_index.value++;
    if (active_index.value > bannerArr.value.length - 1) {
      active_index.value = 0;
    }
    is_prev.value = false;
    changeBanner(active_index.value, is_prev.value);
  }, 3000);
};
// 切换banner 参数：index=轮播下标（点击上一张，下一张按钮时，该值为-1；点击指示器时，
// 该值为对应的轮播下标），is_prev=是否上一张（true为上一张，false为下一张）
const changeBanner = (index: any, is_prev1?: any) => {
  if (index >= 0) {
    // 点击指示器时
    // 默认下一张吃豆人在右
    is_prev1 = false;
    if (index < active_index.value) {
      // 点击时轮播下标小于当前轮播下标时，则为上一张，吃豆人向左
      is_prev1 = true;
    }
    // 设置当前轮播下标
    active_index.value = index;
  } else {
    // 点击按钮时
    if (is_prev1) {
      // 上一张
      active_index.value--;
      if (active_index.value < 0) {
        active_index.value = bannerArr.value.length - 1;
      }
    } else {
      // 下一张
      active_index.value++;
      if (active_index.value > bannerArr.value.length - 1) {
        active_index.value = 0;
      }
    }
    // 指明上一张或下一张
    is_prev.value = is_prev1;
  }
  // --m-left,--b-color是css的自定义属性、
  // 设置偏移量到达显示指定图片的目的
  (document.querySelector('.img-box') as HTMLElement).style.setProperty(
    '--m-left',
    `${active_index.value}`
  );
  // 设置图片底部的渐变效果,此处暂时不用，直接在div 绑定 style
  // (document.querySelector('.bottom-box') as HTMLElement).style.setProperty(
  //   '--b-color',
  //   list[active_index.value].bottom_color
  // );
};
onMounted(() => {
  // 初始化自动轮播
  startAutoPlay();
  // 获取轮播图数据
  getBannerInfo();
});

// 获取轮播图数据
const getBannerInfo = async () => {
  let result: BannerResponseData = await reqBanner();
  if (result.status == 200) bannerArr.value = result.data;
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 550px;
  height: 390px;
  background-color: pink;
  border-radius: 6px;
  overflow: hidden;
  .img-box {
    display: flex;
    width: 550px;
    height: 310px;
    transform: translateX(calc(-550px * var(--m-left)));
    transition: 0.35s;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .bottom-box {
    height: 80px;
    display: flex;
    background-color: var(--b-color);
    color: #fff;
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 50px;
      background: linear-gradient(to bottom, transparent, var(--b-color));
      position: absolute;
      top: -50px;
    }
    .l-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 12px;
      width: 458px;
    }
    .title {
      width: 100%;
      font-size: 18px;
      line-height: 25px;
      // 标题不换行，溢出显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dots {
      display: flex;
      margin-top: 10px;
    }
    li {
      width: 8px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.4);
      margin: 4px;
      border-radius: 50%;
      cursor: pointer;

      &.pacman {
        position: relative;
        width: 14px;
        height: 14px;
        background-color: transparent;
        margin-top: 1px;
        div {
          width: 0;
          height: 0;
          border: 7px solid #fff;
          border-radius: 50%;
          border-right-width: 7px;
          border-right-color: transparent;
          position: absolute;
        }
        // 吃豆人转向
        &.l {
          transform: rotate(180deg);
        }
        div:nth-child(1) {
          // 执行动画：动画名 时长 线性的 停留在最后一帧
          animation: pacman1 0.75s linear forwards;
        }
        div:nth-child(2) {
          animation: pacman2 0.75s linear forwards;
        }
      }
    }
    .r-box {
      display: flex;
      padding-top: 12px;
      padding-left: 12px;
      :deep(.el-icon) {
        background-color: rgba(255, 255, 255, 0.1);
        width: 28px;
        height: 28px;
        display: flex;
        justify-self: center;
        align-items: center;
        border-radius: 8px;
        font-size: 16px;
        margin-right: 12px;
        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
}
// 定义吃豆人动画
@keyframes pacman1 {
  0% {
    transform: rotate(360deg);
  }
  40% {
    transform: rotate(270deg);
  }
  60% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes pacman2 {
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(90deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
</style>

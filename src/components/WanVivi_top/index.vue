<template>
  <div class="top">
    <div class="top_banner">
      <div
        class="vidContainer"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave">
        <video
          class="vid"
          ref="vidRef"
          loop
          :autoplay="true"
          :muted="true"
          src="../../assets/video/3.webm"></video>
      </div>
    </div>
    <div :class="{ top_nav: true, top_nav_fixed: isFixed }">
      <div class="left">
        <ul>
          <li>
            <svg
              t="1693643620812"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7527"
              width="16"
              height="16">
              <path
                d="M866.413446 465.182101a36.750038 36.750038 0 0 1-37.262036-36.238041c0-20.024789 16.668361-36.238041 37.205147-36.238041 20.536786 0 37.205147 16.213252 37.205147 36.238041a36.750038 36.750038 0 0 1-37.205147 36.238041z m0 160.084533a36.750038 36.750038 0 0 1-37.262036-36.238041c0-20.024789 16.668361-36.238041 37.205147-36.238041 20.536786 0 37.205147 16.213252 37.205147 36.238041a36.750038 36.750038 0 0 1-37.205147 36.238041z m0 160.084533a36.750038 36.750038 0 0 1-37.262036-36.238041c0-20.024789 16.668361-36.238041 37.205147-36.238041 20.536786 0 37.205147 16.213252 37.205147 36.238041a36.750038 36.750038 0 0 1-37.205147 36.238041z m-100.806607 0c0 43.292228-36.124264 78.506274-80.554264 78.506274H161.165416c-44.43 0-80.554264-35.214046-80.554264-78.506274V392.706019c0-43.292228 36.124264-78.506274 80.554264-78.506274h523.887159c44.43 0 80.554264 35.214046 80.554264 78.506274v392.645148z m40.33402-549.714585h-208.439847a117.986966 117.986966 0 0 0-34.588271-49.606863l111.672331-108.827901c3.356428 0.853329 6.826633 1.365327 10.467503 1.365327a39.822023 39.822023 0 0 0 40.277132-39.253137 39.822023 39.822023 0 0 0-40.277132-39.310026 39.822023 39.822023 0 0 0-40.334021 39.253137c0 3.527093 0.511997 6.94041 1.365327 10.18306L527.414252 165.094712a123.334494 123.334494 0 0 0-87.722228 0L321.022395 49.497068A38.342919 38.342919 0 0 0 322.387721 39.257119 39.822023 39.822023 0 0 0 282.053701 0.003982a39.822023 39.822023 0 0 0-40.277132 39.253137 39.822023 39.822023 0 0 0 40.277132 39.253137 41.244238 41.244238 0 0 0 10.467503-1.308438L404.193535 186.029719a117.986966 117.986966 0 0 0-34.588272 49.606863H161.165416C72.248528 235.636582 0 305.950897 0 392.64913v392.702037c0 86.755122 72.191639 157.069437 161.165416 157.069436h0.056889v52.906403c0 25.486095 31.630064 38.229142 50.061972 20.252343l75.092958-73.158746h394.351806l75.092958 73.158746c18.431908 17.976799 50.061972 5.233752 50.061972-20.252343v-52.906403c89.030666 0 161.222305-70.314315 161.222305-157.012548V392.64913c0-86.755122-72.191639-157.069437-161.165417-157.069437z"
                fill="#FF5300"
                p-id="7528"></path>
            </svg>
            首页
          </li>
          <li>番剧</li>
          <li>直播</li>
          <li>游戏中心</li>
          <li>会员购</li>
          <li>漫画</li>
          <li>赛事</li>
          <li>
            <svg
              t="1693644620713"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8552"
              width="16"
              height="16">
              <path
                d="M792.832 485.856c-12.512-12.544-32.8-12.48-45.248-0.032L544 688.992 544 128c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 563.04-234.048-235.456c-12.48-12.576-32.704-12.64-45.248-0.128-12.544 12.448-12.608 32.704-0.128 45.248l287.52 289.248c3.168 3.2 6.88 5.536 10.816 7.136C502.912 798.88 507.296 800 512 800c11.296 0 20.704-6.176 26.4-14.976l254.368-253.952C805.312 518.624 805.312 498.368 792.832 485.856z"
                fill="#fff"
                p-id="8553"></path>
              <path
                d="M864 928 160 928c-17.664 0-32-14.304-32-32s14.336-32 32-32l704 0c17.696 0 32 14.304 32 32S881.696 928 864 928z"
                fill="#fff"
                p-id="8554"></path>
            </svg>
            下载客户端
          </li>
        </ul>
      </div>
      <div class="middle">
        <search />
      </div>
      <div class="right">
        <ul>
          <li><div class="avatar"></div></li>
          <li>
            <el-icon size="18"><Search /></el-icon>小会员
          </li>
          <li>
            <el-icon size="18"><Search /></el-icon>消息
          </li>
          <li>
            <el-icon size="18"><Search /></el-icon>动态
          </li>
          <li>
            <el-icon size="18"><Search /></el-icon>收藏
          </li>
          <li>
            <el-icon size="18"><Search /></el-icon>历史
          </li>
          <li>
            <el-icon size="18"><Search /></el-icon>创作中心
          </li>
          <el-button size="default" type="danger" :icon="Upload"
            >投稿</el-button
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { VideoCamera, Download, Search, Upload } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
//@ts-ignore
import search from './search/index.vue';

let vidRef = ref();
let x: number = 0;
let _x = null;
let isFixed = ref<boolean>(false);
onMounted(() => {
  document.addEventListener('scroll', getWindowY);
});

const handleMouseEnter = (e: MouseEvent) => {
  x = e.clientX;
  vidRef.value.style.transition = 'none';
};

const handleMouseMove = (e: MouseEvent) => {
  _x = e.clientX;
  const disx = _x - x;
  const move = 0 - disx / -30;
  vidRef.value.style.transform = `translate(${move}px, 0px)`;
};

const handleMouseLeave = () => {
  vidRef.value.style.transition = '.3s ';
  vidRef.value.style.transform = 'translate(0,0)';
};

const getWindowY = () => {
  if (window.scrollY > 64) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};
</script>

<style lang="scss" scoped>
.top {
  position: relative;
}
.top_nav {
  position: absolute;
  top: 0;
  z-index: 100;
  text-align: left;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  padding: 0 24px;
  max-width: 2560px;
  min-width: 1124px;
  width: 100%;
  height: 64px;
  ::v-deep(.el-icon) {
    vertical-align: bottom;
  }
  .left {
    ul {
      display: flex;
      li {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        margin: 0 7px;
        &:hover {
          animation: bounce 0.3s linear;
        }
        svg {
          vertical-align: middle;
        }
      }
    }
  }
  .middle {
    flex: 1;
  }
  .right {
    ul {
      display: flex;
      li {
        cursor: pointer;
        &:hover {
          ::v-deep(.el-icon) {
            animation: bounce 0.3s linear;
          }
        }
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #ccc;
          border-radius: 50%;
        }
        ::v-deep(.el-icon) {
          margin-bottom: 5px;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 7px;
      }
    }
  }
}
.top_nav_fixed {
  position: fixed;
  color: black;
  background-color: #fff;
}
.top_banner {
  position: relative;
  min-width: 1124px;
  top: 0;
  .vidContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .vid {
    position: relative;
    width: 120%;
    height: 100%;
    transition: all 0.8s;
  }
}
/* 定义动画关键帧 */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(-4px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

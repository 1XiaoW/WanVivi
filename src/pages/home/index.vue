<script setup lang="ts">
// import { Document } from '@element-plus/icons-vue';
// 引入轮播图组件
import carousel from './carousel/index.vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref, toRef } from 'vue';
import { reqVideo, reqFiveVideosOfChannel } from '@/api/video/index.ts';
import { useRouter } from 'vue-router';
import type { VideoResponseData, VideoContent } from '@/api/video/type.ts';
// 以下代码有pinia接管
// import { reqChannel } from '@/api/home/index.ts';
// import type { ChannelContent, ChannelResponseData } from '@/api/home/type.ts';
// let channelArr = ref<ChannelContent>([]);
import useChannelStore from '@/store/modules/channel.ts';
let videoArr = ref<VideoContent>([]);
let $router = useRouter();
let useChannel = useChannelStore();
const channelVideosList = ref<Array<VideoContent>>([]);

const animationRef = ref();
const filmRef = ref();
const musicRef = ref();
const danceRef = ref();
const matchRef = ref();

// 组件挂载完毕发送一次请求
onMounted(() => {
  getChannelInfo();
  getVideoList();
});

// 获取频道数据
const getChannelInfo = async () => {
  try {
    await useChannel.getChannelList();
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '获取频道列表失败',
    });
  }
};
// 获取视频列表
const getVideoList = async () => {
  const fiveVideos = await reqFiveVideosOfChannel([
    1029, 1040, 1027, 1031, 1039,
  ]);
  channelVideosList.value = fiveVideos.data;

  let result: VideoResponseData = await reqVideo(0, 0, 1, 9999);
  if (result.status == 200) {
    const arrIndex: Array<number> = [];
    const arrformat: Array<any> = [];
    if (result.data.length <= 6) videoArr.value = result.data;
    else {
      while (result.data.length >= 6 && arrIndex.length < 6) {
        let random = Math.floor(Math.random() * result.data.length);
        if (!arrIndex.includes(random)) {
          arrIndex.push(random);
          arrformat.push(result.data[random]);
        }
      }
      videoArr.value = arrformat;
    }
  }
};

// 视频盒子点击事件
const videoBoxHandler = async (vid: number) => {
  $router.push({ path: '/video', query: { videoId: vid } });
};

const scrollPosition = (plate: number) => {
  let plateRef;
  switch (plate) {
    case 0:
      plateRef = animationRef.value;
      break;
    case 1:
      plateRef = filmRef.value;
      break;
    case 2:
      plateRef = musicRef.value;
      break;
    case 3:
      plateRef = danceRef.value;
      break;
    case 4:
      plateRef = matchRef.value;
      break;
  }
  const targetPosition =
    plateRef.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="home-container">
    <WanViviTop @scroll-position="scrollPosition" />
    <div class="content">
      <!-- 主页顶部 -->
      <div class="top">
        <!-- 左侧大分类 -->
        <ul>
          <li>
            <img
              src="../../assets/images/welcome.gif"
              alt=""
              style="width: 100px" />
            <span>欢迎访问</span>
          </li>
          <!-- <li>
            <div class="avatar"></div>
            <span>动态</span>
          </li>
          <li>
            <div class="avatar">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-bg--icon">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.89054 17.272L4.89277 17.2742C6.49674 18.8782 8.66472 19.7888 10.9624 19.7888C13.2503 19.7888 15.2113 19.0539 16.6107 17.6108L16.6108 17.6108L16.6128 17.6086C18.0002 16.1345 18.7835 14.182 18.7421 12.1819C18.7852 11.3835 18.6916 9.36321 17.4088 6.75488L17.4082 6.7537C17.209 6.35523 16.8163 6.06598 16.3391 5.96993C15.8904 5.87103 15.4021 6.01997 15.061 6.35741C14.9094 6.48781 14.7796 6.61755 14.6655 6.7317L14.6637 6.73348L14.6329 6.76426C14.2107 3.35588 12.6083 1.7368 11.1654 1.00465C11.148 0.987812 11.1265 0.967972 11.1036 0.950782C11.0775 0.931205 11.0311 0.900467 10.9694 0.888912C10.2276 0.608301 9.41043 1.01168 9.1237 1.77629L9.12314 1.7778C8.50566 3.46558 7.35287 4.62281 6.16627 5.76704C4.51756 7.33121 2.75938 9.03623 2.80163 12.093C2.75906 14.055 3.54464 15.8826 4.89054 17.272ZM3.04999 13.0648C3.01092 12.7459 2.99439 12.4218 3.00168 12.0939C2.95933 9.12977 4.6531 7.47834 6.30453 5.9116C7.49017 4.76831 8.67581 3.58267 9.31098 1.84655C9.56504 1.16904 10.2849 0.830288 10.9201 1.08435C10.9624 1.08435 11.0048 1.1267 11.0471 1.16904C11.9267 1.60884 12.8853 2.39635 13.5753 3.77299C12.8853 2.39633 11.9267 1.6088 11.0471 1.16901C11.0047 1.12666 10.9624 1.08432 10.9201 1.08432C10.2849 0.830251 9.56503 1.16901 9.31097 1.84651C8.6758 3.58263 7.49016 4.76827 6.30452 5.91157C4.65309 7.47831 2.95932 9.12973 3.00166 12.0938C2.99438 12.4218 3.01092 12.7459 3.04999 13.0648ZM14.477 7.18189C14.477 7.1819 14.477 7.18192 14.477 7.18193C14.5828 7.09724 14.6887 6.99138 14.8052 6.87493C14.9216 6.75849 15.0486 6.63146 15.1968 6.50442C15.4932 6.20801 15.9167 6.08098 16.2978 6.16567C16.7212 6.25036 17.06 6.50443 17.2294 6.84318C17.3088 7.0046 17.3835 7.16371 17.4539 7.32035C17.3835 7.1637 17.3087 7.00458 17.2294 6.84314C17.06 6.50439 16.7212 6.25032 16.2978 6.16563C15.9167 6.08094 15.4932 6.20798 15.1968 6.50439C15.0486 6.63142 14.9216 6.75845 14.8051 6.87489L14.8051 6.8749C14.7557 6.92437 14.7081 6.97191 14.6617 7.01675C14.5988 7.07745 14.5379 7.13318 14.477 7.18189ZM12.6977 6.35925C12.8428 7.15476 12.8833 7.97963 12.8679 8.74864C12.8679 8.79032 12.8704 8.8315 12.8754 8.87195C12.8704 8.83151 12.8679 8.79035 12.8679 8.74867C12.8833 7.97966 12.8428 7.15478 12.6977 6.35925ZM16.7358 10.6654C16.8108 11.1478 16.8483 11.6393 16.8483 12.1362V12.1786C16.8483 13.703 16.2978 15.2274 15.2392 16.3283C14.0535 17.4293 12.5291 18.0221 10.9201 17.9374C9.1416 17.9374 7.44783 17.2175 6.21984 15.9472C5.82743 15.5548 5.50448 15.1119 5.25584 14.6331C5.50447 15.1119 5.82743 15.5548 6.21983 15.9472C7.44782 17.2175 9.14159 17.9373 10.9201 17.9373C12.5291 18.022 14.0535 17.4292 15.2392 16.3283C16.2978 15.2273 16.8483 13.7029 16.8483 12.1785V12.1362C16.8483 11.6393 16.8108 11.1478 16.7358 10.6654ZM10.9306 17.7376C12.4802 17.8192 13.9509 17.2497 15.0989 16.1856C16.1154 15.1261 16.6483 13.655 16.6483 12.1785V12.1362C16.6483 10.8624 16.3969 9.6266 15.8955 8.49474C15.2436 9.11663 14.7845 9.49093 14.4179 9.68717C14.2122 9.79725 14.0268 9.85633 13.846 9.86789C13.6644 9.8795 13.5028 9.84219 13.3473 9.78249C12.9207 9.62211 12.6679 9.20129 12.6679 8.74864V8.74464L12.6679 8.74464C12.6889 7.69735 12.6046 6.55594 12.2954 5.53554C12.01 4.59379 11.5372 3.76766 10.7904 3.20655C9.96581 4.94926 8.72521 6.18561 7.58695 7.28323L7.50836 7.35967C5.97191 8.85397 4.81321 9.98087 4.85306 12.1325L4.85313 12.1362H4.85309C4.85309 13.5239 5.38326 14.8277 6.36125 15.8057L6.36365 15.8081L6.36363 15.8082C7.55387 17.0394 9.19573 17.7374 10.9201 17.7374H10.9306L10.9306 17.7376Z"
                  fill="#ffffff"></path>
              </svg>
            </div>
            <span>热门</span>
          </li> -->
          <!-- <li>
          <div class="avatar"></div>
          <span>频道</span>
        </li> -->
        </ul>
        <!-- 中间小分类 -->
        <div class="top_middle">
          <el-button
            size="default"
            class="category"
            text
            bg
            v-for="(item, index) in useChannel.channelList"
            :key="index"
            >{{ item.channel }}</el-button
          >
        </div>
        <div class="line"></div>
        <!-- 右侧其他栏目 -->
        <div class="top_right">
          <img src="../../assets/images/logo.jpg" alt="" />
          <!-- <el-button class="button" link :icon="Document"> 专栏 </el-button>
          <el-button class="button" link :icon="Document"> 活动 </el-button>
          <el-button class="button" link :icon="Document"> 社区中心 </el-button>
          <el-button class="button" link :icon="Document"> 直播 </el-button>
          <el-button class="button" link :icon="Document"> 课堂 </el-button>
          <el-button class="button" link :icon="Document"> 新歌热榜 </el-button> -->
        </div>
      </div>
      <!-- 主页内容区-第一部分 -->
      <div class="first-section">
        <div class="left">
          <!-- 轮播图 -->
          <carousel />
        </div>
        <div class="right">
          <div class="videoBox">
            <div
              v-for="(item, index) in videoArr"
              :key="index"
              class="videoBox_item">
              <VideoBox
                :videoInfo="item"
                @click="videoBoxHandler(item.video_id)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 推广广告部分 -->
      <div class="first-report-section">
        <div class="f-left-wrapper">
          <div class="f-left-header">
            <div class="fa fa-paper-plane"></div>
            <div style="font-size: 20px; margin-right: 20px">推广</div>
            <div style="font-size: 12px; color: #505050; line-height: 24.8px">
              <span
                class="fa fa-fire"
                style="
                  color: #f0361b;
                  font-size: 15px;
                  margin-right: 5px;
                "></span>
              萌系星探官招募中
            </div>
          </div>
          <div class="f-left-content">
            <div>
              <img src="../../assets/images/report1.webp" alt="" />
              <p>剧场版大雄究竟有多强！</p>
              <span class="up" style="color: #99a6c4; margin-top: 15px">UP</span
              >沐沐秋
            </div>
            <div>
              <img src="../../assets/images/report2.webp" alt="" />
              <p>战斗吧！素质</p>
              <span class="up" style="color: #99a6c4; margin-top: 15px">UP</span
              >沐沐秋
            </div>
            <div>
              <img src="../../assets/images/report3.webp" alt="" />
              <p>耗时半年！up主用中文填词的</p>
              <span class="up" style="color: #99a6c4; margin-top: 15px">UP</span
              >沐沐秋
            </div>
            <div>
              <img src="../../assets/images/report4.webp" alt="" />
              <p>4K /60FPS紫罗兰永恒花园</p>
              <span class="up" style="color: #99a6c4; margin-top: 15px">UP</span
              >沐沐秋
            </div>
          </div>
        </div>
        <div class="f-right-wrapper">
          <div class="f-right-header">
            <h2>观看列表</h2>
          </div>
          <div class="f-right-content">
            <img src="../../assets/images/fenli.jpg" style="width: 320px" />
          </div>
        </div>
      </div>

      <!-- 动画板块 -->
      <div class="animation" ref="animationRef">
        <div class="animation-title">动画</div>
        <div class="animation-content">
          <div
            v-for="(item, index) in channelVideosList[0]"
            :key="index"
            class="videoBox_item">
            <VideoBox
              :videoInfo="item"
              @click="videoBoxHandler(item.video_id)" />
          </div>
        </div>
      </div>
      <!-- 影视板块 -->
      <div class="film" ref="filmRef">
        <div class="film-title">影视</div>
        <div class="film-content">
          <div
            v-for="(item, index) in channelVideosList[1]"
            :key="index"
            class="videoBox_item">
            <VideoBox
              :videoInfo="item"
              @click="videoBoxHandler(item.video_id)" />
          </div>
        </div>
      </div>
      <!-- 音乐板块 -->
      <div class="music" ref="musicRef">
        <div class="music-title">音乐</div>
        <div class="music-content">
          <div
            v-for="(item, index) in channelVideosList[2]"
            :key="index"
            class="videoBox_item">
            <VideoBox
              :videoInfo="item"
              @click="videoBoxHandler(item.video_id)" />
          </div>
        </div>
      </div>
      <!-- 舞蹈板块 -->
      <div class="dance" ref="danceRef">
        <div class="dance-title">舞蹈</div>
        <div class="dance-content">
          <div
            v-for="(item, index) in channelVideosList[3]"
            :key="index"
            class="videoBox_item">
            <VideoBox
              :videoInfo="item"
              @click="videoBoxHandler(item.video_id)" />
          </div>
        </div>
      </div>
      <!-- 赛事板块 -->
      <div class="match" ref="matchRef">
        <div class="match-title">赛事</div>
        <div class="match-content">
          <div
            v-for="(item, index) in channelVideosList[4]"
            :key="index"
            class="videoBox_item">
            <VideoBox
              :videoInfo="item"
              @click="videoBoxHandler(item.video_id)" />
          </div>
        </div>
      </div>

      <!-- 主页底部 -->
      <div class="footer"></div>
    </div>
    <WanViviBottom />
  </div>
</template>

<style lang="scss" scoped>
@mixin public-sector-title {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 1px;
  line-height: 32px;
  margin: 10px 0;
}
@mixin public-sector-content {
  display: grid;
  grid-column: span 5;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  width: 100%;
}

.home-container {
  display: flex;
  flex-direction: column;
  .content {
    width: 1400px;
    margin: auto;
    .top {
      width: 100%;
      height: 110px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      ::v-deep(.el-icon) {
        padding-right: 4px;
        vertical-align: bottom;
      }
      ul {
        display: flex;
        li {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 10px;
          }
          &:first-child .avatar {
            background-image: url('../../assets/images/hotspot.avif');
            background-repeat: no-repeat;
            background-size: cover;
          }
          &:last-child .avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f07775;
          }
        }
      }
      .top_middle {
        width: 920px;
        display: flex;
        flex-wrap: wrap;
        height: 80px;
        .category {
          margin: 6px 8px 0 0;
          width: 75px;
          height: 27px;
        }
      }
      .line {
        height: 70px;
        margin: 0 14px 0 10px;
        border-right: 1px solid rgba(128, 128, 128, 0.3);
      }
      .top_right {
        width: 220px;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 200px;
          height: 80px;
        }
        .button {
          height: 28px;
          margin: 0;
          font-size: 16px;
          color: #61666d;
          font-weight: 500;
          &:hover {
            color: #00aeec;
          }
        }
      }
    }
    .first-section {
      display: flex;
      .videoBox {
        display: flex;
        flex-wrap: wrap;
        .videoBox_item {
          margin: 0 8px 10px;
          &:nth-child(3n-2) {
            margin-left: 18px;
          }
        }
      }
    }
  }
}

// @media screen and (max-width: 1199px) {
//   .container {
//     .top {
//       width: 1124px;
//     }
//   }
// }

@keyframes floatmove {
  0% {
    left: 168px;
  }

  50% {
    left: 185px;
  }

  100% {
    left: 168px;
  }
}

.line {
  display: block;
  width: 1px;
  height: 46px;
  margin: 0 10px;
  background-color: #e7e7e7;
}

/* .t-2 {
  margin-top: 8px;
} */

.up {
  font-size: 12px;
  transform: scale(0.8);
  line-height: 10px;
  font-weight: 600;
  text-align: center;
  display: inline-block;
  width: 17px;
  height: 10px;
  border-radius: 3px;
  color: #dadad5;
  border: 2px solid #dadad5;
}

.first-report-section {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* height: 244px; */
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
  /* background-color: skyblue; */
}

.f-left-wrapper {
  height: 100%;
  overflow: hidden;
  /* margin-right: 21px; */
  /* background-color: pink; */
}
.f-other-2 {
  height: 414px;
}

.f-left-header {
  display: flex;
  margin-bottom: 20px;
}

.fa-paper-plane {
  font-size: 25px;
  color: #ffd778;
  margin-right: 10px;
}

.f-left-content {
  display: flex;
  overflow: hidden;
  /* justify-content: space-between; */
}

.f-left-content img {
  width: 206px;
  /* height: 116px; */
}

.f-left-content div {
  margin-right: 10px;
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
.f-left-content div p {
  margin-top: 10px;
  color: #212121;
}

.f-right-wrapper {
  width: 321px;
  height: 100%;
  /* background-color: pink; */
}

.f-r-other-2 {
  width: 279px;
}

.f-right-header {
  position: relative;
  top: -5px;
  cursor: pointer;
  width: 320px;
  height: 30px;
  background-color: #f4f4f4;
  border: 1px solid #e7e7e7;
  text-align: center;
  font-size: 12px;
  line-height: 30px;
  transition: color 0.2s;
  margin-bottom: 12px;
}

.f-right-header:hover {
  color: #7ecdf4;
}

.f-right-content img {
  width: 320px;
  height: 184px;
}

.other-1 {
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
}

.other-1 div {
  position: relative;
  margin-bottom: 20px;
}

.f-left-content div p {
  color: #212121;
  transition: color 0.3s;
}

.f-left-content div:hover p {
  color: #00a1d6;
}

.bott-1 {
  display: block;
  position: absolute;
  width: 186px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  color: white;
  left: 0;
  top: 91px;
  padding: 0 10px;
  /* background-color: skyblue; */
  /* background-color: rgba(0, 0, 0, .6); */
  background-image: linear-gradient(
    to top,
    rgba(70, 68, 68, 0.9),
    rgba(126, 125, 125, 0.6),
    rgba(255, 255, 255, 0)
  );
}

.rank {
  height: 24px;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 24px;
}

.rank-content-wrapper li {
  width: 320px;
  display: flex;
  /* justify-content: space-between; */
  margin-right: 10px;
  margin-bottom: 18px;
}

.index {
  display: block;
  width: 18px;
  height: 18px;
  color: white;
  background-color: #00a1d6;
  line-height: 18px;
  font-size: 14px;
  margin-right: 10px;
  text-align: center;
}

.rank-content {
  cursor: pointer;
  width: 290px;
  line-height: 20px;
  font-size: 14px;
  color: #212121;
  transition: color 0.3s;
}
.rank-content:hover {
  color: #00a1d6;
}

.i-1 {
  background-color: white;
  color: #9999a6;
}

.other-1 p {
  width: 206px;
  line-height: 20px;
}
/*  */
.f-right-content {
  position: relative;
}

.rank-content-wrapper img {
  width: 112px;
  height: 149px;
  margin-right: 10px;
}

.rank-content-wrapper p {
  font-size: 14px;
  width: 198px;
}

.animation {
  margin-top: 60px;
  .animation-title {
    @include public-sector-title();
  }
  .animation-content {
    @include public-sector-content();
  }
}
.film {
  margin-top: 60px;
  .film-title {
    @include public-sector-title();
  }
  .film-content {
    @include public-sector-content();
  }
}
.music {
  margin-top: 60px;
  .music-title {
    @include public-sector-title();
  }
  .music-content {
    @include public-sector-content();
  }
}
.dance {
  margin-top: 60px;
  .dance-title {
    @include public-sector-title();
  }
  .dance-content {
    @include public-sector-content();
  }
}

.match {
  margin-top: 60px;
  .match-title {
    @include public-sector-title();
  }
  .match-content {
    @include public-sector-content();
  }
}
</style>

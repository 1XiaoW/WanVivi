<script setup lang="ts">
// 引入评论区组件
import Comments from './comment/index.vue';
import { onMounted, ref, computed, watch } from 'vue';
import {
  reqLikeAndCollect,
  reqVideoById,
  reqVideoLike,
  reqVideoCollect,
  reqVideoCommentTotal,
  reqHotVideo,
} from '@/api/video/index.ts';
import { reqOtherUserInfo } from '@/api/user/index';
import { UserDetail } from '@/api/user/type';
import { useRoute, useRouter } from 'vue-router';
import { VideoInfo, LikeAndCollect } from '@/api/video/type.ts';
import { pNumHandler } from '@/utils/dataProcessing.ts';

const server_url = import.meta.env.VITE_SERVER_URL;
const $route = useRoute();
const $router = useRouter();
const vId = ref(Number($route.query.videoId));
const vInfo = ref<VideoInfo>({
  video_id: 0,
  resolution: '',
  url: '',
  video_cover: '',
  username: '',
  channel: '',
  id: 0,
  title: '',
  duration: 0,
  upload_date: new Date(),
  view_count: 0,
  like_count: 0,
  collect_count: 0,
  review_count: 0,
  author_id: 0,
  channel_id: 0,
  brief: '',
});
const hotVideo = ref<VideoInfo[]>();

const userInfo = ref<UserDetail>({
  id: NaN,
  username: '',
  user_pic: '',
  reg_date: '',
  nickname: '',
  email: '',
  signature: '',
});

// 是否点赞和收藏
const LCInfo = ref<LikeAndCollect>({
  like: false,
  collect: false,
});

onMounted(async () => {
  getVideoLikeAndCollect();
  videoInfo();
});

const videoInfo = async () => {
  const res = await reqVideoById(vId.value);
  const total = await reqVideoCommentTotal(vId.value);
  vInfo.value.review_count = total as any;
  if (res.status == 200) vInfo.value = res.data[0];
  const res1 = await reqOtherUserInfo(vInfo.value.author_id);
  if (res1.status === 200) userInfo.value = res1.data[0];
  const res2 = await reqHotVideo();
  if (res2.status === 200) hotVideo.value = res2.data;
};

// 视频上传时间格式化
const videoUpload = computed(() => {
  let date = new Date(vInfo.value.upload_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

// 获取用户对当前视频是否点赞和收藏
const getVideoLikeAndCollect = async () => {
  const res = await reqLikeAndCollect(vId.value);
  if (res.status === 200) {
    LCInfo.value = res.data;
  }
};

// 点赞
const onLike = async () => {
  const res = await reqVideoLike(vId.value);
  if (res.status === 200) {
    getVideoLikeAndCollect();
    videoInfo();
  }
};

// 收藏
const onCollect = async () => {
  const res = await reqVideoCollect(vId.value);
  console.log(res);
  if (res.status === 200) {
    getVideoLikeAndCollect();
    videoInfo();
  }
};

// 打开热门视频新页面
const openHot = (video_id: number) => {
  const url = $router.resolve(`/video?videoId=${video_id}`);
  console.log(url);
  window.open(url.href, '_blank');
};

// watch(
//   () => $route.query.videoId,
//   (to, from) => {
//     // 在地址栏参数变化时执行相关操作，比如重新获取数据
//     console.log(to, '-----', from);
//     vId.value = Number(to);
//     getVideoLikeAndCollect();
//     videoInfo();
//   }
// );
</script>

<template>
  <div class="video_container">
    <WanViviTop :specialPage="true" />
    <div class="content">
      <!-- 左侧 -->
      <div class="left-content">
        <!-- 视频标题 -->
        <el-row>
          <div class="video_title">
            <h1 :title="vInfo.title">{{ vInfo.title }}</h1>
            <ul class="info">
              <li>
                <svg
                  class="view-icon"
                  style="width: 20px; height: 20px"
                  data-v-3b903b56=""
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20">
                  <path
                    d="M10 4.040041666666666C7.897383333333334 4.040041666666666 6.061606666666667 4.147 4.765636666666667 4.252088333333334C3.806826666666667 4.32984 3.061106666666667 5.0637316666666665 2.9755000000000003 6.015921666666667C2.8803183333333333 7.074671666666667 2.791666666666667 8.471183333333332 2.791666666666667 9.998333333333333C2.791666666666667 11.525566666666668 2.8803183333333333 12.922083333333333 2.9755000000000003 13.9808C3.061106666666667 14.932983333333334 3.806826666666667 15.666916666666667 4.765636666666667 15.744683333333336C6.061611666666668 15.849716666666666 7.897383333333334 15.956666666666667 10 15.956666666666667C12.10285 15.956666666666667 13.93871666666667 15.849716666666666 15.234766666666667 15.74461666666667C16.193416666666668 15.66685 16.939000000000004 14.933216666666667 17.024583333333336 13.981216666666668C17.11975 12.922916666666667 17.208333333333332 11.526666666666666 17.208333333333332 9.998333333333333C17.208333333333332 8.470083333333333 17.11975 7.073818333333334 17.024583333333336 6.015513333333334C16.939000000000004 5.063538333333333 16.193416666666668 4.329865000000001 15.234766666666667 4.252118333333334C13.93871666666667 4.147016666666667 12.10285 4.040041666666666 10 4.040041666666666zM4.684808333333334 3.255365C6.001155 3.14862 7.864583333333334 3.0400416666666668 10 3.0400416666666668C12.13565 3.0400416666666668 13.999199999999998 3.148636666666667 15.315566666666667 3.2553900000000002C16.753416666666666 3.3720016666666672 17.890833333333333 4.483195 18.020583333333335 5.925965000000001C18.11766666666667 7.005906666666667 18.208333333333336 8.433 18.208333333333336 9.998333333333333C18.208333333333336 11.56375 18.11766666666667 12.990833333333335 18.020583333333335 14.0708C17.890833333333333 15.513533333333331 16.753416666666666 16.624733333333335 15.315566666666667 16.74138333333333C13.999199999999998 16.848116666666666 12.13565 16.95666666666667 10 16.95666666666667C7.864583333333334 16.95666666666667 6.001155 16.848116666666666 4.684808333333334 16.7414C3.2467266666666665 16.624750000000002 2.1092383333333338 15.513266666666667 1.9795200000000002 14.070383333333334C1.8823900000000002 12.990000000000002 1.7916666666666667 11.562683333333334 1.7916666666666667 9.998333333333333C1.7916666666666667 8.434066666666666 1.8823900000000002 7.00672 1.9795200000000002 5.926381666666667C2.1092383333333338 4.483463333333334 3.2467266666666665 3.371976666666667 4.684808333333334 3.255365z"
                    fill="currentColor"></path>
                  <path
                    d="M12.23275 9.1962C12.851516666666667 9.553483333333332 12.851516666666667 10.44665 12.232683333333332 10.803866666666666L9.57975 12.335600000000001C8.960983333333335 12.692816666666667 8.1875 12.246250000000002 8.187503333333334 11.531733333333333L8.187503333333334 8.4684C8.187503333333334 7.753871666666667 8.960983333333335 7.307296666666667 9.57975 7.66456L12.23275 9.1962z"
                    fill="currentColor"></path>
                </svg>
                <span>{{ vInfo.view_count }} </span>
              </li>
              <li>
                <svg
                  class="dm-icon"
                  style="width: 20px; height: 20px"
                  data-v-3b903b56=""
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20">
                  <path
                    d="M10 4.040041666666666C7.897383333333334 4.040041666666666 6.061606666666667 4.147 4.765636666666667 4.252088333333334C3.806826666666667 4.32984 3.061106666666667 5.0637316666666665 2.9755000000000003 6.015921666666667C2.8803183333333333 7.074671666666667 2.791666666666667 8.471183333333332 2.791666666666667 9.998333333333333C2.791666666666667 11.525566666666668 2.8803183333333333 12.922083333333333 2.9755000000000003 13.9808C3.061106666666667 14.932983333333334 3.806826666666667 15.666916666666667 4.765636666666667 15.744683333333336C6.061611666666668 15.849716666666666 7.897383333333334 15.956666666666667 10 15.956666666666667C12.10285 15.956666666666667 13.93871666666667 15.849716666666666 15.234766666666667 15.74461666666667C16.193416666666668 15.66685 16.939000000000004 14.933216666666667 17.024583333333336 13.981216666666668C17.11975 12.922916666666667 17.208333333333332 11.526666666666666 17.208333333333332 9.998333333333333C17.208333333333332 8.470083333333333 17.11975 7.073818333333334 17.024583333333336 6.015513333333334C16.939000000000004 5.063538333333333 16.193416666666668 4.329865000000001 15.234766666666667 4.252118333333334C13.93871666666667 4.147016666666667 12.10285 4.040041666666666 10 4.040041666666666zM4.684808333333334 3.255365C6.001155 3.14862 7.864583333333334 3.0400416666666668 10 3.0400416666666668C12.13565 3.0400416666666668 13.999199999999998 3.148636666666667 15.315566666666667 3.2553900000000002C16.753416666666666 3.3720016666666672 17.890833333333333 4.483195 18.020583333333335 5.925965000000001C18.11766666666667 7.005906666666667 18.208333333333336 8.433 18.208333333333336 9.998333333333333C18.208333333333336 11.56375 18.11766666666667 12.990833333333335 18.020583333333335 14.0708C17.890833333333333 15.513533333333331 16.753416666666666 16.624733333333335 15.315566666666667 16.74138333333333C13.999199999999998 16.848116666666666 12.13565 16.95666666666667 10 16.95666666666667C7.864583333333334 16.95666666666667 6.001155 16.848116666666666 4.684808333333334 16.7414C3.2467266666666665 16.624750000000002 2.1092383333333338 15.513266666666667 1.9795200000000002 14.070383333333334C1.8823900000000002 12.990000000000002 1.7916666666666667 11.562683333333334 1.7916666666666667 9.998333333333333C1.7916666666666667 8.434066666666666 1.8823900000000002 7.00672 1.9795200000000002 5.926381666666667C2.1092383333333338 4.483463333333334 3.2467266666666665 3.371976666666667 4.684808333333334 3.255365z"
                    fill="currentColor"></path>
                  <path
                    d="M13.291666666666666 8.833333333333334L8.166666666666668 8.833333333333334C7.890526666666666 8.833333333333334 7.666666666666666 8.609449999999999 7.666666666666666 8.333333333333334C7.666666666666666 8.057193333333334 7.890526666666666 7.833333333333334 8.166666666666668 7.833333333333334L13.291666666666666 7.833333333333334C13.567783333333335 7.833333333333334 13.791666666666668 8.057193333333334 13.791666666666668 8.333333333333334C13.791666666666668 8.609449999999999 13.567783333333335 8.833333333333334 13.291666666666666 8.833333333333334z"
                    fill="currentColor"></path>
                  <path
                    d="M14.541666666666666 12.166666666666666L9.416666666666668 12.166666666666666C9.140550000000001 12.166666666666666 8.916666666666666 11.942783333333333 8.916666666666666 11.666666666666668C8.916666666666666 11.390550000000001 9.140550000000001 11.166666666666668 9.416666666666668 11.166666666666668L14.541666666666666 11.166666666666668C14.817783333333335 11.166666666666668 15.041666666666668 11.390550000000001 15.041666666666668 11.666666666666668C15.041666666666668 11.942783333333333 14.817783333333335 12.166666666666666 14.541666666666666 12.166666666666666z"
                    fill="currentColor"></path>
                  <path
                    d="M6.5 8.333333333333334C6.5 8.609449999999999 6.27614 8.833333333333334 6 8.833333333333334L5.458333333333333 8.833333333333334C5.182193333333334 8.833333333333334 4.958333333333334 8.609449999999999 4.958333333333334 8.333333333333334C4.958333333333334 8.057193333333334 5.182193333333334 7.833333333333334 5.458333333333333 7.833333333333334L6 7.833333333333334C6.27614 7.833333333333334 6.5 8.057193333333334 6.5 8.333333333333334z"
                    fill="currentColor"></path>
                  <path
                    d="M7.750000000000001 11.666666666666668C7.750000000000001 11.942783333333333 7.526140000000001 12.166666666666666 7.25 12.166666666666666L6.708333333333334 12.166666666666666C6.432193333333334 12.166666666666666 6.208333333333334 11.942783333333333 6.208333333333334 11.666666666666668C6.208333333333334 11.390550000000001 6.432193333333334 11.166666666666668 6.708333333333334 11.166666666666668L7.25 11.166666666666668C7.526140000000001 11.166666666666668 7.750000000000001 11.390550000000001 7.750000000000001 11.666666666666668z"
                    fill="currentColor"></path>
                </svg>
                <span> {{ vInfo.review_count }}</span>
              </li>
              <li>{{ videoUpload }}</li>
              <li>未经作者授权，禁止转载</li>
            </ul>
          </div>
        </el-row>
        <!-- 播放视频盒子 -->
        <el-row>
          <div class="video_box">
            <div class="video_area">
              <video
                v-if="vInfo.url"
                controls
                :poster="server_url + vInfo.video_cover"
                :src="server_url + vInfo.url"></video>
            </div>
          </div>
        </el-row>
        <!-- 视频详情 -->
        <el-row style="flex-direction: column">
          <div class="video_tool">
            <div class="like">
              <div @click="onLike">
                <svg
                  :class="{ active: LCInfo.like }"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28">
                  <path
                    d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                    fill="currentColor"></path>
                </svg>
              </div>
              <span>{{ pNumHandler(vInfo.like_count) }}</span>
            </div>
            <div class="collect">
              <div @click="onCollect">
                <svg
                  :class="{ active: LCInfo.collect }"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z"
                    fill="currentColor"></path>
                </svg>
              </div>
              <span>{{ pNumHandler(vInfo.collect_count) }}</span>
            </div>
          </div>
          <div class="video_brief">{{ vInfo.brief }}</div>
        </el-row>
        <!-- 评论结构 -->
        <el-row>
          <Comments :vId="vId" />
        </el-row>
      </div>
      <!-- 右侧 -->
      <div class="right-content">
        <div class="up-info-content">
          <div class="up-info-left">
            <router-link :to="`userSpace/${userInfo.id}/home`"
              ><img
                v-if="userInfo.user_pic"
                :src="`${server_url}${userInfo.user_pic}`"
                alt=""
            /></router-link>
          </div>
          <div class="up-info-right">
            <div class="up-info-detail">
              <div class="up-detail-top">
                <router-link :to="`userSpace/${userInfo.id}/home`">{{
                  userInfo.nickname ? userInfo.nickname : userInfo.username
                }}</router-link>
              </div>
              <div :title="userInfo.signature">
                {{ userInfo.signature ? userInfo.signature : '暂无个性签名' }}
              </div>
            </div>
          </div>
        </div>
        <div class="hot-list">
          <div class="hot-list-title">
            <img
              src="../../assets/images/rebo.png"
              alt=""
              style="width: 32px; height: 32px" />
            <span>热播榜</span>
          </div>
          <ul>
            <li
              v-for="(item, index) in hotVideo"
              :key="index"
              @click="openHot(item.video_id)">
              <div
                class="index"
                :style="{
                  'background-color':
                    index + 1 === 1
                      ? '#ff4a4a'
                      : index + 1 === 2
                      ? '#ff7701'
                      : index + 1 === 3
                      ? '#ffb400'
                      : '',
                  color: index + 1 > 3 ? '' : '#fff',
                }">
                {{ index + 1 }}
              </div>
              {{ item.title }}
            </li>

            <!-- <li>
              <div class="index" style="background-color: #ff4a4a; color: #fff">
                1
              </div>
              鬼灭之刃 第二季(游郭篇)由未知于2021所编制的日本动画片
            </li>
            <li>
              <div class="index" style="background-color: #ff7701; color: #fff">
                2
              </div>
              鬼灭之刃 第二季(游郭篇)由未知于2021所编制的日本动画片
            </li>
            <li>
              <div class="index" style="background-color: #ffb400; color: #fff">
                3
              </div>
              鬼灭之刃 第二季(游郭篇)由未知于2021所编制的日本动画片
            </li>
            <li>
              <div class="index">4</div>
              鬼灭之刃 第二季(游郭篇)由未知于2021所编制的日本动画片
            </li>
            <li>
              <div class="index">5</div>
              鬼灭之刃 第二季(游郭篇)由未知于2021所编制的日本动画片
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <WanViviBottom />
  </div>
</template>

<style lang="scss" scoped>
.video_container {
  .content {
    // margin: 40px 200px 0;
    margin-top: 40px;
    display: flex;
    justify-content: safe center;
    .left-content {
      .video_title {
        width: 668px;
        margin-bottom: 24px;
        h1 {
          font-size: 20px;
          font-family: HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
            sans-serif;
          font-weight: 500;
          -webkit-font-smoothing: antialiased;
          color: #18191c;
          line-height: 28px;
          margin-bottom: 6px;
          // text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .info {
          display: flex;
          // justify-content: space-evenly;
          font-size: 0;
          li {
            margin-right: 14px;
            color: #9499a0;
            font-size: 13px;
            height: 20px;
            line-height: 20px;
            svg {
              vertical-align: text-top;
            }
          }
        }
      }
      .video_box {
        width: 668px;
        height: 422px;
        .video_area {
          width: 100%;
          height: 376px;
          background-color: #000;
          cursor: pointer;
          video {
            width: 100%;
            height: 100%;
          }
        }
      }
      .video_tool {
        display: flex;
        width: 668px;
        border-bottom: 1px solid #ccc;
        .like,
        .collect {
          display: flex;
          align-items: center;
          padding: 20px;
          & div {
            .active {
              color: #00aeec;
            }
            cursor: pointer;
          }
        }
      }
      .video_brief {
        margin-top: 20px;
        width: 668px;
        white-space: pre-line;
        letter-spacing: 0;
        color: #18191c;
        font-size: 15px;
        line-height: 24px;
        overflow: hidden;
      }
    }
    .right-content {
      width: 350px;
      flex: none;
      margin-left: 30px;
      position: relative;
      .up-info-content {
        height: 74px;
        display: flex;
        align-items: center;
        .up-info-left {
          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .up-info-right {
          margin-left: 12px;
          flex: 1;
          overflow: auto;
          .up-info-detail {
            margin-bottom: 5px;
            & div:last-child {
              margin-top: 2px;
              font-size: 13px;
              line-height: 16px;
              height: 16px;
              color: #9499a0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .up-detail-top {
              display: flex;
              align-items: center;
              a {
                font-size: 15px;
                color: #18191c;
                font-weight: 500;
                position: relative;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-right: 12px;
                max-width: calc(100% - 12px - 56px);
                text-decoration: none;
              }
            }
          }
        }
      }
      .hot-list {
        margin-top: 20px;
        .hot-list-title {
          display: flex;
          // justify-content: center;
          align-items: center;
          span {
            font-size: 24px;
          }
        }
        ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          li {
            margin: 20px 0;
            width: 96%;
            cursor: pointer;
            line-height: 1.5;
            .index {
              display: inline-block;
              text-align: center;
              line-height: 20px;
              vertical-align: bottom1;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #eee;
            }
          }
        }
      }
    }
  }
}
</style>

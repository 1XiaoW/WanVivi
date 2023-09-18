<template>
  <div class="video_box">
    <div class="video_img">
      <img :src="server_url + videoInfo.video_cover" alt="" />
      <div class="video_info">
        <div class="left">
          <el-icon><VideoCamera /></el-icon>
          {{ videoView }}
          <el-icon><Postcard /></el-icon>
          {{ videoReview }}
        </div>
        <div class="right">{{ videoTime }}</div>
      </div>
    </div>
    <div class="video_title">
      {{ videoInfo.title }}
    </div>
    <div class="video_author">
      <svg
        t="1693637882159"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6124"
        id="mx_n_1693637882160"
        width="13"
        height="13">
        <path
          d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
          p-id="6125"
          fill="#B099A0"></path>
        <path
          d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
          p-id="6126"
          fill="#B099A0"></path>
      </svg>
      <span :title="videoInfo.username">{{ videoInfo.username }}</span>
      <i>·</i>
      <span class="time">{{ relativeTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VideoCamera, Postcard } from '@element-plus/icons-vue';
const server_url = import.meta.env.VITE_SERVER_URL;

// import { onMounted } from 'vue';
// 接受父组件传递过来的props->即为已有的视频的数据
let props = defineProps(['videoInfo']);
// onMounted(() => {
//   console.log(props.videoInfo);
// });

let relativeTime = computed(() => {
  // 指定日期
  const specifiedDate: any = new Date(props.videoInfo.upload_date);
  // 当前时间
  const currentDate: any = new Date();
  // 计算时间差（以毫秒为单位）
  const timeDifference: number = currentDate - specifiedDate;
  // 计算小时数、天数和日期
  const hours: number = Math.floor(timeDifference / (1000 * 60 * 60));
  const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const formattedDate: string = specifiedDate
    .toISOString()
    .split('T')[0]
    .substring(6);
  // 判断时间差并显示结果
  if (hours < 1) {
    return `最近更新`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return formattedDate;
  }
});

let videoTime = computed(() => {
  let duration = (props.videoInfo.duration / 60).toFixed(2);
  let hours = duration.split('.')[0];
  if (Number(hours) < 10) hours = '0' + hours;
  let restTime = Math.ceil(Number(duration.split('.')[1]) * 0.6);
  if (restTime < 10) (restTime as unknown as string) = restTime + '0';
  return `${hours}:${restTime}`;
});
let videoView = computed(() => {
  if (props.videoInfo.view_count > 9999) {
    let num = props.videoInfo.view_count / 10000;
    if (!Number.isInteger(num)) return num.toFixed(1) + '万';
    return num + '万';
  }
  return props.videoInfo.view_count;
});
let videoReview = computed(() => {
  if (props.videoInfo.review_count > 9999) {
    let num = props.videoInfo.review_count / 10000;
    if (!Number.isInteger(num)) return num.toFixed(1) + '万';
    return num + '万';
  }
  return props.videoInfo.review_count;
});
</script>

<style lang="scss" scoped>
.video_box {
  width: 264px;
  height: 224px;
  .video_img {
    width: 100%;
    height: 148px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    &:hover {
      .video_info {
        opacity: 0;
        transition: all 0.2s;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .video_info {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 6px;
    font-size: 16px;
    color: #fff;
    font-family: 'Times New Roman';
    padding: 0 15px;
    justify-content: space-between;

    .left {
      ::v-deep(.el-icon) {
        vertical-align: bottom;
      }
    }
  }
  .video_title {
    margin: 6px 0;
    line-height: 22px;
    font-size: 15px;
    overflow: hidden; //超出文本隐藏
    text-overflow: ellipsis; ///超出部分省略号显示
    display: -webkit-box; //弹性盒模型
    -webkit-box-orient: vertical; //上下垂直
    -webkit-line-clamp: 2; //自定义行数
    cursor: pointer;
    &:hover {
      color: #00aeec;
    }
  }
  .video_author {
    font-size: 13px;
    color: rgb(176, 153, 160);
    cursor: pointer;
    &:hover {
      color: #00aeec;
    }
    svg {
      vertical-align: bottom;
    }
    i {
      margin: 0 6px;
    }
  }
}
</style>

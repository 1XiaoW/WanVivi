<template>
  <div class="video_comment">
    <div class="comment_top"><span>评论</span> <span>4396</span></div>
    <div class="comment_scroll" style="overflow: auto">
      <ul>
        <li class="list-item" v-for="(item, index) in list" :key="index">
          <div class="list_top">
            <i
              class="avatar"
              :style="{
                backgroundImage: `url(${server_url}${item.user_pic})`,
              }"></i>
            <div class="author">
              <div class="author_left">
                {{ item.nickname ? item.nickname : item.username }}
              </div>
              <div class="author_right">关注</div>
            </div>
          </div>
          <div class="list_bottom">
            <p class="content">
              {{ item.content }}
            </p>
          </div>
        </li>
      </ul>
      <div class="loading" v-if="loading">正在加载...</div>
      <div class="loading" v-else>暂无更多</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import type {
  CommentsResultContent,
  CommentsResponseData,
} from '@/api/video/type.ts';
import { reqVideoComment } from '@/api/video/index.ts';
const server_url = import.meta.env.VITE_SERVER_URL;

let props = defineProps(['vId']);

let loading = ref<boolean>(false);
let list = reactive<CommentsResultContent>([]);
let offset = ref<number>(1);
let limit = ref<number>(2);
let vId = ref(props.vId);
onMounted(() => {
  pageY();
});

const pageY = () => {
  window.addEventListener('scroll', async function () {
    // 获取页面高度
    var pageHeight = document.documentElement.scrollHeight;
    // 获取视口高度
    var viewportHeight = window.innerHeight;
    // 获取滚动条的垂直位置
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // 判断是否接近页面底部
    var isBottomReached = scrollPosition + viewportHeight >= pageHeight; // 20为阈值，可根据需要调整
    console.log(isBottomReached);
    if (isBottomReached) {
      // 滚动条快到底部了
      console.log('object');
      /**
       * 请求数据
       * 判断有无数据
       * 有数据写入
       * 无数据loading为false
       */
      let res: CommentsResponseData = await reqVideoComment(
        'v',
        vId.value,
        offset.value,
        limit.value
      );
      console.log(res.data);
      if (res.data?.result.length > 0) {
        loading.value = true;
        let timer = setTimeout(() => {
          clearTimeout(timer);
          offset.value++;
          list = [...list, ...res.data.result];
          loading.value = false;
        }, 2000);
      } else console.log('s');
    }
  });
};
</script>

<style lang="scss" scoped>
.video_comment {
  margin: 40px 0;
  .comment_top {
    margin: 20px 0;
    span:first-child {
      color: black;
      font-family: HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
      font-weight: 500;
      font-size: 20px;
    }
    span:last-child {
      margin: 0 36px 0 6px;
      font-weight: 400;
      font-size: 13px;
      color: #9499a0;
    }
  }
  .comment_scroll {
    width: 668px;
    // text-align: center;

    .list {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .list-item {
      width: 668px;
      display: flex;
      flex-direction: column;
      .list_top {
        display: flex;
        .avatar {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
        .author {
          margin-top: 5px;
          width: 508px;
          display: flex;
          justify-content: space-between;
          font-family: HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
            sans-serif;
          font-weight: 500;
          color: #61666d;
          font-size: 13px;
        }
      }
      .list_bottom {
        display: flex;
        justify-content: end;
        .content {
          width: 608px;
          font-size: 15px;
          line-height: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #ccc;
          overflow: hidden;
        }
      }
    }
    .list-item + .list-item {
      margin-top: 10px;
    }
    .loading {
      width: 200px;
      text-align: center;
      margin: auto;
      padding: 30px;
      overflow: hidden;
      font-size: 13px;
      color: #9499a0;
    }
  }
}
</style>

<template>
  <div class="video_comment">
    <div class="comment_top"><span>评论</span> <span>4396</span></div>
    <div class="comment_scroll" style="overflow: auto">
      <ul>
        <li class="list-item" v-for="(item, index) in cList" :key="index">
          <div class="list_top">
            <img class="avatar" :src="server_url + item.user_pic" alt="" />
            <div class="author">
              <div class="author_left">
                {{ item.nickname ? item.nickname : item.username }}
              </div>
              <div class="author_right">关注</div>
            </div>
          </div>
          <div class="list_bottom">
            <div class="content">
              {{ item.content }}
              <div class="content_time">{{ item.pubdate }}</div>
              <Reply :vId="vId" :comId="item.com_id" />
            </div>
          </div>
        </li>
      </ul>
      <div class="loading" v-if="loading">正在加载...</div>
      <div class="loading" v-else>暂无更多</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Reply from './reply/index.vue';
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue';
import type {
  CommentsResultContent,
  CommentsResponseData,
} from '@/api/video/type.ts';
import { reqVideoComment } from '@/api/video/index.ts';
const server_url = import.meta.env.VITE_SERVER_URL;

let props = defineProps(['vId']);

let loading = ref<boolean>(false);
let cList = reactive<CommentsResultContent>([]);
let offset = ref<number>(1);
let limit = ref<number>(2);
let vId = ref(props.vId);

onMounted(() => {
  pageY();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoad);
});

const pageY = () => {
  window.addEventListener('scroll', lazyLoad);
};

const lazyLoad = async () => {
  if (loading.value !== false) return;
  // 获取整个文档的高度，包括未显示内容的高度
  const fullHeight = document.documentElement.scrollHeight;
  // 获取浏览器窗口的可视区域高度
  const viewportHeight = window.innerHeight;
  // 获取滚动条垂直位置
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // 计算剩余未滚动的距离
  const remainingDistance = fullHeight - viewportHeight - scrollPosition;
  console.log(fullHeight, viewportHeight, scrollPosition);
  if (remainingDistance <= 1) {
    // 滚动条快到底部了
    loading.value = true;
    /**
     * 请求数据
     * 判断有无数据
     * 有数据写入
     * 无数据loading为false
     */
    await new Promise(t => {
      setTimeout(() => {
        t(1);
      }, 2000);
    });
    let res: CommentsResponseData = await reqVideoComment(
      'v',
      vId.value,
      offset.value,
      limit.value
    );
    if (res.data?.result.length > 0) {
      offset.value++;
      cList = [...cList, ...res.data.result];
      loading.value = false;
    } else {
      loading.value = false;
    }
  }
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
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
          word-break: break-all;
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

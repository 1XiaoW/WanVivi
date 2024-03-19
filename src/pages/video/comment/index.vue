<script setup lang="ts">
import Reply from './reply/index.vue';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import type {
  CommentsResultContent,
  CommentsResponseData,
} from '@/api/video/type.ts';
import { reqVideoComment, reqVideoCommentPost } from '@/api/video/index.ts';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';

const useStore = useUserStore();
const server_url = import.meta.env.VITE_SERVER_URL;

const props = defineProps(['vId']);

const loading = ref<boolean>(false);
let cList = ref<CommentsResultContent>([]);
const cTotal = ref<number>();
const offset = ref<number>(1);
const limit = ref<number>(2);
const vId = props.vId;
const commentText = ref();
const replyText = ref();
const reply = ref<boolean>(false);
const replyMark = ref();
const replyRef = ref();

const flash = ref(true);

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
  // console.log(fullHeight, viewportHeight, scrollPosition);
  if (remainingDistance <= 1) {
    // 滚动条快到底部了
    loading.value = true;
    //  请求数据   判断有无数据   有数据写入   无数据loading为false
    await new Promise((t) => {
      setTimeout(() => {
        t(1);
      }, 1400);
    });
    let res: CommentsResponseData = await reqVideoComment(
      'v',
      vId,
      offset.value,
      limit.value
    );
    if (res.data?.result.length > 0) {
      offset.value++;
      cList.value = [...cList.value, ...res.data.result];
      cTotal.value = res.data.total;
      loading.value = false;
    } else {
      loading.value = false;
    }
  }
};
// 刚开始时先加载一次评论
lazyLoad();

// 发布评论
const onPostComment = async () => {
  let params = {
    userId: useStore.userInfo.userId,
    vId,
    commentText: commentText.value,
  };
  const res: any = await reqVideoCommentPost(params);
  console.log(res);
  if (res.status === 200) {
    // lazyLoad();
    // 在发布评论成功后将新评论插入到评论列表的最前面
    let res1: CommentsResponseData = await reqVideoComment('v', vId, 1, 2);
    cList.value = res1.data.result;
    flash.value = false;
    setTimeout(() => {
      flash.value = true;
    }, 1000);
    commentText.value = '';
    ElMessage({
      type: 'success',
      message: res.message,
    });
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
    });
  }
};

// 评论回复
const onPostReply = async () => {
  let params = {
    userId: useStore.userInfo.userId,
    vId,
    contentType: 'c',
    com_id: replyMark.value,
    commentText: replyText.value,
  };
  const res: any = await reqVideoCommentPost(params);
  if (res.status === 200) {
    // lazyLoad();
    await replyRef.value[0].replyList();
    replyText.value = '';
    ElMessage({
      type: 'success',
      message: res.message,
    });
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
    });
  }
};

// 显示回复评论
const openReply = async (com_id: string) => {
  // console.log(com_id);
  // console.log('object');
  replyText.value = '';
  reply.value = true;
  replyMark.value = com_id;
};
</script>

<template>
  <div class="video_comment">
    <div class="comment_top">
      <span>评论</span> <span>{{ cTotal }}</span>
    </div>
    <div class="comment_post">
      <div class="left_avatar">
        <el-avatar :src="server_url + useStore.userInfo.avatar" />
      </div>
      <div class="middle_content">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="commentText"
          size="small"
          type="textarea"
          resize="none"
          placeholder="尊重是评论打动人心的入场券" />
      </div>
      <div class="right_post">
        <el-button type="primary" style="height: 52px" @click="onPostComment"
          >发布</el-button
        >
      </div>
    </div>
    <div class="comment_scroll" style="overflow: auto">
      <ul v-if="flash">
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
              <div class="content_time">
                {{ item.pubdate }}
                <span @click="openReply(item.com_id)">回复</span>
              </div>
              <Reply ref="replyRef" :vId="vId" :comId="item.com_id" />
              <div
                class="comment_post"
                style="margin-top: 10px"
                v-show="reply && replyMark === item.com_id">
                <div class="left_avatar">
                  <el-avatar :src="server_url + useStore.userInfo.avatar" />
                </div>
                <div class="middle_content">
                  <el-input
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="replyText"
                    size="small"
                    type="textarea"
                    resize="none"
                    placeholder="尊重是评论打动人心的入场券" />
                </div>
                <div class="right_post">
                  <el-button
                    type="primary"
                    style="height: 52px"
                    @click="onPostReply"
                    >发布</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="loading" v-if="loading">正在加载...</div>
      <div class="loading" v-else>暂无更多</div>
    </div>
  </div>
</template>

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
          .content_time {
            color: #61666d;
            font-size: 13px;
            span {
              margin-left: 20px;
              cursor: pointer;
              color: #9499a0;
            }
          }
        }
      }
    }
    .list-item + .list-item {
      margin-top: 20px;
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
  .comment_post {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    .left_avatar {
    }
    .middle_content {
      flex: 1;
      padding: 0 10px;
    }
    .right_post {
    }
  }
}
</style>

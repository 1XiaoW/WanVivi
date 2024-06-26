<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Comments, CommentsResponseData } from '@/api/video/type.ts';
import { reqDeleteCom, reqVideoComment } from '@/api/video/index.ts';
import { ElMessage } from 'element-plus';
const server_url = import.meta.env.VITE_SERVER_URL;

let props = defineProps(['vId', 'comId', 'currentUser']);
let list = ref<Comments>({
  total: 0,
  page: 0,
  result: [],
});
let offset = ref<number>(1);
let limit = ref<number>(2);

onMounted(() => {
  replyList();
});

const replyList = async () => {
  let res: CommentsResponseData = await reqVideoComment(
    'c',
    props.vId,
    offset.value,
    limit.value,
    props.comId
  );
  if (res.data?.result.length > 0) {
    list.value = res.data;
  }
};

const handleCurrentChange = (val: number) => {
  offset.value = val;
  replyList();
};

// 删除评论回复
const deleteReply = async (id: number) => {
  const result = confirm('确定删除回复吗？');
  if (result) {
    const res = await reqDeleteCom(id);
    if (res.status === 200) {
      location.reload();
      ElMessage.success('评论回复删除成功');
    }
  } else {
  }
};

defineExpose({ replyList });
</script>

<template>
  <div class="content_comment">
    <ul>
      <li class="list-item" v-for="(item, index) in list.result" :key="index">
        <div class="list_top">
          <img class="avatar" :src="server_url + item.user_pic" alt="" />
          <div class="author">
            <div>
              <span>
                {{ item.nickname ? item.nickname : item.username }}
              </span>
              <span style="color: black; font-size: 16px; margin-left: 20px">
                {{ item.content }}
              </span>
              <div class="time">
                {{ item.pubdate }} &nbsp;&nbsp;<span
                  style="cursor: pointer"
                  v-if="item.aut_id === currentUser"
                  @click="deleteReply(item.id)"
                  >删除</span
                >
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页器 -->
    <div v-if="list.total && list.total > limit">
      <el-pagination
        v-model="offset"
        :page-size="limit"
        small="small"
        layout="total, prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="list.total"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content_comment {
  margin-top: 20px;
  .list-item {
    width: 668px;
    display: flex;
    flex-direction: column;
    .list_top {
      display: flex;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .author {
        margin-top: 5px;
        width: 508px;
        display: flex;
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
    }
  }
}
</style>

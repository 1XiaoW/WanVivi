<script setup lang="ts">
import { reqCollectVideoByAuthorId } from '@/api/video';
import useUserStore from '@/store/modules/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
let $router = useRouter();
let userStore = useUserStore();
const authorId = userStore.userInfo.userId;

const videoList = ref();

onMounted(() => {
  getCollectVideoList();
});

const getCollectVideoList = async () => {
  if (authorId) {
    const res = await reqCollectVideoByAuthorId(Number(authorId));
    if (res.status === 200) {
      videoList.value = res.data.map((v) => {
        v.flag = 'userStar';
        return v;
      });
    }
  }
};

// 视频盒子点击事件
const videoBoxHandler = async (vid: number) => {
  $router.push({ path: '/video', query: { videoId: vid } });
};
</script>

<template>
  <div class="star-container">
    <el-container class="star-layout">
      <el-aside width="200px">
        <el-menu default-active="1">
          <el-menu-item index="1">
            <template #title>默认收藏夹</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="my-video-content">
          <VideoBox
            v-for="(item, index) in videoList"
            :key="index"
            :videoInfo="item"
            @click="videoBoxHandler(item.video_id)" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.star-container {
  .star-layout {
    margin-top: 20px;
    border: 1px solid #ddd;
    .my-video-content {
      padding-top: 20px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30pax;
    }
    :deep(.el-aside) {
      border-right: 1px solid #ddd;
      .el-menu {
        border-right: none;
        .el-menu-item {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
}
</style>

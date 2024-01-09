<script setup lang="ts">
import { reqSearchByKeyword } from '@/api/video';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

let props = defineProps(['query']);
let activeButtonIndex = ref(0); // 记录当前激活按钮的索引，默认为0
let searchVideoList = ref<any>({});
let $router = useRouter();

onMounted(() => {
  getSearchVideo();
});

const getSearchVideo = async () => {
  const res = await reqSearchByKeyword(props.query);
  if (res.status === 200) {
    ElMessage.success(res.message);
    searchVideoList.value = res.data;
  }
};

// 监听按钮点击事件，并更新激活按钮的索引
const handleButtonClick = (index: number) => {
  activeButtonIndex.value = index;
};

// 视频盒子点击事件
const videoBoxHandler = async (vid: number) => {
  $router.push({ path: '/video', query: { videoId: vid } });
};

watch(
  () => props.query,
  () => {
    getSearchVideo();
  }
);
</script>

<template>
  <div class="search-container">
    <WanViviTop />
    <div class="search-content">
      <div class="conditions-order">
        <ul>
          <li>
            <el-button
              class="condition-button"
              :class="{ active: activeButtonIndex === 0 }"
              @click="handleButtonClick(0)">
              综合排序
            </el-button>
          </li>
          <li>
            <el-button
              class="condition-button"
              :class="{ active: activeButtonIndex === 1 }"
              @click="handleButtonClick(1)">
              最多播放
            </el-button>
          </li>
          <li>
            <el-button
              class="condition-button"
              :class="{ active: activeButtonIndex === 2 }"
              @click="handleButtonClick(2)">
              最新发布
            </el-button>
          </li>
        </ul>
      </div>
      <div class="video-list-wrapper">
        <VideoBox
          v-for="(item, index) in searchVideoList"
          :key="index"
          :videoInfo="item"
          @click="videoBoxHandler(item.video_id)" />
      </div>
    </div>
    <WanViviBottom />
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  .search-content {
    width: 1400px;
    margin: auto;
    .conditions-order {
      margin: 20px 0;
      ul {
        display: flex;
        li {
          margin-right: 15px;
          .condition-button {
            border: none;
          }
          .active {
            color: var(--el-button-hover-text-color);
            border-color: var(--el-button-hover-border-color);
            background-color: var(--el-button-hover-bg-color);
            outline: 0;
          }
        }
      }
    }
    .video-list-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
    }
  }
}
</style>

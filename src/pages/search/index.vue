<script setup lang="ts">
import { reqSearchByKeyword, reqVideo } from '@/api/video';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['query', 'channelId']);
const activeButtonIndex = ref(0); // 记录当前激活按钮的索引，默认为0
const searchVideoList = ref<any>({});
const $router = useRouter();

const total = ref<number>(0);
const offset = ref<number>(1);
const limit = ref<number>(30);

onMounted(() => {
  getSearchVideo();
});

const getSearchVideo = async () => {
  let res, t;
  if (props.query) {
    res = await reqSearchByKeyword(props.query);
    t = true;
  } else {
    res = await reqVideo(props.channelId, 0, offset.value, limit.value);
    total.value = res.total;
  }
  if (res.status === 200 && res.data.length > 0) {
    if (t) ElMessage.success(res.message);
    searchVideoList.value = res.data;
  } else {
    ElMessage.success('暂无更多');
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

// 分页
const handleCurrentChange = async (val: number) => {
  offset.value = val;
  const res = await reqVideo(props.channelId, 0, offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total;
    searchVideoList.value = res.data;
  }
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
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model="offset"
        :page-size="limit"
        :total="total"
        @current-change="handleCurrentChange"
        :hide-on-single-page="total <= 30" />
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
  .pagination {
    width: 100%;
    display: flex;
    margin: 40px 0;
    justify-content: center;
  }
}
</style>

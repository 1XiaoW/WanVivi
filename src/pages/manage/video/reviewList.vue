<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { reqVideo, reqChangeVideoState } from '@/api/video/index';

const activeName = ref('first');
const videoTableData = ref<any>([]);
const dialogVisible = ref(false);
const keyword = ref<string>('');
const videoUrl = ref('');

const total = ref<number>(0);
const offset = ref<number>(1);
const limit = ref<number>(10);

onMounted(() => {
  getVideoList();
});

const getVideoList = async () => {
  const res = await reqVideo(0, 1, offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total;
    videoTableData.value = res.data;
  }
};

// 审核通过函数
const Approved = async (row: any) => {
  const res = await reqChangeVideoState(row.video_id, 0);
  if (res.status === 200) {
    getVideoList();
    ElMessage.success('完成操作');
  } else {
    ElMessage.error('操作失败');
  }
};
// 删除投稿视频
const remove = async (id: any) => {
  const result = confirm('确认要执行该操作吗？');
  if (result) {
    // 用户点击了确认按钮，执行相应的操作
    const res = await reqChangeVideoState(id, 3);
    if (res.status === 200) {
      getVideoList();
      ElMessage.success('删除成功');
    } else {
      ElMessage.error('删除失败');
    }
  } else {
    // 用户点击了取消按钮，不执行操作
  }
};

const onSearch = async () => {
  if (keyword.value) {
    const res = videoTableData.value.filter((v: any) => {
      return v.title.includes(keyword.value);
    });
    videoTableData.value = res;
    ElMessage.success('查询成功');
  } else {
    ElMessage.error('请输入要查询的关键字');
  }
};

// 分页回调函数
const handleCurrentChange = async (val: number) => {
  offset.value = val;
  const res = await reqVideo(0, 1, offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total;
    videoTableData.value = res.data;
  }
};

// 视频预览函数
const videoDialog = (row: any) => {
  videoUrl.value = `http://localhost:5051${row.url}`;
  dialogVisible.value = true;
};
</script>

<template>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="审核列表" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                    v-model="keyword"
                    style="margin-right: 20px"
                    @keyup.enter="onSearch"
                    clearable
                    placeholder="请输入要查询的视频标题" />
                  <el-button type="primary" @click="onSearch">查询</el-button>
                  <el-button type="primary" @click="getVideoList"
                    >清除查询</el-button
                  >
                </div>
              </div>
              <!-- 表格部分 -->
              <div class="module-common-table">
                <el-table
                  :data="videoTableData"
                  :border="true"
                  style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="title" label="视频标题" />
                  <el-table-column prop="channel" width="100" label="频道" />
                  <el-table-column prop="username" width="200" label="作者" />
                  <el-table-column
                    prop="upload_date"
                    label="投稿时间"
                    width="200">
                  </el-table-column>
                  <el-table-column label="操作" width="300" fixed="right">
                    <template #default="{ row }">
                      <div>
                        <el-button type="primary" @click="videoDialog(row)"
                          >预览</el-button
                        >
                        <el-button type="success" @click="Approved(row)"
                          >通过</el-button
                        >
                        <el-button type="danger" @click="remove(row.id)"
                          >删除</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-footer">
              <el-pagination
                v-model="offset"
                :page-size="limit"
                :total="total"
                @current-change="handleCurrentChange"
                layout="prev, pager, next" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="视频预览">
    <video
      :src="videoUrl"
      controls
      style="width: 720px; height: 405px; object-fit: contain"></video>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 公共模块样式外壳
.module-common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 64px);

  // 公共模块样式内容
  .module-common-content {
    padding: 0 10px;
    height: 100%;
    background: #fff;

    // 分页内容
    .pane-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;

      .pane-top {
        .module-common-header {
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .search-wrapped {
            display: flex;
          }
        }

        .module-common-table {
          min-height: 10px;
          padding: 10px 20px 20px;
          margin-bottom: 8px;
          background: #fff;
        }
      }

      // 底部分页
      .table-footer {
        display: flex;
        justify-content: flex-end;
        background: #fff;
      }
    }
  }
}
</style>

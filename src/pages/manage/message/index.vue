<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  reqGetMessage,
  reqDeleteMessage,
  reqSearchMessage,
} from '@/api/message';
import { MessageContent } from '@/api/message/type';
import createEdit from '../components/create_edit.vue';
import { ElMessage } from 'element-plus';

const activeName = ref('first');
const systemTableData = ref<MessageContent>([]);
const createEditRef = ref();
const keyword = ref<string>('');

const total = ref<number>(0);
const offset = ref<number>(1);
const limit = ref<number>(2);

onMounted(() => {
  getSystemMsg();
});

const getSystemMsg = async () => {
  const res = await reqGetMessage('系统通知', offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total;
    systemTableData.value = res.data;
  }
};

// 打开发布系统信息弹窗
const onMsgDialog = () => {
  createEditRef.value.open();
};

// 编辑系统信息
const editSystemMessage = async (row: any) => {
  createEditRef.value.open(row);
};
// 删除系统信息
const deleteMessage = async (id: any) => {
  const result = confirm('确认要执行该操作吗？');
  if (result) {
    // 用户点击了确认按钮，执行相应的操作
    const res = await reqDeleteMessage(id);
    if (res.status === 200) {
      getSystemMsg();
      ElMessage.success('删除消息成功');
    }
  } else {
    // 用户点击了取消按钮，不执行操作
  }
};

const onSearch = async () => {
  const res = await reqSearchMessage(keyword.value);
  if (res.status === 200) {
    systemTableData.value = res.data;
    ElMessage.success('查询成功');
  } else {
    ElMessage.success('暂无更多');
  }
};

// 分页回调函数
const handleCurrentChange = async (val: number) => {
  offset.value = val;
  const res = await reqGetMessage('系统通知', offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total;
    systemTableData.value = res.data;
  }
};
</script>

<template>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="系统消息" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                    v-model="keyword"
                    style="margin-right: 20px"
                    @keyup.enter="onSearch"
                    clearable
                    placeholder="请输入要查询的主题" />
                  <el-button type="primary" @click="onSearch">查询</el-button>
                  <el-button type="primary" @click="getSystemMsg"
                    >清除查询</el-button
                  >
                </div>
                <div class="button-wrapped">
                  <el-button type="primary" @click="onMsgDialog"
                    >发布系统消息</el-button
                  >
                </div>
              </div>
              <!-- 表格部分 -->
              <div class="module-common-table">
                <el-table
                  :data="systemTableData"
                  :border="true"
                  style="width: 100%">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="message_title" label="消息主题" />
                  <el-table-column
                    prop="publisher"
                    width="200"
                    label="发布者" />
                  <el-table-column
                    prop="message_publish_time"
                    label="发布时间"
                    width="200">
                    <template #default="{ row }">
                      <div>{{ row.message_publish_time?.slice(0, 10) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                      <div>
                        <el-button
                          type="success"
                          @click="editSystemMessage(row)"
                          >编辑</el-button
                        >
                        <el-button type="danger" @click="deleteMessage(row.id)"
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
  <createEdit ref="createEditRef" @getSystemMsg="getSystemMsg()"></createEdit>
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  reqOtherUserInfo,
  reqSearchUser,
  reqDeleteUser,
} from '@/api/user/index';
import { UserDetail } from '@/api/user/type';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';

const activeName = ref('first');
const userTableData = ref<UserDetail[]>([]);
const keyword = ref<string>('');
const userStore = useUserStore();

const total = ref<number>(0);
const offset = ref<number>(1);
const limit = ref<number>(10);

onMounted(() => {
  getUserList();
});

const getUserList = async () => {
  const res = await reqOtherUserInfo(-1, offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total!;
    userTableData.value = res.data;
  }
};

// 删除用户信息
const deleteUser = async (id: any) => {
  const result = confirm('确认要执行该操作吗？');
  if (result) {
    // 用户点击了确认按钮，执行相应的操作
    const res = await reqDeleteUser(id);
    if (res.status === 200) {
      getUserList();
      ElMessage.success('删除用户成功');
    }
  } else {
    // 用户点击了取消按钮，不执行操作
  }
};

const onSearch = async () => {
  const res = await reqSearchUser(keyword.value);
  if (res.status === 200) {
    userTableData.value = res.data;
    ElMessage.success('查询成功');
  } else {
    ElMessage.success('暂无更多');
  }
};

// 分页回调函数
const handleCurrentChange = async (val: number) => {
  offset.value = val;
  const res = await reqOtherUserInfo(-1, offset.value, limit.value);
  if (res.status === 200) {
    total.value = res.total!;
    userTableData.value = res.data;
  }
};

// 表格行条件样式
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any;
  rowIndex: number;
}) => {
  if (row.id === userStore.userInfo.userId) {
    console.log('object');
    return 'self';
  }
  return '';
};
</script>

<template>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="用户管理" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                    v-model="keyword"
                    style="margin-right: 20px"
                    @keyup.enter="onSearch"
                    clearable
                    placeholder="请输入要查询的用户" />
                  <el-button type="primary" @click="onSearch">查询</el-button>
                  <el-button type="primary" @click="getUserList"
                    >清除查询</el-button
                  >
                </div>
              </div>
              <!-- 表格部分 -->
              <div class="module-common-table">
                <el-table
                  :data="userTableData"
                  :border="true"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="username" label="用户名" />
                  <el-table-column width="200" label="昵称">
                    <template #default="{ row }">
                      <span>{{ row.nickname || '无' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="邮箱" width="200">
                  </el-table-column>
                  <el-table-column label="个性签名" width="200">
                    <template #default="{ row }">
                      <span>{{ row.nickname || '无' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="reg_date" label="注册日期" width="200">
                  </el-table-column>
                  <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                      <div v-if="row.id !== userStore.userInfo.userId">
                        <el-button type="danger" @click="deleteUser(row.id)"
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
:deep(.el-table) .self {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>

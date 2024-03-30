<script setup lang="ts">
import { House, Tools, Tickets, User } from '@element-plus/icons-vue';
</script>

<template>
  <div class="manage-container">
    <WanViviTop :specialPage="true" />
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">管理员中心</div>
          <el-menu-item index="/manage/message">
            <el-icon><House /></el-icon>
            <span>消息管理</span>
          </el-menu-item>
          <el-sub-menu index="setup">
            <template #title>
              <el-icon><Tools /></el-icon>
              <span>视频管理</span>
            </template>
            <el-menu-item-group title="视频审核">
              <el-menu-item index="/manage/review">审核列表</el-menu-item>
              <el-menu-item index="/manage/audited">已审核</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="/manage/user">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/comment">
            <el-icon><Tickets /></el-icon>
            <span>评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  &:focus-visible {
    outline: none;
  }
}
// 侧边栏
.el-aside {
  height: calc(100vh - 64px);
  background-color: #2b303b;
  // 菜单
  .el-menu {
    background-color: #2b303b;
    height: calc(100vh - 64px);
    border-right: 0px;
  }
  // 标题
  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background-color: #2b303b;
  }
  .el-menu-item {
    color: #fff;
  }
  :deep(.el-sub-menu__title) {
    color: #fff;
  }
}

.el-main {
  --el-main-padding: 0;
  background-color: #f3f4fa;
}

.el-menu-item:hover {
  background-color: #006eff;
}
:deep(.el-sub-menu__title:hover) {
  background-color: #006eff;
}
:deep(.el-menu--inline) {
  background-color: #2b303b;
}
</style>

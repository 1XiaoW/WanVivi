<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqGetMessage } from '@/api/message';
import { MessageContent } from '@/api/message/type';

const systemMsgList = ref<MessageContent>();

onMounted(() => {
  getSystemMsg();
});

const getSystemMsg = async () => {
  const res = await reqGetMessage('系统通知');
  if (res.status === 200) {
    systemMsgList.value = res.data;
  }
};
</script>

<template>
  <div class="system">
    <el-card class="box-card" v-for="item in systemMsgList" :key="item.id">
      <template #header>
        <div class="card-header">
          <span>{{ item.message_title }}</span>
          <p>{{ item.message_publish_time }}</p>
        </div>
      </template>
      <div>
        {{ item.message_content }}
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.system {
  .card-header {
    display: flex;
    align-items: center;
    span {
      color: #333;
      font-weight: 700;
    }
    p {
      margin-left: 10px;
      color: #999;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>

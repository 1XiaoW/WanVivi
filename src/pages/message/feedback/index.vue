<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import { reqPostMessage, reqAllMessage, reqAllUser } from '@/api/chat/index';
import { MessageContent, UserContent } from '@/api/chat/type';
import useUserStore from '@/store/modules/user';
import { io } from 'socket.io-client';

const messageRef = ref();
const messages = ref<MessageContent>([]);
const textarea = ref();
const userStore = useUserStore();
const receiverId = ref(13);
const senderId = ref(Number(userStore.userInfo.userId));
const chatUsers = ref<UserContent>([]);
const activeIndex = ref();
const socket = ref(); // socket.io客户端实例
const chatCount = ref(0);

onMounted(async () => {
  await getAllUser();
  getAllMessage();
  addUserSocket();
  listenMsg();
});

// 处理发送消息的方法
const handleSendMsg = async () => {
  let recId;
  if (senderId.value === 13) recId = activeIndex.value;
  // 发送消息到后端
  const res = await reqPostMessage({
    senderId: senderId.value,
    receiverId: recId ? recId : receiverId.value,
    message: textarea.value,
  });

  if (res.status === 200) {
    // 发送消息到socket服务器
    socket.value.emit('send-msg', {
      receiverId: recId ? recId : receiverId.value,
      chatCount: chatCount.value,
    });

    textarea.value = '';
    getAllMessage(activeIndex.value);
  }
};

// 获取登录用户与选中当前用户的所有聊天记录
const getAllMessage = async (recId?: number) => {
  if (senderId.value === 13) recId = activeIndex.value;
  const res = await reqAllMessage(
    senderId.value,
    recId ? recId : receiverId.value
  );
  if (res.status === 200) {
    messages.value = res.data;
  }
};

const getAllUser = async () => {
  if (senderId.value === 13) {
    const res = await reqAllUser(receiverId.value);
    if (res.status === 200) {
      chatUsers.value = res.data;
      activeIndex.value = chatUsers.value[0].senderId;
    }
  }
};

const changeActive = (id: number) => {
  activeIndex.value = id;
  getAllMessage(id);
};

const addUserSocket = () => {
  socket.value = io('http://localhost:5051'); // 连接socket.io服务器
  socket.value.emit('add-user', senderId.value); // 向服务器发送添加用户事件
};

// 监听msg-receive事件，接收到新消息时更新arrivalMessage
const listenMsg = async () => {
  await socket.value.on('msg-receive', (i: number) => {
    console.log(i);
    chatCount.value++;
  });
};

// 监听chatCount的变化，获取最新消息
watch(chatCount, () => {
  getAllMessage(activeIndex.value);
});

// 监听messages的变化，在DOM更新后滚动到最底部
watch(messages, async () => {
  await nextTick();
  if (messageRef.value)
    messageRef.value?.at(-1).scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
  <div class="feedback">
    <div class="card">
      <div class="left">
        <div class="title">
          <span>近期消息</span>
        </div>
        <div class="list-container">
          <div class="list">
            <div
              v-if="senderId === 13"
              :class="[
                'list-item',
                item.senderId === activeIndex ? 'active' : '',
              ]"
              v-for="item in chatUsers"
              :key="item.senderId"
              @click="changeActive(item.senderId)">
              <img
                :src="`http://localhost:5051${item.user_pic}`"
                class="avatar" />
              <div class="name-box">
                <div class="name" title="超级管理员">
                  {{ item.nickname ? item.nickname : item.username }}
                </div>
                <!-- <div
                  class="last-word"
                  title="获取C/C++学习路线&大纲等可以加VX：xixils123456">
                  获取C/C++学习路线&大纲等可以加VX：xixils123456
                </div> -->
              </div>
            </div>
            <div v-else class="list-item active">
              <img
                src="http://localhost:5051\images\user\avatar\1697393507174_dzq.png"
                class="avatar" />
              <div class="name-box">
                <div class="name" title="超级管理员">超级管理员</div>
                <!-- <div
                  class="last-word"
                  title="获取C/C++学习路线&大纲等可以加VX：xixils123456">
                  获取C/C++学习路线&大纲等可以加VX：xixils123456
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dialog">
          <div class="title">
            <span>超级管理员</span>
          </div>
          <div class="message-list">
            <div class="msg-more">没有更多消息了～</div>
            <div
              v-for="(message, index) in messages"
              :key="index"
              ref="messageRef">
              <div class="msg-time">
                <span class="time">{{ message.date }}</span>
              </div>
              <div :class="['msg-item', message.fromSelf ? 'is-me' : 'not-me']">
                <img
                  :src="`http://localhost:5051${message.user_pic}`"
                  href=""
                  class="avatar" />
                <div class="message">
                  <div
                    :class="[
                      'message-content',
                      message.fromSelf ? 'is-me' : '',
                    ]">
                    {{ message.message }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="notify-wrapper">
              <span>对方主动回复或关注你前，最多发送1条消息</span>
            </div> -->
          </div>
          <div class="send-box">
            <div class="row">
              <div>
                <label class="image-upload-btn"></label>
              </div>
            </div>
            <div class="input-box">
              <el-input
                v-model="textarea"
                :rows="3"
                type="textarea"
                maxlength="500"
                show-word-limit
                resize="none"
                @keyup.enter="handleSendMsg"></el-input>
              <el-button text @click="handleSendMsg">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin scrollbar-style {
  &::-webkit-scrollbar {
    width: 8px; /* 滚动条宽度 */
  }
  &::-webkit-scrollbar-track {
    background: #f4f5f7; /* 滚动条轨道背景色 */
  }
  &::-webkit-scrollbar-thumb {
    background: #888; /* 滑块颜色 */
    border-radius: 10px; /* 滑块边角弧度 */
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* 滑块悬停时颜色 */
  }
}

.feedback {
  height: calc(100vh - 138px);
  .card {
    font-size: 12px;
    color: #666;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
    border-radius: 4px;
    height: 100%;
    display: flex;
    position: relative;
    .left {
      width: 240px;
      border-right: 1px solid #e9eaec;
      position: relative;
      .title {
        padding-left: 24px;
        line-height: 35px;
        height: 36px;
        border-bottom: 1px solid #e9eaec;
        user-select: none;
        overflow: hidden;
      }
      .list-container {
        height: calc(100% - 36px);
        position: relative;
        .list {
          .list-item {
            width: 100%;
            display: flex;
            flex-direction: row;
            padding: 19px 24px;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            .avatar {
              display: block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              flex-shrink: 0;
              object-fit: cover; /* 类似background-size: cover的效果 */
              object-position: center; /* 类似background-position: center的效果 */
              margin-right: 8px;
              position: relative;
            }
            .name-box {
              .name {
                color: #333;
                font-size: 14px;
                min-height: 16px;
                line-height: 1;
              }
              .last-word {
                color: #999;
                flex: 1;
                position: relative;
                padding: 8px 0;
                margin-bottom: -6px;
                overflow: hidden;
                width: 155px;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .active {
            background-color: #e4e5e6;
          }
        }
      }
    }
    .right {
      width: calc(100% - 240px);
      flex: 1;
      .dialog {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;
        .title {
          height: 36px;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #e9eaec;
          position: relative;
          text-align: center;
          color: #333;
          span {
            font-size: 14px;
          }
        }
        .message-list {
          flex: 1;
          position: relative;
          background-color: #f4f5f7;
          overflow-x: hidden;
          overflow-y: scroll;
          @include scrollbar-style();
          .msg-more {
            padding: 16px 0 0;
            text-align: center;
            color: #999;
            min-height: 38px;
          }
          .msg-time {
            padding: 16px 0 16px;
            text-align: center;
            .time {
              color: #999;
              font-size: 12px;
              line-height: 22px;
              margin: 0 10px;
            }
          }
          .msg-item {
            min-height: 48px;
            padding: 0 16px 16px;
            overflow: hidden;
            position: relative;
            .avatar {
              display: block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              flex-shrink: 0;
              object-fit: cover; /* 类似background-size: cover的效果 */
              object-position: center; /* 类似background-position: center的效果 */
              float: left;
            }
            .message {
              float: left;
              max-width: 480px;
              margin: 0 10px;
              position: relative;
              overflow: hidden;
              color: #333;
              .message-content {
                line-height: 1.5;
                font-size: 14px;
                min-height: 37px;
                padding: 8px 16px;
                word-wrap: break-word;
                word-break: break-word;
                border-radius: 0 16px 16px 16px;
                overflow: hidden;
                background: #fff;
              }
              .is-me {
                background: #80b9f2;
                border-radius: 16px 0 16px 16px;
              }
            }
          }
          .is-me {
            .message {
              position: relative;
              float: right;
              color: #fff;
            }
            .avatar {
              float: right;
            }
          }
          .notify-wrapper {
            display: flex;
            justify-content: center;
            padding: 0 10px;
            color: #b2b2b2;
            font-size: 12px;
            line-height: 16px;
            min-height: 30px;
          }
        }
        .send-box {
          height: 162px;
          border-top: 1px solid #d8d8d8;
          border-bottom-right-radius: 4px;
          background-color: #f4f5f7;
          flex-shrink: 0;
          padding: 0 16px;
          position: relative;
          z-index: 2;
          .row {
            height: 48px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .image-upload-btn {
              display: block;
              width: 22px;
              height: 21px;
              cursor: pointer;
              background: url('../../../assets/images/imgInput.png') no-repeat;
              background-size: 22px;
            }
          }
        }
      }
    }
  }
}

:deep(.el-textarea__inner) {
  border: none;
  box-shadow: none;
  background-color: #f4f5f7;
}
:deep(.el-input__count) {
  background-color: #f4f5f7;
  bottom: -24px;
  right: 80px;
}
:deep(.el-button) {
  width: 70px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  float: right;
}
</style>

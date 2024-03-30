<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {
  HomeFilled,
  MessageBox,
  UploadFilled,
  StarFilled,
} from '@element-plus/icons-vue';
import { reqOtherUserInfo, reqModifySign } from '@/api/user/index';
import { reqAllVideosLikeAndViewByAuthorId } from '@/api/video/index';
import useUserStore from '@/store/modules/user';
import { UserDetail } from '@/api/user/type';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

let userStore = useUserStore();
const loginUser = userStore.userInfo.userId;
const $route = useRoute();
const userId = Number($route.params.userId);
const $router = useRouter();
const signText = ref();
const signInputRef = ref();
const cursor = ref();
const menuList = ref();
const clickLi = ref({
  offset: '',
  index: 0,
});
const activeIndex = ref(0);
const urlStr = location.hash.split('/').at(-1);
const userInfo = ref<UserDetail>({
  id: 0,
  username: '',
  user_pic: '',
  reg_date: '',
  nickname: '',
  email: '',
  signature: '',
});

interface TotalList {
  total_views: string;
  total_likes: string;
}

const totalList = ref<TotalList>({
  total_views: '',
  total_likes: '',
});

onMounted(() => {
  move();
  menuSelection(urlStr!);
  getUserInfo();
});

const menuSelection = (route: string) => {
  let index = 0;
  switch (route) {
    case 'home':
      index = 0;
      break;
    case 'dynamic':
      index = 1;
      break;
    case 'uploads':
      index = 3;
      break;
    case 'star':
      index = 2;
      break;
  }
  // $router.push({ path: `/userSpace/${route}` });
  $router.push({ name: route });
  clickLi.value.offset = index * 92 + 'px';
  cursor.value.style.left = clickLi.value.offset;
  clickLi.value.index = activeIndex.value;
  activeIndex.value = clickLi.value.index;
};

// 游标移动
const move = () => {
  const targetElement = menuList.value.childNodes;
  for (let i = 0; i < targetElement.length - 1; i++) {
    targetElement[i].addEventListener('mouseenter', () => {
      cursor.value.style.left = i * 92 + 'px';
      activeIndex.value = i;
    });
    targetElement[i].addEventListener('mouseleave', () => {
      cursor.value.style.left = clickLi.value.offset;
      activeIndex.value = clickLi.value.index;
    });
  }
};

// 获取用户信息
const getUserInfo = async () => {
  const res = await reqOtherUserInfo(userId);
  const res2 = await reqAllVideosLikeAndViewByAuthorId(userId);
  totalList.value = res2.data[0];
  if (res.status === 200) {
    userInfo.value = res.data[0];
    signText.value = userInfo.value.signature;
  }
};

// 更改个性签名
const changeSign = async () => {
  const res = await reqModifySign(loginUser, signText.value);
  if (res.status === 200) {
    ElMessage.success(res.message);
  }
};

watch(
  () => $route.name,
  () => {
    menuSelection($route.name?.toString()!);
  }
);
</script>

<template>
  <div class="container">
    <WanViviTop :specialPage="true" />
    <div class="content">
      <div class="header">
        <div class="gradient"></div>
        <div class="user">
          <div class="avatar">
            <img
              v-if="userInfo.user_pic"
              :src="`http://localhost:5051${userInfo.user_pic}`"
              alt="" />
            <img v-else src="../../assets/images/hotspot.avif" alt="" />
          </div>
          <div class="info">
            <div class="name">{{ userInfo.username }}</div>
            <div class="sign">
              <el-input
                @change="changeSign"
                v-if="loginUser === userInfo.id"
                v-model="signText"
                class="sign-input"
                :border="false"
                size="small"
                placeholder="编辑个性签名"
                type="text"
                maxlength="60"
                ref="signInputRef"
                @keyup.enter="signInputRef.blur()" />
              <div v-else class="sign-text">{{ userInfo.signature }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="header_nav">
        <div class="menu">
          <ul class="menu-list" ref="menuList">
            <li @click="menuSelection('home')">
              <HomeFilled
                style="color: #00c091; width: 24px; height: 24px" /><span
                :class="{ active: activeIndex === 0 }"
                >主页</span
              >
            </li>
            <li @click="menuSelection('dynamic')">
              <MessageBox
                style="color: #fb7299; width: 24px; height: 24px" /><span
                :class="{ active: activeIndex === 1 }"
                >动态</span
              >
            </li>
            <li @click="menuSelection('star')">
              <StarFilled
                style="color: #f3a034; width: 24px; height: 24px" /><span
                :class="{ active: activeIndex === 2 }"
                >收藏</span
              >
            </li>
            <!-- <li @click="menuSelection('uploads')">
              <UploadFilled
                style="color: #02b5da; width: 24px; height: 24px" /><span
                :class="{ active: activeIndex === 2 }"
                >投稿</span
              >
            </li> -->
            <li ref="cursor" class="cursor"></li>
          </ul>
        </div>
        <div class="statistics">
          <ul class="statistics-list">
            <!-- <li>
              <div>关注数</div>
              <span>44</span>
            </li>
            <li>
              <div>粉丝数</div>
              <span>1</span>
            </li> -->
            <li>
              <div>获赞数</div>
              <span>{{ totalList.total_likes }}</span>
            </li>
            <li>
              <div>播放数</div>
              <span>{{ totalList.total_views }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="middle-tabs">
        <router-view></router-view>
      </div>
    </div>
    <WanViviBottom />
  </div>
</template>

<style lang="scss" scoped>
.container {
  .content {
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .header {
      width: 90%;
      height: 192px;
      background-image: url('../../assets/images/userSpaceBG.webp');
      background-position: 50%;
      background-size: cover;
      transition: background-image 0.2s ease, background-size 1s ease;
      padding-top: 116px;
      position: relative;
      .gradient {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 84px;
        background: linear-gradient(to bottom, transparent, #464545);
      }
      .user {
        position: relative;
        z-index: 10;
        display: flex;
        margin-left: 20px;
        .avatar {
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .info {
          margin-left: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name {
            display: inline-block;
            margin-right: 5px;
            font-weight: 700;
            line-height: 18px;
            font-size: 18px;
            color: #fff;
            vertical-align: middle;
          }
          .sign {
            .sign-input {
              :deep(.el-input__wrapper) {
                background-color: transparent;
                box-shadow: none;
                padding: 0;
              }
              :deep(.el-input__inner) {
                color: hsla(0, 0%, 100%, 0.8);
                border-radius: 4px;
                font-size: 12px;
                font-family: Microsoft Yahei;
                line-height: 26px;
                height: 26px;
                margin-left: -5px;
                padding: 0 5px;
                position: relative;
                top: -1px;
                width: 730px;
                &:focus {
                  background-color: white;
                  color: #333;
                  box-shadow: 0 0 0 1px
                    var(--el-input-border-color, var(--el-border-color)) inset;
                }
              }
            }
            .sign-text {
              font-size: 12px;
              color: hsla(0, 0%, 100%, 0.8);
            }
          }
        }
      }
    }
    .header_nav {
      padding: 0 20px;
      width: 90%;
      height: 66px;
      background-color: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .menu {
        font-size: 12px;
        height: 100%;
        .menu-list {
          position: relative;
          display: flex;
          height: 100%;
          li {
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 0 16px;
            &:hover span {
              color: #00a1d6;
            }
            .active {
              color: #00a1d6;
            }
          }
          .cursor {
            position: absolute;
            bottom: 0px;
            left: 0;
            background: #00a1d6;
            width: 60px;
            height: 3px;
            transition: all 0.5s ease;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }
        }
      }
      .statistics {
        .statistics-list {
          display: flex;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 4px;
            div {
              line-height: 14px;
              font-size: 12px;
              color: #99a2aa;
            }
            span {
              line-height: 16px;
              margin-top: 5px;
              color: #222;
              font-size: 12px;
            }
          }
        }
      }
    }
    .middle-tabs {
      width: 90%;
    }
  }
}
</style>

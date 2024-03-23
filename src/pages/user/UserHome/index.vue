<script setup lang="ts">
import { reqVideoByAuthorId } from '@/api/video';
import useUserStore from '@/store/modules/user';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const actived = ref(0);
const cursor = ref();
const videoList = ref();
const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();
// const authorId = userStore.userInfo.userId;
const authorId = Number($route.params.userId);
onMounted(() => {
  getVideoByAuthorId();
});

const getVideoByAuthorId = async () => {
  if (authorId) {
    const res = await reqVideoByAuthorId(authorId, 0);
    if (res.status === 200) {
      videoList.value = res.data.map((v) => {
        v.flag = 'userHome';
        return v;
      });
    }
  }
};

const isClick = async (index: number) => {
  actived.value = index;
  cursor.value.style.transform = `translateX(${index * 59}px)`;
  const res = await reqVideoByAuthorId(authorId, index);
  if (res.status === 200) {
    videoList.value = res.data.map((v) => {
      v.flag = 'userHome';
      return v;
    });
  }
};

// 视频盒子点击事件
const videoBoxHandler = async (vid: number) => {
  $router.push({ path: '/video', query: { videoId: vid } });
};
</script>

<template>
  <div class="home-container">
    <el-card shadow="never">
      <div class="my-video-title">
        <div class="my-video-left">
          <div class="title">
            <el-link
              :underline="false"
              :href="`http://localhost:5173/#/userSpace/${authorId}/uploads`"
              >{{ userStore.userInfo.userId === authorId ? '我' : 'TA' }}的视频
            </el-link>
            <span class="count" v-if="videoList">{{ videoList.length }}</span>
          </div>

          <ul>
            <li :class="{ 'is-active': actived === 0 }" @click="isClick(0)">
              最新发布
            </li>
            <li :class="{ 'is-active': actived === 1 }" @click="isClick(1)">
              最多播放
            </li>
            <div class="cursor" ref="cursor"></div>
          </ul>
        </div>
        <div class="my-video-right">
          <!-- <div class="more">更多></div> -->
        </div>
      </div>
      <div class="my-video-content" v-if="videoList && videoList.length !== 0">
        <VideoBox
          v-for="(item, index) in videoList"
          :key="index"
          :videoInfo="item"
          @click="videoBoxHandler(item.video_id)" />
      </div>
      <div v-else>暂无更多</div>
    </el-card>
    <el-card class="home-right">
      <strong
        >WanVivi禁止用户从事以下违法行为或在WanVivi平台制作、上传、复制、传送、传播含有下列内容的违法信息：</strong
      ><br />
      （1）反对宪法所确定的基本原则的；<br />
      （2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
      （3）损害国家荣誉和利益的；<br />
      （4）歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；<br />
      （5）宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动的；<br />
      （6）煽动民族仇恨、民族歧视，破坏民族团结的；<br />
      （7）破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
      （8）散布谣言，扰乱经济秩序和社会秩序的；<br />
      （9）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、引诱自杀的；<br />
      （10）侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；<br />
      （11）侵害未成年人合法权益或可能危害未成年人身心健康的；<br />
      （12）法律、行政法规禁止的其他行为或内容。
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
  .my-video-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .my-video-left {
      display: flex;
      :deep(.el-link__inner) {
        color: black;
        font-size: 20px;
        font-weight: 400;
        line-height: 33px;
      }
      .title {
        .count {
          border: 1px solid black;
          border-left: none;
          background: #f6fafb;
          border: 1px solid #ddd;
          border-radius: 3px;
          color: #777;
          display: inline-block;
          font-size: 12px;
          line-height: 18px;
          height: 18px;
          margin-left: 11px;
          padding: 0 5px;
          position: relative;
          vertical-align: middle;
          &::before {
            position: absolute;
            content: '';
            display: block;
            left: -4px;
            top: 4px;
            width: 8px;
            height: 8px;
            background-color: #f6fafb;
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            transform: rotateZ(45deg);
          }
        }
      }

      ul {
        position: relative;
        margin-left: 12px;
        display: flex;
        li {
          font-size: 12px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          cursor: pointer;
        }
        .is-active {
          color: #00a1d6;
        }
        .cursor {
          display: block;
          position: absolute;
          width: 55px;
          bottom: 0;
          margin-left: -3px;
          border-bottom: 1px solid #00a1d6;
          border-top: 0;
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
          transition: transform 0.4s ease;
        }
      }
    }
    .my-video-right {
      .more {
        border: 1px solid #b8c0cc;
        border-radius: 4px;
        color: #6d757a;
        font-size: 12px;
        line-height: 22px;
        transition: border 0.2s ease;
        padding: 0 10px 0 10px;
        cursor: pointer;
        &:hover {
          border-color: #00a1d6;
          color: #00a1d6;
        }
      }
    }
  }
  .my-video-content {
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  .home-right {
    // height: 100px;
    height: 636px;

    strong {
      font-weight: bold;
    }
  }
}
</style>

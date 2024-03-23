<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { watch, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import {
  reqAddDynamic,
  reqDeleteDynamic,
  reqGetDynamic,
  reqOtherUserInfo,
} from '@/api/user/index';
import { useRoute } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';

const dynamicContent = ref();
const dynamicList = ref();
const userStore = useUserStore();
const $route = useRoute();
const currentUser = Number($route.params.userId);
const userInfo = ref();

onMounted(() => {
  getUserInfo();
  getDynamic();
});

// 获取当前用户信息
const getUserInfo = async () => {
  const res = await reqOtherUserInfo(currentUser);
  if (res.status === 200) {
    userInfo.value = res.data[0];
  }
};

// 获取动态
const getDynamic = async () => {
  const res = await reqGetDynamic(currentUser);
  if (res.status === 200) {
    dynamicList.value = res.data;
  }
};

// 添加动态
const submitDynamic = async () => {
  const res = await reqAddDynamic(currentUser, dynamicContent.value);
  if (res.status === 200) {
    getDynamic();
    ElMessage.success('发布动态成功');
  }
};

// 删除动态
const deleteDynamic = async () => {
  const res = await reqDeleteDynamic(currentUser);
  if (res.status === 200) {
    ElMessage.success('删除动态成功');
  }
};

watch(
  () => $route.params.userId,
  () => {
    // 重新渲染页面
    location.reload();
  }
);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// mode
const mode = ref('default');
const toolbarConfig = {
  excludeKeys: [],
};
const editorConfig = {
  placeholder: '',
  MENU_CONF: {
    // uploadImage: {
    // 	//上传图片配置
    // 	server: 'http://127.0.0.1:3007/set/uploadCompanyPicture', //上传接口地址
    // 	fieldName: 'file', //上传文件名
    // 	methods: 'post',
    // 	metaWithUrl: true, // 参数拼接到 url 上
    // 	// 单个文件上传成功之后
    // 	// onSuccess(file, res) {
    // 	// },
    // 	// 自定义插入图片
    // 	customInsert(res, insertFn) {
    // 		insertFn(res.url)
    // 	},
    // },
  },
};
// 上传图片，修改 uploadImage 菜单配置
// 需要注意的是，如何去修改参数？
toolbarConfig.excludeKeys = [
  'blockquote',
  'bgColor',
  'color',
  'group-more-style',
  'fontFamily',
  'bulletedList',
  'numberedList',
  'lineHeight',
  'todo',
  'insertLink',
  'group-video',
  'insertTable',
  'codeBlock',
  'divider',
  'fullScreen',
  'group-image',

  // 排除菜单组，写菜单组 key 的值即可
] as any;

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<template>
  <div class="dynamic-container">
    <el-card
      class="dynamic-card"
      shadow="never"
      v-if="currentUser === userStore.userInfo.userId">
      <!-- 发布动态结构 -->
      <div style="border: 1px solid #ccc">
        <!-- wangEditor结构 -->
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor
          style="height: 300px; overflow-y: hidden"
          v-model="dynamicContent"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated" />
      </div>
      <!-- 提交动态 -->
      <div class="submit">
        <el-button size="large" type="primary" @click="submitDynamic"
          >发布</el-button
        >
      </div>
      <!-- 动态内容展示 -->
      <div
        class="dynamic-content"
        v-for="(item, index) in dynamicList"
        :key="index">
        <div class="card-header">
          <div class="card-header-left">
            <div class="card-avatar">
              <img :src="`http://localhost:5051${userInfo.user_pic}`" alt="" />
            </div>
            <div class="card-info">
              <span>{{
                userInfo.nickname ? userInfo.nickname : userInfo.username
              }}</span>
              <div class="pubTime">{{ item.date }}</div>
            </div>
          </div>
          <div class="card-header-right">
            <el-dropdown trigger="click">
              <span>
                <el-icon style="margin-right: 20px" size="large"
                  ><MoreFilled
                /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu
                  v-if="item.user_id === userStore.userInfo.userId">
                  <!-- <el-dropdown-item>举报</el-dropdown-item> -->
                  <el-dropdown-item @click="deleteDynamic"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="card-content">
          <div class="text" v-html="item.dynamic_text"></div>
        </div>
      </div>
    </el-card>
    <el-card v-else>
      <el-empty description="这里什么都没有！" />
    </el-card>
    <el-card class="right-card">
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
.dynamic-container {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
  .dynamic-card {
    width: 100%;
    .dynamic-content {
      margin: 50px 0;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .card-header-left {
          display: flex;
          .card-avatar {
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .card-info {
            span {
              color: #ff8cb0;
              font-size: 17px;
              font-weight: 600;
              line-height: 32px;
            }
            .pubTime {
              font-size: 13px;
              line-height: 18px;
              color: #9499a0;
            }
            margin: -6px 0 0 20px;
          }
        }
      }

      .card-content {
        margin-left: 70px;
        .text {
          line-height: 25px;
        }
      }
    }

    .submit {
      display: flex;
      justify-content: end;
      margin: 10px 0 20px;
    }
  }

  .right-card {
    height: 636px;
    strong {
      font-weight: bold;
    }
  }
}
</style>

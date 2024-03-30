<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Avatar, Lock, User, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules, UploadFile } from 'element-plus';
import useUserStore from '@/store/modules/user';
import {
  reqModifyUserInfo,
  reqUserInfo,
  reqModifyPassword,
  reqModifyAvatar,
  reqSendCode,
} from '@/api/user';

const $router = useRouter();

const server_url = import.meta.env.VITE_SERVER_URL;

let userStore = useUserStore();
const pwdFormRef = ref<FormInstance>();
const activeName = ref('first');
const imageUrl = ref(
  userStore.userInfo.avatar ? server_url + userStore.userInfo.avatar : ''
);
const userId = userStore.userInfo.userId;
let files = ref();

onMounted(() => {
  getUserDetail();
});

const getUserDetail = async () => {
  const res = await reqUserInfo(userId);
  if (res.status === 200) {
    userInfo.name = res.data[0].username;
    userInfo.nickname = res.data[0].nickname;
    userInfo.email = res.data[0].email;
  } else {
    return ElMessage({
      type: 'error',
      message: '请求用户信息失败',
    });
  }
};

// 基础用户信息
const userInfo = reactive({
  name: '',
  nickname: '',
  email: '',
  code: '',
});

// 修改密码信息
const userPwd = reactive({
  originPwd: '',
  newPwd: '',
  confirmPwd: '',
});

// 基础信息修改
const onModifyUserInfo = async () => {
  const res = await reqModifyUserInfo(userId, userInfo);
  console.log(res);
  if (res.status === 200) {
    ElMessage.success('修改个人信息成功');
  } else {
    ElMessage.error(res.message);
  }
};

// 头像上传
const beforeAvatarUpload = (rawFile: UploadFile) => {
  if (!rawFile.raw?.type.startsWith('image/')) {
    ElMessage.error('请选择图片格式的文件');
    return false;
  } else if (rawFile.size! / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB');
    return false;
  } else {
    imageUrl.value = URL.createObjectURL(rawFile.raw!);
    files.value = rawFile.raw;
  }
};

const updateAvatar = async () => {
  if (files.value) {
    let formData = new FormData();
    formData.append('file', files.value);
    let result = await reqModifyAvatar(userId, formData);
    console.log(result);
    if (result.status === 200) {
      userStore.updateUserInfo(result.fileUrl);
      getUserDetail();
      ElMessage({
        type: 'success',
        message: result.message,
      });
    }
  } else {
    // ...
    ElMessage({
      type: 'error',
      message: '请先选择上传的图片',
    });
  }
};

// 密码修改
const onModifyPwd = async (pwdFormRef: FormInstance) => {
  await pwdFormRef.validate();
  try {
    const res = await reqModifyPassword(userId, userPwd);
    if (res.status === 200) {
      ElMessage.success('修改密码成功');
    }
    // console.log(res);
  } catch (error: any) {
    console.log(error.message);
  }
};
//@ts-ignore
// 密码输入框校验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'));
  } else if (value.length > 16) {
    callback(new Error('密码长度不能超过16个字符'));
  } else {
    if (userPwd.newPwd !== '') {
      if (!pwdFormRef.value) return;
      pwdFormRef.value.validateField('confirmPwd', () => null);
    }
    callback();
  }
};
//@ts-ignore
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'));
  } else if (value !== userPwd.newPwd) {
    callback(new Error('密码与确认密码不相同'));
  } else {
    callback();
  }
};
const passwordRules = reactive<FormRules<typeof userPwd>>({
  originPwd: [
    {
      required: true,
      message: () => {
        return `原密码不能为空`;
      },
      trigger: 'blur',
    },
    {
      max: 16,
      message: () => {
        return `最大密码长度为16`;
      },
    },
  ],
  newPwd: [{ validator: validatePass, trigger: 'blur', required: true }],
  confirmPwd: [{ validator: validatePass2, trigger: 'blur', required: true }],
});

const userInfoRules = reactive<FormRules<typeof userPwd>>({
  nickname: [
    {
      required: true,
      message: () => {
        return `原密码不能为空`;
      },
      trigger: 'blur',
    },
    {
      max: 16,
      message: () => {
        return `最大密码长度为16`;
      },
    },
  ],
  email: [{ validator: validatePass, trigger: 'blur', required: true }],
  confirmPwd: [{ validator: validatePass2, trigger: 'blur', required: true }],
});

const goUserSpace = (el: any) => {
  let current = el.props.name;
  // 为了打开新窗口用下面方式
  if (current === 'four') {
    const url = $router.resolve(`userSpace/${userId}`);
    window.open(url.href, '_blank');
  }
};

const sendCode = async () => {
  const res = await reqSendCode(userInfo.email);
  console.log(res);
};
</script>

<template>
  <div class="container">
    <WanViviTop />
    <div class="content">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>个人中心</span>
          </div>
        </template>
        <el-tabs
          tab-position="left"
          v-model="activeName"
          class="demo-tabs"
          @tab-click="goUserSpace">
          <el-tab-pane name="first">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><User /></el-icon>
                <span>我的信息</span>
              </span>
            </template>
            <el-form
              ref="form"
              :model="userInfo"
              label-width="auto"
              label-position="left"
              size="default">
              <el-form-item label="用户名:">
                {{ userInfo.name }}
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="userInfo.nickname" />
              </el-form-item>
              <el-form-item label="邮箱">
                <div style="display: flex">
                  <el-input
                    v-model="userInfo.email"
                    style="margin-right: 10px" />
                  <el-button @click="sendCode">发送验证码</el-button>
                </div>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="userInfo.code" />
              </el-form-item>
              <el-form-item class="save">
                <el-button type="primary" @click="onModifyUserInfo"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="second">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><Avatar /></el-icon>
                <span>我的头像</span>
              </span>
            </template>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <el-button type="primary" @click="updateAvatar">更新</el-button>
          </el-tab-pane>
          <el-tab-pane name="third">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><Lock /></el-icon>
                <span>修改密码</span>
              </span>
            </template>
            <el-form
              ref="pwdFormRef"
              :model="userPwd"
              label-width="auto"
              label-position="left"
              :rules="passwordRules"
              size="default">
              <el-form-item label="原密码" prop="originPwd">
                <el-input v-model="userPwd.originPwd" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="userPwd.newPwd" />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPwd">
                <el-input v-model="userPwd.confirmPwd" />
              </el-form-item>
              <el-form-item class="save">
                <el-button type="primary" @click="onModifyPwd(pwdFormRef!)"
                  >修改</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="four">
            <template #label @click="goUserSpace">
              <span class="custom-tabs-label">
                <el-icon><Lock /></el-icon>
                <span>个人空间</span>
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-card>
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
    justify-content: center;
    .box-card {
      width: 75%;
      margin-top: 100px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      :deep(.text) {
        font-size: 14px;
      }

      :deep(.item) {
        margin-bottom: 18px;
      }

      .demo-tabs {
        & > :deep(.el-tabs__content) {
          display: flex;
          justify-content: center;
          padding: 32px;
          color: #6b778c;
          font-size: 32px;
          font-weight: 600;
        }
        .avatar-uploader .avatar {
          width: 160px;
          height: 160px;
          display: block;
        }
      }
      .demo-tabs .custom-tabs-label :deep(.el-icon) {
        vertical-align: middle;
      }
      .demo-tabs .custom-tabs-label span {
        vertical-align: middle;
        margin-left: 4px;
      }
      .save :deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
}
</style>

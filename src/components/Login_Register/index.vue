<template>
  <div class="register_container">
    <el-dialog
      v-model="userStore.visible"
      width="45%"
      @close="loginOrReg"
      style="background-color: aliceblue">
      <!-- 注册对话框内容结构 -->
      <el-row>
        <el-col>
          <div class="login_register">
            <div class="title">
              <a href="#" @click="loginOrReg(1)">用户登录</a>
              <span>/</span>
              <a href="#" @click="loginOrReg(0)">用户注册</a>
            </div>
            <div class="form">
              <el-form :model="dataParam" :rules="rules" ref="form">
                <el-form-item prop="username">
                  <el-input
                    placeholder="请输入账号"
                    :prefix-icon="User"
                    v-model="dataParam.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    placeholder="请输入密码"
                    :prefix-icon="Lock"
                    v-model="dataParam.password"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <el-button type="primary" @click="login" v-if="isRegister"
              >登录
            </el-button>
            <el-button type="primary" @click="register" v-else>注册 </el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
// 获取user仓库的数据（visiable）可以控制login组件的对话框显示与隐藏
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { reqUserRegister } from '@/api/user/index.ts';
import type { ResponseData, DataParameter } from '@/api/user/type.ts';

// 获取form组件实例
let form = ref<any>();

let userStore = useUserStore();
let dataParam = reactive<DataParameter>({
  username: '',
  password: '',
});
let isRegister = ref<boolean>(true);

onMounted(() => {
  isCookie();
});

// 自定义账号校验规则
const validatorUsername = (rule: any, value: any, callback: any) => {
  const userNamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  if (userNamePattern.test(value)) {
    callback();
  } else {
    callback(new Error('你输入的用户名有误'));
  }
};
// 自定义密码校验规则
const validatorPassword = (rule: any, value: any, callback: any) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
  if (passwordPattern.test(value)) {
    callback();
  } else {
    callback(new Error('你输入的密码有误'));
  }
};

const rules = {
  username: [{ trigger: 'blur', validator: validatorUsername }],
  password: [{ trigger: 'blur', validator: validatorPassword }],
};

// 登录回调
const login = async () => {
  //保证表单校验两项符合条件
  // await form.value.validate();
  try {
    //用户登录成功
    await userStore.userLogin(dataParam);
    userStore.isLogin = true;
    //关闭对话框
    userStore.visible = false;
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message,
    });
  }
};
// 注册回调
const register = async () => {
  await form.value.validate();
  try {
    let result: ResponseData = await reqUserRegister(dataParam);
    if (result.status !== 200) {
      return ElMessage({
        type: 'error',
        message: result.message,
      });
    }
    isRegister.value = true;
    ElMessage({
      type: 'success',
      message: '注册成功!请登录！',
    });
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message,
    });
  }
};
// 判断cookie中是否有信息
const isCookie = () => {
  if (userStore.userInfo.token) userStore.isLogin = true;
};
// 登录或注册选中状态
const loginOrReg = (state: number) => {
  if (!state) {
    isRegister.value = false;
    form.value.resetFields();
  } else {
    isRegister.value = true;
    form.value.resetFields();
  }
};
</script>

<style lang="scss" scoped>
.register_container {
  .login_register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: #639ee6;
        }
      }
    }
    .form {
      width: 300px;
    }
  }
}
</style>

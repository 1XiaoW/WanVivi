<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
// 获取user仓库的数据（visiable）可以控制login组件的对话框显示与隐藏
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
import { reqUserRegister } from '@/api/user/index.ts';
import type { ResponseData, DataParameter } from '@/api/user/type.ts';

// 获取form组件实例
const form = ref<any>();

const userStore = useUserStore();
const dataParam = reactive<DataParameter>({
  username: 'dzq',
  password: '123456',
  repassword: '',
});
const isLogin = ref<boolean>(true);

onMounted(() => {
  isCookie();
});

// 自定义账号校验规则
//@ts-ignore
const validatorUsername = (rule: any, value: any, callback: any) => {
  const userNamePattern = /^[a-zA-Z0-9_-]{4,16}$/;
  if (userNamePattern.test(value)) {
    callback();
  } else {
    callback(new Error('你输入的用户名有误'));
  }
};
// 自定义密码校验规则
//@ts-ignore
const validatorPassword = (rule: any, value: any, callback: any) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
  if (passwordPattern.test(value)) {
    callback();
  } else {
    callback(new Error('你输入的密码有误'));
  }
};

const validatorRePassword = (rule: any, value: any, callback: any) => {
  if (!isLogin && value !== dataParam.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  username: [{ trigger: 'blur', validator: validatorUsername }],
  password: [{ trigger: 'blur', validator: validatorPassword }],
  repassword: [{ trigger: 'blur', validator: validatorRePassword }],
};

// 登录回调
const login = async () => {
  //保证表单校验两项符合条件
  // await form.value.validate();
  try {
    //用户登录成功
    const { username, password } = dataParam;
    const data = { username, password };
    await userStore.userLogin(data);
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
    const { username, password } = dataParam;
    const data = { username, password };
    const result: ResponseData = await reqUserRegister(data);
    if (result.status !== 200) {
      return ElMessage({
        type: 'error',
        message: result.message,
      });
    }
    isLogin.value = true;
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
const loginOrReg = (state: boolean) => {
  if (!state) {
    isLogin.value = false;
    form.value.resetFields();
  } else {
    isLogin.value = true;
    form.value.resetFields();
  }
};
</script>

<template>
  <div>
    <el-dialog
      v-model="userStore.visible"
      @close="loginOrReg(true)"
      width="400"
      style="border-radius: 20px">
      <!-- 注册对话框内容结构 -->

      <div class="form-content">
        <h1 class="title">{{ isLogin ? '用户登录' : '用户注册' }}</h1>
        <h3 class="tips">
          {{
            isLogin
              ? '输入您的详细信息以登录您的帐户'
              : '输入账号密码注册新帐户'
          }}
        </h3>
        <el-form
          :model="dataParam"
          :rules="rules"
          ref="form"
          class="input-wrapper">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              :prefix-icon="User"
              size="large"
              v-model="dataParam.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              :prefix-icon="Lock"
              size="large"
              v-model="dataParam.password"></el-input>
          </el-form-item>
          <el-form-item prop="repassword" v-show="!isLogin">
            <el-input
              placeholder="请再次输入密码"
              type="password"
              :prefix-icon="Lock"
              size="large"
              v-model="dataParam.repassword"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="forgot-pwd">
          <span>忘记密码</span>
        </div> -->
        <el-button class="btn" @click="login" v-if="isLogin">登录 </el-button>
        <el-button class="btn" @click="register" v-else>注册 </el-button>
        <!-- <div class="other-login">
          <div class="divider">
            <span class="line"></span>
            <span class="divider-text">或使用以下登录</span>
            <span class="line"></span>
          </div>
          <div class="other-login-wrapper">
            <div class="other-login-item">
              <svg
                t="1695533328061"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4023"
                width="128"
                height="128">
                <path
                  d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"
                  p-id="4024"></path>
              </svg>
              <span>QQ</span>
            </div>
            <div class="other-login-item">
              <svg
                t="1695533780568"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5066"
                width="128"
                height="128">
                <path
                  d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                  p-id="5067"></path>
              </svg>
              <span>WeChat</span>
            </div>
          </div>
        </div> -->
        <div class="request">
          {{ isLogin ? '还没有账号？' : '已有帐号？'
          }}<span @click="loginOrReg(!isLogin)">{{
            isLogin ? '现在注册' : '现在登陆'
          }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.form-content {
  width: 100%;
  background-color: #fff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px;

  .title {
    font-size: 20px;
    margin: 4% 0;
    font-family: HarmonyOS_Regular;
  }

  .tips {
    font-size: 16px;
    margin-bottom: 8%;
    font-family: HarmonyOS_Regular;
  }

  .input-wrapper {
    width: 100%;
    margin: 2% 0;
  }

  .forgot-pwd {
    width: 100%;
    margin-bottom: 6%;
    font-family: HarmonyOS_Regular;

    span {
      float: left;
      cursor: pointer;
    }
  }

  .btn {
    width: 100%;
    height: 40px;
    background-color: rgb(254, 200, 135);
    border-radius: 10px;
    border: 0;
    font-family: HarmonyOS_Regular;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      box-shadow: 1px 10px 32px 1px rgba(254, 200, 135, 0.37);
      color: #000;
    }
  }

  .other-login {
    width: 100%;
    margin: 3%;

    .divider {
      width: 100%;
      margin: 20px 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .line {
        width: 5%;
        display: inline-block;
        height: 1px;
        background-color: #000;
      }

      .divider-text {
        font-family: HarmonyOS_Regular;
        vertical-align: middle;
        margin: 0 10px;
        display: inline-block;
        color: #000;
        white-space: nowrap;
      }
    }

    .other-login-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .other-login-item {
        width: 135px;
        height: 35px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        margin: 0 10px;
        transition: 0.5s;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid rgb(231, 231, 231);

        svg {
          width: 30px;
          height: 30px;
          fill: #000;
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }

        &:hover {
          background-color: #fff;
          border: 1px solid #000;
          box-shadow: 1px 10px 32px 1px rgba(186, 175, 221, 0.37);

          svg {
            fill: #000;
          }
        }
      }
    }
  }

  .request {
    margin: 5% 0;
    font-family: HarmonyOS_Regular;

    span {
      font-weight: 900;
      cursor: pointer;
      font-family: HarmonyOS_Regular;
      margin-left: 5px;
    }
  }

  .Copyright {
    position: absolute;
    bottom: -50px;
    font-weight: 100;
  }
}
</style>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { reqSubmitVideo } from '@/api/video/index.ts';
import { ref, onMounted, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import useChannelStore from '@/store/modules/channel.ts';
import { genFileId } from 'element-plus';
import { ElMessage } from 'element-plus';

interface VideoForm {
  videoTitle: string;
  videoBrief: string;
  videoAreaId: number;
  videoAreaName: string;
}

let useChannel = useChannelStore();

let activeIndex = ref<string>('0');

const imageUrl = ref('');
const files = ref();
const coverImg = ref();
const formRef = ref();
const uploadRef = ref();
const loading = ref(false);
let addForm: VideoForm = reactive({
  videoTitle: '',
  videoBrief: '',
  videoAreaId: 0,
  videoAreaName: '',
});
const props = {
  // expandTrigger: 'hover' as const,
  value: 'id',
  label: 'channel',
};
onMounted(async () => {
  await useChannel.getChannelList();
});

const rules = {
  videoTitle: [
    { required: true, message: '请输入视频标题', trigger: 'blur' },
    { max: 30, message: '视频标题不能超过30个字符', trigger: 'blur' },
  ],
  videoBrief: [
    { required: true, message: '请输入视频简介', trigger: 'blur' },
    { max: 200, message: '视频简介不能超过200个字符', trigger: 'blur' },
  ],
  videoAreaId: [
    {
      type: 'array',
      required: true,
      message: '请选择视频分区',
      trigger: 'change',
    },
  ],
};

// 视频上传on-change
const upldchange = (file: any) => {
  if (file.raw.type.startsWith('video/')) {
    // 处理视频文件
    files.value = file.raw;
    activeIndex.value = '1';
  } else {
    // 处理其他文件
    // ...
    ElMessage.error('你上传的不是视频啊');
    uploadRef.value.clearFiles();
  }
};
// 视频文件上传限制
const handleExceed = (files: any) => {
  uploadRef.value!.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};

// 上传封面
const coverChange = async (file: any) => {
  if (file.raw.type.startsWith('image/')) {
    // 处理图片文件
    imageUrl.value = URL.createObjectURL(file.raw!);
    coverImg.value = file.raw;
    activeIndex.value = '2';
  } else {
    // 处理其他文件
    ElMessage.error('你上传的不是图片啊');
  }
};

// 最终投稿
const submitupload = async () => {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      // 校验通过，执行提交操作
      addForm.videoAreaName = useChannel.channelList.find(
        (v) => v.id == addForm.videoAreaId
      )?.channel!;
      if (files.value === undefined) {
        activeIndex.value = '0';
        ElMessage.error('请选择要投稿的视频');
      } else if (coverImg.value === undefined) {
        activeIndex.value = '1';
        ElMessage.error('请选择要投稿的封面');
      } else {
        loading.value = true;
        let formData = new FormData();
        for (const key in addForm) {
          const value = addForm[key as keyof VideoForm].toString();
          formData.append(key, value);
        }
        formData.append('file', files.value);
        formData.append('coverImg', coverImg.value);
        const res = await reqSubmitVideo(formData);
        if (res.status === 200) {
          loading.value = false;
          activeIndex.value = '3';
          ElMessage.success('视频投稿成功');
        } else {
          ElMessage.error('服务器错误');
          loading.value = false;
        }
      }
    } else {
      // 校验失败，提示错误信息
      ElMessage.error('提交失败');
    }
  });
};
</script>

<template>
  <div class="container">
    <WanViviTop />
    <div class="content">
      <!-- 卡片视图 -->
      <el-card
        class="sumbitCard"
        v-loading="loading"
        element-loading-text="正在上传中，请勿关闭或刷新此页面">
        <!-- 提示区 -->
        <el-alert title="投稿视频" type="success" center :closable="false">
        </el-alert>
        <!-- 步骤条 -->
        <el-steps
          :active="Number(activeIndex)"
          finish-status="success"
          align-center="">
          <el-step title="上传视频"></el-step>
          <el-step title="视频封面"></el-step>
          <el-step title="基本信息"></el-step>
        </el-steps>

        <!-- tab栏区域 -->
        <el-form
          ref="formRef"
          label-width="100px"
          label-position="top"
          :rules="rules"
          :model="addForm">
          <el-tabs
            v-model="activeIndex"
            :tab-position="'left'"
            class="upload-tabs">
            <el-tab-pane label="上传视频" name="0">
              <!-- 渲染表单的Item项 -->
              <el-form-item>
                <el-upload
                  ref="uploadRef"
                  class="upload-video"
                  drag
                  accept="video/*"
                  :limit="1"
                  :on-change="upldchange"
                  :on-exceed="handleExceed"
                  :auto-upload="false">
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    拖拽此处或 <em>点击上传</em>
                  </div>
                  <!-- <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500kb
                    </div>
                  </template> -->
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="视频封面" name="1">
              <el-form-item label="封面图">
                <el-upload
                  class="upload-cover"
                  :show-file-list="false"
                  :on-change="coverChange"
                  :auto-upload="false"
                  accept="image/*">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="基本信息" name="2">
              <el-form-item label="视频标题" prop="videoTitle">
                <el-input
                  v-model="addForm.videoTitle"
                  type="text"
                  maxlength="30"
                  placeholder="请输入视频标题"
                  show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="视频简介" prop="videoBrief">
                <el-input
                  :rows="3"
                  type="textarea"
                  maxlength="200"
                  placeholder="请输入视频简介"
                  show-word-limit
                  v-model="addForm.videoBrief"></el-input>
              </el-form-item>
              <el-form-item label="视频分区" prop="videoAreaId">
                <el-cascader
                  v-model="addForm.videoAreaId"
                  :options="useChannel.channelList"
                  :props="props"></el-cascader>
              </el-form-item>
              <el-form-item label="完成">
                <el-button @click="submitupload">提交</el-button>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
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
    .sumbitCard {
      height: 480px;
      .upload-tabs {
        .upload-video {
          width: 100%;
        }
        .upload-cover,
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
          border-radius: 5px;
          border: 1px dashed #dcdfe6;
          &:hover {
            border: 1px dashed #409eff;
          }
        }
        .upload-success {
          margin-top: 10%;
          font-size: 28px;
          color: #67c23a;
          text-align: center;
        }
      }
    }
  }
}
</style>

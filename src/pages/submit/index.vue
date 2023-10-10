<template>
  <div class="container">
    <!-- 卡片视图 -->
    <el-card class="sumbitCard">
      <!-- 提示区 -->
      <el-alert
        title="投稿视频"
        type="success"
        center
        show-icon
        :closable="false">
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :active="Number(activeIndex)"
        finish-status="success"
        align-center="">
        <el-step title="上传视频"></el-step>
        <el-step title="基本信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-form
        ref="addFormRef"
        label-width="100px"
        label-position="top"
        :model="addForm">
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          class="upload-tabs">
          <el-tab-pane label="上传视频" name="0">
            <!-- 渲染表单的Item项 -->
            <el-form-item>
              <el-upload
                class="upload-video"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                drag
                accept="video/*"
                :on-change="upldchange"
                :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖拽此处或 <em>点击上传</em></div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="视频封面" name="1">
            <el-form-item label="封面图">
              <el-input type="number"></el-input>
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
            <el-form-item label="视频分区" prop="videoArea">
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
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { reqSubmitVideo } from '@/api/video/index.ts';
import { ref, onMounted, reactive } from 'vue';
import useChannelStore from '@/store/modules/channel.ts';

let useChannel = useChannelStore();

let activeIndex = ref<string>('0');

let files = ref();
let addForm = reactive({
  videoTitle: '1',
  videoBrief: '2',
  videoAreaId: 1027,
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

const upldchange = (file: any) => {
  if (file.raw.type.startsWith('video/')) {
    // 处理视频文件
    files.value = file.raw;
  } else {
    // 处理图片文件
    // ...
    console.log('你上传的不是视频啊');
  }
};

const submitupload = async () => {
  addForm.videoAreaName = useChannel.channelList.find(
    v => v.id == addForm.videoAreaId
  )?.channel!;
  if (files.value?.length !== 0) {
    let formData = new FormData();
    for (const key in addForm) {
      // @ts-ignore
      formData.append(key, addForm[key]);
    }
    formData.append('file', files.value);
    let result = await reqSubmitVideo(formData);
    console.log(result);
  } else {
    // ...
  }
};
</script>

<style lang="scss" scoped>
.container {
  .sumbitCard {
    height: 480px;
    .upload-tabs {
      .upload-video {
        width: 100%;
      }
    }
  }
}
</style>

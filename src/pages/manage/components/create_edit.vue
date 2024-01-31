<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { GET_TOKEN } from '@/utils/user';
import { reqPostMessage, reqUpdateMessage } from '@/api/message';
import { ElMessage } from 'element-plus';

// 标题
const title = ref('发布系统消息');

const dialogFormVisible = ref(false);

const $emit = defineEmits(['getSystemMsg']);

// bus.on('editSystemMessage', (row: any) => {
//   title.value = '编辑系统消息';
//   formData.id = row.id;
//   formData.message_title = row.message_title;
//   formData.publisher = row.publisher;
//   formData.message_content = row.message_content;
// });

interface FormData {
  id?: number;
  message_title: string;
  publisher: string;
  message_category: string;
  message_content: string;
}
// 表单数据
const formData: FormData = reactive({
  message_title: '',
  publisher: JSON.parse(GET_TOKEN() as string).username,
  message_category: '系统通知',
  message_content: '',
});

const rules = reactive({
  message_title: [
    { required: true, message: '请输入公告标题', trigger: 'blur' },
  ],
  publisher: [{ required: true, message: '请输入发布人', trigger: 'blur' }],
  message_content: [
    { required: true, message: '请输入公告内容', trigger: 'blur' },
  ],
});

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
  'emotion',
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

// 打开编辑管理员的弹窗
const open = (row?: any) => {
  if (row) {
    title.value = '修改系统消息';
    formData.id = row.id;
    formData.message_title = row.message_title;
    formData.message_content = row.message_content;
  }
  dialogFormVisible.value = true;
};

defineExpose({
  open,
});

// 确定发布消息
const confirm = async () => {
  if (title.value === '修改系统消息') {
    const res = await reqUpdateMessage(formData);
    console.log(res);
    if (res.status === 200) {
      ElMessage.success('消息修改成功！');
      $emit('getSystemMsg');
      dialogFormVisible.value = false;
    }
  } else {
    const res = await reqPostMessage(formData);
    if (res.status === 200) {
      ElMessage.success('消息发布成功！');
      $emit('getSystemMsg');
      dialogFormVisible.value = false;
    }
  }
};

// Dialog 关闭动画结束时的回调
const dialogClosed = () => {
  formData.message_title = '';
  formData.message_content = '';
};
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="50%"
    align-center
    @closed="dialogClosed"
    append-to-body
    :destroy-on-close="true">
    <div class="dialog-content">
      <el-form
        :model="formData"
        label-width="120px"
        style="max-width: 600px"
        :rules="rules"
        label-position="left">
        <el-form-item label="主题" prop="message_title">
          <el-input v-model="formData.message_title" />
        </el-form-item>
        <el-form-item label="发布人" prop="message_publish_name">
          <el-input v-model="formData.publisher" disabled />
        </el-form-item>
        <el-form-item label="内容" prop="message_content">
          <div style="border: 1px solid #ccc">
            <!-- wangEditor结构 -->
            <Toolbar
              style="border-bottom: 1px solid #ccc; width: 500px"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor
              style="height: 300px; overflow-y: hidden; width: 500px"
              v-model="formData.message_content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated" />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-content {
  display: flex;
  padding: 20px 30px;
  flex: 1;
  max-height: 800px;
  overflow: auto;
}

.el-dialog__body {
  padding: 0;
}

.el-input {
  width: 240px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.el-form-item {
  margin: 16px;
}

:deep(.w-e-text-container p) {
  margin: 0;
}
</style>

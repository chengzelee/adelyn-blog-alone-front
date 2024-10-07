<template>
  <el-row type="flex" justify="center" class="transfile-el-row-bottom-space">
    <el-col :span="11">
      <el-input
          placeholder="请输入传输码"
          v-model="transCode"
          clearable>
      </el-input>
    </el-col>
    <el-col :span="1">
      <el-button type="primary" v-if="generateTransCodeDisabled" @click="generateTransCode">生成传输码</el-button>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center" class="transfile-el-row-bottom-space">
    <el-col :span="12">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="https://blog.adelyn.cn/blog-backend"
          :http-request="uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-progress="handleProgress"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :drag="true"
          :multiple="true"
          :auto-upload="true">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">将文件拖到此处，或手动选择</div>
      </el-upload>
      <!-- 显示进度条 -->
      <el-progress
          v-if="uploadProgress > 0"
          :percentage="uploadProgress"
          status="success"
      ></el-progress>
    </el-col>
  </el-row>
</template>

<script setup>
import * as transFileApi from '@/api/transfile/transfile.js'
import {onMounted, ref, watch} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import * as authUtil from '@/utils/auth.js'
import * as blogManageApi from "@/api/blogmanage/blog";

const transCode = ref('')
const fileList = ref([])
const generateTransCodeDisabled = ref(false)
const uploadProgress = ref(0);  // 用于存储上传进度

onMounted(() => {
  // 登录了可以生成传输码
  if (authUtil.getAccessToken().length !== 0) {
    generateTransCodeDisabled.value = true
  }
})

watch(transCode, (newValue, oldValue) => {
  getFileList()
});

const generateTransCode = () => {
  transFileApi.generateTransCode()
      .then(
          (res) => {
            transCode.value = res
          }
      )
}

// before-upload 函数，用于校验文件大小
const beforeUpload = (file) => {
  // 校验传输码
  if (transCode.value.trim() === '') {
    ElMessage.error("请填写传输码")
    return false
  }

  // 校验大小
  let isLt100M = file.size / 1024 / 1024 < 100; // 将字节转换为MB进行比较

  if (!isLt100M) {
    ElMessage.error('受cloudflare限制,上传文件大小不能超过 100MB!');
    return false
  }

  return true
};


const uploadFile = ( {file} ) => {
  // 传输
  let formData = new FormData()
  formData.append('transCode', transCode.value)
  formData.append('file', file)

  transFileApi.uploadFile(formData, (progressEvent) => {
    uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);  // 更新上传进度
  }).then(response => {
    ElMessage.success("上传成功")
    uploadProgress.value = 0;  // 上传完成后重置进度条
    // 重新请求，把fileId塞进去 组件默认的没有
    getFileList()
  }).catch(error => {
    uploadProgress.value = 0;  // 上传完成后重置进度条
    // 重新请求，把fileId塞进去 组件默认的没有
    getFileList()
  });
}

const handleProgress = (event, file, fileList) => {
  uploadProgress.value = Math.round(event.percent);  // 更新上传进度
};


const getFileList = () => {
  if (transCode.value.trim() === '') {
    ElMessage.error("请填写传输码")
    fileList.value = []
    return
  }

  transFileApi.getTransFileList({ transCode: transCode.value })
      .then(
          (res) => {
            fileList.value = res
          }
      )
}

const handlePreview = (file) => {
  // 创建隐藏的 <a> 元素
  let link = document.createElement('a');
  link.href = file.url;  // 将文件的 URL 赋值给 <a> 元素的 href
  link.download = file.name;  // 设置下载文件的名字

  // 如果浏览器支持 download 属性，则直接触发下载
  if (link.download !== undefined) {
    document.body.appendChild(link);  // 将 <a> 元素暂时添加到 DOM
    link.click();  // 自动点击以触发下载
    document.body.removeChild(link);  // 点击后立即移除 <a> 元素
  } else {
    // 对于不支持 download 属性的浏览器，直接跳转到该 URL
    window.location.href = url;
  }
}

const handleRemove = (file, fileList) => {
  // beforeUpload 检查没过，会调handleRemove 删除，此时fileId不存在
  if (!file.fileId) {
    // 但是填了传输码的情况下还是要有值
    if (transCode.value.trim() !== '') {
      getFileList()
    }
    return
  }

  transFileApi.deleteFile({ transCode: transCode.value, fileId: file.fileId})
      .then(
          () => {
            ElMessage.success("删除成功")
            // 重新请求，把fileId塞进去 组件默认的没有
            getFileList()
          }
      )
}


</script>

<style>
.transfile-el-row-bottom-space {
  margin-bottom: 50px;
}
</style>

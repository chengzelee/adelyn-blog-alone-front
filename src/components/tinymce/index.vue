<template>
  <editor v-model="textContent" :init="init" :disabled="disabled"></editor>
</template>

<script setup>

import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
// tinymce插件可按自己的需要进行导入
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/importcss' //图片工具
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/codesample' // 插入代码
import 'tinymce/plugins/code' // 查看源码
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/searchreplace' //查询替换
import 'tinymce/plugins/insertdatetime'
import {onMounted, ref} from "vue";

import * as ossApi from '@/api/common/oss.js'

const props = defineProps({
value: {
  type: String,
  default: ''
},
disabled: {
  type: Boolean,
  default: false
},

plugins: {
  type: [String, Array],
  // 插件在上面需要import进来
   default: 'lists wordcount insertdatetime  searchreplace  print preview image hr  fullscreen codesample code table autoresize'
},
toolbar: {
  type: [String, Array],
  default:
    "undo redo | h1 h2 h3 h4 h5 h6 | bold forecolor backcolor | lineheight bullist numlist outdent indent blockquote | lists table hr codesample insertdatetime | searchreplace | wordcount | fullscreen | code preview print",
}
})

const init = {
  // width: 720,
  height: 650,
  language_url: '/tinymce/langs/zh-Hans.js',
  language: 'zh-Hans',
  // 皮肤：这里引入的是public下的资源文件
  skin_url: '/tinymce/skins/ui/oxide',
  // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
  content_css: '/tinymce/skins/content/default/content.css', //内容区域css样式
  // images_file_types: "jpg,svg,webp",
  // images_upload_url: "xxxxxxxxxxxxx",//系统默认配置的自动上传路径，需替换为真实路径测试
  plugins: props.plugins,
  toolbar: props.toolbar,
  branding: false,
  // 隐藏菜单栏
  menubar: false,
  // 是否显示底部状态栏
  statusbar: false,
  // convert_urls: false,
  // 图片对齐
  a11y_advanced_options: true,

  codesample_languages: [
    { text: 'Java', value: 'java' },
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'CSS', value: 'css' },
    { text: 'Python', value: 'python' }
  ],

  // 初始化完成
  init_instance_callback: (editor) => {
    // console.log('初始化完成：', editor)
  },

  // 此处为自定义图片上传处理函数
  images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('pic', blobInfo.blob());

    ossApi.uploadPic(formData).then(
        (res) => {
          let picId = res
          resolve("https://blog.adelyn.cn/blog-backend/pic/public/" + picId)
          picIdList.value.push(picId)
        }
    )

  })
}

// 组件挂载完毕
onMounted(() => {
  tinymce.init({})
})

let textContent = ref(props.value)

// 添加相关的事件,https://github.com/tinymce/tinymce-vueevents
const clear = () => {
  textContent = ''
}

const setContent = (value) => {
  textContent.value = value
}

const getContent = () => {
  return textContent.value
}

const picIdList = ref([])

const getPicIdList = () => {
  return picIdList.value
}

defineExpose({ setContent, getContent, getPicIdList })
</script>
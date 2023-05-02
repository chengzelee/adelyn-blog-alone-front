<template>
  <div class="scroll-y">
    <el-input v-model="title" />
<!--    <div class="mb-1">
      <el-button @click="setTinyContent">设置文本消息</el-button>
      <el-button @click="getTinyContent">获取文本消息</el-button>
      <el-button @click="clearTinyContent">清空内容</el-button>
    </div>-->
    <Tinymce ref="refTinymce" />
    <el-button type="primary" @click="publish">发布</el-button>
    <el-switch
        v-model="visible"
        inline-prompt
        active-text="public"
        inactive-text="private"
    />
  </div>
</template>

<script setup>
import Tinymce from '@/components/tinymce/index.vue'
import { ref } from 'vue'
import * as blogApi from '@/api/blogmanage/blog.js'
import router from '@/router'

/*tinymce操作*/
const refTinymce = ref(null);

const title = ref('')
const visible = ref(true)

const setTinyContent = () => {
  if (refTinymce?.value) {
    refTinymce.value.setContent("tinymce设置的内容");
  }
};

const getTinyContent = () => {
  if (refTinymce?.value) {
    return refTinymce.value.getContent();
  }
};

const clearTinyContent = () => {
  if (refTinymce?.value) {
    refTinymce.value.setContent("");
  }
};

const publish = () => {
  let blog = {
    blogTitle: title.value,
    blogContent: getTinyContent(),
    blogVisible: visible.value == true ? 'public' : 'private'
  }

  blogApi.publish(blog).then(
      () => {
        router.push({ path: '/manage' })
      }
  )
}

</script>
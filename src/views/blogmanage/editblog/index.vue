<template>
  <div class="scroll-y">
    <el-row align="middle" justify="start">
      <el-col :span="1">标题：</el-col>
      <el-col :span="15">
        <el-input v-model="title"/>
      </el-col>
    </el-row>
    <Tinymce ref="refTinymce" />
    <el-row align="middle" justify="start">
      <el-col :span="2">是否公开：</el-col>
      <el-col :span="3">
        <el-switch
            v-model="visible"
            inline-prompt
            active-text="public"
            inactive-text="private"
        />
      </el-col>
    </el-row>
    <el-row align="middle" justify="end">
      <el-col :span="4">
        <el-button type="primary" @click="publish">发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Tinymce from '@/components/tinymce/index.vue'
import {onMounted, ref} from 'vue'
import * as blogManageApi from '@/api/blogmanage/blog.js'
import * as blogApi from '@/api/blog/blog.js'
import router from '@/router'
import {useRouter} from "vue-router";

let blogId
onMounted(() => {
  const router = useRouter()
  blogId = router.currentRoute.value.query.blogId
  if (blogId != null && blogId !== '') {
    setBlogContent(blogId)
  }
})

const setBlogContent = (blogId) => {
  blogApi.getBlogContent({ blogId: blogId }).then(
      (res) => {
        title.value = res.blogTitle
        setTinyContent(res.blogContent)
      }
  )
}

/*tinymce操作*/
const refTinymce = ref(null);

const title = ref('')
const visible = ref(true)

const setTinyContent = (blogData) => {
  if (refTinymce?.value) {
    refTinymce.value.setContent(blogData);
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
    blogId: blogId,
    blogTitle: title.value,
    blogContent: getTinyContent(),
    blogVisible: visible.value == true ? 'public' : 'private'
  }

  if (blogId != null && blogId !== '') {
    blogManageApi.update(blog).then(
        () => {
          router.push({ path: '/manage' })
        }
    )
  } else {
    blogManageApi.publish(blog).then(
        () => {
          router.push({ path: '/manage' })
        }
    )
  }
}

</script>
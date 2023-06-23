<template>
  <el-row class="el-row-bottom-space" align="middle" justify="start">
    <el-col :span="1">标题：</el-col>
    <el-col :span="15">
      <el-input v-model="title"/>
    </el-col>
  </el-row>
  <Tinymce ref="refTinymce" />
  <el-row class="el-row-bottom-space" align="middle" justify="start">
    <el-col :span="2">是否公开：</el-col>
    <el-col :span="3">
      <el-switch
          v-model="visible"
          inline-prompt
          active-text="公开"
          inactive-text="不公开"
      />
    </el-col>
  </el-row>
  <el-row class="el-row-bottom-space" align="middle" justify="start">
    <el-col :span="3">
      <el-button type="primary" @click="openTagSelectForm">选择tag</el-button>
    </el-col>
  </el-row>
  <el-row class="el-row-bottom-space" align="middle" justify="end">
    <el-col :span="4">
      <el-button type="primary" @click="publish">发布</el-button>
    </el-col>
  </el-row>

  <el-dialog v-model="tagSlectFormVisible" title="tag">
    <el-transfer
        v-model="selectedTagList"
        :data="tagList"
        :props="{
            key: 'tagId',
            label: 'tagName',
        }"
        :titles="['可选择', '已选择']"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelTagSelectForm">取消</el-button>
        <el-button type="primary" @click="saveSelectedTags">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Tinymce from '@/components/tinymce/index.vue'
import {onMounted, ref} from 'vue'
import * as blogManageApi from '@/api/blogmanage/blog.js'
import * as blogApi from '@/api/blog/blog.js'
import * as tagApi from '@/api/blogmanage/tag.js'
import router from '@/router'
import { useRouter } from "vue-router";

let blogId
onMounted(() => {
  const router = useRouter()
  blogId = router.currentRoute.value.query.blogId
  if (blogId != null && blogId !== '') {
    setBlogContent(blogId)
    getBlogInfo(blogId)
  }
})

const setBlogContent = (blogId) => {
  blogApi.getUserBlogContent({ blogId: blogId }).then(
      (res) => {
        title.value = res.blogTitle
        setTinyContent(res.blogContent)
      }
  )
}

const getBlogInfo = (blogId) => {
  blogManageApi.getInfo({ blogId: blogId }).then(
      (res) => {
        visible.value = (res.blogVisible === 'public')
        for (const tagVO of res.blogTagList) {
          selectedTagList.value.push(tagVO.tagId)
        }
      }
  )
}

const publish = () => {
  let blog = {
    blogId: blogId,
    blogTitle: title.value,
    blogContent: getTinyContent(),
    picIdList: getPicIdList(),
    // 后端序列化时只取 tagId，不封装成对象也可以
    tagIdList: selectedTagList.value,
    blogVisible: visible.value === true ? 'public' : 'private'
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

// tag操作
const tagSlectFormVisible = ref(false)
const tagList = ref([])
const selectedTagList = ref([])
const originSelectedTagList = ref([])

const openTagSelectForm = () => {
  tagSlectFormVisible.value = true

  // 记录一下选择之前的值，这样取消选择后可以还原
  originSelectedTagList.value = selectedTagList.value

  let pageDTO = {
    pageNum: 1,
    pageSize: 50,
    pageOrderList: [
        {
          column: 'tagId',
          asc: false
        }
    ]
  }

  tagApi.getPage({ pageDTO }).then(
      (res) => {
        tagList.value = res.list
      }
  )
}

const cancelTagSelectForm = () => {
  // 还原之前的选项
  selectedTagList.value = originSelectedTagList.value
  tagSlectFormVisible.value = false
}

const saveSelectedTags = () => {
  originSelectedTagList.value = selectedTagList.value
  tagSlectFormVisible.value = false
}

// tinymce操作
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

const getPicIdList = () => {
  if (refTinymce?.value) {
    return refTinymce.value.getPicIdList();
  }
};
</script>

<style scoped>

.el-row-bottom-space {
  margin-bottom: 10px;
}

</style>
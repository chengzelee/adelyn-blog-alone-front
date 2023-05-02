<template>
  <div class="pagination-block">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const getPageEmit = defineEmits(['getPage'])

const handleSizeChange = (val: number) => {
  getPageEmit('getPage')
  // console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  getPageEmit('getPage')
  // console.log(`current page: ${val}`)
}

defineExpose({
  currentPage,
  pageSize,
  totalCount,
  handleSizeChange,
  handleCurrentChange
});
</script>

<style scoped>
.pagination-block {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

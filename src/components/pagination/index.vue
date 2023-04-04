<template>
  <div class="pagination-block">
    <el-pagination
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const currentPage2 = ref(5)
const pageSize2 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.pagination-block {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

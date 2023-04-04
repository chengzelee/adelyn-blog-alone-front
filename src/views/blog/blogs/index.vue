<template>
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-for="o in 10" :key="o">
        <el-row align="middle" justify="center">
          <el-col :span="14">
            <el-card class="card-box" shadow="hover">
              <div class="card-head">head</div>
              <div class="card-body">
                <el-text truncated>Squeezed by parent elementtttttttttttttttttttttttttttttttttttttttt
                  ttttttttttttttttttttttttttttttttttttttttttttt</el-text>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
  <el-row align="middle" justify="center">
    <el-col :span="3"><Pagination/></el-col>
  </el-row>
</template>

<script>
import Pagination from '@/components/pagination/index.vue'

export default {
  components : { Pagination }
}
</script>

<style scoped>
.card-box {
  margin-bottom: 6px;
}

.card-head {
  font-size: 22px;
  font-weight: 400;
}

.card-body {
  margin-top: 5px;
  font-size: 14px;
}
</style>

<template>
  <div  class="m-container-small m-padded-tb-big">
    <div class="ui container">
      <div  class="ui secondary segment form">
        <div class="inline fields">
          <div class="field">
            <input type="text" name="title" placeholder="标题">
          </div>
          <div class="field">
            <button  type="button" id="search-btn" class="ui mini teal basic button"><i class="search icon"></i>搜索</button>
          </div>
        </div>
      </div>
      <div id="table-container">
        <table class="ui compact teal table">
          <thead>
          <tr>
            <th>标题</th>
            <th>分类</th>
            <th>推荐</th>
            <th>状态</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <a href="#" class="ui mini teal basic button">编辑</a>
              <a href="#" class="ui mini red basic button">删除</a>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th colspan="7">
              <div class="ui mini pagination menu" >
                <a class="item">上一页</a>
                <a class="item">下一页</a>
              </div>
              <a href="#" class="ui mini right floated teal basic button">新增</a>
            </th>
          </tr>
          </tfoot>
        </table>


      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue"
}
</script>

<style scoped>

</style>
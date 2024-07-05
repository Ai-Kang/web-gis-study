<template>
  <el-menu
      background-color="#ecf0f1"
      :router="true"
      default-active="/"
      class="el-menu-demo"
      mode="horizontal"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-sub-menu index="/home1">
      <template #title>演示代码</template>
      <el-menu-item index="/home1">test1</el-menu-item>
      <el-menu-item index="2-2">itest2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>

</script>


<style scoped>

</style>

<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {RouterView} from 'vue-router'
import Header from "@/components/layout/Header.vue";
</script>


<style  lang="scss" scoped>
.el-main{
  height: 93.77vh;
  --el-main-padding: 0;
}
.el-header{
  --el-header-padding: 0;
}
</style>

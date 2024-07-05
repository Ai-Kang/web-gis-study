<template>
  <!--  创建cesium容器-->
  <div id="cesiumMap"/>
</template>

<script setup>
// 设置token
import * as cesium from "cesium"
import {onMounted} from "vue";

cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxOTU2ZWQyNy1jMmMzLTQwZTMtOTI1My0yODk1NTY5ZGIzMjkiLCJpZCI6OTQyNDksImlhdCI6MTcyMDE2NTQyMX0.XuU0b2FLYis2zt4HH3aNyV8LXuy7Ju6rBPgwWfz4z8Y"
// 因为加载时div还未挂在好所以使用生命周期处理
onMounted(() => {
  new cesium.Viewer("cesiumMap", {
    infoBox: false
  })
})

</script>


<style scoped>
#cesiumMap {
  width: 100%;
  height: 100%;
}

</style>

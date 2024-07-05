<template>
  <!--  创建cesium容器-->
  <div id="cesiumMap"/>
</template>

<script setup>
// 设置token
import * as Cesium from "cesium"
import {onMounted} from "vue";

let esri = new Cesium.ArcGisMapServerImageryProvider({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
});
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxOTU2ZWQyNy1jMmMzLTQwZTMtOTI1My0yODk1NTY5ZGIzMjkiLCJpZCI6OTQyNDksImlhdCI6MTcyMDE2NTQyMX0.XuU0b2FLYis2zt4HH3aNyV8LXuy7Ju6rBPgwWfz4z8Y"
// 因为加载时div还未挂在好所以使用生命周期处理
onMounted(() => {
  let cesiumMap = new Cesium.Viewer("cesiumMap", {
    infoBox: false,
    // 关闭自带地图选择
    baseLayerPicker: false,
    // 使用的底图
    // imageryProvider: esri,
    // 设置地形
    terrain: Cesium.Terrain.fromWorldTerrain(),
  });
  // 设置相机位置
  cesiumMap.camera.flyTo({
    destination:{}
  })

})

</script>


<style scoped>
#cesiumMap {
  width: 100%;
  height: 100%;
}

</style>

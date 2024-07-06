<template>
  <!--  创建cesium容器-->
  <div id="cesiumMap"/>
</template>

<script setup>
// 设置token
import * as Cesium from "cesium"
import {onMounted} from "vue";
import yn from "/public/json/ynsxj84.json"
import fj from "/public/glb/Cesium_Air.glb"

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxOTU2ZWQyNy1jMmMzLTQwZTMtOTI1My0yODk1NTY5ZGIzMjkiLCJpZCI6OTQyNDksImlhdCI6MTcyMDE2NTQyMX0.XuU0b2FLYis2zt4HH3aNyV8LXuy7Ju6rBPgwWfz4z8Y"

// 因为加载时div还未挂在好所以使用生命周期处理
onMounted(() => {
  let cesiumMap = new Cesium.Viewer("cesiumMap", {
    infoBox: false,
    // 关闭自带地图选择
    baseLayerPicker: false,
    // 关闭动画组件
    animation: false,
    // 关闭时间轴
    timeline: false,

  });

  // 显示隐藏地球
  cesiumMap.scene.globe.show = true;
  // 设置相机
  cesiumMap.scene.camera.setView({
    // 相机位置 x,y,z
    destination: Cesium.Cartesian3.fromDegrees(99.819853, 23.484545, 2000)
  })
  // 在地球上添加一个圆点
  cesiumMap.entities.add({
    // 点的位置
    position: Cesium.Cartesian3.fromDegrees(99.819853, 23.484545, 0),
    // 创建点
    point: {
      // 大小
      pixelSize: 10,
      // 设置颜色
      color: new Cesium.Color(0, 1, 0, 1)
    }
  });
  // CzmlDataSource KmlDataSource GeoJsonDataSource
  let dataSource = Cesium.GeoJsonDataSource.load(yn);
  // 加入数据
  cesiumMap.dataSources.add(dataSource)

  /**
   * 坐标系
   * wgs84经纬度坐标系（没有实际的对象）
   * wgs84弧度坐标系（Cartographic）
   * 笛卡尔空间直角坐标系（Cartesian3）
   * 平面坐标系（Cartesian2）
   * 4D笛卡尔积坐标系（Cartesian4）
   */

  /**
   * 相机
   * setView 切换视角，直接切换
   * flyTo 切换视角，具有飞入效果，飞行时间等
   * lookAt 拖动时，围绕旋转，无法移动位置
   * ViewBoundingSphere 没有飞入效果，给一个指定目标点更好的观测
   */
      // 创建飞行目的地坐标
  let position1 = Cesium.Cartesian3.fromDegrees(109.819853, 23.484545, 2000);
  // 设定相机1
  cesiumMap.camera.setView({
    // 相机目的地
    destination: position1,
    // 视口方向
    orientation: {
      // 水平旋转 指数0时指向正北
      heading: Cesium.Math.toRadians(0),
      // 垂直方向旋转 -90时俯视地面
      pitch: Cesium.Math.toRadians(-90),
      // 沿着z轴的旋转
      roll: 0,
    }
  });

  // 设定相机2
  let position2 = Cesium.Cartesian3.fromDegrees(99.819853, 23.484545, 2000);
  cesiumMap.camera.flyTo({
    // 相机目的地
    destination: position2,
    // 视口方向
    orientation: {
      // 水平旋转 指数0时指向正北
      heading: Cesium.Math.toRadians(0),
      // 垂直方向旋转 -90时俯视地面
      pitch: Cesium.Math.toRadians(-90),
      // 沿着z轴的旋转
      roll: 0,
    },
    // 飞行时间10s
    duration: 10,
  });

  // 设定相机3
  let position3 = Cesium.Cartesian3.fromDegrees(99.819853, 23.484545);
  cesiumMap.camera.lookAt(position3, new Cesium.HeadingPitchRange(
      //水平旋转 指数0时指向正北
      Cesium.Math.toRadians(0),
      // 垂直方向旋转 -90时俯视地面
      Cesium.Math.toRadians(-90),
      // 高度
      2500
  ));

  // 设定相机3
  // 创建飞机模型
  let entity1 = cesiumMap.entities.add({
    // 位置
    position: position2,
    // 模型俯仰角（飞机位置,）
    orientation: Cesium.Transforms.headingPitchRollQuaternion(position2, new Cesium.HeadingPitchRoll(-90, 0, 0)),
    // 加载模型
    model: {
      uri: fj,
      // 模型缩放情况下最小的大小
      minimumPixelSize: 100,
      // 模型缩放最大的比例
      maximumPixelSize: 10000,
      // 显示模型
      show: true
    }
  });
  // 加载模型((视点位置,物体的距离),相机朝向)
  cesiumMap.camera.viewBoundingSphere(new Cesium.BoundingSphere(position2, 100), new Cesium.HeadingPitchRange(0, 0, 0));
});

</script>


<style scoped>
#cesiumMap {
  width: 100%;
  height: 100%;
}

</style>

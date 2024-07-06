<template>
  <!--  创建cesium容器-->
  <div id="cesiumMap"/>
</template>

<script setup>
// 设置token
import * as Cesium from "cesium"
import {onMounted} from "vue";
import img from "/public/img/img.png"

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxOTU2ZWQyNy1jMmMzLTQwZTMtOTI1My0yODk1NTY5ZGIzMjkiLCJpZCI6OTQyNDksImlhdCI6MTcyMDE2NTQyMX0.XuU0b2FLYis2zt4HH3aNyV8LXuy7Ju6rBPgwWfz4z8Y"

// 因为加载时div还未挂在好所以使用生命周期处理
onMounted(async () => {

  let cesiumMap = new Cesium.Viewer("cesiumMap", {
    infoBox: false,
    // 关闭自带地图选择
    baseLayerPicker: false,
    // 关闭动画组件
    animation: false,
    // 关闭时间轴
    timeline: false,
    // 全屏按钮
    fullscreenButton: false,
    // 主页按钮
    homeButton: false,
    // 使用浏览器推荐的分辨率
    useBrowserRecommendedResolution: true,
    // 切换地图平铺
    sceneModePicker: false,
    // 帮助按钮(问号)
    navigationHelpButton: false,
    // 关闭绿色选中框
    selectionIndicator: false,
    // 搜索地名按钮
    geocoder: false,
    // 设置默认地图（云南省天地图）
    baseLayer: new Cesium.ImageryLayer(new Cesium.OpenStreetMapImageryProvider({
      // url: "https://tile.openstreetmap.org/"
      url: "https://maps.ynmap.cn/arcgis/rest/services/TdtYn/tdtYnImg100cm84_2022/MapServer/tile/{z}/{y}/{x}"
    })),
  });
  // 设置地形
  cesiumMap.scene.setTerrain(
      new Cesium.Terrain(
          Cesium.CesiumTerrainProvider.fromIonAssetId(3957)
      ),
  );
  // 加载模型
  /*const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('blue',0.5)",
    show: true
  })
  cesiumMap.scene.primitives.add(tileset)*/

  // 空间数据加载-点
  cesiumMap.entities.add({
    // 设置位置
    position: Cesium.Cartesian3.fromDegrees(99.819853, 23.484545, 0),
    point: {
      pixelSize: 50,
      color: new Cesium.Color(1, 1, 0, 1)
    }
  })

  // 空间数据加载-线条
  cesiumMap.entities.add({
    polyline: {
      // 可见
      show: true,
      // 设置位置
      positions: new Cesium.Cartesian3.fromDegreesArray([99.819853, 23.484545, 99.829753, 23.484545]),
      // 设置颜色
      material: new Cesium.Color(1, 1, 0, 1),
      // 设置线宽度
      width: 5,
    },
  })

  // 空间数据加载-面
  cesiumMap.entities.add({
    // 设置位置
    position: Cesium.Cartesian3.fromDegrees(99.819853, 23.454545, 0),
    plane: {
      // 设置平铺
      plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0),
      // 设置长宽
      dimensions: new Cesium.Cartesian2(300, 300),
      // 设置颜色
      material: new Cesium.Color(1, 1, 0, 1),
      // 是否显示边框
      outline: true,
      // 边框颜色红色
      outlineColor: Cesium.Color.RED,
    },
  })

  // 空间数据加载-贴图
  cesiumMap.entities.add({
    // 设置位置
    position: Cesium.Cartesian3.fromDegrees(99.839853, 23.454545, 0),
    plane: {
      // 设置平铺
      plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0),
      // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0),
      // 设置长宽
      dimensions: new Cesium.Cartesian2(300, 300),
      // 贴入一张图片
      material: img,
      // 是否显示边框
      outline: true,
      // 边框颜色红色
      outlineColor: Cesium.Color.RED,
    },
  })

  // 空间数据加载-三维拉伸
  const delet = cesiumMap.entities.add({
    id: 'study',
    // 设置位置
    position: Cesium.Cartesian3.fromDegrees(99.839853, 23.454545, 0),
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([99.839853, 23.454545, 99.839853, 23.457545, 99.829853, 23.454545]),
      // 设置颜色
      material: Cesium.Color.RED,
      // 拉伸
      extrudedHeight: 200,
    },
  })
  // 删除数据
  // cesiumMap.entities.remove(delet);
  // 全部删除
  // cesiumMap.entities.removeAll();

  /**
   * 鼠标交互
   */
  let handler = new Cesium.ScreenSpaceEventHandler(cesiumMap.scene.canvas);
  // 监听
  handler.setInputAction((event) => {
    // 获取点击的对象
    let pick = cesiumMap.scene.pick(event.position);
    // 判断位置信息是否为空
    if (Cesium.defined(pick) && pick.id.id === "study") {
      alert("需要删除吗")
    }
  },Cesium.ScreenSpaceEventType.LEFT_CLICK)

  /**
   * 加载3dtiles
   */
  try {
    const tileset = await Cesium.Cesium3DTileset.fromUrl("http://127.0.0.1:8081/tileset.json");
    cesiumMap.scene.primitives.add(tileset);
  } catch (error) {
    console.error(`Error creating tileset: ${error}`);
  }

  // 设置相机
  cesiumMap.scene.camera.setView({
    // 相机位置 x,y,z
    // destination: Cesium.Cartesian3.fromDegrees(121.49, 31.23, 2000)
    destination: Cesium.Cartesian3.fromDegrees(99.819853, 23.484545, 2000)
  })
});

</script>


<style scoped>
#cesiumMap {
  width: 100%;
  height: 100%;
}

</style>

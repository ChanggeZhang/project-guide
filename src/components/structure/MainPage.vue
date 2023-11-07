<template>
  <div class="main-page-content">
    <div class="btn btn-group btn-middle">

    </div>
    <div class="main-block" v-if="chartArray.map.show">
      <div class="main-block-title btn btn-group btn-middle">
        <div class="btn-text" @click="removeThis">×</div>
      </div>
      <div class="map-full-county" ref="mapFullCountry" style="width: var(--main-block-width);height: var(--main-block-height)"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "MainPage",
  data(){
    return {
      chartArray: {
        map: {
          show: true,
          echartsComponent: {}
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    removeThis(){
      this.chartArray.map.show = false
    },
    initChart(){
      this.initMap()
    },
    initMap(){
      let map = this.$refs.mapFullCountry
      const china = require('@/data/geojson/china.geo.json');
      echarts.registerMap('china',{
        geoJSON: china
      })
      const mapData = this.genMapData(china.features)
      let newMap = mapData.map(e => e.value).sort()
      this.chartArray.map.echartsComponent = echarts.init(map);
      let mapOption = {
        title:{
          text:"全国用电量分布图",
          x: 'center'
        },

        tooltip:{
          trigger:"item",
          formatter: '{a}单位：（亿千万时）<br>{b}：{c}'
        },
        visualMap: {
          type: "continuous",
          show: true,
          min: newMap[0],
          max: newMap[newMap.length - 1],
          text: ['高', '低'],
          realtime: true,
          calculable:true,
          precision: 1,
          seriesIndex: 0,
          inRange: {
            color: [
              'rgba(255,84,0,1)',
              'rgba(255,84,0,0.8)',
              'rgba(255,84,0,0.6)',
              'rgba(255,84,0,0.4)',
              'rgba(255,84,0,0.2)',
              'rgba(0,171,255,0.2)',
              'rgba(0,171,255,0.4)',
              'rgba(0,171,255,0.6)',
              'rgba(0,171,255,0.8)',
              'rgba(0,171,255,1)'
            ]
          }
        },
        series:[{
          name: "全国用电量分布",
          type: "map",
          map: "china",
          mapType: "china",
          colorBy: "series",
          roam:true,
          label:{
            show:true,
          },
          emphasis: {
            label:{
              show:true
            }
          },
          data: mapData
        }]
      }
      this.chartArray.map.echartsComponent.setOption(mapOption)
    },
    genMapData(features){
      const min = 0,max = 23000000;
      let data = []
      for (const index in features) {
        data.push({
          name: features[index].properties.name,
          value: Number(this.getRandom(min,max).toFixed(6))
        })
      }
      return data
    },
    getRandom(min,max){
      min = min || 0
      max = max || 9999999999
      let maxUnit = Number(`1${"0".repeat(max.toString().split(".")[0].length)}`)
      let random = Math.random() * maxUnit;
      if(random > max || random < min){
        return this.getRandom(min,max);
      }else{
        return random
      }
    }
  }
}
</script>

<style scoped>

</style>
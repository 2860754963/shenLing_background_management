<template>
  <div class="">
    <div id="echartsWatcherTwo" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "Twoshuiqiutu",
  components: {},
  props: {},
  data () {
    return {
      todayData: null
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {

  },
  methods: {
    initData (todayData) {
      this.todayData = todayData
      this.initEcharts()
    },
    initEcharts () {
      var myCharts = echarts.init(document.getElementById("echartsWatcherTwo"));
      var option;
      var label = {
        normal: {
          textStyle: {
            color: "#ffffff",
            insideColor: "#ffffff",
            fontSize: 13,
          },
        },
      };
      option = {
        graphic: [
          {
            type: "group",
            left: "25%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `运输中${this.todayData.taskInTransitNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
          {
            type: "group",
            left: "68%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `派送中${this.todayData.taskInDeliveryNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
        ],
        series: [
          {
            name: "水球图",
            type: "liquidFill",
            radius: "40%",
            center: ["30%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅 taskInTransitRate
            data: [this.todayData.taskInTransitRate / 100, (this.todayData.taskInTransitRate / 100) - 1 / 10],
            itemStyle: {
              //渐变色设置
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#38D884",
                  },
                  {
                    offset: 1,
                    color: "#17B9C2",
                  },
                ]),
              },
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "#38D884",
                },
                {
                  offset: 0,
                  color: "#17B9C2",
                },
              ],
              globalCoord: false,
            },
            label,
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#38D884",
                    },
                    {
                      offset: 1,
                      color: "#17B9C2",
                    },
                  ],
                  globalCoord: false,
                },
              },
            },
            backgroundStyle: {
              color: "#58A0AD",
            },
          },
          {
            name: "水球图",
            type: "liquidFill",
            radius: "40%",
            center: ["73%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅 taskInDeliveryRate
            data: [this.todayData.taskInDeliveryRate / 100, (this.todayData.taskInDeliveryRate / 100) - 1 / 10],
            itemStyle: {
              //渐变色设置
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FF850F",
                  },
                  {
                    offset: 1,
                    color: "#FFBF32",
                  },
                ]),
              },
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "#FF850F",
                },
                {
                  offset: 0,
                  color: "#FFBF32",
                },
              ],
              globalCoord: false,
            },
            label,
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FF850F",
                    },
                    {
                      offset: 1,
                      color: "#FFBF32",
                    },
                  ],
                  globalCoord: false,
                },
              },
            },
            backgroundStyle: {
              color: "transparent",
            },
          },
        ],
      };

      option && myCharts.setOption(option);
    }
  },
};
</script>

<style scoped lang="scss"></style>

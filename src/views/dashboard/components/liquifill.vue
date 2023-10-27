<template>
  <div class="">
    <div id="echartsWatcher" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill/src/liquidFill.js";
export default {
  name: "Fourshuiqiutu",
  components: {},
  props: {},
  data () {
    return {
      backlog: {}
    };
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    initData (backlog) {
      this.backlog = backlog
      console.log(this.backlog, "=====");
      var myCharts = echarts.init(document.getElementById("echartsWatcher"));
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
        // backgroundColor: "#0f375f",
        graphic: [
          {
            type: "group",
            left: "11%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `待取件${this.backlog.waitingPickupNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
          {
            type: "group",
            left: "34%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `待派件${this.backlog.waitingDispatchNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
          {
            type: "group",
            left: "56%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `未分配运输${this.backlog.unassignedTransportTaskNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
          {
            type: "group",
            left: "80%",
            top: "67%",
            children: [
              {
                type: "text",
                z: 100,
                left: "center",
                top: "top",
                style: {
                  fill: "black",
                  text: `超时运输${this.backlog.timeoutTransportTaskNumber}`,
                  font: "15px Microsoft YaHei",
                },
              },
            ],
          },
        ],
        series: [
          // 待取件比率 waitingPickupRate
          {
            name: "水球图",
            type: "liquidFill",
            radius: "40%",
            center: ["15%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅
            data: [this.backlog.waitingPickupRate / 100, (this.backlog.waitingPickupRate / 100) - 1 / 10],
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
            center: ["38%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅 waitingDispatchRate
            data: [this.backlog.waitingDispatchRate / 100, (this.backlog.waitingDispatchRate / 100) - 1 / 10],
            itemStyle: {
              //渐变色设置
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F8862C",
                  },
                  {
                    offset: 1,
                    color: "#FA5E56",
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
                  color: "rgba(248, 134, 44, 1)",
                },
                {
                  offset: 0,
                  color: "rgba(250, 94, 86, 1)",
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
                      color: "rgba(248, 134, 44, 1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(250, 94, 86, 1)",
                    },
                  ],
                  globalCoord: false,
                },
              },
            },
            backgroundStyle: {
              color: "#8D8690",
            },
          },
          {
            name: "水球图",
            type: "liquidFill",
            radius: "40%",
            center: ["62%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅
            data: [this.backlog.unassignedTransportTaskRate / 100, (this.backlog.unassignedTransportTaskRate / 100) - 1 / 10],
            itemStyle: {
              //渐变色设置
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#14DAFF",
                  },
                  {
                    offset: 1,
                    color: "#4C87FF",
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
                  color: "#14DAFF",
                },
                {
                  offset: 0,
                  color: "#4C87FF",
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
                      color: "#14DAFF",
                    },
                    {
                      offset: 1,
                      color: "#4C87FF",
                    },
                  ],
                  globalCoord: false,
                },
              },
            },
            backgroundStyle: {
              color: "#72A2B3",
            },
          },
          {
            name: "水球图",
            type: "liquidFill",
            radius: "40%",
            center: ["85%", "40%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅
            data: [this.backlog.timeoutTransportTaskRate / 100, (this.backlog.timeoutTransportTaskRate / 100) - 1 / 10],
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
    },

  },
};
</script>

<style scoped lang="scss"></style>

<template>
  <div class="">
    <el-card style="width: 666px">
      <template #header>
        <div>
          <span>订单分布（单位：笔）</span>
          <span style="float: right">{{ today }}</span>
        </div>
      </template>
      <div>
        <div id="orderdistribution" style="width: 100%; height: 300px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
export default {
  name: "Orderdistribution",
  components: {},
  props: {},
  data() {
    return {
      today: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    var myCharts = echarts.init(document.getElementById("orderdistribution"));
    var option;
    option = {
      // backgroundColor: "#092b49",
      /**区域位置*/
      grid: {
        left: "15%",
        right: "5%",
        top: "2%",
        bottom: "0%",
      },
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          show: true,
          data: [
            "湖州",
            "丽水",
            "杭州",
            "舟山",
            "衢州",
            "宁波",
            "温州",
            "台州",
            "绍兴",
            "金华",
            "嘉兴",
          ],
          inverse: true,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "black",
            fontSize: 16,
            formatter: function (value, index) {
              return value;
            },
            rich: {
              lg: {
                backgroundColor: "#339911",
                color: "#fff",
                borderRadius: 15,
                align: "center",
                width: 15,
                height: 15,
              },
            },
          },
        },
        {
          show: true,
          inverse: true,
          data: [],
          axisLabel: {
            textStyle: {
              fontSize: 24,
              color: "#fff",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: [
            66.9, 46.3, 43.8, 40.3, 37.7, 37.5, 37.3, 33.9, 33.1, 32.9, 23.4,
          ],
          barWidth: 18,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: function (value) {
                if (value.dataIndex < 8) {
                  return "#50dfef";
                } else {
                  return "#fee052";
                }
              },
            },
          },
          label: {
            normal: {
              show: true,
              fontSize: 12,
              position: "inside",
              formatter: "{c}%",
            },
          },
        },
        {
          name: "框",
          type: "bar",
          yAxisIndex: 1,
          barGap: "-100%",
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          barWidth: 22,
          itemStyle: {
            normal: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 1,
              barBorderRadius: 15,
            },
          },
        },
      ],
    };
    option && myCharts.setOption(option);
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>

<template>
  <div class="">
    <el-card style="width: 732px">
      <template #header>
        <div>
          <span>订单总量 <span>单位（笔）</span></span>
          <span style="float: right">{{ today }}</span>
        </div>
      </template>
      <div>
        <div id="totalorderquantity" style="width: 100%; height: 300px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data () {
    return {
      today: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    var myCharts = echarts.init(document.getElementById("totalorderquantity"));
    var option;
    option = {
      backgroundColor: "white",
      title: {
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        left: "10%",
        top: "15%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: {
        top: "30%",
      },
      color: ["#5AD8A6"],
      legend: [
        {
          data: [
            {
              name: "最高值",
              icon: "rect",
            },
          ],
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 12,
          },
          right: "10%",
          top: "10%",
        },
        {
          data: [
            {
              name: "订单金额（元）",
              icon: "rect",
            },
          ],
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 12,
          },
          right: "23%",
          top: "20%",
        },
        {
          data: [
            {
              name: "订单比数",
              icon: "rect",
            },
          ],
          itemWidth: 12,
          itemHeight: 2,
          textStyle: {
            fontSize: 12,
          },
          right: "10%",
          top: "20%",
        },
      ],
      xAxis: [
        {
          type: "category",
          data: [2023.08, 2023.09, 2023.1, 2023.11, 2023.12],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          max: 2.5,
          interval: 0.5,
          axisLabel: {
            formatter (value) {
              return `${value.toFixed(1)}k`; // 保留一位小数
            },
          },
        },
      ],
      series: [

        {
          name: "订单金额（元）",
          type: "bar",
          barWidth: 30,
          itemWidth: 8,
          itemHeight: 8,
          itemStyle: {
            color: "#3e66ff",
            borderRadius: 0,
          },
          data: [0.9, 1.6, 0.7, 1.1, 0.9],
        },
        {
          name: "订单比数",
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          lineStyle: {
            color: "#26c4b9",
          },
          label: {
            show: true,
            position: "top",
          },
          data: [1.58, 1.64, 1.69, 1.58, 1.88],
        },
      ],
    };
    option && myCharts.setOption(option);
  },
  methods: {
    initData (res) {
      console.log(res, "res===");
    },
  },
};
</script>

<style scoped lang="less"></style>

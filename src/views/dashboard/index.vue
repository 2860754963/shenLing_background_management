<template>
  <div class="main">
    <div style="margin: 20px 10px 20px 10px; font-weight: 800">工作台</div>
    <el-row type="flex" justify="space-between" class="minwidthrow" style="margin-bottom: 20px; width: 1400px">
      <el-col :span="12">
        <el-card class="minwidth" style="width: 732px">
          <template #header> 机构概述 </template>
          <div class="flex_between">
            <div class="gsleft">
              <div>
                <div class="titleAddress">{{ organOverview.organName }}</div>
                <div class="address">{{ organOverview.organAddress }}</div>
                <div class="address">
                  {{ organOverview.principal }} {{ organOverview.phone }}
                </div>
                <el-button style="margin-top: 10px">查看营业部分布</el-button>
              </div>
            </div>

            <div style="display: flex">
              <div>
                <div style="margin-right: 35px">
                  <div class="numberttitle">分拣中心（个）</div>
                  <div class="number">
                    {{ organOverview.sortingCenterNumber }}
                  </div>
                </div>
                <div style="margin-right: 35px">
                  <div class="numberttitle">司机人数</div>
                  <div class="number">{{ organOverview.driverNumber }}</div>
                </div>
              </div>
              <div>
                <div>
                  <div class="numberttitle">营业部（个）</div>
                  <div class="number">{{ organOverview.agencyNumber }}</div>
                </div>
                <div>
                  <div class="numberttitle">快递员人数</div>
                  <div class="number">{{ organOverview.courierNumber }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="minwidth" style="width: 666px">
          <template #header>
            <span>今日数据 </span>
            <el-button class="todybtn" type="text" @click="reload"><i class="el-icon-refresh" style="margin-right: 5px"></i>{{ todayDate }}</el-button>

          </template>
          <div style="
              display: flex;
              justify-content: space-around;
              padding: 11px 0px 10px 0px;
            ">
            <div v-for="(item, index) in todayData" :key="index">
              <div>{{ item.name }}</div>
              <div class="todayDatanum">{{ item.value }}</div>
              <div>
                <span>较昨日</span><span>{{ item.jiaozuori }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="minwidthrow" style="margin-bottom: 20px; width: 1400px">
      <el-col :span="11">
        <el-card class="minwidth" style="width: 732px">
          <template #header>
            <span>待办任务
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">
                  待取件率=待取件/(下单数量-取消数量)，且取件类型=上门取件<br />
                  待派送率=待派送/(待派送+派送中+已签收+拒收)<br />
                  未分配率=未分配/全部数据<br />
                  超时率=超时任务/(已完成+进行中+已取消）<br />
                </div>
                <span class="el-icon-question"></span>
              </el-tooltip>
            </span>
            <el-button class="todybtn" type="text" @click="reload"><i class="el-icon-refresh" style="margin-right: 5px"></i>{{ todayDate }}</el-button>
          </template>
          <div>
            <liquifill ref="liquifill"></liquifill>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="minwidth" style="width: 666px">
          <template #header>
            <span>执行中任务
              <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">
                  运输率=运输中/(全部订单-待取件-已取件-网点入库-待装车-已取消）<br />
                  派送率="派送中/(待派送+派送中+已签收+拒收）<br />
                </div>
                <span class="el-icon-question"></span>
              </el-tooltip>
            </span>
            <el-button class="todybtn" type="text" @click="reload"><i class="el-icon-refresh" style="margin-right: 5px"></i>{{ todayDate }}</el-button>
          </template>
          <div>
            <liqiufillTwoVue ref="liqiufillTwoVue"></liqiufillTwoVue>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="minwidthrow" style="margin-bottom: 20px; width: 1427px">
      <el-card>
        <template #header>
          <span>常用功能 </span>

        </template>
        <div style="display: flex; justify-content: space-around">
          <div v-for="(item, index) in commonFunction" :key="index" class="commonClass" @click="gotopage(item)">
            <div>
              <div style="margin-bottom: 10px; font-size: 20px">
                <i :class="item.icon"></i>
              </div>
            </div>
            <div>
              {{ item.name }}
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row type="flex" justify="space-between" class="minwidthrow" style="margin-bottom: 20px; width: 1400px">
      <el-col :span="11">
        <xinluLeftVue></xinluLeftVue>
      </el-col>
      <el-col :span="11">
        <xinluRightVue ref="xinluRightVue"></xinluRightVue>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="minwidthrow" style="margin-bottom: 20px; width: 1400px">
      <el-col :span="11">
        <totalorderquantityVue ref="totalorderquantityVue"></totalorderquantityVue>
      </el-col>
      <el-col :span="11">
        <orderdistribution></orderdistribution>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getWorkerBenchData } from "@/api/workerBench";
import moment from "moment";
import liquifill from "./components/liquifill.vue";
import liqiufillTwoVue from "./components/liqiufillTwo.vue";
import xinluLeftVue from "./components/xinluLeft.vue";
import xinluRightVue from "./components/xinluRight.vue";
import totalorderquantityVue from "./components/totalorderquantity.vue";
import orderdistribution from "./components/orderdistribution.vue";
export default {
  name: "Dashboard",
  components: {
    liquifill,
    liqiufillTwoVue,
    xinluLeftVue,
    xinluRightVue,
    totalorderquantityVue,
    orderdistribution,
  },
  data () {
    return {
      workerBench: {},
      loading: false,
      todayData: [
        {
          name: "订单金额（元）",
          value: 0,
          jiaozuori: 0,
        },
        {
          name: "订单数量（个）",
          value: 0,
          jiaozuori: 0,
        },
        {
          name: "运输任务（次）",
          value: 0,
          jiaozuori: 0,
        },
      ],
      todayDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      commonFunction: [
        {
          icon: "el-icon-platform-eleme",
          name: "快递作业",
          router: "/transport/pick",
        },
        {
          icon: "el-icon-document-copy",
          name: "运输任务",
          router: "/transport/task",
        },
        {
          icon: "el-icon-office-building",
          name: "线路管理",
          router: "/transport/line",
        },
        {
          icon: "el-icon-shopping-cart-1",
          name: "车辆管理",
          router: "/car/type",
        },
        {
          icon: "el-icon-user-solid",
          name: "司机管理",
          router: "/user/driver",
        },
        {
          icon: "el-icon-search",
          name: "运费查询",
          router: "/base/transit",
        },
      ],
      organOverview: {
        agencyNumber: "加载中",
        courierNumber: "加载中",
        driverNumber: "加载中",
        organAddress: "加载中",
        organName: "加载中",
        phone: "加载中",
        principal: "加载中",
        sortingCenterNumber: "加载中",
      },
      dataFields: [
        "orderAmount",
        "orderNumber",
        "transportTaskNumber",
      ],
      changeFields: [
        "orderAmountChanges",
        "orderNumberChanges",
        "transportTaskNumberChanges",
      ]
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created () {
    this.getworkbench();
  },
  mounted () {
  },
  methods: {
    reload () {
      console.log('reload')
      this.getworkbench()
    },
    gotopage (item) {
      this.$router.push(item.router)
    },
    async getworkbench () {
      this.loading = true;
      let res = await getWorkerBenchData();
      if (res) {
        this.workerBench = res;
        this.organOverview = res.organOverview;
        this.inittodayNmu(res)
        this.initToditask(res)
        this.initTaskinprogress(res)
        this.initTransportationtasks(res)
        this.initTotalorderquantity(res)
        this.loading = false;
      }

    },
    initTotalorderquantity (res) {
      this.$refs.totalorderquantityVue.initData(res.orderLineChart)
    },
    initTransportationtasks (res) {
      this.$refs.xinluRightVue.initData(res.transportTaskList)
    },
    initTaskinprogress (res) {
      this.$refs.liqiufillTwoVue.initData(res.todayData)
    },
    initToditask (res) {
      this.$refs.liquifill.initData(res.backlog)

    },
    inittodayNmu (res) {
      for (let i = 0; i < this.dataFields.length; i++) {
        this.todayData[i].value = res.todayData[this.dataFields[i]];
        this.todayData[i].jiaozuori = res.todayData[this.changeFields[i]];
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.commonClass {
  width: 200px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f3f5f9;
  }
}
.main {
  background-color: #f3f5f9;
  padding: 10px;
}
.todayDatanum {
  font-size: 33px;
  color: black;
  margin: 23px 0px;
}
.todybtn {
  float: right;
  padding: 3px 0;
}
.gsleft {
  display: flex;
  margin-top: 15px;
}
.gsleft::after {
  content: '';
  display: inline-block;
  width: 1px;
  border: 1px solid #ccc;
  height: 130px;
  margin-left: 64px;
}
.address {
  margin-bottom: 10px;
  font-size: 14px;
  color: #999;
}
.titleAddress {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.minwidthrow {
  min-width: 1200px;
}
.minwidth {
  min-width: 600px;
}
.numberttitle {
  font-size: 14px;
  color: black;
  margin-top: 10px;
}
.number {
  font-size: 30px;
  color: orangered;
  margin-top: 10px;
}
.flex_between {
  display: flex;
  justify-content: space-between;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

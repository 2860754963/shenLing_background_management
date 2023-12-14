<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="回车查看">
    </el-page-header>
    <el-card style="margin-top: 15px;min-width: 900px;" v-for="(item,index) in titleList " :key="index">
      <div slot="header">
        <span>{{ item}}</span>
      </div>
      <div v-if="item==='基本信息'">
        <div>
          <div class="common" style="" v-for="(item,index) in  baseInfo" :key="index"><span>{{  item.name}}</span>:
            <span>{{result[ item.keywords] }}</span>
          </div>
        </div>
      </div>
      <div v-if="item==='故障信息'">
        <div>
          <div class="common" v-for="(item,index) in  faultInfo" :key="index">
            <span>{{ item.name }}</span>: <span>{{result[item.keywords]| formatterValueF(item.keywords) }}</span>
          </div>
        </div>
      </div>
      <div v-if="item==='违章信息'">
        <div>
          <div class="common" v-for="(item,index) in violationInfo" :key="index">
            <span>{{ item.name }}</span>: <span>{{result[item.keywords ]|formatterValueV(item.keywords )}}</span>
          </div>
        </div>
      </div>
      <div v-if="item==='事故信息'">
        <div>
          <div class="common" v-for="(item,index) in accidentInfo" :key="index">
            <span>{{  item.name}}</span>: <span>{{ result[item.keywords] | formatterValueA(item.keywords)  }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-14 14:46:45
* @Last Modified by: Nigulasi
* @Describe: 回车查看
*/
import { getAction } from '@/api/manage';
export default {
  name: 'receiptView',
  props: {},
  filters: {
    formatterValueF (value, key) {
      if (key == 'isAccident') {
        return value === true ? '是' : '否'
      } else if (key == 'isAvailable') {
        return value === true ? '是' : '否'
      } else if (key == 'faultType') {
        // 1-发动机启动困难，2-不着车，3-漏油，4-漏水，5-照明失灵，6-有异响，7-排烟异常，8-温度异常，9-其他,
        let arr = ['发动机启动困难', '不着车', '漏油', '漏水', '照明失灵', '有异响', '排烟异常', '温度异常', '其他']
        return value ? arr[value - 1] : '无'
      } else if (key == 'faultImages') {
        return value ? value.map(item => {
          return `<img src="${item}" style="width: 100px;height: 100px;"/>`
        }).join('') : '无'
      }
    },
    formatterValueV (value, key) {
      if (key == 'isBreakRules') {
        return value === true ? '是' : '否'
      } else if (key == 'breakRulesType') {
        // 违章类型，1-闯红灯，2-无证驾驶，3-超载，4-酒后驾驶，5-超速行驶
        let arr = ['闯红灯', '无证驾驶', '超载', '酒后驾驶', '超速行驶']
        return value ? arr[value - 1] : '无'
      } else if (key == 'penaltyAmount') {
        return value ? value + '元' : '无'
      } else if (key == 'deductPoints') {
        return value ? value + '分' : '无'
      }
    },
    formatterValueA (value, key) {
      // 事故类型，1-直行事故，2-追尾事故，3-超车事故，4-左转弯事故，5-右转弯事故，6-弯道事故，7-坡道事故，8-会车事故，9-其他
      if (key == 'isAccident') {
        return value === true ? '是' : '否'
      } else if (key == 'accidentType') {
        let arr = ['直行事故', '追尾事故', '超车事故', '左转弯事故', '右转弯事故', '弯道事故', '坡道事故', '会车事故', '其他']
        return value ? arr[value - 1] : '无'
      } else if (key == 'accidentImages') {
        return value ? value.map(item => {
          return `<img src="${item}" style="width: 100px;height: 100px;"/>`
        }).join('') : '无'
      }
    }
  },
  components: {},
  data () {
    return {
      result: {},
      titleList: ['基本信息', '故障信息', '违章信息', '事故信息'],
      baseInfo: [{
        name: '运输任务编号',
        keywords: 'transportTaskId',
      },
      {
        name: '车牌号码',
        keywords: 'licensePlate',
      },
      {
        name: '起始地机构',
        keywords: 'startAgencyName',
      }
        , {
        name: '目的地机构',
        keywords: 'endAgencyName',
      }, {
        name: '出车时间',
        keywords: 'outStorageTime',
      }, {
        name: '回车时间',
        keywords: 'intoStorageTime',
      }, {
        name: '司机',
        keywords: 'driverName',
      }],

      faultInfo: [{
        name: '车辆故障',
        keywords: 'isAccident',
      }, {
        name: '是否可用',
        keywords: 'isAvailable'
      }, {
        name: '故障类型',
        keywords: 'faultType',
      }, {
        name: '故障图片',
        keywords: 'faultImages',
      }],

      violationInfo: [{
        name: '车辆违章',
        keywords: 'isBreakRules',
      }, {
        name: '违章类型',
        keywords: 'breakRulesType'
      }, {
        name: '罚款金额',
        keywords: 'penaltyAmount',
      }, {
        name: '扣分',
        keywords: 'deductPoints',
      }],

      accidentInfo: [{
        name: '车辆事故',
        keywords: 'isAccident',
      }, {
        name: '事故类型',
        keywords: 'accidentType'
      }, {
        name: '事故图片',
        keywords: 'accidentImages',
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getDetails (id) {
      let res = await getAction(`/truck-return-register/detail/${id}`)
      if (res) {
        this.result = res
      } else {
        this.$message.error('获取详情失败')
      }
    },
    goBack () {
      this.$router.go(-1)
    },
  },
  created () {
    this.id = this.$route.query.id;
    this.getDetails(this.$route.query.id)
  },
  mounted () {
  },
}
</script> 

<style scoped >
.common {
  font-size: 14px;
  width: 300px;
  height: 50px;
  margin: 0 15px;
  display: inline-block;
}

.common span:nth-child(2) {
  margin-left: 5px;
  color: darkgray;
}
</style>
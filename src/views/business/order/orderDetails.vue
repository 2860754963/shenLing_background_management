<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="订单详情">
    </el-page-header>
    <el-card style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span>主要信息</span>
      </div>
      <el-row :span="24">
        <el-form :model="topCardForm" label-width="100px">
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="订单编号">
              <el-input v-model="topCardForm.orderId" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="运单编号">
              <el-input v-model="topCardForm.id" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="下单时间">
              <el-input v-model="topCardForm.created" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="订单状态">
              <el-input v-model="topCardForm.orderStatus" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="预计到达日期">
              <el-input v-model="topCardForm.estimatedArrivalTime" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card style="margin: 15px 0;">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div v-for="(item,index) in baseInfo" :key="index">
        <div><span :class="item.icon"></span> <span>{{  item.name}}</span></div>
        <div style="margin:40px;">
          <div style="margin-bottom: 20px;">发货方姓名：<span>{{ item.SName }}</span></div>
          <div>发货方电话：<span>{{ item.Tel }}</span></div>
        </div>
        <div style="margin:40px;">
          <div style="margin-bottom: 20px;">发货方地址：<span>{{ item.Address }}</span></div>
          <div>详细地址：<span>{{ item.DetailsAddress }}</span></div>
        </div>
      </div>
      <div>
        <div><span class="el-icon-s-flag"></span> <span style="margin-right: 20px;">距离</span><span>{{  distance}}KM</span></div>
      </div>
    </el-card>

    <el-card style="margin: 15px 0;">
      <div slot="header" class="clearfix">
        <span>取件信息</span>
      </div>
      <el-row :span="24">
        <el-form :model="piockupForm" label-width="100px">
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="所在网点">
              <el-input v-model="piockupForm.name" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="取件类型">
              <el-input v-model="piockupForm.type" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="作业状态">
              <el-input v-model="piockupForm.status" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="取件快递员">
              <el-input v-model="piockupForm.people" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="快递员电话">
              <el-input v-model="piockupForm.tel" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="预计取件时间">
              <el-input v-model="piockupForm.forseeTime" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="取件完成时间">
              <el-input v-model="piockupForm.coompleTime" style="width: 80%;" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>货品信息</span>
      </div>
      <div>
        <editTable @saveOk="updateTablesource" :edColumn="prodInfoCol" :showSummary="true" :edSource="prodInfo" :showHandle="true" @deteleOk="getGoodsInfo"></editTable>

      </div>
    </el-card>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2024-01-04 21:33:49
* @Last Modified by: Nigulasi 
* @Describe: 订单详情
*/
import { getAction, postAction, putAction } from '@/api/manage'
import editTable from './editTable.vue'
export default {
  name: 'orderDetails',
  props: {},
  components: {
    editTable
  },
  data () {
    return {
      prodInfoCol: [
        {
          prop: 'name',
          label: '货品名称',
        },
        {
          prop: 'goodsTypeName',
          label: '货品类型',
        },

        {
          prop: 'totalWeight',
          label: '重量(千克)',
        },
        {
          prop: 'totalVolume',
          label: '体积(立方)',
        },

      ],
      prodInfo: [],
      piockupForm: {},
      distance: 0,
      baseInfo: [
        {
          name: '发货方',
          icon: 'el-icon-s-promotion',
          SName: '',
          Tel: '',
          Address: '',
          DetailsAddress: ''
        },
        {
          name: '收货方',
          icon: 'el-icon-s-custom',
          SName: '',
          Tel: '',
          Address: '',
          DetailsAddress: ''
        },

      ],
      id: '',
      topCardForm: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    updateTablesource () {
      this.getGoodsInfo()
      this.$message.success('修改成功')
    },
    async getDetails () {
      let res = await getAction(`/order-manager/order/${this.id}`)
      console.log(res, "res");
      if (res) {
        let { status, estimatedArrivalTime } = res
        let { senderName, senderPhone, senderProvince: { name: provinceName }, senderCity: { name: cityName }, senderCounty: { name: countyName }, senderAddress } = res
        this.baseInfo[0].SName = senderName
        this.baseInfo[0].Tel = senderPhone
        this.baseInfo[0].Address = `${provinceName}${cityName}${countyName}`
        this.baseInfo[0].DetailsAddress = senderAddress
        let { receiverName, receiverPhone, receiverProvince: { name: provinceName1 }, receiverCity: { name: cityName1 }, receiverCounty: { name: countyName1 }, receiverAddress } = res
        this.baseInfo[1].SName = receiverName
        this.baseInfo[1].Tel = receiverPhone
        this.baseInfo[1].Address = `${provinceName1}${cityName1}${countyName1}`
        this.baseInfo[1].DetailsAddress = receiverAddress
        this.topCardForm = { estimatedArrivalTime, orderStatus: this.filterStatus(status), ...res.transportOrder }
        this.distance = res.distance
        let { taskPickup: { agency: { name: piockupFormName }, assignedStatus, status: taskPickupStatus, courier: { name: courierName, mobile: courierMobile }, estimatedStartTime, estimatedEndTime } } = res
        this.piockupForm = { name: piockupFormName, type: this.filterassignedStatus(assignedStatus), status: this.filterPickupType(taskPickupStatus), people: courierName, tel: courierMobile, forseeTime: estimatedStartTime, coompleTime: estimatedEndTime }
        this.getGoodsInfo()
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    hanldegoodsType (array) {
      array.forEach(item => {
        item.goodsTypeName = item.goodsType.name
        item.goodsTypeNameId = item.goodsType.id
      })
    },
    //   // 1为新任务、2为已完成、3为已取消
    filterassignedStatus (value) {
      switch (value) {
        case 1:
          return '新任务'
        case 2:
          return '已完成'
        case 3:
          return '已取消'
        default:
          return ''
      }

    },

    // 1为网点自寄，2为上门取件
    filterPickupType (value) {
      switch (value) {
        case 1:
          return '网点自寄'
        case 2:
          return '上门取件'
        default:
          return ''
      }
    },
    // 筛选函数 订单状态: 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，23009为已签收，23010为拒收，230011为已取消
    filterStatus (val) {
      switch (val) {
        case 23000:
          return '待取件'
        case 23001:
          return '已取件'
        case 23002:
          return '网点自寄'
        case 23003:
          return '网点入库'
        case 23004:
          return '待装车'
        case 23005:
          return '运输中'
        case 23006:
          return '网点出库'
        case 23007:
          return '待派送'
        case 23008:
          return '派送中'
        case 23009:
          return '已签收'
        case 23010:
          return '拒收'
        case 23011:
          return '已取消'
        default:
          return ''
      }
    },
    async getGoodsInfo () {
      let res = await getAction(`/order-manager/cargo?orderId=${this.id}`)
      console.log(res, "goodsinfo");
      this.hanldegoodsType(res)
      this.prodInfo = res
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDetails()


  },
  mounted () {
  },
}
</script> 

<style scoped lang="less">
</style>
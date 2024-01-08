<template>
  <div class="app-container">
    <div class="toptitle">
      订单管理
    </div>
    <el-card>
      <el-form :model="queryParam" :inline="true" label-width="90px">
        <el-row :gutter="24">
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="订单编号">
              <el-input type="text" v-model="queryParam.id" placeholder="请输入订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="订单状态">
              <el-select v-model="queryParam.status" placeholder="请选择订单状态" filterable>
                <el-option v-for="(item,index) in  orderStatus" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="付费状态">
              <el-select v-model="queryParam.paymentStatus" placeholder="请选择付费状态" filterable>
                <el-option :label="'已付'" :value="2"></el-option>
                <el-option :label="'未付'" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="发件人姓名">
              <el-input v-model="queryParam.senderName" placeholder="请输入发件人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="发件人电话">
              <el-input v-model="queryParam.senderPhone" placeholder="请输入发件人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :md="9" :sm="24">
            <el-form-item label="发件人地址">
              <selectAre @update="e=>handleAddress(e,'send')" ref="selectare"></selectAre>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="收件人姓名">
              <el-input v-model="queryParam.receiverName" placeholder="请输入收件人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="收件人电话">
              <el-input v-model="queryParam.receiverPhone" placeholder="请输入收件人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :md="9" :sm="24">
            <el-form-item label="收件人地址">
              <selectAre @update="e=>handleAddress(e,'collect')" ref="selectare"></selectAre>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="searchReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <el-table :data="dataSource">
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column align="center" v-for="(item,index) in tableColumn" :key="index" :label="item.name" :prop="item.keywords" :width="item.width">
          <template slot-scope="scope">
            <div v-if="item.keywords==='status'">
              {{ scope.row[item.keywords]===23000?'待取件':scope.row[item.keywords]===23001?'已取件':scope.row[item.keywords]===23002?'网点自寄':scope.row[item.keywords]===23003?'网点入库':scope.row[item.keywords]===23004?'待装车':scope.row[item.keywords]===23005?'运输中':scope.row[item.keywords]===23006?'网点出库':scope.row[item.keywords]===23007?'待派送':scope.row[item.keywords]===23008?'派送中':scope.row[item.keywords]===23009?'已签收':scope.row[item.keywords]===23010?'拒收':scope.row[item.keywords]===23011?'已取消':''  }}
            </div>
            <div v-else-if="item.keywords==='paymentStatus'">
              {{ scope.row[item.keywords]===1?'未付':'已付'  }}
            </div>
            <div v-else-if="item.keywords==='pickupType'">
              {{ scope.row[item.keywords]===1?'网点自寄':'上门取件'  }}
            </div>
            <div v-else-if="item.keywords==='paymentMethod'">
              {{ scope.row[item.keywords]===1?'预结':'到付'  }}
            </div>
            <div v-else>
              {{ scope.row[item.keywords] }}
            </div>

          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottompage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ipagination.current" :page-sizes="ipagination.pageSizeOptions"
          :page-size="ipagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ipagination.total">
        </el-pagination>
      </div>

    </el-card>
  </div>
</template>

<script>
import { nigulasiList } from '@/utils/nigulaisiList'
import { getAction, postAction, putAction } from '@/api/manage'
import selectAre from './selectAre.vue'
export default {
  name: 'orderIndex',
  mixins: [nigulasiList],
  components: {
    selectAre
  },
  data () {
    return {
      queryParam: { id: '' },
      tableColumn: [{
        name: '订单编号',
        keywords: 'id',
        width: '180'
      }, {
        name: '运单编号',
        keywords: 'transportOrderId',
        width: '160'
      },
      {
        name: '下单时间',
        keywords: 'createTime',
        width: '150'
      },
      {
        name: '订单状态',
        keywords: 'status',
      }, {
        name: '发件人姓名',
        keywords: 'senderName',
        width: '100'
      },
      {
        name: '发件人电话',
        keywords: 'senderPhone',
        width: '120'
      },
      {
        name: '发件人地址',
        keywords: 'senderAddress',
        width: '100'
      },
      {
        name: '收件人姓名',
        keywords: 'receiverName',
        width: '100'
      },
      {
        name: '收件人电话',
        keywords: 'receiverPhone',
        width: '120'
      },
      {
        name: '收件人地址',
        keywords: 'receiverAddress',
        width: '100'
      },
      {
        name: '付费状态',
        keywords: 'paymentStatus',
      },

      {
        name: '取件类型',
        keywords: 'pickupType',
      },
      {
        name: '付费类型',
        keywords: 'paymentMethod',
      }
      ],
      url: {
        list: '/order-manager/order/page',

      },
      // 订单状态: 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，23009为已签收，23010为拒收，230011为已取消
      orderStatus: [{
        name: '待取件',
        value: 23000
      },
      {
        name: '已取件',
        value: 23001
      },
      {
        name: '网点自寄',
        value: 23002
      },
      {
        name: '网点入库',
        value: 23003
      },
      {
        name: '待装车',
        value: 23004
      },
      {
        name: '运输中',
        value: 23005
      },
      {
        name: '网点出库',
        value: 23006
      },
      {
        name: '待派送',
        value: 23007
      },
      {
        name: '派送中',
        value: 23008
      },
      {
        name: '已签收',
        value: 23009
      },
      {
        name: '拒收',
        value: 23010
      },
      {
        name: '已取消',
        value: 23011
      }
      ]
    }
  },
  methods: {
    handleDetails (payload) {
      console.log(payload, "payload");
      this.$router.push({
        path: '/business/orderDetails',
        query: {
          id: payload.id
        }
      })
    },
    handleAddress (e, payload) {
      if (payload == 'send') {
        this.queryParam.senderProvinceId = e.province
        this.queryParam.senderCityId = e.city
        this.queryParam.senderCountyId = e.county
      } else {
        this.queryParam.receiverProvinceId = e.province
        this.queryParam.receiverCityId = e.city
        this.queryParam.receiverCountyId = e.county
      }
    },
    async loadData (arg, cb) {
      if (!this.url?.list) {
        this.$message({
          type: 'warning',
          message: '请设置url.list参数'
        })
        return
      }
      if (arg === 1) {
        this.ipagination.current = 1
      }
      // 查询条件
      let params = this.getQueryParams()
      let res = await postAction(this.url.list, params)
      if (res) {
        let dataArr = res.items
        this.dataSource = dataArr
        this.dataSource?.forEach(item => {
          item.transportOrderId = item.transportOrder.id
        });
      } else {
        this.dataSource = []
      }
      res.counts && (this.ipagination.total = Number(res.counts))
      cb && cb()
    },
    searchReset () {
      this.queryParam = {
        ...this.paramPro,
      }
      this.$refs.selectare.clear()
      this.loadData(1)
    },

  },
  created () {
    this.loadData(1)
  },
}
</script>

<style>
</style>

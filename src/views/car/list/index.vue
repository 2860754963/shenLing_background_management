<template>
  <div>
    <div class="app-container">
      <div class="toptitle">
        车辆列表
      </div>
      <el-card>
        <el-form :model="queryParam" :inline="true">
          <el-form-item label="车辆类型">
            <el-select v-model="queryParam.truckTypeId" placeholder="请选择/输入车辆类型名称" filterable>
              <el-option v-for="(item,index) in  carTypelist" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input v-model="queryParam.licensePlate" placeholder="请输入车牌号码"></el-input>
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-select v-model="queryParam.workStatus" placeholder="请选择车辆状态">
              <el-option :label="`全部 ${count}`" value=""></el-option>
              <el-option :label="`可用 ${available}`" :value="1"></el-option>
              <el-option :label="`停用 ${Deactivate}`" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="searchReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card style="margin-top: 15px;">
        <el-button @click="handleAdd(null)" type="primary" style="margin-bottom: 20px;">新增车辆</el-button>
        <el-table :data="dataSource">
          <el-table-column type="index" align="center">
          </el-table-column>
          <el-table-column align="center" v-for="(item,index) in tableColumn" :key="index" :label="item.name" :prop="item.keywords"></el-table-column>
          <el-table-column label="操作" align="center" width="260">
            <template slot-scope="scope">
              <el-button @click="handleDetails(scope.row)" type="text">查看详情</el-button>
              <el-button @click="handleUse(scope.row)" type="text">{{ scope.row.workStatus=='1'?'停用':'启用'}}</el-button>
              <el-button @click="handleDervier(scope.row)" type="text">配置司机</el-button>
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
    <listModal ref="modal" @OK="searchReset" :carTypelist="carTypelist"></listModal>
    <configureDriver title="配置司机" ref="configDriver"></configureDriver>
    <useStop ref="useStop"></useStop>
  </div>
</template>

<script>
import { truckTypesimple } from '@/api/carManage.js'
import { nigulasiList } from '@/utils/nigulaisiList'
import { getAction, putAction } from '@/api/manage'
import listModal from '@/views/car/list/listModal'
import configureDriver from './configureDriver.vue'
import useStop from './useStop.vue'
export default {
  name: 'carlist',
  mixins: [nigulasiList],
  components: {
    listModal,
    configureDriver,
    useStop
  },
  data () {
    return {
      tableColumn: [
        {
          name: '车牌号码',
          keywords: 'licensePlate',
        },
        {
          name: '车辆类型',
          keywords: 'truckTypeName',
        },
        {
          name: '司机数量',
          keywords: 'driverNum',
        },
        {
          name: '车辆状态',
          keywords: 'status',
        },
        {
          name: 'GPS设备ID',
          keywords: 'deviceGpsId',
        },
        {
          name: '实载重量(T)',
          keywords: 'allowableLoad',
        },
        {
          name: '实载体积(m³)',
          keywords: 'allowableVolume',
        },
      ],
      count: 0,
      available: 0,
      Deactivate: 0,
      url: {
        list: '/truck/page',
        add: '/truck'
      },
      carTypelist: [],
      queryParam: {
        truckTypeId: '',
        licensePlate: '',
        workStatus: ''
      }
    }
  },
  methods: {

    handleDetails (row) {
      this.$router.push({
        path: 'carDetalis',
        query: {
          id: row.id,
        }
      })
    },
    handleDervier (rowData) {
      this.$refs.configDriver.show(rowData)
    },
    handleUse (rowData) {
      this.$refs.useStop.show(rowData)
      this.usevisible = true
    },
    searchReset () {
      this.queryParam = {
        ...this.paramPro,
        workStatus: ''
      }
      this.loadData(1)
    },
    handleEdit () { },
    async loadCarType () {
      let res = await truckTypesimple()
      if (res) {
        this.carTypelist = res
      }
    },
    async loadCarstatus () {
      let res = await getAction('/count')
      if (res) {
        this.available = res[1]
        this.Deactivate = res[0]
        this.count = Number(res[0]) + Number(res[1])
      }
    },
  },
  created () {
    this.loadCarType()
    this.loadData(1)
    this.loadCarstatus()
  }
}
</script>

<style>
</style>

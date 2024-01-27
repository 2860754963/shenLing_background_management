<template>
  <div class="app-container">
    <div class="toptitle">
      运单管理
    </div>
    <el-card>
      <el-form :model="queryParam" :inline="true" label-width="120px">
        <el-row :gutter="24">
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="订单编号">
              <el-input type="text" v-model="queryParam.orderId" placeholder="请输入订单编号" style="width:107.5%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="运单编号">
              <el-input type="text" v-model="queryParam.id" placeholder="请输入订单编号" style="width:107.5%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="调度状态">
              <!-- 1.待调度2.未匹配线路3.已调度 -->
              <el-select v-model="queryParam.schedulingStatus" placeholder="请选择调度状态" filterable>
                <el-option label="待调度" :value="1"></el-option>
                <el-option label="未匹配线路" :value="2"></el-option>
                <el-option label="已调度" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="起始地机构">
              <el-cascader :show-all-levels="false" v-model="queryParam.startAgencyId" @change="handleStartCa" :options="Are" :props="{checkStrictly: true,label:'name',value:'id'}"
                clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="目的地机构">
              <el-cascader :show-all-levels="false" v-model="queryParam.endAgencyId" @change="handleStartCa" :options="Are" :props="{checkStrictly: true,label:'name',value:'id'}"
                clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-form-item label="当前所在机构">
              <el-cascader :show-all-levels="false" v-model="queryParam.currentAgencyId" @change="handleStartCa" :options="Are" :props="{checkStrictly: true,label:'name',value:'id'}"
                clearable></el-cascader>
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
            <div v-if="typeof scope.row[item.keywords]==='object'">
              {{ scope.row[item.keywords].name }}
            </div>
            <div v-else-if="item.keywords==='workStatus'">
              {{ scope.row[item.keywords]===1?'上班':'休息'  }}
            </div>
            <div v-else-if="item.keywords==='status'">
              {{ scope.row[item.keywords]===1?'上班':'休息'  }}
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

/*
* @Author: Nigulasi
* @Date: 2024-01-15 10:33:54
* @Last Modified by: Nigulasi
* @Describe: 运单管理
*/
import { nigulasiList } from '@/utils/nigulaisiList'
import { getDepartTree } from '@/api/base'
import { getAction, postAction, putAction } from '@/api/manage'
export default {
  name: 'waybillIndex',
  mixins: [nigulasiList],
  props: {},
  components: {},
  data () {
    return {
      Are: [],
      url: {
        list: '/transport-order-manager/page',
      },
      tableColumn: [{
        name: '运单编号',
        keywords: 'id',
        width: '190'
      },
      {
        name: '订单编号',
        keywords: 'orderId',
        width: '190'
      },
      {
        name: '运单状态',
        keywords: 'status',
      },
      {
        name: '调度状态',
        keywords: 'schedulingStatus',
      },
      {
        name: '起始营业部',
        keywords: 'workStatus',
        width: '90'
      },
      {
        name: '终点营业部',
        keywords: 'workStatus',
        width: '90'
      },
      {
        name: '当前所在机构',
        keywords: 'workStatus',
        width: '120'
      },
      {
        name: '下一个机构',
        keywords: 'workStatus',
        width: '90'
      },
      {
        name: '货品总体积(立方米)',
        keywords: 'workStatus',
        width: '160'
      },
      {
        name: '货品总重量(千克)',
        keywords: 'workStatus',
        width: '140'
      },
      {
        name: '创建时间',
        keywords: 'workStatus',
      },
      {
        name: '更新时间',
        keywords: 'workStatus',
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleStartCa (value) {
      this.queryParam.agentId = value[value?.length - 1]
    },
    async getMechanism () {
      let res = await getDepartTree()
      if (res) {
        this.Are = JSON.parse(res)
      }
    },
    // / 加载数据
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
      } else {
        this.dataSource = []
      }
      res.counts && (this.ipagination.total = Number(res.counts))
      cb && cb()
    },
  },
  created () {
    this.getMechanism()
    this.loadData(1)
  },
  mounted () {
  },
}
</script> 

<style scoped lang="less">
</style>
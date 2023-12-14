<template>
  <div class="app-container">
    <div class="toptitle">
      快递员管理
    </div>
    <el-card>
      <el-form :model="queryParam" inline label-width="100px">
        <el-form-item label="快递员账号">
          <el-input v-model="queryParam.account" placeholder="请输入快递员账号" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="快递员姓名">
          <el-input v-model="queryParam.name" placeholder="请输入快递员姓名" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="快递员手机号">
          <el-input v-model="queryParam.phone" placeholder="请输入快递员手机号" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader :show-all-levels="false" v-model="queryParam.agentId" @change="handleStartCa" :options="Are" :props="{checkStrictly: true,label:'name',value:'id'}" clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="searchReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <el-table :data="dataSource">
        <el-table-column type="index" align="center">
        </el-table-column>
        <el-table-column align="center" v-for="(item,index) in tableColumn" :key="index" :label="item.name" :prop="item.keywords">
          <template slot-scope="scope">
            <div v-if="typeof scope.row[item.keywords]==='object'">
              {{ scope.row[item.keywords].name }}
            </div>
            <div v-else-if="item.keywords==='workStatus'">
              {{ scope.row[item.keywords]===1?'上班':'休息'  }}
            </div>
            <div v-else>
              {{ scope.row[item.keywords] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" type="text">作业范围分配</el-button>
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
import { getAction, postAction } from '@/api/manage'
import { getDepartTree } from '@/api/base'
export default {

  mixins: [nigulasiList],
  data () {
    return {
      Are: [],
      url: {
        list: '/business-hall/courier/page'
      },
      tableColumn: [{
        name: '快递员账号',
        keywords: 'account',
      },
      {
        name: '快递员姓名',
        keywords: 'name',
      },
      {
        name: '快递员手机号',
        keywords: 'mobile',
      },
      {
        name: '所属机构',
        keywords: 'agency',
      },
      {
        name: '工作状态',
        keywords: 'workStatus',
      }
      ]
    }
  },
  methods: {
    handleDetails (payload) {
      this.$router.push({
        path: '/user/workrange',
        query: {
          userId: payload.userId
        }
      })
    },
    handleStartCa (value) {
      this.queryParam.agentId = value[value?.length - 1]
    },
    async getMechanism () {
      let res = await getDepartTree()
      if (res) {
        this.Are = JSON.parse(res)
      }
    },
  },
  created () {
    this.getMechanism()
    this.loadData(1)
  }
}
</script>

<style>
</style>

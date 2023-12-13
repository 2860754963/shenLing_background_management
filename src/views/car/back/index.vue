<template>
  <div class="app-container">
    <div class="toptitle">
      回车登记
    </div>

    <el-card>
      <el-form :model="queryParam" inline label-width="100px">
        <el-form-item label="运输任务编号">
          <el-input v-model="queryParam.transportTaskId" placeholder="请输入运输任务编号" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="起始地机构">
          <el-cascader :show-all-levels="false" v-model="queryParam.startAgencyId" @change="handleStartCa" :options="startAre" :props="{checkStrictly: true ,   label:'name',value:'id'}"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label="目的地机构">
          <el-cascader :show-all-levels="false" v-model="queryParam.endAgencyId" @change="handleEndCa" :options="startAre" :props="{  checkStrictly: true , label:'name',value:'id'}"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item label="回车时间">
          <el-date-picker v-model="queryParam.time" style="width:75%;" @change="handleTimePick" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH-mm-ss">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="车辆是否可用">
          <el-select v-model="queryParam.isAvailable" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="可用" :value="true"></el-option>
            <el-option label="不可用" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="searchReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>   

<script>
import { nigulasiList } from '@/utils/nigulaisiList'
import { getAction, postAction } from '@/api/manage'
import { getDepartTree } from '@/api/base'
export default {
  mixins: [nigulasiList],
  computed: {

  },
  data () {
    return {
      startAre: [],
      url: {
        list: '/truck-return-register/pageQuery'
      }
    }
  },
  methods: {
    handleEndCa (value) {
      this.queryParam.endAgencyId = value[value?.length - 1]
    },
    handleStartCa (value) {
      this.queryParam.startAgencyId = value[value?.length - 1]
    },
    handleTimePick (value) {
      this.queryParam.intoStorageStartTime = value[0]
      this.queryParam.intoStorageEndTime = value[1]
    },
    async getMechanism () {
      let res = await getDepartTree()
      if (res) {
        this.startAre = JSON.parse(res)
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
  }
}
</script>

<style>
</style>

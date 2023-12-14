<template>

  <el-dialog :title="title" :visible="dialogVisible" width="40%" destroy-on-close>
    <template #title>
      <span>配置司机
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content">
            配置司机需满足以下条件：<br />
            1车辆信息已完善 2车辆无未完成运输任务
          </div>
          <span class="el-icon-question"></span>
        </el-tooltip>
      </span>

    </template>
    <el-card>
      <div class="topStyle">
        <div>车牌号:{{ data.licensePlate}}</div>
        <div>车型:{{ data.truckTypeName}}</div>
        <div>车辆状态:
          <el-tag type="success" v-if="data.status">可用</el-tag>
          <el-tag type="danger" v-else>不可用</el-tag>
        </div>
        <div>实载重量:{{ data.allowableLoad}}</div>
        <div>实载体积:{{ data.allowableVolume}}</div>
      </div>
    </el-card>
    <div style="margin-top: 15px;">
      <el-form :model="unbindDriverForm">
        <el-form-item label="配置司机">
          <el-select v-model="unbindDriver" multiple filterable allow-create default-first-option placeholder="请选择司机" @change="handleSelectChange">
            <el-option v-for="item in unbindDriverOptions" :key="item.id" :label="item.name" :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="unbindDriverTable">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="司机名称" prop="name" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" type="text">查看</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmConfig">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-11 19:19:36
* @Last Modified by: Nigulasi
* @Describe: 
*/
import { getAction, postAction } from '@/api/manage';
export default {
  name: 'slDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },

  },
  components: {},
  data () {
    return {
      dialogVisible: false,
      data: {},
      carinfo: ['', '', '', '', ''],
      unbindDriver: '',
      unbindDriverForm: {},
      unbindDriverOptions: [],
      unbindDriverTable: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleDetails (rowData) {
      this.$router.push({
        path: '/car/driverDetalis',
        query: {
          id: rowData.userId
        }
      })
    },
    async confirmConfig () {
      let res = await postAction(`/truck/truckDrivers`, { truckId: this.data.id, driverIds: this.unbindDriver })
      console.log(res, "confimConfig");
      if (res == null) {
        this.$message({
          type: 'success',
          message: '配置成功'
        })
        this.dialogVisible = false
      }

    },
    handleDelete (row) {
      this.unbindDriverTable.splice(this.unbindDriverTable.findIndex(item => item.userId === row.userId), 1)
      this.unbindDriver = this.unbindDriver.filter(item => item !== row.userId)
    },
    handleSelectChange (currentData) {
      this.unbindDriverTable = []
      currentData.forEach(item => {
        this.unbindDriverTable.push(this.unbindDriverOptions.find(i => i.userId === item))
      })
    },
    show (payload) {
      this.dialogVisible = true
      this.data = payload
      this.unBindingDrivers()
      this.getBindingDrivers(payload)
    },
    async getBindingDrivers (payload) {
      let res = await getAction(`/bindingDrivers/${payload.id}`)
      if (res) {
        this.unbindDriver = res.map(item => item.userId)
        this.unbindDriverOptions.push(...res)
        // unbindDriverOptions ?????
        this.unbindDriverTable = res
      } else {
        this.unbindDriver = []
        this.unbindDriverTable = []
      }

    },
    async unBindingDrivers () {
      let res = await getAction('/unBindingDrivers/')
      if (res) {
        this.unbindDriverOptions = res
      } else {
        this.unbindDriverOptions = []
      }
    }
  },
  created () {

  },
  mounted () {
  },
}
</script> 

<style scoped >
.topStyle {
}
.topStyle div {
  display: inline-block;
  width: 180px;
  height: 50px;
}
</style>
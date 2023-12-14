<template>

  <el-dialog :visible="dialogVisible" width="40%" destroy-on-close style="z-index:2">
    <template #title>
      <span>配置车辆
        <el-tooltip class="item" effect="dark" placement="bottom">
          <div slot="content">
            配置车辆需满足以下条件：<br />
            1司机信息已完善 2司机已设置排班 3司机绑定车辆未在启用状态
          </div>
          <span class="el-icon-question"></span>
        </el-tooltip>
      </span>

    </template>
    <el-card>
      <div class="topStyle">
        <div>司机编号:&nbsp;&nbsp;{{ dataInfo.userId}}</div>
        <div>司机名称:&nbsp;&nbsp;{{ dataInfo.name}}</div>
        <div>司机电话:&nbsp;&nbsp;{{ dataInfo.mobile}}</div>
        <div>所属机构:&nbsp;&nbsp;{{ dataInfo.agency?.name}}</div>
      </div>
    </el-card>
    <div style="margin-top: 15px;">
      <el-form :model="carForm">
        <el-form-item label="配置车辆">
          <el-select v-model="carForm.unbindCar" filterable allow-create default-first-option placeholder="请选择车辆" @change="handleSelectChange">
            <el-option v-for="item in unbindCarOptions" :key="item.id" :label="item.licensePlate" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="unbindCarTable">
        <el-table-column label="车牌号" prop="licensePlate" align="center"></el-table-column>
        <el-table-column label="车辆状态" prop="name" align="center">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '可用' : '不可用' }}
          </template>
        </el-table-column>
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
* @Describe: 配置车辆
*/
import { getAction, postAction } from '@/api/manage';
export default {
  name: 'configCar',
  components: {},
  data () {
    return {
      dialogVisible: false,
      dataInfo: [],
      carForm: {
        unbindCar: ''
      },
      unbindCarOptions: [],
      unbindCarTable: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleDetails (rowData) {
      this.$router.push({
        path: '/car/carDetalis',
        query: {
          id: rowData.id,
        }
      })
    },
    async confirmConfig () {
      console.log(this.unbindCarTable, ".....");
      let params = {
        truckId: this.unbindCarTable[0].id,
        driverIds: [this.dataInfo.userId]
      }

      let res = await postAction(`/driver/truckDrivers`, params)
      this.dialogVisible = false

    },
    handleDelete (row) {
      console.log(row);
      this.unbindCarTable = []
      this.carForm.unbindCar = ''

    },
    handleSelectChange (currentData) {
      console.log(currentData, "currentData");
      this.unbindCarOptions.find(item => {
        if (item.id === currentData) {
          this.unbindCarTable = [item]
        }
      })

    },
    show (payload) {
      console.log(payload, "payload");
      this.dialogVisible = true
      this.dataInfo = payload
      this.unbindCarTable = [payload.truck]
      this.unBindingCar()
      this.carForm.unbindCar = payload.truck.id
    },

    async unBindingCar () {
      let res = await getAction('/unWorkingTrucks')
      console.log(res, "====");
      if (res) {
        this.unbindCarOptions = res
      } else {
        this.unbindCarOptions = []
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
  width: 240px;
  height: 50px;
  line-height: 50px;
}
</style>
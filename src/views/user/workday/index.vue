<template>
  <div class="app-container">
    <div class="toptitle">
      排班管理
    </div>
    <el-card>
      <el-form :model="queryParam" inline label-width="100px">
        <el-form-item label="员工账号">
          <el-input v-model="queryParam.employeeNumber" placeholder="请输入司机账号" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="queryParam.name" placeholder="请输入司机姓名" style="width:100%;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="工作模式">
          <el-select v-model="value" placeholder="请选择工作模式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="月份">
          <el-date-picker v-model="queryParam.month" type="month" placeholder="选择月" value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader :show-all-levels="false" v-model="queryParam.agencyId" @change="handleStartCa" :options="Are" :props="{checkStrictly: true,label:'name',value:'id'}" clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="searchReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <div style="margin-bottom: 15px;">
        <el-button type="primary" @click="workSet">排班设置</el-button>
        <el-button @click="bindWork" :disabled="!(selecttableRow.length>0)">绑定排班</el-button>
      </div>
      <el-table :data="dataSource" @selection-change="handleSelecltRow">
        <el-table-column type="selection" width="30">
        </el-table-column>
        <el-table-column fixed align="center" width="140" v-for="(item,index) in tableColumn" :key="index" :label="item.name" :prop="item.keywords">
        </el-table-column>
        <el-table-column align="center" v-for="(item,index) in tableColumnDays" :label="item.name" :prop="item.keywords" :key="index+9999">

        </el-table-column>
      </el-table>
      <div class="bottompage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ipagination.current" :page-sizes="ipagination.pageSizeOptions"
          :page-size="ipagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ipagination.total">
        </el-pagination>
      </div>

      <el-dialog title="人工调整" :visible="showChangedialog" width="30%">
        <div style="text-align: center;">
          <el-radio-group v-model="radioCheck" @change="handleRadioChange">
            <el-radio :label="1">礼拜制</el-radio>
            <el-radio :label="2">连续制</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-top: 5%;padding-left: 20%;">
          <el-form :model="modelName">
            <el-form-item label="模式名称">
              <el-select v-model="modelName.workPatternId" placeholder="请选择">
                <el-option v-for="item in modeNameOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showChangedialog = false">取 消</el-button>
          <el-button type="primary" @click="handlePeoplechange">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-14 20:17:32
* @Last Modified by: Nigulasi
* @Describe: 排班管理
*/
import { nigulasiList } from '@/utils/nigulaisiList'
import { getDepartTree } from '@/api/base'
import { getAction, postAction } from '@/api/manage'
export default {
  name: 'workday',
  mixins: [nigulasiList],
  props: {},
  components: {},
  data () {
    return {
      modelName: {
        workPatternId: ''
      },
      workMode: [],
      modeNameOptions: [],
      showChangedialog: false,
      radioCheck: 1,
      selecttableRow: [],
      disBindwork: true,
      Are: [],
      url: {
        list: '/work-schedulings'
      },
      tableColumn: [{
        name: '员工账号',
        keywords: 'employeeNumber',
      }, {
        name: '员工姓名',
        keywords: 'name',
      }, {
        name: '员工手机号',
        keywords: 'phone',
      },
      {
        name: '员工角色',
        keywords: 'userType',
      }, {
        name: '当前工作模式',
        keywords: 'workPatternName'
      }],
      days: 0,
      tableColumnDays: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async handlePeoplechange () {
      let result = []
      this.selecttableRow.forEach(item => {
        item.id && result.push(item.id)
      })
      let payload = {
        userIdList: [...result],
        workPatternId: this.modelName.workPatternId,
        workPatternType: this.radioCheck
      }
      let res = await postAction('/work-schedulings', payload)
      console.log(res, "res123456");
      res == null ? (
        this.$message({
          type: 'success',
          message: '绑定成功'
        })
      ) : (
        this.$message({
          type: 'error',
          message: res
        })
      )
      this.showChangedialog = false
      this.loadData(1)
    },
    handleRadioChange (vale) {
      this.modelName.workPatternId = ''
      vale === 1 ? (
        this.modeNameOptions = this.workMode[1]
      )
        :
        (this.modeNameOptions = this.workMode[2])
    },
    handleSelecltRow (elect) {
      this.selecttableRow = elect
      console.log(this.selecttableRow, "this.selecttableRow");
    },
    workSet () {
      this.$router.push({
        path: '/user/workset',
      })

    },
    bindWork () {
      this.showChangedialog = true

    },
    handleSearch () {
      if (this.queryParam.month) {
        let valueArray = this.queryParam.month.split('-')
        this.days = this.getMonthDays(valueArray[0], valueArray[1])
        this.tableColumnDays = []
        for (let i = 1; i <= this.days; i++) {
          this.tableColumnDays.push({
            name: String(i),
            keywords: `days${i}`
          })
        }
      }

      this.loadData(1)
    },
    getMonthDays (year = new Date().getFullYear(), month = new Date().getMonth() + 1) {
      var daysInMonth = new Date(year, month, 0).getDate();
      return daysInMonth
    },

    loadTableColumn () {
      this.days = this.getMonthDays()
      console.log(this.days, "days");
      for (let i = 1; i <= this.days; i++) {
        this.tableColumnDays.push({
          name: String(i),
          keywords: `days${i}`
        })
      }

    },
    handleStartCa (value) {
      this.queryParam.agencyId = value[value?.length - 1]
    },
    async getWorkmode () {
      let res = await getAction('/work-patterns/all')
      if (res) {
        this.workMode = res
        this.modeNameOptions = res[1]
      }

    },
    async getMechanism () {
      let res = await getDepartTree()
      if (res) {
        this.Are = JSON.parse(res)
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
      let res = await getAction(this.url.list, params)
      if (res) {
        let dataArr = res.items
        dataArr.forEach(item => {
          let leng = item.workSchedules.length
          item.workSchedules.forEach(boo => {
            item[`days${leng}`] = boo === true ? '√' : '×'
            leng--
          })
        });
        this.dataSource = dataArr
        console.log(this.dataSource, "this.dataSource");
      } else {
        this.dataSource = []
      }
      res.counts && (this.ipagination.total = Number(res.counts))
      cb && cb()
    },
  },
  created () {
    this.getWorkmode()
    this.getMechanism()
    this.loadTableColumn()
    this.loadData(1)
  },
  mounted () {
  },
}
</script> 

<style scoped  lang="less">
/deep/ .el-dialog__footer {
  text-align: center !important;
}
</style>
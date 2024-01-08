<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="排班设置">
    </el-page-header>
    <el-card style="margin-top: 15px;">
      <div style="margin-bottom: 15px;">
        <el-button type="primary" @click="addWorkmode">添加工作模式</el-button>
      </div>
      <el-table :data="dataSource">

        <el-table-column fixed align="center" v-for="(item,index) in tableColumn" :key="index" :label="item.name" :prop="item.keywords">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDetel(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottompage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ipagination.current" :page-sizes="ipagination.pageSizeOptions"
          :page-size="ipagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="ipagination.total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="新增工作模式" :visible="ADDdialogVisible" width="45%" :before-close="handleClose">
      <div style="padding: 0 20px;">
        <el-tabs v-model="activeNameTab" @tab-click="handleClickTab">
          <el-tab-pane label="礼拜制" name="first">
            <el-form :model="first" ref="firstForm" :rules="firstRules">
              <el-form-item label="工作模式名称" label-width="120px" prop="name">
                <el-input placeholder="请输入工作模式名称" v-model="first.name" style="width: 86%;"></el-input>
              </el-form-item>
              <el-form-item label="工作天数" label-width="120px" prop="workDay">
                <el-checkbox-group v-model="first.workDay" @change="handleWorkDay">
                  <el-checkbox v-for="item in days" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
                <span style="font-size: 14px;color: #ccc;margin: 0; padding: 0;">选中为工作时间，未选中为休息时间</span>
              </el-form-item>
              <el-form-item label="工作时间" label-width="120px" prop="time">
                <el-time-picker style="width: 86%;" is-range v-model="first.time" value-format="HH:mm" format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="连续制" name="second">
            <el-form :model="second" ref="secondForm" :rules="secondRules">
              <el-form-item label="工作模式名称" label-width="120px" prop="name">
                <el-input placeholder="请输入工作模式名称" v-model="second.name" style="width: 86%;"></el-input>
              </el-form-item>
              <el-form-item label="连续工作天数" label-width="120px">

                <span style="margin-right: 10px;">上</span><el-input-number v-model="second.workDayNum" :min="0" :max="30" style="width: 30%;"></el-input-number><span style="margin: 0 10px;">天</span>
                <span style="margin: 0 10px;">休</span>
                <el-input-number v-model="second.restDayNum" :min="0" :max="30" style="width: 30%;"></el-input-number><span style="margin-left:  10px;">天</span>

              </el-form-item>
              <el-form-item label="工作时间" label-width="120px">
                <el-time-picker style="width: 86%;" is-range v-model="second.time" value-format="HH:mm" format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ADDdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddWorkdays">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-24 18:35:32
* @Last Modified by: Nigulasi
* @Describe: 排班设置
*/
import { nigulasiList } from '@/utils/nigulaisiList'
import { getAction, postAction, deleteAction } from '@/api/manage'
export default {
  name: 'workSet',
  mixins: [nigulasiList],
  props: {},
  components: {},
  data () {
    return {
      secondRules: {
        name: [
          { required: true, message: '请输入工作模式名称', trigger: 'blur' },
        ],
        workDayNum: [
          { required: true, message: '请输入连续工作天数', trigger: 'blur' },
        ],
        restDayNum: [
          { required: true, message: '请输入连续休息天数', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '请选择工作开始时间', trigger: 'change' },
        ],
      },
      second: {},
      daysResult: {},
      firstRules: {
        name: [
          { required: true, message: '请输入工作模式名称', trigger: 'blur' },
        ],
        workDay: [
          { required: true, message: '请选择工作天数', trigger: 'change' },
        ],
        time: [
          { required: true, message: '请选择工作开始时间', trigger: 'change' },
        ],

      },
      days: {
        'monday': '周一',
        'tuesday': '周二',
        'wednesday': '周三',
        'thursday': '周四',
        'friday': '周五',
        'saturday': '周六',
        'sunday': '周日',
      },
      first: {
        workDay: [],
      },
      activeNameTab: 'first',
      ADDdialogVisible: false,
      tableColumn: [
        {
          name: '工作模式编号',
          keywords: 'id',
        },
        {
          name: '工作模式',
          keywords: 'name',
        },
        {
          name: '类型',
          keywords: 'workPatternTypeDesc',
        },
        {
          name: '工作日期',
          keywords: 'workDate',
        },
        {
          name: '工作时间',
          keywords: 'formatWorkDate',
        },
      ],
      url: {
        list: '/work-patterns/page'
      },

    }
  },
  computed: {},
  watch: {
    dataSource (val) {
      console.log(val)
      val && val.forEach(item => {
        item.formatWorkDate = (item.workEndMinute1 - item.workStartMinute1) / 60 + '小时'
      })
    }
  },
  methods: {
    handleAddWorkdays () {
      let that = this
      this.activeNameTab == 'first' ? (
        this.$refs.firstForm.validate(async (valid) => {
          if (valid) {
            let workPatternType = "1"
            let { name, time, workDay } = that.first
            let workStartMinute1 = time[0].split(':')[0] * 60 + time[0].split(':')[1] * 1
            let workEndMinute1 = time[1].split(':')[0] * 60 + time[1].split(':')[1] * 1
            let result = { ...that.daysResult, ...{ name, workStartMinute1, workEndMinute1, workPatternType } }
            postAction('/work-patterns', result).then(res => {
              that.$message({
                type: 'success',
                message: '添加成功!'
              })
              that.ADDdialogVisible = false
              that.loadData(1)
              this.first = {
                workDay: [],
              }
              this.$refs.firstForm.resetFields()
            })


          } else {
            return false
          }
        })
      ) : (
        this.$refs.secondForm.validate((valid) => {
          if (valid) {
            let workPatternType = "2"
            let { name, time, workDayNum, restDayNum } = that.second
            let workStartMinute1 = time[0].split(':')[0] * 60 + time[0].split(':')[1] * 1
            let workEndMinute1 = time[1].split(':')[0] * 60 + time[1].split(':')[1] * 1
            let result = { ...this.daysResult, ...{ name, workStartMinute1, workEndMinute1, workPatternType } }
            postAction('/work-patterns', result).then(res => {
              that.$message({
                type: 'success',
                message: '添加成功!'
              })

              that.loadData(1)
              this.second = {}
              this.$refs.firstForm.resetFields()
              this.ADDdialogVisible = false
            })


          } else {
            return false
          }
        })
      )

    },
    handleWorkDay (value) {
      console.log(value, "value");
      let hadledday = {}
      for (const key in this.days) {
        value && value.length && value.forEach(item => {
          if (item == this.days[key]) {
            hadledday[key] = 1
          }
        })

      }
      let no = {}
      for (const key in this.days) {
        no[key] = 2
      }
      let result = { ...no, ...hadledday }//进行覆盖
      this.daysResult = result

    },
    handleClickTab () { },
    handleClose () { },
    handleDetel (row) {
      this.$confirm('此操作将永久删除该工作模式, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAction(`/work-patterns/${row.id}`).then(res => {
          console.log(res, "删除");
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData(1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    handleEdit () {
      // 进行编辑
      console.log('编辑');
    },
    addWorkmode () {
      this.ADDdialogVisible = true
    },

    goBack () {
      this.$router.go(-1)
    },

  },
  created () {
    this.loadData(1)

  },
  mounted () {
  },
}
</script> 

<style scoped lang="less">
</style>
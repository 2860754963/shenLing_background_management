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
    <el-dialog title="新增工作模式" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      dialogVisible: true,
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
    handleEdit () { },
    addWorkmode () {

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
<template>
  <div class="app-container">
    <div class="toptitle">车型管理</div>
    <el-card>
      <el-form label-width="80px" ref="form" :model="form" :inline="true" style="min-width: 800px;">
        <el-form-item label="车型编号" prop="id">
          <el-input v-model="form.id" placeholder="请输入车型编号"></el-input>
        </el-form-item>
        <el-form-item label="应载重量" prop="allowableLoad">
          <el-select v-model="form.allowableLoad" placeholder="请选择应载重量">
            <el-option v-for="(item,index) in allowableLoad" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应载体积" prop="allowableVolume">
          <el-select v-model="form.allowableVolume" placeholder="请选择应载体积">
            <el-option v-for="(item,index) in allowableVolume" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆类型" prop="name">
          <el-input v-model="form.name" placeholder="请输入车辆类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearche">搜索</el-button>
          <el-button @click="handleRest">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <el-button @click="handleadd" type="primary" style="margin-bottom: 20px;">新增车型</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" :prop="item.keywords" :label="item.name" v-for="(item,index) in tablecolumData" :key="index">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗？" style="margin-left: 10px;" @confirm="handleDelete(scope.row)">
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottompage">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.page" :page-sizes="[10, 20, 30, 50]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="pageList.total">
        </el-pagination>
      </div>
    </el-card>
    <typeModalVue ref="typemodal" @addOK="getgetCarTypeList({ page: 1,pageSize: 10})"></typeModalVue>
  </div>
</template>

<script>
import { getCarTypeList, deleteCarType } from '@/api/carManage'
import typeModalVue from './typeModal.vue'
export default {
  components: {
    typeModalVue
  },
  data () {
    return {
      tableData: [],
      tablecolumData: [
        {
          name: '车型编号',
          keywords: 'id'
        },
        {
          name: '车辆类型',
          keywords: 'name'
        },
        {
          name: '车型数量',
          keywords: 'num'
        },
        {
          name: '应载重量(吨)',
          keywords: 'allowableLoad',
        },
        {
          name: '应载体积(立方米)',
          keywords: 'allowableVolume',
        },
        {
          name: '长(米)',
          keywords: 'measureLong',
        },
        {
          name: '宽(米)',
          keywords: 'measureWidth',
        },
        {
          name: '高(米)',
          keywords: 'measureHigh',
        },

      ],
      allowableVolume: [
        {
          value: 'RANGE_LEVEL_1',
          name: '<3（m³）'
        },
        {
          value: 'RANGE_LEVEL_2',
          name: '3-5（m³）'
        },
        {
          value: 'RANGE_LEVEL_3',
          name: '5-10（m³）'
        },
        {
          value: 'RANGE_LEVEL_4',
          name: '10-15（m³）'
        },
        {
          value: 'RANGE_LEVEL_5',
          name: '15-30（m³）'
        },
        {
          value: 'RANGE_LEVEL_6',
          name: '30-50（m³）'
        },
        {
          value: 'RANGE_LEVEL_7',
          name: '50-80（m³）'
        },
        {
          value: 'RANGE_LEVEL_8',
          name: '80-150（m³）'
        },
        {
          value: 'RANGE_LEVEL_9',
          name: '150>（m³）'
        }
      ],
      allowableLoad: [
        {
          value: 'RANGE_LEVEL_1',
          name: '<1.8（吨）'
        },
        {
          value: 'RANGE_LEVEL_2',
          name: '1.8-6（吨）'
        },
        {
          value: 'RANGE_LEVEL_3',
          name: '6-14（吨）'
        },
        {
          value: 'RANGE_LEVEL_4',
          name: '14-30（吨）'
        },
        {
          value: 'RANGE_LEVEL_5',
          name: '30-50（吨）'
        },
        {
          value: 'RANGE_LEVEL_6',
          name: '50-100（吨）'
        },
        {
          value: 'RANGE_LEVEL_7',
          name: '100>（吨）'
        }
      ],
      form: {
        name: '',
        allowableLoad: '',
        allowableVolume: '',
        id: ''
      },
      pageList: {
        page: 1,
        pageSize: 10,
        total: 0
      },
    }

  },
  methods: {
    handleEdit (row) {
      this.$refs.typemodal.show(row)
    },
    async handleDelete (row) {
      let res = await deleteCarType(row.id)
      if (res == null) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getgetCarTypeList(this.pageList)
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    handleCurrentChange (val) {
      this.pageList.page = val
      this.getgetCarTypeList({ ...this.pageList, ...this.form })
    },
    handleSizeChange (val) {
      this.pageList.pageSize = val
      this.getgetCarTypeList({ ...this.pageList, ...this.form })
    },
    handleadd () {
      this.$refs.typemodal.show()
    },
    async handleSearche () {
      let { page, pageSize } = this.pageList
      let res = await getCarTypeList({ page, pageSize, ...this.form })
      if (res) {
        this.pageList.total = Number(res.counts)
        this.tableData = res.items
      }
    },
    handleRest () {
      this.$refs.form.resetFields()
      this.pageList = {
        page: 1,
        pageSize: 10,
        total: 0
      },
        this.getgetCarTypeList(this.pageList)
    },
    async getgetCarTypeList (payload) {
      let res = await getCarTypeList(payload)
      if (res) {
        this.pageList.total = Number(res.counts)
        this.tableData = res.items
      }
    }
  },
  created () {
    this.getgetCarTypeList(this.pageList)
  }
}
</script>

<style>
.bottompage {
  text-align: center;
  margin: 20px;
}
.toptitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

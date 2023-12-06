<template>
  <div class="app-container">
    <div class="toptitle">运费管理</div>
    <el-card>
      <el-button @click="handleadd" type="primary" style="margin-bottom: 20px;">新增模板</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :formatter="(r,c,v,i)=>tableFormatter(r,c,v,i,item)" align="center" :prop="item.keywords" :label="item.name" v-for="(item,index) in tablecolumData" :key="index">
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
    </el-card>
    <slModalVue ref="slmodal" @addOK="getfreightManage"></slModalVue>
  </div>
</template>

<script>
import { freightManage, deleteFreight } from '@/api/base'

import slModalVue from './slModal.vue'
import { Message } from 'element-ui'
export default {
  components: {
    slModalVue
  },
  data () {
    return {
      tablecolumData: [{
        name: '模板类型',
        keywords: 'templateType',
        // 1-同城寄，2-省内寄，3-经济区互寄，4-跨省
        type: ['同城寄', '省内寄', '经济区互寄', '跨省']
      },
      {
        name: '运送类型',
        keywords: 'transportType',
        // 1-普快，2-特快
        type: ['普快', '特快']
      },
      {
        name: '关联城市',
        keywords: 'associatedCityList',
        // 关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽
        type: ['全国', '京津冀', '江浙沪', '川渝', '黑吉辽']
      },
      {
        name: '首重价格',
        keywords: 'firstWeight'
      },
      {
        name: '续重价格',
        keywords: 'continuousWeight'
      },
      {
        name: '轻抛系数',
        keywords: 'lightThrowingCoefficient'
      }],
      tableData: []
    }
  },
  created () {
    this.getfreightManage()
  },
  methods: {
    handleadd () {
      console.log('add');
      this.$refs.slmodal.show()
    },
    async handleDelete (row) {
      let res = await deleteFreight(row.id)
      if (res == null) {
        Message({
          message: '删除成功',
          type: 'success'
        })
      } else {
        Message({
          message: '删除失败',
          type: 'error'
        })
      }
      this.getfreightManage()
    },
    handleEdit (row) {
      this.$refs.slmodal.show(row)
      console.log('edit', row);
    },
    tableFormatter (r, c, v, i, item) {
      if (c.label === '关联城市') {
        return v.map(item1 => {
          return item.type[item1 - 1] || item1
        }).join(',')
      }
      if (item.type) {
        return item.type[v - 1]
      } else {
        return v
      }

    },
    async getfreightManage () {
      let res = await freightManage()
      if (res) {
        this.tableData = res
      } else {
        this.tableData = []

      }
    }

  },

}
</script>

<style>
.toptitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

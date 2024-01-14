<template>
  <div class="">
    <el-table :data="edSource" :show-summary="showSummary">
      <el-table-column type="index" align="center">
      </el-table-column>
      <el-table-column v-for="(item,index) in edColumn" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <div v-if="item.prop==='name'">
            <div v-if="isedit">
              <el-input v-model="scope.row.name" placeholder="请输入" />
            </div>
            <div v-else>
              {{ scope.row.name  }}
            </div>
          </div>
          <div v-if="item.prop==='goodsTypeName'">
            <div v-if="isedit">
              <el-select v-model="scope.row.goodsTypeNameId" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in  goodsType" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div v-else>
              {{ scope.row.goodsTypeName   }}
            </div>
          </div>
          <div v-if="item.prop==='totalWeight'">
            <div v-if="isedit">
              <el-input v-model="scope.row.totalWeight" placeholder="请输入" />
            </div>
            <div v-else>
              {{ scope.row.totalWeight   }}
            </div>
          </div>
          <div v-else-if="item.prop==='totalVolume'">
            <div v-if="isedit">
              <el-input v-model="scope.row.totalVolume" placeholder="请输入" />
            </div>
            <div v-else>
              {{ scope.row.totalVolume   }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" fixed="right" v-if="showHandle">
        <template slot-scope="scope">
          <div v-if="isedit">
            <el-button @click="handleSave(scope.row)" type="text">保存</el-button>
            <el-button @click="isedit=false" type="text">取消</el-button>
          </div>
          <div v-else>
            <el-button @click="handleEdits(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDetel(scope.row)" type="text">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2024-01-14 11:06:52
* @Last Modified by: Nigulasi
* @Describe: 可编辑表格
*/

import { getAction, postAction, putAction, deleteAction } from '@/api/manage'
export default {
  name: 'editTable',
  props: {
    showHandle: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    edSource: {
      type: Array,
      default: () => []
    },
    edColumn: {
      type: Array,
      default: () => []
    }
  },
  components: {
  },
  data () {
    return {
      isedit: false,
      goodsType: []
    }
  },
  computed: {},
  watch: {},
  // 如果做组件抽离，这里的方法需要抽离到父组件中
  methods: {
    async handleSave (item) {
      delete item.goodsTypeName
      delete item.goodsTypeNameId
      let res = await putAction(`/order-manager/cargo/${item.id}`, item)
      if (res == null) {
        this.isedit = false
        this.$emit('saveOk')
      }
    },
    handleDetel (item) {
      let that = this
      // 二次确认删除
      this.$confirm('此操作将永久删除该货品, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteAction(`/order-manager/cargo/${item.id}`)
        console.log(res, "detele");
        if (res == null) {
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.$emit('deteleOk')
        }
      }).catch(() => {

      })



    },
    handleEdits (item) {
      this.getGoodsTY()
      this.isedit = true
    },
    async getGoodsTY () {
      let res = await getAction('/goodsType/simple')
      console.log(res, "res,type");
      if (res) {
        this.goodsType = res
      }
    }
  },
  created () {
  },
  mounted () {
  },
}
</script> 

<style scoped lang="less">
</style>
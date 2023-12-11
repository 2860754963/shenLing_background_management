<template>
  <el-dialog :title="title" :visible.sync="usevisible" width="30%">
    <div style="margin-bottom: 15px;">
      确定要启用吗？车辆启用需满足以下条件:
    </div>
    <div>
      1车辆信息已完善 &nbsp;2绑定司机>=2,且有排班
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleUseConfirm">确 定</el-button>
      <el-button @click="usevisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-11 19:27:13
* @Last Modified by: Nigulasi
* @Describe: 
*/
import { putAction } from '@/api/manage'
export default {
  name: 'useStop',
  props: {
    title: {
      type: String,
      default: '提示'
    },
  },
  components: {},
  data () {
    return {
      usevisible: false,
      data: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    async handleUseConfirm () {
      await putAction(`/enable/${this.data.id}`)
      console.log(12312312312312312);

      this.usevisible = false
      this.close()
      console.log(this.usevisible, "this.usevisible");

    },
    show (payload) {
      this.usevisible = true
      this.data = payload
    },
    close () {
      this.usevisible = false
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
<template>
  <div class="">
    <el-card style="width: 666px; height: 396px">
      <template #header>
        <span>运输任务 </span>
        <el-button class="todybtn" type="text" @click="seemore">查看更多</el-button>
      </template>
      <div style="margin-top: -19px">
        <el-table :data="tableData" stripe style="width: 100%" height="320">
          <el-table-column prop="id" label="任务编号">
          </el-table-column>
          <el-table-column prop="startAgency" label="起始地">
          </el-table-column>
          <el-table-column prop="endAgency" label="目的地"> </el-table-column>
          <el-table-column prop="licensePlate" label="车辆"> </el-table-column>
          <el-table-column prop="status" label="任务状态" width="80" :formatter='formatterStatus'> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data () {
    return {
      tableData: [],
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    seemore () {
      this.$router.push('/transport/task')
    },
    formatterStatus (row, column, cellValue, index) {
      // 任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消	
      let status = ['待执行', '进行中', '待确认', '已完成']
      return status[cellValue - 1]
    },
    initData (res) {
      this.tableData = res
    }
  },
};
</script>

<style scoped lang="scss">
// ::v-deep .el-card__body {
//   padding: 10px !important;
// }
.todybtn {
  float: right;
  padding: 3px 0;
}
</style>

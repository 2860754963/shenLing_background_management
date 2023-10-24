<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="11">
        <el-card>
          <template #header> 机构概述 </template>
          <div>
            <div>左</div>
            <el-divider direction="vertical"></el-divider>
            <div>右</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card>
          <template #header> 今日数据 </template>
        </el-card>
      </el-col>
    </el-row>
    <div>工作台</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

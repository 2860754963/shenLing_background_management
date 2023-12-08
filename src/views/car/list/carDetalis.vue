<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="车辆详情">
    </el-page-header>
    <el-card style="margin-top: 15px;height:80vh;position: relative;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form :model="baseInfoForm" label-width="100px" :disabled="BaseInfoFormDisabled" class="baseinfoclass">
            <el-form-item label="车辆编号">
              <el-input v-model="baseInfoForm.id" placeholder="请输入车辆编号" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input v-model="baseInfoForm.licensePlate" placeholder="请输入车牌号码" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="车型名称">
              <el-select v-model="baseInfoForm.truckTypeName" placeholder="请选择/输入车辆类型名称" filterable style="width:100%;">
                <el-option v-for="(item,index) in  carTypelist" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆体积">
              <el-input v-model="baseInfoForm.allowableVolume" placeholder="请输入车辆体积" style="width:100%;">
                <template slot="append">立方</template>
              </el-input>

            </el-form-item>
            <el-form-item label="车辆载重">
              <el-input v-model="baseInfoForm.allowableLoad" placeholder="请输入车辆载重" style="width:100%;">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="GPSID">
              <el-input v-model="baseInfoForm.deviceGpsId" placeholder="请输入GPSID" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="图片信息">
              <el-image v-for="(item,index) in baseInfoForm.picList" :key="index" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" fit="fill"></el-image>
            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="行驶证信息" name="second">行驶证信息</el-tab-pane>
      </el-tabs>
      <div>
        <el-button type="primary" class="editbutton" @click="handleEdit">编辑</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAction } from '@/api/manage'
export default {
  props: ['carTypelist'],
  data () {
    return {
      activeName: 'first',
      BaseInfoFormDisabled: true,
      baseInfoForm: {
        id: ''
      }
    }
  },
  methods: {
    handleEdit () {
      this.BaseInfoFormDisabled = !this.BaseInfoFormDisabled
    },
    handleClick () {
      console.log(this.activeName)
    },
    goBack () {
      this.$router.go(-1)
    },
    async getCarInfo (payload) {
      let res = await getAction(`/truck/${payload}`)
      if (res) {
        res.picList = res.picture.split(',')
        Object.assign(this.baseInfoForm, res)
      }
    }
  },

  created () {
    this.getCarInfo(this.$route.query.id)
  },

}
</script>

<style>
.editbutton {
  position: absolute;
  transform: translateX(-50%);

  left: 50%;
}
.baseinfoclass {
  position: relative;
  transform: translateX(-50%);
  width: 50%;
  left: 50%;
}
</style>

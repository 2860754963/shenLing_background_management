<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="车辆详情">
    </el-page-header>
    <el-card style="margin-top: 15px;height:80vh;position: relative;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseinfo">
          <el-form :rules="baseInfoRules" ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :disabled="BaseInfoFormDisabled" class="baseinfoclass">
            <el-form-item label="车辆编号" prop="id">
              <el-input disabled v-model="baseInfoForm.id" placeholder="请输入车辆编号" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="车牌号码" prop="licensePlate">
              <el-input v-model="baseInfoForm.licensePlate" placeholder="请输入车牌号码" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="车型名称" prop="truckTypeName">
              <el-select v-model="baseInfoForm.truckTypeName" placeholder="请选择/输入车辆类型名称" filterable style="width:100%;">
                <el-option v-for="(item,index) in  carTypelist" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆体积" prop="allowableVolume">
              <el-input v-model="baseInfoForm.allowableVolume" placeholder="请输入车辆体积" style="width:100%;">
                <template slot="append">立方</template>
              </el-input>

            </el-form-item>
            <el-form-item label="车辆载重" prop="allowableLoad">
              <el-input v-model="baseInfoForm.allowableLoad" placeholder="请输入车辆载重" style="width:100%;">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="GPSID" prop="deviceGpsId">
              <el-input v-model="baseInfoForm.deviceGpsId" placeholder="请输入GPSID" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="图片信息">
              <imageUpload :actionUrl="'https://slwl-api.itheima.net/manager/files/imageUpload'" :limit="2" :multiple="true" @picSuccessList="handlePicinfo" :picList="baseInfoForm.picList">
              </imageUpload>

            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="行驶证信息" name="driveId">行驶证信息</el-tab-pane>
      </el-tabs>
      <div>
        <div v-if="BaseInfoFormDisabled" class="bottomBtn">
          <el-button type="primary" @click="handleEdit">编辑</el-button>
        </div>
        <div v-else class="bottomBtn">
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { getAction, putAction } from '@/api/manage'
import { truckTypesimple } from '@/api/carManage.js'
import imageUpload from '@/views/car/list/imageUpload'
export default {
  name: 'carDetails',
  components: {
    imageUpload
  },
  data () {
    return {

      activeName: 'baseinfo',
      BaseInfoFormDisabled: true,
      baseInfoForm: {
        id: '',
        licensePlate: '',
        truckTypeName: '',
        allowableVolume: '',
        allowableLoad: '',
        deviceGpsId: '',
      },
      carTypelist: [],
      baseInfoUrl: {
        save: '/truck/{id}'
      },
      DriveIdurl: {
        asve: ''
      },
      baseInfoRules: {
        licensePlate: [
          { required: true, message: '车牌号码不能为空', trigger: 'blur' },
        ],
        truckTypeName: [
          { required: true, message: '车型名称不能为空', trigger: 'blur' },
        ],
        allowableVolume: [
          { required: true, message: '车辆体积不能为空', trigger: 'blur' },
        ],
        allowableLoad: [
          { required: true, message: '车辆载重不能为空', trigger: 'blur' },
        ],
        deviceGpsId: [
          { required: true, message: 'GPSID不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handlePicinfo (picInfo) {
      this.baseInfoForm.picture = picInfo
    },

    handleCancel () {
      this.BaseInfoFormDisabled = !this.BaseInfoFormDisabled
    },
    handleSave () {
      this.activeName === 'baseinfo' ? (
        this.$refs.baseInfoForm.validate(res => {
          if (res) {
            let { allowableLoad, allowableVolume, deviceGpsId, licensePlate, picture, truckTypeId, truckTypeName } = this.baseInfoForm
            putAction(`/truck/${this.baseInfoForm.id}`, {
              allowableLoad,
              allowableVolume,
              deviceGpsId,
              licensePlate,
              picture: picture.join(','),
              truckTypeId,
              truckTypeName
            }).then(res1 => {

              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.BaseInfoFormDisabled = !this.BaseInfoFormDisabled

            })

          }
        })

      ) : (
        this.$refs.driveIdForm.validate()
      )


    },
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
    },
    async loadCarType () {
      let res = await truckTypesimple()
      res ? (this.carTypelist = res) : (this.carTypelist = [])
    },
  },

  created () {
    this.getCarInfo(this.$route.query.id)
    this.loadCarType()

  },

}
</script>

<style>
.bottomBtn {
  /* 居中 */
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 15px;
}

.baseinfoclass {
  position: relative;
  transform: translateX(-50%);
  width: 50%;
  left: 50%;
}
</style>

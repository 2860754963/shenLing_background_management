<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="车辆详情">
    </el-page-header>
    <el-card style="margin-top: 15px;position: relative;">
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
        <el-tab-pane label="行驶证信息" name="driveId">
          <el-form :model="driveIdForm" label-width="120px" ref="driveIdForm" :rules="driveIdFormRules" class="baseinfoclass" :disabled="driveIdFormDisabled">
            <el-form-item label="行驶证号码" prop="transportCertificateNumber">
              <el-input v-model="driveIdForm.transportCertificateNumber" placeholder="请输入行驶证号码" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="发动机号码" prop="engineNumber">
              <el-input v-model="driveIdForm.engineNumber" placeholder="请输入发动机号码" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="registrationDate">
              <el-date-picker v-model="driveIdForm.registrationDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="强制报废日期" prop="mandatoryScrap">
              <el-date-picker v-model="driveIdForm.mandatoryScrap" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="整备质量" prop="overallQuality">
              <el-input v-model.number="driveIdForm.overallQuality" placeholder="请输入整备质量" style="width:100%;">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="外廓尺寸" prop="outsideDimensions">
              <el-input v-model.number="driveIdForm.outsideDimensions" placeholder="请输入外廓尺寸" style="width:100%;">
                <template slot="append">米</template>
              </el-input>
            </el-form-item> -->

            <el-form-item label="检验有效期" prop="expirationDate">
              <el-date-picker v-model="driveIdForm.expirationDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="核定载质量" prop="allowableWeight">
              <el-input v-model.number="driveIdForm.allowableWeight" placeholder="请输入核定载质量" style="width:100%;">
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="有效期" prop="validityPeriod">
              <el-date-picker v-model="driveIdForm.validityPeriod" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="图片信息">
              <imageUpload :actionUrl="'https://slwl-api.itheima.net/manager/files/imageUpload'" :limit="2" :multiple="true" @picSuccessList="handleDrivePicinfo" :picList="driveIdForm.picList">
              </imageUpload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
import { getAction, putAction, postAction } from '@/api/manage'
import { truckTypesimple } from '@/api/carManage.js'
import imageUpload from '@/views/car/list/imageUpload'
import driveId from './driveId.vue'
export default {
  name: 'carDetails',
  components: {
    imageUpload,
    driveId
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
      driveIdForm: {
        transportCertificateNumber: '',
        engineNumber: '',
        registrationDate: '',
        mandatoryScrap: '',
        overallQuality: '',
        outsideDimensions: '',
        expirationDate: '',
        allowableWeight: '',
        validityPeriod: '',
      },
      driveIdFormDisabled: true,
      driveIdFormRules: {
        transportCertificateNumber: [
          { required: true, message: '行驶证号码不能为空', trigger: 'blur' },
        ],
        engineNumber: [
          { required: true, message: '发动机号码不能为空', trigger: 'blur' },
        ],
        registrationDate: [
          { required: true, message: '注册时间不能为空', trigger: 'blur' },
        ],
        mandatoryScrap: [
          { required: true, message: '强制报废日期不能为空', trigger: 'blur' },
        ],
        overallQuality: [
          { required: true, message: '整备质量不能为空', trigger: 'blur' },
        ],
        outsideDimensions: [
          { required: true, message: '外廓尺寸不能为空', trigger: 'blur' },
        ],
        expirationDate: [
          { required: true, message: '检验有效期不能为空', trigger: 'blur' },
        ],
        allowableWeight: [
          { required: true, message: '核定载质量不能为空', trigger: 'blur' },
        ],
        validityPeriod: [
          { required: true, message: '有效期不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    handleDrivePicinfo (picInfo) {
      this.driveIdForm.picture = picInfo
    },
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
        this.$refs.driveIdForm.validate(res => {
          if (res) {
            let { transportCertificateNumber, engineNumber, registrationDate, mandatoryScrap, overallQuality, outsideDimensions, expirationDate, allowableWeight, validityPeriod, picture } = this.driveIdForm
            postAction(`/truck/${this.driveIdForm.id}/license`, {
              id: this.driveIdForm.id,
              transportCertificateNumber,
              engineNumber,
              registrationDate,
              mandatoryScrap,
              overallQuality,
              outsideDimensions: null,
              expirationDate,
              allowableWeight,
              validityPeriod,
              picture: picture.join(',')
            }).then(res1 => {
              console.log(res1, "行驶证");
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.driveIdFormDisabled = !this.driveIdFormDisabled
            })
          }
        })
      )
    },
    handleEdit () {
      this.BaseInfoFormDisabled = !this.BaseInfoFormDisabled
      this.driveIdFormDisabled = !this.driveIdFormDisabled
    },
    async getDirveIdInfo (id) {

      let res = await getAction(`/truck/${id}/license`)
      if (res) {
        res.picList = res.picture.split(',')
        Object.assign(this.driveIdForm, res)
      } else {
        this.$message({
          message: '获取行驶证信息失败',
          type: 'error'
        })
      }

      console.log(res, "getdirveID");
    },
    handleClick () {
      console.log()
      if (this.activeName === 'driveId') {
        this.getDirveIdInfo(this.$route.query.id)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    async getCarInfo (payload) {
      let res = await getAction(`/truck/${payload}`)
      if (res) {
        res.picList = res.picture.split(',')
        Object.assign(this.baseInfoForm, res)
      } else {
        this.$message({
          message: '获取车辆信息失败',
          type: 'error'
        })
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

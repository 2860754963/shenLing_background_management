<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="司机详情">
    </el-page-header>
    <el-card style="margin-top: 15px;">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="司机详情" name="dervieDetails">
          <el-form :model="dervieDetailsForm" inline :disabled="formDisabled" label-width="100px">
            <el-form-item label="员工编号">
              <el-input v-model="dervieDetailsForm.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="司机名称">
              <el-input v-model="dervieDetailsForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-input v-model="dervieDetailsForm.agency.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="dervieDetailsForm.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="dervieDetailsForm.age"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="驾驶证信息" name="dervieIdInfo">
          <el-form :model="dervieIdInfoForm" inline :disabled="formDisabled" label-width="120px">
            <el-form-item label="驾驶证号">
              <el-input v-model="dervieIdInfoForm.licenseNumber" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="准驾车型">
              <el-input v-model="dervieIdInfoForm.allowableType" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="初次领证日期">
              <el-date-picker v-model="dervieIdInfoForm.initialCertificateDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width:87%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="驾驶证有效期限">
              <el-input v-model="dervieIdInfoForm.validPeriod" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="驾龄">
              <el-input v-model="dervieIdInfoForm.driverAge" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="驾驶证类型">
              <el-input v-model="dervieIdInfoForm.licenseType" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="从业资格证">
              <el-input v-model="dervieIdInfoForm.qualificationCertificate" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="入场证信息">
              <el-input v-model="dervieIdInfoForm.passCertificate" style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="图片信息">
              <imageUpload :picList="dervieIdInfoForm.picList" :actionUrl="'https://slwl-api.itheima.net/manager/files/imageUpload'" :limit="2" :multiple="true" @picSuccessList="handleuploadPic">
              </imageUpload>
              <!-- <el-input v-model="dervieIdInfoForm.picture"></el-input> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div>
        <div v-if="formDisabled" class="bottomBtn">
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

/*
* @Author: Nigulasi
* @Date: 2023-12-13 14:04:50
* @Last Modified by: Nigulasi
* @Describe: 司机详情
*/
import { getAction, putAction, postAction } from '@/api/manage';
import imageUpload from './imageUpload.vue';
export default {
  name: 'driverDetalis',
  props: {},
  components: {
    imageUpload
  },
  data () {
    return {
      id: null,
      activeName: 'dervieDetails',
      formDisabled: true,
      dervieDetailsForm: {
        userId: '',
        name: '',
        agency: {
          name: ''
        },
        mobile: '',
        age: '',
      },

      dervieIdInfoForm: {
        licenseNumber: '',
        allowableType: '',
        initialCertificateDate: '',
        validPeriod: '',
        driverAge: '',
        licenseType: '',
        qualificationCertificate: '',
        passCertificate: '',
        picture: '',
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleuploadPic (picInfo) {
      this.dervieIdInfoForm.picture = picInfo.join(',')
    },
    handleCancel () {
      this.formDisabled = !this.formDisabled
    },
    async handleSave () {
      if (this.activeName === 'dervieDetails') {
        let res = await putAction(`/driver/${this.id}`, this.dervieDetailsForm)
        if (res == null) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      } else {
        let res = await postAction(`/driverLicense`, this.dervieIdInfoForm)
        if (res == null) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      }
      this.formDisabled = !this.formDisabled
    },
    handleEdit () {
      this.formDisabled = !this.formDisabled
    },
    handleTabClick (current) {
      if (current.name == 'dervieIdInfo') {
        this.getDervieIdInfo()
      }
    },
    async getDervieIdInfo () {
      let res = await getAction(`/driverLicense/${this.id}`)
      if (res != null) {
        this.dervieIdInfoForm = res
        this.dervieIdInfoForm.picList = res.picture.split(',')
      }
    },
    async getDriverDetails (id) {
      let res = await getAction(`/driver/${id}`)
      if (res != null) {
        this.dervieDetailsForm = res
      }
    },
  },
  created () {
    this.id = this.$route.query.id
    this.getDriverDetails(this.$route.query.id);
  },
  mounted () {
  },
}
</script> 

<style scoped >
.bottomBtn {
  text-align: center;
  margin-top: 20px;
}
</style>
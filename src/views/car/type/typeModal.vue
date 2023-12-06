<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%" destroy-on-close>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="车辆类型" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" placeholder="请输入车辆类型名称"></el-input>
      </el-form-item>
      <el-form-item label="应载重量" :label-width="formLabelWidth" prop="allowableLoad">
        <el-input v-model="form.allowableLoad" placeholder="请输入应载重量">
          <template slot="append">吨</template>
        </el-input>
      </el-form-item>
      <el-form-item label="应载体积" :label-width="formLabelWidth" prop="allowableVolume">
        <el-input v-model="form.allowableVolume" placeholder="请输入应载体积">
          <template slot="append">立方</template>
        </el-input>
      </el-form-item>

      <el-form-item label="长" :label-width="formLabelWidth" prop="measureLong">
        <el-input v-model="form.measureLong" placeholder="请输入长">
          <template slot="append">米</template>
        </el-input>
      </el-form-item>
      <el-form-item label="宽" :label-width="formLabelWidth" prop="measureWidth">
        <el-input v-model="form.measureWidth" placeholder="请输入宽">
          <template slot="append">米</template>
        </el-input>
      </el-form-item>
      <el-form-item label="高" :label-width="formLabelWidth" prop="measureHigh">
        <el-input v-model="form.measureHigh" placeholder="请输入高">
          <template slot="append">米</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div v-if="dialogTitle==='新增车型'" slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handelComfire('add')">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
    <div v-else slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handelComfire('edit')">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addCarType, updateCarType } from '@/api/carManage'
export default {
  name: 'typemodal',
  data () {
    return {
      dialogTitle: '新增车型',
      dialogFormVisible: false,
      form: {
        name: '',
        allowableLoad: '',
        allowableVolume: '',
        measureLong: '',
        measureWidth: '',
        measureHigh: '',
      },
      rules: {
        name: [
          { required: true, message: '车型名称不能为空', trigger: 'blur' },
        ],
        allowableLoad: [
          { required: true, message: '应载重量不能为空', trigger: 'blur' },
        ],
        allowableVolume: [
          { required: true, message: '应载体积不能为空', trigger: 'blur' },
          { validator: this.validateAllowableVolume, trigger: 'blur' }
        ],

      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    validateAllowableVolume (rule, value, callback) {
      // 正则表达式 1-100之间的整数
      let reg = /^([1-9]\d?|100)$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入1-100之间的整数'))
      }

    },
    async handelComfire (type) {
      let res = await this.$refs.form.validate()
      if (res) {
        let resAdd
        let message
        if (type === 'add') {
          resAdd = await addCarType(this.form)
          message = '添加成功'
        } else {
          resAdd = await updateCarType(this.form)
          message = '修改成功'
        }
        if (resAdd == null) {
          this.$message({
            message: message,
            type: 'success'
          })
          this.$refs.form.resetFields()
          this.close()
          this.$emit('addOK')
        } else {
          this.$message({
            message: '失败，请重试',
            type: 'error'
          })
        }
      } else {
        return false
      }
    },
    show (payload) {
      payload || (this.dialogTitle = '新增车型')
      payload && Object.assign(this.form, payload)
      payload && (this.dialogTitle = '编辑车型')
      this.dialogFormVisible = true;
    },
    close () {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style >
</style>
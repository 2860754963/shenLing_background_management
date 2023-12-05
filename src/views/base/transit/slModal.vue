<template>
  <el-dialog title="新增模板" :visible.sync="dialogFormVisible" width="40%" destroy-on-close>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="模板类型" :label-width="formLabelWidth" prop="templateType">
        <el-select v-model="form.templateType" placeholder="请选择模板类型" style="width:100%;">
          <!-- 1-同城寄，2-省内寄，3-经济区互寄，4-跨省 -->
          <el-option label="同城寄" value="1"></el-option>
          <el-option label="省内寄" value="2"></el-option>
          <el-option label="经济区互寄" value="3"></el-option>
          <el-option label="跨省" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运送类型" :label-width="formLabelWidth" prop="transportType">
        <el-select v-model="form.transportType" placeholder="请选择运送类型" style="width:100%;">
          <!-- 1-普快，2-特快 -->
          <el-option label="普快" value="1"></el-option>
          <el-option label="特快" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联城市" :label-width="formLabelWidth" prop="associatedCityList">
        <el-checkbox-group v-model="form.associatedCityList">
          <!-- 1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽 -->
          <el-checkbox label="全国" name="type"></el-checkbox>
          <el-checkbox label="京津冀" name="type"></el-checkbox>
          <el-checkbox label="江浙沪" name="type"></el-checkbox>
          <el-checkbox label="川渝" name="type"></el-checkbox>
          <el-checkbox label="黑吉辽" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="首重价格" :label-width="formLabelWidth" prop="firstWeight">
        <el-input v-model="form.firstWeight" placeholder="请输入首重价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="续重价格" :label-width="formLabelWidth" prop="continuousWeight">
        <el-input v-model="form.continuousWeight" placeholder="请输入续重价格">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="轻抛系数" :label-width="formLabelWidth" prop="lightThrowingCoefficient">
        <el-input v-model="form.lightThrowingCoefficient" placeholder="请输入轻抛系数"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handelComfire">确 定</el-button>
      <el-button @click="close">取 消</el-button>

    </div>
  </el-dialog>
</template>

<script>
import { saveFreight } from '@/api/base'
export default {
  name: 'slmodal',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        templateType: '',
        transportType: '',
        associatedCityList: [],
        firstWeight: '',
        continuousWeight: '',
        lightThrowingCoefficient: ''
      },
      rules: {
        templateType: [
          { required: true, message: '请选择模板类型', trigger: 'blur' },
        ],
        transportType: [
          { required: true, message: '请选择运送类型', trigger: 'blur' },
        ],
        associatedCityList: [
          { type: 'array', required: true, message: '请至少选择关联一个城市', trigger: 'change' },
        ],
        firstWeight: [
          { required: true, message: '请输入首重价格', trigger: 'blur' },
          { validator: this.validatePrice, trigger: 'blur' }
        ],
        continuousWeight: [
          { required: true, message: '请输入续重价格', trigger: 'blur' },
          { validator: this.validatePrice, trigger: 'blur' }
        ],
        lightThrowingCoefficient: [
          { required: true, message: '请输入轻抛系数', trigger: 'blur' },
          { validator: this.validateLightThrowingCoefficient, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    validatePrice (rule, value, callback) {
      //正则表达式 数字类型最多保留两位小数
      let reg = /^(\d+)(\.\d{1,2})?$/;
      if (!reg.test(value)) {
        callback(new Error('只能输入数字值,最多保留两位小数'));
      } else {
        callback();
      }
    },
    validateLightThrowingCoefficient (rule, value, callback) {
      // 证则表达式 正整数
      let reg = /^[1-9]\d*$/;
      if (!reg.test(value)) {
        callback(new Error('只能输入正整数'));
      } else {
        callback();
      }
    },
    handelComfire () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          let res = await saveFreight(this.form)
          console.log(res);
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });


      // this.$message({
      //   message: '添加成功',
      //   type: 'success'
      // });
      // this.close()
    },
    show () {
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
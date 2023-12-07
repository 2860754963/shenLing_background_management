<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%" destroy-on-close>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="车辆类型" :label-width="formLabelWidth" prop="truckTypeId">
        <el-select v-model="form.truckTypeId" placeholder="请选择/输入车辆类型名称" filterable style="width:100%;">
          <el-option v-for="(item,index) in  carTypelist" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号码" :label-width="formLabelWidth" prop="licensePlate">
        <el-input v-model="form.licensePlate" placeholder="请输入车牌号码">
        </el-input>
      </el-form-item>
      <el-form-item label="GPS设备ID" :label-width="formLabelWidth" prop="deviceGpsId">
        <el-input v-model="form.deviceGpsId" placeholder="请输入GPS设备ID">
        </el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { postAction } from '@/api/manage'
export default {
  name: 'typemodal',
  props: {
    carTypelist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      dialogTitle: '新增车辆',
      dialogFormVisible: false,
      form: {
        truckTypeId: '',
        licensePlate: '',
        deviceGpsId: '',
      },
      rules: {
        truckTypeId: [
          { required: true, message: '车辆类型不能为空', trigger: 'blur' },
        ],
        licensePlate: [
          { required: true, message: '车牌号码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('车牌号码不能为空'));
              }
              if (!/^[0-9A-Za-z]{5,10}$/.test(value)) {
                callback(new Error('请输入正确的车牌号码'));
              } else {
                callback();
              }
            }, trigger: 'change'
          }
        ],
        deviceGpsId: [
          { required: true, message: 'GPS设备ID不能为空', trigger: 'blur' },
        ],

      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    async handleAddConfirm () {
      let params = {
        truckTypeId: this.form.truckTypeId,
        licensePlate: this.form.licensePlate,
        deviceGpsId: this.form.deviceGpsId,
      }
      let res = await postAction('/truck', params)
      console.log(res, "res");
      if (res === null) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.close()
        this.$emit('OK')
      } else {
        this.$message({
          message: '添加失败',
          type: 'error'
        })
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
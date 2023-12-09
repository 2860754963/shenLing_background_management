<template>
  <div>
    <div style="display: inline-block;vertical-align: top;">
      <el-image v-for="(item,index) in previewList" :key="index" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" :preview-src-list="previewList">
      </el-image>
    </div>
    <div style="display: inline-block;" v-show="showUpload">
      <el-upload :action="actionUrl" :on-success="uploadSuccess" :on-remove="handleRemove" :headers="uploadHeaders" :multiple="multiple" :data="uploadData" :accept="acceptType" :limit="limit"
        :file-list="uploadFileList" :on-exceed="handleExce">
        <div class="uploadIcon">
          <i class="el-icon-upload2"></i>
        </div>
      </el-upload>
    </div>
  </div>

</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'imageUpload',
  props: {
    actionUrl: {
      // 上传的地址
      type: String,
      default: '',
      required: true
    },
    picList: {
      // 传入预览的图片列表
      type: Array,
      default: () => [],
      required: false
    },
    multiple: {
      // 是否支持多选
      type: Boolean,
      default: false,
      required: false
    },
    uploadData: {
      // 上传时的额外参数
      type: Object,
      default: () => { },
      required: false
    },
    acceptType: {
      type: String,
      default: 'image/*',
      required: false
    },
    limit: {
      // 上传图片的最大数量
      type: Number,
      default: 5,
      required: false
    }
  },
  components: {},
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      uploadHeaders: {},//上传请求头
      previewList: [],
      uploadFileList: [],
      showUpload: true
    }
  },
  computed: {},
  watch: {
    picList: {
      handler (newVal, oldVal) {
        this.previewList = newVal
        for (let i = 0; i < newVal.length; i++) {
          this.uploadFileList.push({
            name: i,
            url: newVal[i]
          })
        }
      }

    },
    previewList: {
      handler (newVal, oldVal) {
        this.$emit('picSuccessList', newVal)
      },
      deep: true
    },
  },
  methods: {
    handleExce (files, fileList) {
      this.$message.error(`当前限制选择 ${this.limit} 个文件,请删除后再上传！`)
    },
    uploadSuccess (response, file, fileList) {
      file.url = file.response.data
      this.previewList = [...this.previewList, response.data]
    },
    handleRemove (file, fileList) {
      this.previewList = fileList.map(item => item.url)

    },

  },
  created () {
    this.uploadHeaders = {
      Authorization: getToken()
    }
  },
  mounted () {
  },
}
</script> 

<style scoped >
.uploadIcon {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  text-align: center;
  line-height: 100px;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
// 作为list列表混入文件，包含获取表格数据获取，分页数据获取 基于element2.14
import { getAction } from '@/api/manage.js'
export const nigulasiList = {
  data () {
    return {
      tableColumn: [],
      queryParam: {},
      dataSource: [],
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 30, 50],
        total: 0,
      },
    }
  },
  methods: {
    handleAdd (payload) {
      this.$refs.modal.show(payload)
    },
    // 处理sizeChange改变
    handleSizeChange (val) {
      this.ipagination.pageSize = val
      this.loadData()
    },
    // 处理currentChange改变
    handleCurrentChange (val) {
      this.ipagination.current = val
      this.loadData()
    },
    // 过滤对象中的空属性
    filterObj (obj) {
      if (!(typeof obj == 'object')) {
        return;
      }
      for (let key in obj) {
        if (obj.hasOwnProperty(key)
          && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
          delete obj[key];
        }
      }
      return obj;
    },
    //获取查询条件
    getQueryParams () {
      let param = Object.assign({}, this.queryParam)
      param = { ...param, ...this.paramPro }
      param.page = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return this.filterObj(param)
    },
    // / 加载数据
    async loadData (arg, cb) {
      if (!this.url?.list) {
        this.$message({
          type: 'warning',
          message: '请设置url.list参数'
        })
        return
      }
      if (arg === 1) {
        this.ipagination.current = 1
      }
      // 查询条件
      let params = this.getQueryParams()
      let res = await getAction(this.url.list, params)
      if (res) {
        let dataArr = res.items
        this.dataSource = dataArr
      } else {
        this.dataSource = []
      }
      res.counts && (this.ipagination.total = Number(res.counts))
      cb && cb()
    },
    // 搜索
    handleSearch () {
      this.loadData(1)
    },
    // 搜索重置
    searchReset () {
      this.queryParam = {
        ...this.paramPro,
      }
      this.loadData(1)
    },
  },

}

<template>
  <div v-loading="loading" class="app-container">
    <el-row>
      <el-col :span="4">
        <!-- 左侧树结构 -->
        <el-card class="left-tree">
          <el-tree
            ref="tree"
            highlight-current
            icon-class="el-icon-folder"
            :data="departTree"
            :props="{ label: 'name' }"
            node-key="id"
            @node-click="selectNode"
          />
        </el-card>
      </el-col>
      <el-col :span="20">
        <!-- 左侧树结构 -->
        <el-card class="container-card">
          <span slot="header">机构信息</span>
          <el-form label-width="120px" :disabled="!isEdit">
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构编号">
                  <el-input v-model="formData.id" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构名称">
                  <el-input v-model="formData.name" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构类型" disabled>
                  <el-select v-model="formData.type" style="width:100%">
                    <el-option label="一级转运" :value="1" />
                    <el-option label="二级转运" :value="2" />
                    <el-option label="网点" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="机构地址">
              <el-row type="flex" justify="space-around">
                <el-col :span="8">
                  <el-select v-model="formData.provinceId" placeholder="请选择省" style="width:98%" @change="getCityList($event, 'change')">
                    <el-option
                      v-for="item in provinceList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="formData.cityId" placeholder="请选择市" style="width:98%" @change="getAreaList($event, 'change')">
                    <el-option
                      v-for="item in cityList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="formData.countyId" placeholder="请选择区" style="width:100%">
                    <el-option
                      v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="详细地址">
                  <el-input v-model="formData.address" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经度">
                  <el-input v-model="formData.longitude" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纬度">
                  <el-input v-model="formData.latitude" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构负责人">
                  <el-input v-model="formData.managerName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构电话">
                  <el-input v-model="formData.phone" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="saveDepart">
              {{ isEdit ? '保存' : '编辑' }}
            </el-button>
          </el-row>
        </el-card>
        <el-card class="container-card">
          <span slot="header">员工信息 </span>
          <el-empty v-if="!list.length" description="当前数据为空" />
          <el-table v-else :data="list">
            <el-table-column type="index" label="序号" />
            <el-table-column label="员工编号" prop="userId" />
            <el-table-column label="员工姓名" prop="name" />
            <el-table-column label="手机号" prop="mobile" />
            <el-table-column label="所属机构" prop="agency.name" />
            <el-table-column label="系统账户" prop="account" />
            <el-table-column label="系统角色">
              <template v-slot="{row}">
                {{ row.roleNames[0] }}
              </template>
            </el-table-column>

            <el-table-column label="账号状态">
              <template v-slot="{ row }">
                <span v-if="row.status === 1" class="rote">正常</span>
                <span v-else>禁用</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 只有大于一页时才切换分页 -->
          <el-row
            v-if="pageParams.total > pageParams.pageSize"
            type="flex"
            style="height: 60px"
            justify="center"
            align="middle"
          >
            <el-pagination
              :total="pageParams.total"
              :current-page="pageParams.page"
              :page-size="pageParams.pageSize"
              @current-change="changePage"
            />
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getDepartTree,
  getDepartDetail,
  getUserListByDepartId,
  getCityList,
  saveDepart
} from '@/api/base'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      departTree: [],
      currentNode: null,
      list: [],
      pageParams: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      formData: {},
      provinceList: [], // 省份集合
      cityList: [], // 城市集合
      areaList: [] // 地区集合
    }
  },
  created() {
    this.getDepartTree()
    this.getProvinceList() // 获取省份列表
  },
  methods: {
    async getDepartTree() {
      this.departTree = transListToTreeData(
        JSON.parse(await getDepartTree()),
        '0'
      )
      // 选择第一个节点
      this.currentNode = this.selectFirstNode(this.departTree)
      this.$refs.tree.setCurrentKey(this.currentNode.id) // 选中某个节点
      this.queryDetail() // 查询详情id
    },
    selectFirstNode(arr) {
      let node = null
      if (arr[0].children && arr[0].children.length) {
        node = this.selectFirstNode(arr[0].children)
      } else {
        node = arr[0]
      }
      return node
    },
    // 查询详情
    async queryDetail() {
      this.loading = true
      this.formData = await getDepartDetail(this.currentNode.id)
      // 处理一下数据的转化问题
      this.formData.provinceId = this.formData.province?.id
      this.formData.cityId = this.formData.city?.id
      this.formData.countyId = this.formData.county?.id
      // 获取对应的数据
      this.formData.cityId && this.getCityList(this.formData.provinceId) // 获取对应的城市列表
      this.formData.countyId && this.getAreaList(this.formData.cityId) // 获取对应的地区列表

      await this.getUserListByDepartId()
      this.loading = false
    },
    selectNode(data) {
      this.currentNode = data
      this.queryDetail()
    },
    async getUserListByDepartId() {
      const { counts, items } = await getUserListByDepartId({
        ...this.pageParams,
        agencyId: this.currentNode.id
      })
      this.list = items
      this.pageParams.total = counts
    },
    // 切换页码
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getUserListByDepartId()
    },
    // 获取省份
    async getProvinceList() {
      this.provinceList = await getCityList()
    },
    // 获取城市列本
    async getCityList(parentId, type) {
      this.cityList = await getCityList({ parentId })
      type === 'change' && (this.formData.cityId = null)
    },
    // 获取地区列表
    async getAreaList(parentId) {
      this.areaList = await getCityList({ parentId })
    },
    // 保存机构信息
    async saveDepart() {
      if (this.isEdit) {
        this.loading = true
        await saveDepart(this.formData)
        this.$message.success('修改成功')
        this.isEdit = false
        this.loading = false
      } else {
        this.isEdit = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-card {
  margin-left: 10px;
}
.container-card:not(:first-child) {
  margin-top: 20px;
}
.left-tree {
  padding: 10px;
}
::v-deep .el-tree-node__content {
  height: 40px;
}
.rote:before {
  width: 6px;
  height: 6px;
  background: #1dc779;
  border-radius: 50%;
  content: "";
  display: inline-block;
  margin-right: 6px;
}
</style>>


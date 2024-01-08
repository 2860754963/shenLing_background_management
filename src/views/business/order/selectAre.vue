<template>
  <div class="">
    <el-select v-model="province" placeholder="请选择省" style="display: inline-block; width: 107px;" @change="e=>handleLoad(e,'province')" clearable>
      <el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="city" placeholder="请选择市" style="display: inline-block; width: 107px; margin: 0 10px;" @change="e=>handleLoad(e,'city')" clearable>
      <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>

    <el-select v-model="county" placeholder="请选择县" style="display: inline-block; width: 107px;" clearable>
      <el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getAction, putAction } from '@/api/manage'
/*
* @Author: Nigulasi
* @Date: 2024-01-04 16:36:45
* @Last Modified by: Nigulasi
* @Describe: selectAre
*/

export default {
  name: 'selectAre',
  props: {},
  components: {},

  data () {
    return {
      result: {
        province: '',
        city: '',
        county: '',
      },
      province: '',
      city: '',
      county: '',
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
    }
  },
  computed: {},
  watch: {
    province: {
      handler (newvalue, oldvalue) {
        newvalue && (this.result.province = newvalue)
        this.$emit('update', this.result)
      }
    },
    city: {
      handler (newvalue, oldvalue) {
        newvalue && (this.result.city = newvalue)
        this.$emit('update', this.result)
      }
    },
    county: {
      handler (newvalue, oldvalue) {
        newvalue && (this.result.county = newvalue)
        this.$emit('update', this.result)
      }
    },
  },
  methods: {
    clear () {
      this.province = this.city = this.county = ''
      this.result = {
        province: '',
        city: '',
        county: '',
      }
    },
    handleLoad (e, value) {
      if (e == '' && value == 'province') {
        this.city = this.county = ''
        this.cityOptions = this.countyOptions = []
        return
      } else if (e == '' && value == 'city') {
        this.county = ''
        this.countyOptions = []
        return
      }
      this.getProvince(e)
    },
    async getProvince (payload = 0) {
      let res = await getAction(`/areas/children?parentId=${payload}`)
      if (res) {
        if (this.province == '') {
          this.provinceOptions = res
        } else if (this.city == '') {
          this.cityOptions = res
        } else if (this.county == '') {
          this.countyOptions = res
        }
      }
    },
  },
  created () {
    this.getProvince()
  },
  mounted () {
  },
}
</script> 

<style scoped lang="less">
</style>
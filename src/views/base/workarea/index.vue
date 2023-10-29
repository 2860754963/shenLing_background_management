<template>
  <div class="main">

    <el-card style="width: 25%;margin-right: 2%;">
      <el-tree ref="tree" highlight-current icon-class="el-icon-folder" :data="departTree" :props="{ label: 'name' }" node-key="id" @node-click="selectNode" :default-expanded-keys="defaultExpand"
        :default-checked-keys="defaultChecked" />

    </el-card>
    <el-card style="width:72%">
      <template #header>
        <div>
          <span>作业范围</span>
        </div>
      </template>
      <div>
        <div>
          <el-form :model="form" label-width="90px" :inline="true">
            <el-form-item label="地区关键词">
              <el-input v-model="form.keyword" placeholder="请输入地区关键词"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm">立即搜索</el-button>
          </el-form>
        </div>
        <div>
          <div>
            <el-button type="primary" @click="starEdit" :disabled="!currentPathInfo.polygon">开始编辑</el-button>
            <el-button type="primary" @click="stopEdit" :disabled="!currentPathInfo.polygon">结束编辑</el-button>
          </div>
          <div class="" id="container">
          </div>

        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import {
  getDepartTree,
  getDepartDetail,
  getUserListByDepartId,
  getCityList,
  saveDepart,
} from "@/api/base";
import { transListToTreeData } from "@/utils";
import AMapLoader from '@amap/amap-jsapi-loader'
import { getBusinessScope, saveBusinessSCope } from '@/api/workerBench.js'
import { Message } from "element-ui";
export default {
  name: 'workarea',
  props: {},
  components: {
  },
  data () {
    return {
      placeSearch: null,
      paramsPath: [],
      currentPathInfo: {},
      currentPath: [],
      currentPositon: {
        longitude: 123.162626,
        latitude: 41.2669,
      },
      map: null, //初始化 map 对象
      polyEditor: null,
      departTree: [],
      currentNode: null,
      defaultExpand: [],
      defaultChecked: [],
      form: {
        keyword: '',
      },
    }
  },
  computed: {},
  watch: {
    defaultChecked: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.$nextTick(() => {
            document.querySelector('.el-tree-node__children .el-tree-node__children .el-tree-node__content .el-tree-node__label').click();
          })
        }
      },
    }

  },
  methods: {
    submitForm () {
      // console.log('submitForm');
      // console.log(this.form.keyword, "this.form.keyword");
      // console.log(this.placeSearch, "this.placeSearch");
      // this.placeSearch.search(this.form.keyword, (status, result) => {
      //   console.log(status, result, "status, result");
      //   if (status === 'complete' && result.info === 'OK') {
      //     // 查询成功时，result即对应匹配的POI信息
      //     console.log(result, "result");
      //     this.currentPositon.latitude = result.poiList.pois[0].location.lat;
      //     this.currentPositon.longitude = result.poiList.pois[0].location.lng;
      //     this.initMap()
      //   }
      // })
    },
    starEdit () {
      this.polyEditor.open()
    },
    async stopEdit () {
      this.polyEditor.close()
      let params = {
        "bid": this.currentPathInfo.bid,
        "polygon": this.paramsPath,
        "type": 1,
      }
      await saveBusinessSCope(params)
      Message.success('保存成功')

    },
    async getBusinessscope (params) {
      let res = await getBusinessScope(params)
      if (res && res.polygon) {
        this.currentPath = []
        res.polygon.forEach(item => {
          this.currentPath.push(new AMap.LngLat(item.longitude, item.latitude))
        })
      } else {
        this.currentPath = []
      }
      this.currentPathInfo = res
      this.initMap()
    },
    initMap () {
      AMapLoader.load({
        key: "792d45e660dcf9f93adaa33971a46572", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [["AMap.PolygonEditor", "AMap.PlaceSearch"], function () {
        }], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        var map = new AMap.Map("container", {
          center: [this.currentPositon.longitude, this.currentPositon.latitude], //设置地图初始化中心点位置
          mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
          viewMode: '2D',  //设置地图模式
          zoom: 8.8   //设置当前地图级别
        });

        var polygon = new AMap.Polygon({
          path: this.currentPath,
          fillColor: '#fff', // 多边形填充颜色
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'red', // 线条颜色
        });
        //多边形 Polygon对象添加到 Map
        map.add(polygon);
        // 缩放地图到合适的视野级别
        map.setFitView([polygon])
        // 实例化多边形编辑器，传入地图实例和要进行编辑的多边形实例
        this.polyEditor = new AMap.PolygonEditor(map, polygon);
        // 开启编辑模式
        // this.polyEditor.open();
        this.polyEditor.on('end', data => {
          this.paramsPath = []
          data.target._opts.path.forEach(item => {
            this.paramsPath.push({ longitude: item[0], latitude: item[1] })
          })
        })

      }).catch(e => {
        console.log(e);
      })
    },
    selectNode (data) {
      this.currentNode = data;
      this.currentPositon.latitude = this.currentNode.latitude;
      this.currentPositon.longitude = this.currentNode.longitude;
      this.initMap()
      let params = {
        id: this.currentNode.id,
        type: 1
      }
      this.getBusinessscope(params)
    },
    async getDepartTree () {
      this.departTree = transListToTreeData(
        JSON.parse(await getDepartTree()),
        "0"
      );
      this.haschildren(this.departTree[0]);

    },
    haschildren (data) {
      this.defaultExpand.push(data.id);
      this.defaultChecked.push(data.id);
      this.defaultChecked = [this.defaultChecked[this.defaultChecked.length - 1]]
      if (data.children && data.children.length > 0) this.haschildren(data.children[0]);
    }

  },
  created () {
    this.getDepartTree();
  },
  mounted () {
    this.initMap();
  },
}
</script> 

<style scoped lang="sass">
.main
  padding: 20px
  background-color: #f3f5f9
  height: 100vh
  display: flex
  .todybtn
    float: right
    margin-top: -11px
  #container
    width: 80%
    height: 600px
    margin: 50px auto
    border: 1px solid red
</style>
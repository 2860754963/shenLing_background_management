<template>
  <div class="app-container">
    <el-page-header @back="goBack" content="作业范围分配">
    </el-page-header>
    <el-card style="margin-top: 15px;">
      <div slot="header">
        <span>作业范围分配</span>
      </div>
      <div>
        <div>
          <el-button type="primary" @click="starEdit" v-if="editShow">开始编辑</el-button>
          <el-button type="primary" @click="stopEdit" v-else>结束编辑</el-button>
        </div>
        <div id="container">
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>

/*
* @Author: Nigulasi
* @Date: 2023-12-14 17:20:03
* @Last Modified by: Nigulasi
* @Describe: 作业范围分配
*/
import { getAction, postAction } from '@/api/manage'
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      resultInfo: {},
      userId: '',
      map: null, //初始化 map 对象.
      polyEditor: null,
      editShow: true,
      currentPositon: {
        longitude: 123.162626,
        latitude: 41.2669,
      },
      currentPath: [],
      paramsPath: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    async getRange () {
      let res = await getAction(`/business-hall/scope/${this.userId}/2`)
      console.log(res, "res=,");
      if (res && res.polygon) {
        this.resultInfo = res
        this.currentPath = []
        res.polygon.forEach(item => {
          this.currentPath.push(new AMap.LngLat(item.longitude, item.latitude))
        })
      } else {
        this.currentPath = []
      }
      this.initMap()
    },
    initMap () {
      console.log('initmap');
      AMapLoader.load({
        key: "792d45e660dcf9f93adaa33971a46572", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [["AMap.PolygonEditor", "AMap.PlaceSearch"], function () {
        }], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        console.log('then====');
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
    starEdit () {
      this.polyEditor.open()
      this.editShow = !this.editShow
    },
    async stopEdit () {
      this.polyEditor.close()
      let params = {
        "bid": this.resultInfo.bid,
        "polygon": this.paramsPath,
        "type": 2,
      }
      let res = await postAction(`/business-hall/scope`, params)
      if (res == null) {
        this.$message.success('保存成功')
        this.editShow = !this.editShow
      }
    },
  },
  created () {
    this.userId = this.$route.query.userId
    this.getRange(this.$route.query.userId)

  },
  mounted () {
    this.initMap();
  },
}
</script> 

<style scoped >
#container {
  width: 80%;
  height: 600px;
  margin: 50px auto;
  border: 1px solid red;
}
</style>
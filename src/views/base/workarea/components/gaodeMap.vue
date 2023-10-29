<template>
  <div>

  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'gaodeMap',
  props: {},
  components: {},
  data () {
    return {
      currentpositon: {
        longitude: 123.162626,
        latitude: 41.2669,
      },
      map: null, //初始化 map 对象
      polyEditor: null,

    }
  },
  computed: {},
  watch: {},
  methods: {


  },
  created () {
  },
  mounted () {
    this.initMap();
  },
}
</script> 

<style scoped lang="sass">
#container
  width: 80%
  height: 400px
  margin: 100px auto
  border: 1px solid red
</style>
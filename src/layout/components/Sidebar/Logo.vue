<template>
  <div class="sidebar-logo-container">
    <img v-if="logo" :src="logo" class="sidebar-logo">
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template',
      logo: require('@/assets/image/main_logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    width: 100%;
    height: 100%;
  }

}
</style>

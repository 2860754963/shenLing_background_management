import Layout from '@/layout'

export default {
  path: '/car',
  component: Layout,
  meta: {
    title: '车辆管理',
    icon: 'el-icon-s-data'
  },
  children: [{
    path: 'type',
    meta: {
      title: '车型管理'
    },
    component: () => import('@/views/car/type')
  }, {
    path: 'list',
    meta: {
      title: '车辆列表'
    },
    component: () => import('@/views/car/list')
  }, {
    path: 'back',
    meta: {
      title: '回车登记'
    },
    component: () => import('@/views/car/back')
  }]
}

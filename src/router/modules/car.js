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
  },
  {
    path: 'back',
    meta: {
      title: '回车登记'
    },
    component: () => import('@/views/car/back')
  },
  {
    path: 'carDetalis',
    meta: {
      title: '车辆详情'
    },
    component: () => import('@/views/car/list/carDetalis.vue'),
    hidden: true
  },
  {
    path: 'driverDetalis',
    meta: {
      title: '司机详情'
    },
    component: () => import('@/views/car/list/driverDetails.vue'),
    hidden: true
  },
  ],

}

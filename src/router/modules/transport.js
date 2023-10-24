
import Layout from '@/layout'
export default {
  path: '/transport',
  component: Layout,
  meta: {
    title: '调度管理',
    icon: 'el-icon-s-order'
  },
  children: [{
    path: 'task',
    meta: {
      title: '运输任务管理'
    },
    component: () => import('@/views/business/order')
  }, {
    path: 'line',
    meta: {
      title: '线路管理'
    },
    component: () => import('@/views/business/waybill')
  }, {
    path: 'pick',
    meta: {
      title: '取件作业管理'
    },
    component: () => import('@/views/business/waybill')
  }, {
    path: 'dispatch',
    meta: {
      title: '派件作业管理'
    },
    component: () => import('@/views/business/waybill')
  }]
}

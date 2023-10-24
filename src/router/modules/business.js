import Layout from '@/layout'
export default {
  path: '/business',
  component: Layout,
  meta: {
    title: '业务管理',
    icon: 'el-icon-s-opportunity'
  },
  children: [{
    path: 'order',
    meta: {
      title: '订单管理'
    },
    component: () => import('@/views/business/order')
  }, {
    path: 'waybill',
    meta: {
      title: '运单管理'
    },
    component: () => import('@/views/business/waybill')
  }]
}

import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  meta: {
    title: '员工管理',
    icon: 'el-icon-s-check'
  },
  children: [{
    path: 'courier',
    meta: {
      title: '快递员管理'
    },
    component: () => import('@/views/user/courier')
  }, {
    path: 'driver',
    meta: {
      title: '司机管理'
    },
    component: () => import('@/views/user/driver')
  }, {
    path: 'workday',
    meta: {
      title: '排班管理'
    },
    component: () => import('@/views/user/workday')
  }]
}

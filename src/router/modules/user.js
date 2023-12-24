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
  },
  {
    // 作业范围分配
    path: 'workrange',
    meta: {
      title: '作业范围分配'
    },
    component: () => import('@/views/user/courier/workRang.vue'),
    hidden: true

  },

  {
    path: 'driver',
    meta: {
      title: '司机管理'
    },
    component: () => import('@/views/user/driver')
  },
  {
    path: 'workday',
    meta: {
      title: '排班管理'
    },
    component: () => import('@/views/user/workday'),

  },
  {
    path: 'workset',
    meta: {
      title: '排班设置'
    },
    component: () => import('@/views/user/workday/workSet.vue'),
    hidden: true
  }
  ]
}

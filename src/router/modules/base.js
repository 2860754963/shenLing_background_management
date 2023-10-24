import Layout from '@/layout'
export default {
  path: '/base',
  component: Layout,
  meta: {
    title: '基础数据管理',
    icon: 'el-icon-s-help'
  },
  children: [{
    path: 'management',
    meta: {
      title: '机构管理'
    },
    component: () => import('@/views/base/management')
  }, {
    path: 'workarea',
    meta: {
      title: '机构作业范围'
    },
    component: () => import('@/views/base/workarea')
  }, {
    path: 'transit',
    meta: {
      title: '运费管理'
    },
    component: () => import('@/views/base/transit')
  }]
}

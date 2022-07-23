import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    meta: {
      title: '用户管理',
      icon: 'user-line',
      affix: true,
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/sys/user'),
        meta: {
          title: '用户管理',
          icon: 'user-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/customer',
    meta: {
      title: '商户管理',
      icon: 'group-line',
      affix: true,
    },
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/sys/customer'),
        meta: {
          title: '商户管理',
          icon: 'group-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/advice',
    meta: {
      title: '建议管理',
      icon: 'file-text-line',
      affix: true,
    },
    children: [
      {
        path: 'advice',
        name: 'Advice',
        component: () => import('@/views/sys/advice'),
        meta: {
          title: '建议管理',
          icon: 'file-text-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/report',
    meta: {
      title: '举报管理',
      icon: 'phone-line',
      affix: true,
    },
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/sys/report'),
        meta: {
          title: '举报管理',
          icon: 'phone-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/advertisement',
    meta: {
      title: '广告管理',
      icon: 'advertisement-line',
      affix: true,
    },
    children: [
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: () => import('@/views/sys/ad'),
        meta: {
          title: '广告管理',
          icon: 'advertisement-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/word',
    meta: {
      title: '文字管理',
      icon: 'text',
      affix: true,
    },
    children: [
      {
        path: 'word',
        name: 'Word',
        component: () => import('@/views/sys/word'),
        meta: {
          title: '文字管理',
          icon: 'text',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/business',
    meta: {
      title: '业务需求管理',
      icon: 'attachment-line',
      affix: true,
    },
    children: [
      {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/sys/business'),
        meta: {
          title: '业务需求管理',
          icon: 'attachment-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/classify',
    meta: {
      title: '需求类别管理',
      icon: 'stack-line',
      affix: true,
    },
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/sys/classify'),
        meta: {
          title: '需求类别管理',
          icon: 'stack-line',
          affix: true,
        },
      },
    ],
  },
  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: '/vab/table',
  //   alwaysShow: true,
  //   meta: {
  //     title: '组件',
  //     icon: 'apps-line',
  //   },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/vab/table'),
  //       meta: {
  //         title: '表格',
  //         icon: 'table-2',
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       component: () => import('@/views/vab/icon'),
  //       meta: {
  //         title: '图标',
  //         icon: 'remixicon-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test',
  //   meta: {
  //     title: '动态路由测试',
  //     icon: 'test-tube-line',
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test'),
  //       meta: {
  //         title: '动态路由测试',
  //         icon: 'test-tube-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
})

export default router

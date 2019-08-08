import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import components from './modules/demo/components'
import charts from './modules/demo/charts'
import table from './modules/demo/table'
import nested from './modules/demo/nested'
import permission from './modules/demo/permission'
import example from './modules/demo/example'
import { guide, documentation, icon, tab, theme, clipboard, i18n, externalLink } from './modules/demo/common'
import { error, errorLog } from './modules/demo/error'
import { excel, zip, pdf } from './modules/demo/export'

// vue-loader at least v13.0.0+
// module.exports = file => () => import('@/views/' + file + '.vue')
// module.exports = file => require('@/views/' + file + '.vue').default
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/manager',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true, // will always show the root menu
    name: 'Manager',
    meta: {
      title: 'manager',
      icon: 'segmdl2-defender-app',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: { title: 'users', icon: 'user', noCache: true }
      },
      {
        path: 'roles',
        component: () => import('@/views/roles/index'),
        name: 'roles',
        meta: { title: 'roles', icon: 'lock', noCache: true }
      }
    ]
  },
  {
    path: '/hddt',
    ame: 'hddt',
    component: Layout,
    redirect: '/hddt/css',
    meta: { title: 'hddt', icon: 'qr-code', noCache: true },
    children: [
      {
        path: 'css',
        name: 'css',
        component: () => import('@/views/hddt/css'),
        meta: { title: 'hddt_css', icon: 'qr-code', noCache: true }
      },
      {
        path: 'cbg',
        name: 'cbg',
        component: () => import('@/views/hddt/cbg'),
        meta: { title: 'hddt_cbg', icon: 'qr-code', noCache: true }
      },
      {
        path: 'cbgThayThe',
        name: 'cbgThayThe',
        component: () => import('@/views/hddt/cbgThayThe'),
        meta: { title: 'hddt_cbgThayThe', icon: 'qr-code', noCache: true }
      },
      {
        path: 'ezpay',
        name: 'ezpay',
        component: () => import('@/views/hddt/ezpay'),
        meta: { title: 'hddt_ezpay', icon: 'qr-code', noCache: true }
      },
      {
        path: 'old',
        name: 'old',
        component: () => import('@/views/hddt/old'),
        meta: { title: 'hddt_old', icon: 'qr-code', noCache: true }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true, // will always show the root menu
    name: 'template',
    meta: {
      title: 'template',
      icon: 'document',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/template/list'),
        name: 'template-list',
        meta: { title: 'template_list', icon: 'list', noCache: true }
      },
      {
        path: 'add',
        component: () => import('@/views/template/add'),
        name: 'template-add',
        meta: { title: 'template_add', icon: 'add', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  // Demo app
  {
    path: '/demo',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Demo',
    meta: {
      title: 'demo',
      icon: 'guide'
    },
    /** when your routing map is too long, you can split it into small modules **/
    children: [
      guide,
      documentation,
      permission,
      components,
      charts,
      nested,
      table,
      example,
      icon,
      tab,
      error,
      errorLog,
      excel,
      zip,
      pdf,
      theme,
      clipboard,
      i18n,
      externalLink
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// const r = function(router) {
//   const res = []
//   router.forEach(route => {
//     const tmp = { ...route }
//     if (tmp.children) {
//       tmp.children = r(tmp.children)
//     }
//     res.push(tmp)
//   })
//   return res
// }
// const rs = r(asyncRoutes)
// console.log(JSON.stringify(rs))

const createRouter = () => new Router({
  base: process.env.VUE_APP_PUBLIC_PATH,
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

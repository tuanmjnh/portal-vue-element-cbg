import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, checkToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// start progress bar
NProgress.start()

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // if (auth.currentUser) {
  //   const token = await auth.currentUser.getIdToken()
  //   console.log(token)
  // }
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.state.auth.user.roles && store.state.auth.user.roles.length > 0
      // console.log(store.state.auth.user.roles)
      let roles = store.state.auth.roles
      if (roles && roles.length > 0) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')
          // await store.dispatch('auth/getUser')
          // store.state.auth.user.roles = ['admin']
          // console.log(store.state.auth.uid)
          const user = await store.dispatch('auth/getUser', { uid: store.state.auth.uid })
          // store.state.auth.roles = 'admin'
          // const user = { roles: 'admin' }
          roles = store.state.auth.roles
          // roles = store.state.auth.roles
        } catch (err) {
          // remove token and go to login page to re-login
          await store.dispatch('auth/logout')
          // Message.error(error || 'Has Error')
          console.log(err)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
      // Check is added routes
      if (store.state.permission.isAddRoutes) {
        await store.dispatch('permission/isAddRoutes', false)
        store.state.permission.isAddRoutes = false
        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        // const accessRoutes = []
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
        // console.log(to)
        // next({ replace: true })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
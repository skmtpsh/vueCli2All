import { getToken } from '@/utils/token'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login' || to.path === '/loginno') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/loginno') {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

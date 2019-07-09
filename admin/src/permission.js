import { getToken } from '@/utils/token'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(0)
  if (getToken()) {
    if (to.path === '/login' || to.path === '/loginoncheck') {
      next('/')
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/loginoncheck') {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  console.log(1)
  NProgress.done() // finish progress bar
})

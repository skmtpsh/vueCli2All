import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: (resolve) => {
      require(['@/views/repay'], resolve)
    }
  },
  {
    path: '/advance',
    component: (resolve) => {
      require(['@/views/repay/payadvancd'], resolve)
    }
  },
  {
    path: '/apply',
    component: (resolve) => {
      require(['@/views/repay/payapply'], resolve)
    }
  },
  {
    path: '/intro',
    component: (resolve) => {
      require(['@/views/repay/payintro_bl'], resolve)
    }
  },
  {
    path: '/delay_question_yqb',
    component: (resolve) => {
      require(['@/views/proto/delay_question_yqb'], resolve)
    }
  },
  {
    path: '/item',
    component: (resolve) => {
      require(['@/views/repay/payitem'], resolve)
    }
  },
  {
    path: '/proto',
    component: (resolve) => {
      require(['@/views/proto/index'], resolve)
    }
  },
  {
    path: '/down',
    component: (resolve) => {
      require(['@/views/down/index'], resolve)
    }
  },
  {
    path: '/downwx',
    component: (resolve) => {
      require(['@/views/down/downwx'], resolve)
    }
  },
  {
    path: '/downgo',
    component: (resolve) => {
      require(['@/views/down/loading'], resolve)
    }
  },
  {
    path: '/message',
    component: (resolve) => {
      require(['@/views/message/index'], resolve)
    }
  },
  {
    path: '/message/:messid',
    component: (resolve) => {
      require(['@/views/message/detail'], resolve)
    }
  },
  {
    path: '/proto/shortloan',
    component: (resolve) => {
      require(['@/views/proto/shortloan'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  // 普惠协议
  {
    path: '/proto/shortloan-ph',
    component: (resolve) => {
      require(['@/views/proto/shortloan-ph'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
   // 小贷钱包用户注册协议
  {
    path: '/proto/register_secret_xdqb',
    component: (resolve) => {
      require(['@/views/proto/register_secret_xdqb'], resolve)
    },
    meta: {
      title: '小贷钱包用户注册协议'
    }
  },
   // 小袋钱包借款协议
  {
    path: '/proto/borrow_xdqb',
    component: (resolve) => {
      require(['@/views/proto/borrow_xdqb'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
   // 展期协议
  {
    path: '/proto/extend_xdqb',
    component: (resolve) => {
      require(['@/views/proto/extend_xdqb'], resolve)
    },
    meta: {
      title: '展期协议'
    }
  },
   // 增值服务协议
  {
    path: '/proto/increase_xdqb',
    component: (resolve) => {
      require(['@/views/proto/increase_xdqb'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/huirongdai',
    component: (resolve) => {
      require(['@/views/proto/huirongdai'], resolve)
    }
  },
  {
    path: '/proto/limayouqian',
    component: (resolve) => {
      require(['@/views/proto/limayouqian'], resolve)
    }
  },
  {
    path: '/proto/daichaoScre',
    component: (resolve) => {
      require(['@/views/proto/daichaoScre'], resolve)
    }
  },
  {
    path: '/proto/exhibit',
    component: (resolve) => {
      require(['@/views/proto/exhibit'], resolve)
    }
  },
  {
    path: '/merge',
    component: (resolve) => {
      require(['@/views/merge/index'], resolve)
    },
    meta: {
      title: '生活无忧PLUS卡'
    }
  },
  {
    path: '/proto/increaseSer',
    component: (resolve) => {
      require(['@/views/proto/increaseSer'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/yqb/brokerage_service_agreement_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/brokerage_service_agreement_ios'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/yqb/brokerage_service_agreement_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/brokerage_service_agreement_android'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/yqb/cash_service_agreement_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/cash_service_agreement_ios'], resolve)
    },
    meta: {
      title: '现金分期服务居间协议'
    }
  },
  {
    path: '/proto/yqb/cash_service_agreement_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/cash_service_agreement_android'], resolve)
    },
    meta: {
      title: '现金分期服务居间协议'
    }
  },
  {
    path: '/proto/yqb/delay_protocal_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/delay_protocal_ios'], resolve)
    },
    meta: {
      title: '展期协议'
    }
  },
  {
    path: '/proto/yqb/delay_protocal_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/delay_protocal_android'], resolve)
    },
    meta: {
      title: '展期协议'
    }
  },
  {
    path: '/proto/yqb/installment_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/installment_ios'], resolve)
    },
    meta: {
      title: '商品分期服务居间协议'
    }
  },
  {
    path: '/proto/yqb/installment_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/installment_android'], resolve)
    },
    meta: {
      title: '商品分期服务居间协议'
    }
  },
  {
    path: '/proto/yqb/receipt_service_agreement_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/receipt_service_agreement_android'], resolve)
    },
    meta: {
      title: '客户收货确认书'
    }
  },
  {
    path: '/proto/yqb/receipt_service_agreement_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/receipt_service_agreement_ios'], resolve)
    },
    meta: {
      title: '客户收货确认书'
    }
  },
  {
    path: '/proto/yqb/short_incre_ser_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/short_incre_ser_ios'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/yqb/short_incre_ser_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/short_incre_ser_android'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/yqb/short_service_agreement_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/short_service_agreement_ios'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/yqb/short_service_agreement_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/short_service_agreement_android'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/yqb/telecom',
    component: (resolve) => {
      require(['@/views/proto/yqb/telecom'], resolve)
    },
    meta: {
      title: '手机运营商协议'
    }
  },
  // 新协议9条贷超
  {
    path: '/proto/borrow_bl',
    component: (resolve) => {
      require(['@/views/proto/borrow_bl'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/increase_bl',
    component: (resolve) => {
      require(['@/views/proto/increase_bl'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/register_secret_bl',
    component: (resolve) => {
      require(['@/views/proto/register_secret_bl'], resolve)
    },
    meta: {
      title: '用户注册与隐私保护协议'
    }
  },
  {
    path: '/proto/register_secret_ph',
    component: (resolve) => {
      require(['@/views/proto/register_secret_ph'], resolve)
    },
    meta: {
      title: '用户注册与隐私保护协议'
    }
  },
  {
    path: '/proto/borrow_yqb',
    component: (resolve) => {
      require(['@/views/proto/borrow_yqb'], resolve)
    },
    meta: {
      title: '借款协议'
    }
  },
  {
    path: '/proto/increase_yqb',
    component: (resolve) => {
      require(['@/views/proto/increase_yqb'], resolve)
    },
    meta: {
      title: '增值服务协议'
    }
  },
  {
    path: '/proto/register_secret_yqb',
    component: (resolve) => {
      require(['@/views/proto/register_secret_yqb'], resolve)
    },
    meta: {
      title: '用户注册与隐私保护协议'
    }
  },
  {
    path: '/proto/credit_search_dc',
    component: (resolve) => {
      require(['@/views/proto/credit_search_dc'], resolve)
    },
    meta: {
      title: '个人信用报告查询授权书'
    }
  },
  {
    path: '/proto/credit_service_dc',
    component: (resolve) => {
      require(['@/views/proto/credit_service_dc'], resolve)
    },
    meta: {
      title: '个人信用报告查询服务协议'
    }
  },
  {
    path: '/proto/register_secret_dc',
    component: (resolve) => {
      require(['@/views/proto/register_secret_dc'], resolve)
    },
    meta: {
      title: '用户注册协议'
    }
  },
  // 新协议9条结束
  {
    path: '/yqb/problem/about_borrow',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_borrow'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_credit_amount',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_credit_amount'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_fee',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_fee'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_loan',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_loan'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_repay',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_repay'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_us',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_us'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/about_us_ios',
    component: (resolve) => {
      require(['@/views/yqb/problem/about_us_ios'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/yqb/problem/account_privacy',
    component: (resolve) => {
      require(['@/views/yqb/problem/account_privacy'], resolve)
    },
    meta: {
      title: '常见问题'
    }
  },
  {
    path: '/proto/yqb/delegate_withhold_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/delegate_withhold_android'], resolve)
    },
    meta: {
      title: '翼钱包委托收款协议'
    }
  },
  {
    path: '/proto/yqb/delegate_withhold_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/delegate_withhold_ios'], resolve)
    },
    meta: {
      title: '翼钱包委托收款协议'
    }
  },
  {
    path: '/proto/yqb/privacy_agreement_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/privacy_agreement_android'], resolve)
    },
    meta: {
      title: '“翼钱包”服务与隐私协议'
    }
  },
  {
    path: '/proto/yqb/privacy_agreement_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/privacy_agreement_ios'], resolve)
    },
    meta: {
      title: '“翼钱包”服务与隐私协议'
    }
  },
  {
    path: '/proto/yqb/disclaimer_android',
    component: (resolve) => {
      require(['@/views/proto/yqb/disclaimer_android'], resolve)
    },
    meta: {
      title: '翼钱包免责声明'
    }
  },
  {
    path: '/proto/yqb/disclaimer_ios',
    component: (resolve) => {
      require(['@/views/proto/yqb/disclaimer_ios'], resolve)
    },
    meta: {
      title: '翼钱包免责声明'
    }
  }
]
export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // base: '/fe-risk',
  base: __dirname,
  routes
})

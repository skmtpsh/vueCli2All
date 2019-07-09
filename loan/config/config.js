const devConfig = {
  // 开发环境后端服务路径
  BASE_API: '"http://admin.market.yipurse.cn/admin/market/"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.cn/start/index.html#/user/login"',
}
const testConfig = {
  // 测试环境后端服务路径
  BASE_API: '"http://admin.market.yipurse.cn/admin/market/"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.cn/start/index.html#/user/login"',
}
const proConfig = {
  // 正式环境后端服务路径
  BASE_API: '"http://admin.market.yipurse.com/admin/market"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.com/start/index.html#/user/login"',
}
module.exports = {
  devConfig,
  proConfig,
  testConfig
}

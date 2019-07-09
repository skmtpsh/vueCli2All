const devConfig = {
  // 开发环境后端服务路径
  BASE_API: '"http://report.into.yipurse.cn/into/report"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.cn/start/index.html#/user/login"',
  FE_RISK_URL: '"http://fe.risk.yipurse.cn/#/credit"',
}
const testConfig = {
  // 测试环境后端服务路径
  BASE_API: '"http://report.into.yipurse.cn/into/report"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.cn/start/index.html#/user/login"',
  FE_RISK_URL: '"http://fe.risk.yipurse.cn/#/credit"',
}
const proConfig = {
  // 正式环境后端服务路径
  BASE_API: '"http://report.into.yipurse.com/into/report"',
  LOGIN_OUT_RUL: '"http://sso.dun.yipurse.com/start/index.html#/user/login"',
  FE_RISK_URL: '"http://fe.risk.yipurse.com/#/credit"',
}
module.exports = {
  devConfig,
  proConfig,
  testConfig
}

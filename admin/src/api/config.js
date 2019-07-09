const devConfig = {
  // 开发环境后端服务路径
  BASE_API: 'http://report.risk.yipurse.com/report/'
}

const proConfig = {
  // 正式环境后端服务路径
  BASE_API: 'http://report.risk.yipurse.com/report/'
}

// let buildConfig
// // 正式环境后端服务路径
// if (process.env.env_config === 'prod') {
//   buildConfig = {
//     BASE_API: 'http://report.risk.yipurse.com/report/'
//   }
// }
// // 测试环境后端服务路径
// if (process.env.env_config === 'test') {
//   buildConfig = {
//     BASE_API: 'http://report.risk.yipurse.cn/report/'
//   }
// }
let currentConfig = process.env.NODE_ENV === 'development' ? devConfig : proConfig
export default currentConfig

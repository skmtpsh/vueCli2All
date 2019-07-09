const devConfig = {
  // 开发环境后端服务路径
  BASE_API: 'http://report.risk.yipurse.com/report/'
}

const proConfig = {
  // 正式环境后端服务路径
  BASE_API: 'http://report.risk.yipurse.com/report/'
}

let currentConfig = process.env.NODE_ENV === 'development' ? devConfig : proConfig
export default currentConfig

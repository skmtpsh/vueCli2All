const routesList = [
  { path: 'status', title: '', compath: 'index', children: false },
  { path: 'baseinfo', title: '基本信息', compath: 'baseinfo/index', children: false },
  { path: 'upload', title: '证件照片', compath: 'upload/index', children: false },
  { path: 'emergency', title: '紧急联系人', compath: 'emergency/index', children: false },
  { path: 'identify', title: '实名认证', compath: 'identify/index', children: false },
  { path: 'identify/setPhoto', title: '身份证验证', compath: 'identify/setPhoto', children: true },
  { path: 'identify/user/:user/card/:card', title: '实名认证', compath: 'identify/index', children: false },
  { path: 'product/productList', title: '官网产品详情页', compath: 'product/productList', children: false },
  { path: 'product/productDetail', title: '平台详情', compath: 'product/productDetail', children: false },
  { path: 'credit/start', title: '征信-检查数据中...', compath: 'credit/start', children: false },
  { path: 'credit/check', title: '征信-检查项目', name: 'check', compath: 'credit/check', children: false },
  { path: 'credit/login', title: '征信-登录', name: 'login', compath: 'credit/login', children: false },
  { path: 'credit/loading', title: '征信-检查中', compath: 'credit/loading', children: false },
  { path: 'credit/report', title: '征信-个人信用报告', compath: 'credit/report', children: false },
  { path: 'product/productUage', title: '借款详情页', compath: 'product/productUage', children: false },
  { path: 'message', title: '消息中心', compath: 'message/index', children: false },
  { path: 'message/:messid', title: '消息中心详情', compath: 'message/detail', children: false },
  { path: 'proto', title: '协议中心', name: 'proto', compath: 'proto/index', children: false }
]
export const routePath = 'authentication'
export default {
  routesList,
  routePath
}

/**
 * 获取第一个字符的英文
 */
export const getFirstChar = (cc) => {
}
export const exportExcel = (data) => {
  var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
  var url = window.URL.createObjectURL(blob)
  var aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', `导出数据.xlsx`)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}
const defaultKey = '1234567898765432'
// 加密
const CryptoJS = window.CryptoJS
export const setCrypto = (word, keyStr = defaultKey) => {
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString()
}
// 解密
// console.log(escape(setCrypto('欢迎登录')))
export const getCrypto = (word, keyStr = defaultKey) => {
  // let key = CryptoJS.enc.Utf8.parse(keyStr)
  // let decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  // // console.log(CryptoJS.enc.Utf8.stringify(decrypt).toString())
  // return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
// console.log(getCrypto('w8m31Yy/Nw6thPsMpO5fg=='))
export default {
  getFirstChar,
  exportExcel,
  getCrypto,
  setCrypto
}

import moment from 'moment'

const FilterTime = (value, format = 'YYYY-MM-DD HH:mm') => {
  let momentObj = moment(value)
  if (value && momentObj['_isValid']) {
    return momentObj.format(format)
  }
  return value
}
export const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号码不能空'))
  } else {
    if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|7[0135678]|18[0-9])\d{8}$/.test(value)) {
      callback(new Error('手机号码格式错误'))
    }
    callback()
  }
}
export const validateMail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  } else {
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
      callback(new Error('邮箱格式格式错误'))
    }
    callback()
  }
}
export const validateOnlyNumber = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('QQ号不能为空'))
  } else {
    if (!/^[0-9]*$/.test(value)) {
      callback(new Error('只能输入数字'))
    }
    callback()
  }
}
export const validateNumberPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('电话号不能为空'))
  } else {
    if (!/^[0-9]*$/.test(value)) {
      callback(new Error('只能输入数字'))
    }
    callback()
  }
}
export const validateText = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('此处为必填项'))
  } else {
    if (!/^[\u4E00-\u9FA5]{1,7}$/.test(value)) {
      callback(new Error('只能输入中文，25个字符以内'))
    }
    callback()
  }
}
export const validateRealName = (rule, value, callback) => { // 真实姓名
  if (value === '') {
    callback(new Error('请输入联系人姓名'))
  } else {
    if (!/^[\u4E00-\u9FA5]{1,7}$/.test(value)) {
      callback(new Error('只能输入中文，7个字符以内'))
    }
    callback()
  }
}
export default {
  FilterTime
}

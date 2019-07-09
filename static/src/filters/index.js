import moment from 'moment'

export const FilterTime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  let momentObj = moment(value)
  if (value && momentObj['_isValid']) {
    return momentObj.format(format)
  }
  return value
}

export default {
  FilterTime
}

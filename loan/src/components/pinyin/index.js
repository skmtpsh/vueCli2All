import { pinyin } from './source'
export default {
  cnToPinYin: function (cn) {
    var cnLen = cn.length
    var letter = ''
    var reg = new RegExp('[a-zA-Z0-9]')
    for (var i = 0; i < cnLen; i++) {
      var val = cn.substr(i, 1)
      var name = this.arraySearch(val)
      if (reg.test(val)) {
        letter += val
      } else if (name !== false) {
        letter += name
      }
    }
    letter = letter.replace(/ /g, '-')
    while (letter.indexOf('--') > 0) {
      letter = letter.replace('--', '-')
    }
    // return this.subStrFirst(letter)
    return letter
  },
  arraySearch: function (key) {
    for (var name in pinyin) {
      if (pinyin[name].indexOf(key) !== -1) {
        return this.UpperFirst(name)
      }
    }
    return false
  },
  UpperFirst: function (key) {
    if (key.length > 0) {
      var first = key.substr(0, 1).toUpperCase()
      var spare = key.substr(1, key.length)
      return first + spare
    }
  },
  subStrFirst: function (key) {
    if (key.length > 0) {
      var first = key.substr(0, 1).toUpperCase()
      return first
    }
  }
}

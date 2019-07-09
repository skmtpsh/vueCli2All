const Mock = require('mockjs')
var template = {
}
Mock.mock('/laopang/mock/repay', /post|get/i, template)

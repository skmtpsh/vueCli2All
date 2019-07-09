const Mock = require('mockjs')
var template = {
  'code': '0',
  'data': {
    'remainTotal': '100.00', // 总剩余
    'remainTotalShort': '100.00', // 短贷剩余应还款
    'remainTotalTerm': '0.00', // 分期剩余应还款
    'repayList': [
      {
        'extensionState': '1', // 是否可以展期
        'loanApplyId': 139195, // 借款申请Id
        'loanType': 1, // 借款类型
        'orderNo': 'CS201810181406961619', // 订单号
        'overdue': 0, // 逾期天数
        'overdueFine': '0.00', // 逾期费用
        'phase': 1, // 当前期数(例如 ： 第2期)
        'playDate': '2018/10/25', // 还款日
        'principalInterest': '700.00', // 本息合计
        'realRepayMoney': '500.00', // 实际还款金额
        'remainAmount': '200.00', // 剩余应还金额
        'remainDays': 1, // 距离还款天数
        'repayId': 80892, // 还款计划ID
        'repayTotal': '700.00', // 应还合计
        'term': '1/1', // 当前期数/期限
        'terms': 1 // 期限 （例： 共 12期）
      },
      {
        'extensionState': '1',
        'loanApplyId': 139196,
        'loanType': 1,
        'orderNo': 'CS201810181406960353',
        'overdue': 0,
        'overdueFine': '0.00',
        'phase': 1,
        'playDate': '2018/10/25',
        'principalInterest': '700.00',
        'realRepayMoney': '500.00',
        'remainAmount': '200.00',
        'remainDays': 1,
        'repayId': 80893,
        'repayTotal': '700.00',
        'term': '1/1',
        'terms': 1
      },
      {
        'extensionState': '1',
        'loanApplyId': 139194,
        'loanType': 1,
        'orderNo': 'CS201810181406964675',
        'overdue': 0,
        'overdueFine': '0.00',
        'phase': 1,
        'playDate': '2018/10/25',
        'principalInterest': '700.00',
        'realRepayMoney': '500.00',
        'remainAmount': '-300.00',
        'remainDays': 1,
        'repayId': 80891,
        'repayTotal': '200.00',
        'term': '1/1',
        'terms': 1
      }
    ]
  },
  'msg': '查询还款列表信息成功'
}
Mock.mock('/laopang/mock/repay', /post|get/i, template)

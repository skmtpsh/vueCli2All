import request from '@/utils/request'
import commonQuery from '@/utils/commonQuery'
import { getToken } from '@/utils/token'
const TOKEN = getToken()
// console.log(JSON.parse(window.localStorage.vuex).web.info.staffCode)
let user = window.localStorage.vuex ? JSON.parse(window.localStorage.vuex).web.info.staffCode : ''
const pageQuery = () => {
  return Object.assign({}, {tokenKey: TOKEN, username: window.localStorage ? user : 'uname'}, commonQuery())
  // return Object.assign({}, commonQuery())
}
const ruleApi = {
  /**
   * 规则一二级(查询)
   * @param {} param0
   */
  RULESLIST ({
    ruleAppName = '', // 一级用
    ruleName = '' // 二级用
  }) {
    return request({
      url: 'ruleset/selectall',
      method: 'post',
      data: Object.assign({
        ruleAppName,
        ruleName
      }, pageQuery())
    })
  },
  /**
   * 规则二级(查询)
   * @param {} param0
   */
  RULESLISTLEVEL2 ({
    id = ''
  }) {
    return request({
      url: 'ruleset/selectrules',
      method: 'post',
      data: Object.assign({
        id
      }, pageQuery())
    })
  },
  /**
   * 规则三四级(查询)
   * @param {} param0
   */
  RULESLISTDETAIL ({
    id = '',
    formulaName = ''
  }) {
    return request({
      url: 'ruleset/selectdetail',
      method: 'post',
      data: Object.assign({
        id,
        formulaName
      }, pageQuery())
    })
  },
  /**
   * appId下拉接口(弹框-添加修改策略集1级)
   * @param {*} param0
   */
  RULESAPPIDOPTION ({
    appName = '',
    appId = ''
  }) {
    return request({
      url: 'info/applist',
      method: 'post',
      data: Object.assign(appName ? {
        appName
      } : {
        appId
      }, pageQuery())
    })
  },
  /**
   * ruleId下拉接口(弹框-添加修改策略2级)
   * @param {*} param0
   */
  RULESIDOPTION ({
    ruleId = '',
    businessName = ''
  }) {
    return request({
      url: 'info/rulelist',
      method: 'post',
      data: Object.assign({
        ruleId,
        businessName
      }, pageQuery())
    })
  },
  /**
  * 规则条件添加 4级
  * @param {} param0
  */
  RULESOPTION ({
    paramName = ''
  }) {
    return request({
      url: 'ruleset/selectparams',
      method: 'post',
      data: Object.assign({
        paramName
      }, pageQuery())
    })
  },
  /**
   * 三级规则下拉列表选择
   * @param {*} param0
   */
  RULESADDLISTS ({
    formulaName = ''
  }) {
    return request({
      url: 'ruleset/selectmains',
      method: 'post',
      data: Object.assign({
        formulaName
      }, pageQuery())
    })
  },
  /**
   * 规则一级修改添加
   * @param {} param0
   */
  RULESADDMODLEVEL ({
    id = '',
    appId = '',
    ruleStatus = '',
    ruleResult = '',
    ruleAppName = '',
    ruleItem = '',
    versionNum = '',
    ruleDelete = '1'
  }) {
    return request({
      url: 'ruleset/insertorupdatetotal',
      method: 'post',
      data: Object.assign({
        id,
        appId,
        ruleStatus,
        ruleResult,
        ruleAppName,
        ruleItem,
        versionNum,
        ruleDelete
      }, pageQuery())
    })
  },
  /**
   * 规则二级修改添加
   * @param {} param0
   */
  RULESADDMOD ({
    id = '',
    appId = '',
    ruleId = '',
    ruleName = '',
    rulePurpose = '',
    ruleResult = '',
    versionNum = '',
    allStatus = '',
    formulaPrex = '',
    allDelete = '1'
  }) {
    return request({
      url: 'ruleset/insertorupdate',
      method: 'post',
      data: Object.assign({
        id,
        appId,
        ruleId,
        ruleName,
        rulePurpose,
        ruleResult,
        formulaPrex,
        versionNum,
        allStatus,
        allDelete
      }, pageQuery())
    })
  },
  /**
   * 规则三级修改添加 ruleFormulaList为添加
   * @param {} param0
   */
  RULESADDMODTHREE ({
    id = '',
    appId = '',
    ruleId = '',
    versionNum = '',
    ruleFormulaList = []
  }) {
    return request({
      url: 'ruleset/insertorupdateformula',
      method: 'post',
      data: Object.assign({
        id,
        appId,
        ruleId,
        versionNum,
        ruleFormulaList
      }, pageQuery())
    })
  },
  /**
   * 规则四级修改添加
   * @param {} param0
   */
  RULESADDMODFOUR ({
    id = '',
    formulaId = '',
    logicSymbol = '',
    ruleParamsList = ''
  }) {
    return request({
      url: 'ruleset/insertorupdateparam',
      method: 'post',
      data: Object.assign({
        id,
        formulaId,
        logicSymbol,
        ruleParamsList
      }, pageQuery())
    })
  },
  /**
   * 新规则 弹框
   * @param {} param0
   */
  RULES_SELECT_NEW () {
    return request({
      url: 'ruleset/selectruleinfo',
      method: 'post',
      data: Object.assign({
      }, pageQuery())
    })
  },
  /**
   * 新规则 弹框
   * @param {} param0
   */
  RULES_THREERULES_NEW ({
    formulaName = '',
    dicCode = '',
    pageNum = '',
    pageSize = ''
  }) {
    return request({
      url: 'ruleset/selectruleinfodetail',
      method: 'post',
      data: Object.assign({
        formulaName,
        dicCode,
        pageNum,
        pageSize
      }, pageQuery())
    })
  },
  /**
   * 新规则 弹框
   * @param {} param0
   */
  RULES_ADDRULES_NEW ({
    id = '',
    ruleFormulaList = [],
    // 新添加
    appId = '',
    ruleId = '',
    rulePurpose = '',
    versionNum = ''
  }) {
    return request({
      url: 'ruleset/addorupdateformula',
      method: 'post',
      data: Object.assign({
        id,
        ruleFormulaList,

        // 新添加
        appId,
        ruleId,
        rulePurpose,
        versionNum
      }, pageQuery())
    })
  },
  /**
   * 新规则 修改规则
   * @param {} param0
   */
  RULES_MODRULES_NEW ({
    id = '',
    formulaId = '',
    formulaName = '',
    failureTime = '',
    logicSymbol = '',
    sort = '',
    status = '',
    isdelete = 1,
    mobileWhiteList = ''
  }) {
    return request({
      url: 'ruleset/addorupdateformula',
      method: 'post',
      data: Object.assign({
        id,
        formulaId,
        formulaName,
        failureTime,
        logicSymbol,
        sort,
        status,
        isdelete,
        mobileWhiteList
      }, pageQuery())
    })
  },
  /**
   * 新规则 四级
   * @param {} param0
   */
  RULES_ADDPARAM_NEW ({
    id = '',
    formulaId = '',
    appId = '',
    ruleId = '',
    versionNum = '',
    logicSymbol = '',
    rulePurpose = '',
    failureTime = '',
    ruleParamsList = ''
  }) {
    return request({
      url: 'ruleset/addorupdateparam',
      method: 'post',
      data: Object.assign({
        id,
        formulaId,
        appId,
        ruleId,
        versionNum,
        logicSymbol,
        rulePurpose,
        failureTime,
        ruleParamsList
      }, pageQuery())
    })
  },
  /**
   * 新规则
   * @param {} param0
   */
  RULES_SELPARAM_NEW ({
    paramName = ''
  }) {
    return request({
      url: 'ruleset/selectparamdown',
      method: 'post',
      data: Object.assign({
        paramName
      }, pageQuery())
    })
  }
}
export default ruleApi

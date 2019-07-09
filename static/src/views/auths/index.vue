<template>
  <div>
    <div class="filterBox">
      <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
        <el-row>
          <el-col :span="24" >
            <el-form-item label="进件来源：" prop="appId">
              <el-select
                style="width:100%"
                v-model="form.appId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入进件来源"
                :loading="selLoading"
                @change='handleChangeOption'>
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in options"
                  :key="item.sn"
                  :label="item.name"
                  :value="item.sn">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名：" prop="userName">
              <el-input v-model="form.userName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
              <el-input v-model="form.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="form.idCard" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="进件时间：" prop="date">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="二要素状态：" prop="twoElements">
              <el-select placeholder="请选择二要素" v-model="form.twoElements">
                <el-option label="全部" value=""></el-option>
                <el-option label="匹配" value="20"></el-option>
                <el-option label="未匹配" value="10"></el-option>
                <el-option label="不匹配" value="30"></el-option>
                <!--匹配20 不匹配30 未匹配10-->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
              <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
              <el-button type="success" icon="el-icon-upload2" @click.native='onExport'>导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
            <el-form-item label="表格显示：">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedTds" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="td in tds" :label="td.value" :key="td.labels">{{td.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" style="width:580px; float: right  ">
            <el-alert
              class="resetalert"
              title="状态图标说明："
              type="info"
              :closable="false">
                <span class="txtrz success"><svg-icon icon-class="round_check_fill" /> 认证完成 </span>
                <span class="txtrz danger"><svg-icon icon-class="round_close_fill" /> 认证失败 </span>
                <span class="txtrz blue"><svg-icon icon-class="question_fill" /> 未认证 </span>
                <span class="txtrz warning"><svg-icon icon-class="time_fill" /> 认证中 </span>
                <span class="txtrz info"><svg-icon icon-class="warn_fill" /> 已失效 </span>
                <span class="txtrz danger"><svg-icon icon-class="flashbuy_fill" /> 驳回 </span>
            </el-alert>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- max-height="1000" border-->
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="loading"
      :data="tableData" >
      <el-table-column
        fixed="left"
        label="进件来源"
        width="180"
        prop="appName">
      </el-table-column>
      <el-table-column
        fixed="left"
        width="120"
        label="姓名"
        prop="realName">
      </el-table-column>
      <el-table-column
        fixed="left"
        label="手机号"
        width="120"
        prop="mobile">
      </el-table-column>
      <el-table-column
        fixed="left"
        label="身份证号"
        width="180"
        prop="idNumber">
      </el-table-column>
      <el-table-column
        width="110"
        label="身份认证来源"
        prop="identityType">
        <template slot-scope="props">
          <!-- <rzIcon :rzState="props.row.identityType"></rzIcon> -->
          {{props.row.identityType}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusIdentity') > -1"
        label="身份认证"
        width="120"
        align="center"
        prop="statusIdentity">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusIdentity"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusLiveness') > -1"
        label="活体认证"
        width="120"
        align="center"
        prop="statusLiveness">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusLiveness"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        label="基本信息认证"
        v-if="checkedTds.indexOf('statusBasic') > -1"
        width="120"
        align="center"
        prop="statusBasic">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusBasic"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusContacts') > -1"
        label="紧急联系人认证"
        width="130"
        align="center"
        prop="statusContacts">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusContacts"></rzIcon>
        </template>
      </el-table-column>
      <!-- v-if="checkedTds.indexOf('运营商认证') > -1" -->
      <el-table-column
        v-if="checkedTds.indexOf('statusTelecomOperator') > -1"
        label="运营商认证"
        width="120"
        align="center"
        prop="statusTelecomOperator">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusTelecomOperator"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusZhima') > -1"
        label="芝麻信用"
        width="120"
        align="center"
        prop="statusZhima">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusZhima"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusTaobao') > -1"
        label="淘宝认证"
        width="120"
        align="center"
        prop="statusTaobao">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusTaobao"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusChsi') > -1"
        label="学信网认证"
        width="120"
        align="center"
        prop="statusChsi">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusChsi"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusInsure') > -1"
        label="社保认证"
        width="120"
        align="center"
        prop="statusInsure">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusInsure"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusBasicOther') > -1"
        label="证件照片认证"
        width="120"
        align="center"
        prop="statusBasicOther">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusBasicOther"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        v-if="checkedTds.indexOf('statusCertification') > -1"
        label="实名认证"
        width="120"
        align="center"
        prop="statusCertification">
        <template slot-scope="props">
          <rzIcon :rzState="props.row.statusCertification"></rzIcon>
        </template>
      </el-table-column>
      <el-table-column
        label="二要素"
        width="120"
        align="center"
        prop="twoElements">
        <template slot-scope="props">
          {{
            props.row.twoElements === 20 ? '匹配' : props.row.twoElements === 30 ? '不匹配' : props.row.twoElements === 10 ? '未匹配' : ''
          }}
          <!--匹配20 不匹配30 未匹配10-->
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        label="进件时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <!-- 空列延伸 -->
      <el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.realName && scope.row.riskMobile && scope.row.riskIdNumber" @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>查看报告</el-button>
          <!-- <el-button size="small"  icon="el-icon-edit" type="warning" plain>编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
  </div>
</template>
<script>
import moment from 'moment'
import staticApi from '@/api/list'
import signObj from '@/utils/signSystem'
import {exportExcel} from '@/utils/common'
import { mapGetters } from 'vuex'
const tdOptions = [
  {label: '身份认证', value: 'statusIdentity'},
  {label: '活体认证', value: 'statusLiveness'},
  {label: '基本信息认证', value: 'statusBasic'},
  {label: '紧急联系人认证', value: 'statusContacts'},
  {label: '运营商认证', value: 'statusTelecomOperator'},
  {label: '实名认证', value: 'statusCertification'},
  {label: '芝麻信用', value: 'statusZhima'},
  {label: '淘宝认证', value: 'statusTaobao'},
  {label: '学信网认证', value: 'statusChsi'},
  {label: '社保认证', value: 'statusInsure'},
  {label: '证件照片认证', value: 'statusBasicOther'}
]
let rzIcon = {
  // 10:'未认证' 11:'认证中' 12:'已失效' 20:'认证完成' 21:'驳回' 30: '拒绝'
  render: function (h) {
    let strStatus
    switch (this.rzState) {
      case 10:
        strStatus = <el-tooltip content="未认证" placement="top" effect="light"><svg-icon class="iconrz blue" icon-class="question_fill" /></el-tooltip>
        break
      case 11:
        strStatus = <el-tooltip content="认证中" placement="top" effect="light"><svg-icon class="iconrz warning" icon-class="time_fill" /></el-tooltip>
        break
      case 12:
        strStatus = <el-tooltip content="已失效" placement="top" effect="light"><svg-icon class="iconrz info" icon-class="warn_fill" /></el-tooltip>
        break
      case 20:
        strStatus = <el-tooltip content="认证完成" placement="top" effect="light"><svg-icon class="iconrz success" icon-class="round_check_fill" /></el-tooltip>
        break
      case 21:
        strStatus = <el-tooltip content="驳回" placement="top" effect="light"><svg-icon class="iconrz danger" icon-class="flashbuy_fill" /></el-tooltip>
        break
      case 30:
        strStatus = <el-tooltip content="认证失败" placement="top" effect="light"><svg-icon class="iconrz danger" icon-class="round_close_fill" /></el-tooltip>
        break
      default:
        break
    }
    return (
      <span>
        {strStatus}
      </span>
    )
  },
  props: ['rzState', 'prop']
}
export default {
  components: {
    rzIcon
  },
  data () {
    return {
      // 下拉框loading
      selLoading: false,
      options: [],
      form: {
        appId: 'yipurse123456789',
        userName: '',
        mobile: '',
        idCard: '',
        date: [moment().subtract(2, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        twoElements: ''
      },
      pageSize: 10,
      pageNum: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      checkAll: false,
      checkedTds: ['statusIdentity', 'statusLiveness', 'statusBasic', 'statusContacts', 'statusTelecomOperator', 'statusCertification'],
      tds: tdOptions,
      isIndeterminate: true
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedTds = val ? tdOptions.map(item => item.value) : []
      this.isIndeterminate = false
      this.handleTableTd()
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.tds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tds.length
      this.handleTableTd()
    },
    handleTableTd () {
      // let baseTable = {
      //   appId: '',
      //   createTime: '',
      //   idNumber: '',
      //   identityType: '',
      //   mobile: '',
      //   realName: '',
      //   statusBasic: 10,
      //   twoElements: ''
      // }
      this.tableData.forEach(item => {
        // item = Object.assign()
        // Object.keys(item)
      })
    },
    // 查看风控报告
    handleClick (row) {
      // console.log(row.appId)
      // console.log(signObj(row.appId).signSystem)
      let url = `${process.env.FE_RISK_URL}?appId=${row.appId}&timestamp=${moment().format('YYYYMMDDHHmmss')}&name=${row.realName}&mobile=${row.riskMobile}&idCard=${row.riskIdNumber}&signSystem=${signObj(row.appId).signSystem}&staffCode=${this.info.staffCode}`
      window.open(url)
    },
    // 获得参数
    getParam () {
      return {
        startTime: this.form.date ? this.form.date[0] : '',
        endTime: this.form.date ? this.form.date[1] : '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
    },
    // 查询
    onSearch () {
      this.getList(Object.assign(this.form))
    },
    // 重置
    onReset () {
      this.$refs['form'].resetFields()
    },
    // 导出
    onExport () {
      if (this.tableData.length === 0) {
        this.$message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      staticApi['STATICEXPORT'](Object.assign(
        this.form,
        this.getParam()
      )).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getList(Object.assign(this.form))
    },
    // 修改信息
    editRule (row) {
    },
    // 删除
    delRule (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
      // this.upDateRule(row, {isdelete: '2'})
    },
    // 下拉框
    handleChangeOption (val) {
    },
    getOption () {
      // if (query !== '') {
      staticApi['APPID_LIST'](Object.assign(
        this.getParam()
      )).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.options = result.data.productName
          // 下拉框渲染之后再调用List
          this.onSearch()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getList (option = {}) {
      this.loading = true
      staticApi['STATICLIST'](Object.assign(
        option,
        this.getParam()
      )).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.loading = false
          this.tableData = result.data
          this.tableTotal = result.count
          // console.log(this.tableData)
        } else {
          this.loading = false
          this.$message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    // this.getList()
    this.getOption()
  }
}
</script>

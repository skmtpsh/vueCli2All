<template>
<div>
  <el-row style="margin-bottom: 20px;">
    <el-col :span="24">
      <div class="tip">
        <span style="margin: 10px">策略名称：<el-tag>{{rowCurShow.ruleName}}</el-tag></span>
        <span style="margin: 10px">规则用途：<el-tag>{{rowCurShow.rulePurpose === 'prod' ? '正式' : '预备-空跑'}}</el-tag></span>
        <span style="margin: 10px">规则决策结果：<el-tag>{{rowCurShow.ruleResult === 'pass' ? '通过' : '拒绝'}}</el-tag></span>
      </div>
    </el-col>
  </el-row>

  <el-form :inline="true" :model="formInline" ref="formInline" class="text-right">
    <el-button type="primary" icon="el-icon-plus" @click.native="dialogVisible = true">添加规则</el-button>
    <el-form-item prop="searchtxt">
      <el-input placeholder="请输入内容" v-model="formInline.searchtxt" class="input-with-select" @keyup.enter.native="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch" ></el-button>
      </el-input>
    </el-form-item>
  </el-form>
  <!-- <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px"> -->
    <el-table
      ref="ruleTable"
      header-row-class-name="headname"
      v-loading="loading"
      :data="tableDataPage"
      style="width: 100%"
      @expand-change="handleChangeExpand"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @cell-click="toggleRowExpansion"
      >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <ruleLevel4 @change="handleChangeRule" :row="scope.row" :second="secondLevel" />
        </template>
      </el-table-column>
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        width=""
        label="规则名称"
        prop="formulaName">
          <template slot-scope="scope">
            <el-button size="mini">{{scope.row.formulaName}}</el-button>
          </template>
      </el-table-column>
      <el-table-column
        width="250"
        label="规则编码"
        prop="formulaNo">
      </el-table-column>
      <el-table-column
        width="120"
        label="状态"
        prop="status">
        <template slot-scope="props">
          <el-switch
          active-value="1"
          inactive-value="0"
          active-text="启用"
          inactive-text="关闭"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="props.row.status"
          @change="setIsOpen(props.row.status, props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template slot-scope="props">
          <el-button-group>
            <!--编辑按钮通过才显示-->
            <!-- v-if="rowCurShow.ruleResult !== 'pass'" -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :open-delay="0" v-if="rowCurShow.ruleResult !== 'pass'">
              <el-button @click="editRule(props.row)" size="mini" type="primary" plain><svg-icon icon-class="edit" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="日志" placement="top" :open-delay="0">
              <el-button @click="viewRuleLog(props.row)" size="mini" type="info" plain><svg-icon icon-class="log" /></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :open-delay="0">
              <el-button @click="delRule(props.row)" size="mini" type="danger" plain><svg-icon icon-class="del" /></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  <!-- </el-form> -->
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pagesize"
    layout="sizes, total, prev, pager, next"
    @size-change="handleSizeChange"
    :page-sizes="[30, 60, 90]"
    :total="tableTotal">
  </el-pagination>
  <dialogAddRulesTree :show.sync='dialogVisible' :row='secondLevel' @change="handleChangeRuleAdd" v-if="dialogVisible" />
  <dialogModRulesThree :show.sync='dialogVisibleMod' @change="handleChangeRuleMod" :row='rowMod' v-if="dialogVisibleMod" />
  <dialogViewLog :show.sync='dialogVisibleLog' :row='rowLog' :level="3" v-if="dialogVisibleLog" />
</div>
</template>
<script>
import { Message } from 'element-ui'
import ruleApi from '@/api/list'
import dialogAddRulesTree from './components/dialogAddRulesThree'
import dialogModRulesThree from './components/dialogModRulesThree'
import dialogViewLog from './components/dialogViewLog'
import ruleLevel4 from './components/ruleLevel4'
export default {
  components: {
    dialogAddRulesTree,
    dialogModRulesThree,
    dialogViewLog,
    ruleLevel4
  },
  data () {
    return {
      idThree: '',
      pagesize: 30,
      currentPage: 1,
      tableData: [],
      tableDataPage: [],
      tableTotal: 0,
      loading: false,
      // 获取row的key值
      getRowKeys (row) {
        // console.log(row)
        return row.formulaNo
      },
      expands: [],
      formInline: {
        searchtxt: ''
      },
      dialogVisible: false,
      dialogVisibleMod: false,
      dialogVisibleLog: false,
      rowMod: {},
      rowLog: {},
      rowCurShow: {ruleName: '', rulePurpose: '', ruleResult: ''},
      secondLevel: {
        appId: '',
        ruleId: '',
        versionNum: '',
        ruleResult: '',
        rulePurpose: ''
      }
    }
  },
  methods: {
    // 返回第一级
    gotoHome (id) {
    },
    // 查看日志
    viewRuleLog (row) {
      this.dialogVisibleLog = true
      this.rowLog = row
    },
    // 修改信息
    editRule (row) {
      this.dialogVisibleMod = true
      this.rowMod = row
    },
    // 删除规则
    delRule (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDateRule(row, {isdelete: '2'})
      }).catch(() => {
      })
      // this.upDateRule(row, {isdelete: '2'})
    },
    // 添加规则之后更新数据
    handleChangeRule () {
      this.getList()
    },
    // 修改规则之后更新数据
    handleChangeRuleMod () {
      this.getList()
    },
    handleChangeRuleAdd () {
      this.getList()
    },
    // 搜索
    handleSearch () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          this.getList({formulaName: this.formInline.searchtxt})
          // this.$router.push({path: '/rules/list', query: this.formInline})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 规则名称列点击展开收起
    toggleRowExpansion (row, column, cell, event) {
      // console.log(333)
      // console.log(row, column, cell, event)
      // this.resetForm()
      if (column.property === 'formulaName') {
        if (this.expands.length > 0) {
          if (this.expands[0] === row.formulaNo) {
            this.expands = []
            return false
          }
        }
        this.expands = []
        this.expands.push(row.formulaNo)
      }
    },
    handleChangeExpand (row, expandedRows) {
      // console.log(row, expandedRows)
      this.resetForm()
    },
    // 每页条数
    handleSizeChange (val) {
      this.pagesize = val
      this.tableDataPage = this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.tableDataPage = this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    // 设置开关
    setIsOpen (status, row) {
      this.upDateRule(row, {status})
    },
    // 更新接口数据
    upDateRule (row, updateObj) {
      ruleApi['RULES_MODRULES_NEW'](Object.assign(row, updateObj, this.getParams())).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        } else {
          Message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取列表
    getList (option = {}) {
      this.loading = true
      ruleApi['RULESLISTDETAIL'](Object.assign(
        this.getParams(),
        option
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          // this.filterData(result.datas.ruleMachineDetailResponses)
          // this.tableData = this.filterData(result.datas.ruleMachineDetailResponses)
          this.tableData = result.datas.ruleMachineDetailResponses
          this.tableTotal = this.tableData.length
          this.rowCurShow = Object.assign({}, result.datas)

          let { appId, ruleId, versionNum, ruleResult, rulePurpose } = result.datas
          this.secondLevel = { appId, ruleId, versionNum, ruleResult, rulePurpose }
          // this.rowCurShow.rulePurpose = result.datas.rulePurpose
          // this.rowCurShow.ruleResult = result.datas.ruleResult
          this.idThree = result.datas.id
          this.handleCurrentChange(this.currentPage)
          // this.expands = [] // 清空数据
        }
      }).catch(error => {
        console.log(error)
      })
    },
    filterData (data) {
      return data.filter(item => item.isdelete === '1')
    },
    getParams () {
      return this.$route.query
    }
  },
  created () {
    this.getList()
    // this.getSelOption()
  }
}
</script>

<template>
  <el-dialog
    title="添加规则"
    :visible="show"
    :before-close="handleClose"
    width="80%">
      <span v-loading.fullscreen.lock="fullscreenLoading"></span>
      <el-form :inline="true" :model="formInline" ref="formInline" class="text-right">
        <el-form-item prop="ruleinfo"   style="width:30%">
          <el-select
            v-model="formInline.dicCode"
            filterable
            @change="handleRuleChange"
            placeholder="请选择规则类型"
            :loading="rule.selLoading">
            <el-option key="全部" label="全部" value=""></el-option>
            <el-option
              v-for="item in rule.options"
              :key="item.dicCode"
              :label="item.dicName"
              :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="formulaName"  style="width:30%" >
          <el-input placeholder="请输入内容" v-model="formInline.formulaName" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" ></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table
        header-row-class-name="headname"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="ruleName"
          label="规则名称">
        </el-table-column>
        <el-table-column
          width="120"
          prop="ruleCode"
          label="规则编号">
        </el-table-column>
      </el-table>
              <!-- :page-sizes="`[${pagesize}, ${pagesize*2}, ${pagesize*3}, ${pagesize*4}]`" -->
      <el-pagination
        background
        layout="sizes, total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[15, 30, 60, 90]"
        :page-size="pageSize"
        :total="tableTotal">
      </el-pagination>
    <!-- <el-form ref="form" :model="form" label-width="100px"> -->
    <!-- </el-form> -->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="onSubmit">已选择并确定添加</el-button>
        </el-col>
      </el-row>
  </el-dialog>
</template>
<script>
import ruleApi from '@/api/list'
export default {
  props: ['show', 'row'],
  data () {
    return {
      pageSize: 15,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      formInline: {
        formulaName: '',
        dicCode: ''
      },
      multipleSelection: [],
      rule: {
        selLoading: false,
        options: []
      },
      fullscreenLoading: false
    }
  },
  methods: {
    getParam () {
      return {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
    },
    getModeOption () {
      return ruleApi['RULES_SELECT_NEW']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.rule.options = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange (val) {
      // console.log(val)
      this.multipleSelection = val
    },
    handleRuleChange (val) {
      // console.log(val)
      this.getList(Object.assign(this.formInline))
    },
    handleSearch () {
      // this.getList({formulaName: this.formInline.searchtxt})
      this.getList(this.formInline)
    },

    // handleCurrentChange (currentPage) {
    //   this.currentPage = currentPage
    // },
    // 页面条数改变
    handleSizeChange (val) {
      this.pageSize = val
      this.getList(Object.assign(this.formInline))
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList(Object.assign(this.formInline))
    },
    handleClose (done) {
      this.clearForm()
    },
    clearForm () {
      // this.$refs['form'].resetFields()
      this.$emit('update:show', false)
      // this.$emit('update:row', {})
    },
    getList (option = {}) {
      this.loading = true
      ruleApi['RULES_THREERULES_NEW'](Object.assign(
        option,
        this.getParam()
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.datalist
          this.tableTotal = result.datas.rsCount
        } else {
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit () {
      let level2Id = this.$route.query.id
      if (!level2Id) {
        return false
      }
      // return
      if (this.multipleSelection.length === 0) {
        this.$message.warning({
          message: '请选择规则！'
        })
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '处理数据中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let ruleFormulaList = []
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(row => {
          let tempObj = {}
          tempObj.formulaPipeNo = row.ruleCode
          tempObj.formulaName = row.ruleName
          tempObj.failureTime = 0
          tempObj.sort = '1'
          tempObj.status = '1'
          tempObj.isdelete = '1'
          tempObj.mobileWhiteList = ''

          tempObj.conditionSymbolCode = row.conditionSymbolCode
          tempObj.ruleProp = row.ruleProp
          tempObj.thresholdSymbolCode = row.thresholdSymbolCode
          tempObj.threshold = row.threshold
          ruleFormulaList.push(tempObj)
        })
      }
      ruleFormulaList = JSON.stringify(ruleFormulaList)
      ruleApi['RULES_ADDRULES_NEW'](Object.assign({id: level2Id, ruleFormulaList}, this.row)).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.$message.warning({
            message: '添加成功！'
          })
          this.handleClose()
          this.$emit('change')
        } else {
          this.$message.warning({
            message: result.message
          })
        }
        loading.close()
      }).catch(error => {
        console.log(error)
        loading.close()
      })
    }
  },
  created () {
    this.getModeOption().then(() => {
      this.getList()
    })
  }
}
</script>

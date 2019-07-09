<template>
<div>
  <el-form :inline="true" :model="formInline" ref="formInline" class="text-right">
    <el-button type="primary" icon="el-icon-plus" @click.native="dialogVisible = true">添加策略集</el-button>
    <!-- <el-button type="warning" icon="el-icon-upload2">导出策略集</el-button> -->
    <el-form-item prop="searchtxt">
      <el-input placeholder="请输入内容" v-model="formInline.searchtxt" class="input-with-select" @keyup.enter.native="handleSearch">
        <el-select v-model="formInline.searchtype" slot="prepend" placeholder="请选择" style="width: 90px;">
          <el-option label="策略集" value="1"></el-option>
          <!-- <el-option label="策略" value="2"></el-option> -->
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch" ></el-button>
      </el-input>
    </el-form-item>
  </el-form>
  <el-table
    v-if="tableData"
    header-row-class-name="headname"
    v-loading="loading"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%"
    :row-key="getRowKeys"
    :expand-row-keys="expands"
    @cell-click="toggleRowExpansion"
    >
        <!-- @current-change="toggleRowExpansion" -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <ruleLevel2 :row="props.row" @doList="handleList" @getId="handleChildId"></ruleLevel2>
      </template>
    </el-table-column>
    <el-table-column
      width=""
      label="策略集/策略"
      prop="ruleAppName">
      <template slot-scope="scope">
        <el-button  size="mini">{{scope.row.ruleAppName}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      width="250"
      label="描述"
      prop="ruleItem">
    </el-table-column>
    <el-table-column
      width="180"
      label="状态"
      prop="ruleStatus">
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
        v-model="props.row.ruleStatus"
        @change="setIsOpenAll(props.row.ruleStatus, props.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column
      width="80"
      label="版本号"
      prop="versionNum">
    </el-table-column>
    <el-table-column
      width="260"
      label="操作">
      <template slot-scope="props">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="添加" placement="top" :open-delay="0">
            <el-button @click="addRule(props.row)" size="mini" type="primary" plain><svg-icon icon-class="add" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :open-delay="0">
            <el-button @click="editRule(props.row)" size="mini" type="primary" plain><svg-icon icon-class="edit" /></el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="排序" placement="top" :open-delay="0">
            <el-button size="mini" type="success" plain><svg-icon icon-class="sort" /></el-button>
          </el-tooltip> -->
          <!-- <el-tooltip class="item" effect="dark" content="导入" placement="top">
            <el-button @click="importExcel(props.row)" size="mini" type="warning" plain><svg-icon icon-class="import" /></el-button>
          </el-tooltip> -->
          <!-- <el-tooltip class="item" effect="dark" content="导出" placement="top">
            <el-button size="mini" type="warning" plain><svg-icon icon-class="export" /></el-button>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="日志" placement="top" :open-delay="0">
            <el-button @click="viewLog(props.row)" size="mini" type="info" plain><svg-icon icon-class="log" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :open-delay="0">
            <el-button @click="delRule(props.row)" size="mini" type="danger" plain><svg-icon icon-class="del" /></el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pagesize"
    layout="total, prev, pager, next, jumper"
    :total="tableTotal">
  </el-pagination>
  <dialogAddRules :show.sync='dialogVisible' @change="handleChangeRule" :row.sync='modRow' v-if="dialogVisible" />
  <dialogAddRulesOne :show.sync='addDialogVisible' @change="handleChangeRule" :row.sync='levelRow' v-if="addDialogVisible" />
  <dialogViewLog :show.sync='dialogVisibleLog' :row='rowLog' :level="level" v-if="dialogVisibleLog" />
</div>
</template>
<script>
import { Message } from 'element-ui'
import ruleApi from '@/api/list'
import dialogAddRules from './components/dialogAddRules'
import dialogAddRulesOne from './components/dialogAddRulesOne'
import ruleLevel2 from './components/ruleLevel2'
import dialogViewLog from './components/dialogViewLog'
export default {
  name: 'firstList',
  components: {
    dialogAddRulesOne,
    dialogAddRules,
    dialogViewLog,
    ruleLevel2
  },
  data () {
    return {
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      getRowKeys (row) {
        return row.id
      },
      expands: [],
      dialogVisible: false,
      addDialogVisible: false,
      formInline: {
        searchtxt: '',
        searchtype: '1'
      },
      rules: {
        searchtxt: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      },
      modRow: {},
      levelRow: {},
      dialogVisibleLog: false,
      rowLog: {},
      level: 1 // 日志级别
    }
  },
  watch: {
    '$route' (to, from) {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getList()
      this.resetField()
    }
  },
  methods: {
    // 查看日志
    viewLog (row) {
      this.dialogVisibleLog = true
      this.rowLog = row
      this.level = 1
    },
    importExcel () {
    },
    // 添加规则
    addRule (row) {
      console.log(row)
      if (row) {
        this.levelRow = row
        this.addDialogVisible = true
      }
    },
    // 删除规则
    delRule (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDateRule(row, {ruleDelete: '2'})
      }).catch(() => {
      })
    },
    // 编辑规则
    editRule (row) {
      if (row) {
        this.dialogVisible = true
        this.modRow = row
      }
    },
    // 更新接口数据
    upDateRule (row, updateObj) {
      ruleApi['RULESADDMODLEVEL'](Object.assign(row, updateObj)).then(response => {
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
    resetField () {
      if (Object.keys(this.$route.query).length !== 0) {
        this.formInline = this.$route.query
      } else {
        this.formInline = {
          searchtxt: '',
          searchtype: '1'
        }
      }
    },
    // 二级更新列表
    handleList () {
      this.getList()
    },
    // 二级日志
    handleChildId (row) {
      this.dialogVisibleLog = true
      this.rowLog = row
      this.level = 2
    },
    handleSearch () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          // this.$router.push({path: '/rules/list', query: this.formInline})
          this.getList(this.formInline)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChangeRule () {
      // // console.log(1)
      this.getList()
    },
    toggleRowExpansion (row, column, cell, event) {
      // console.log(row, column, cell, event)
      if (column.property === 'ruleAppName') {
        if (this.expands.length > 0) {
          if (this.expands[0] === row.id) {
            this.expands = []
            return false
          }
        }
        this.expands = []
        this.expands.push(row.id)
      }
    },
    handleSizeChange (val) {
    },
    // 处理分页
    handleCurrentChange (val) {
      this.currentPage = val
      // this.getList()
    },
    // 启用开关
    setIsOpenAll (ruleStatus, row) {
      this.upDateRule(row, {ruleStatus})
    },
    // 查询列表
    getList (option = {}) {
      let keys = option.searchtxt
      let type = option.searchtype
      this.loading = true
      ruleApi['RULESLIST'](Object.assign(
        type === '1' ? {ruleAppName: keys} : {ruleName: keys}
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = []
          this.expands = []
          this.tableData = result.datas.datalist
          this.tableTotal = result.datas.rsCount
          // this.level1 = Object.assign({}, {
          //   appId: result.datas.appId,
          //   id: result.datas.id,
          //   ruleStatus: result.datas.ruleStatus,
          //   ruleResult: result.datas.ruleResult,
          //   ruleAppName: result.datas.ruleAppName,
          //   ruleItem: result.datas.ruleItem,
          //   versionNum: result.datas.versionNum
          // })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getList()
    this.resetField()
  }
}
</script>

<template>
<div>

</div>
</template>
<script>
import { Message } from 'element-ui'
import ruleApi from '@/api/list'
export default {
  name: 'firstLevelList',
  components: {
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
      levelRow: {}
    }
  },

  watch: {
    '$route' (to, from) {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getList()
    }
  },

  methods: {
    addRule (row) {
      console.log(row)
      if (row) {
        this.levelRow = row
        this.addDialogVisible = true
      }
    },
    delRule (row) {
      console.log(row)
    },
    editRule (row) {
      if (row) {
        this.dialogVisible = true
        this.modRow = row
      }
    },
    handleList () {
      this.getList()
    },
    handleSearch () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          if (this.formInline.searchtype === '1') {
            this.$router.push({path: '/rules/list', query: {key: this.formInline.searchtxt}})
          } else {
            this.$router.push({path: '/rules/listlevel2', query: {key: this.formInline.searchtxt}})
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChangeRule () {
      // console.log(1)
      this.getList()
    },
    toggleRowExpansion (row) {
      // console.log(row)
      this.expands = []
      this.expands.push(row.id)
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // this.getList()
    },
    setIsOpenAll (isAllow, row) {
      ruleApi['RULESADDMODLEVEL']({
        appId: row.appId,
        id: row.id,
        ruleStatus: row.ruleStatus,
        ruleResult: row.ruleResult,
        ruleAppName: row.ruleAppName,
        ruleItem: row.ruleItem,
        versionNum: row.versionNum
      }).then(response => {
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
    getList () {
      let keys = this.$route.query.key
      this.loading = true
      ruleApi['RULESLIST']({
        ruleName: keys
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.datalist
          this.tableTotal = result.datas.rsCount
          this.level1 = Object.assign({}, {
            appId: result.datas.appId,
            id: result.datas.id,
            ruleStatus: result.datas.ruleStatus,
            ruleResult: result.datas.ruleResult,
            ruleAppName: result.datas.ruleAppName,
            ruleItem: result.datas.ruleItem,
            versionNum: result.datas.versionNum
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

import moment from 'moment'
export const pageMixin = {
  data () {
    const dateDiff = (num, type) => {
      return [moment().subtract(num, type).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    }
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            picker.$emit('pick', dateDiff(7, 'd'))
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            picker.$emit('pick', dateDiff(1, 'M'))
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            picker.$emit('pick', dateDiff(3, 'M'))
          }
        }]
      },
      // 数据分页相关
      page: {
        pageSize: 10,
        currentPage: 1,
        tableData: [],
        tableTotal: 0,
        loading: false
      },
      // 添加修改弹框相关
      dialog: {
        visible: false
      }
    }
  },
  methods: {
    // 查询
    onSearch () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.getSyncList(Object.assign({pageNum: 1}, this.form))
          this.page.currentPage = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    onReset () {
      this.$refs['form'].resetFields()
    },
    // 页面条数改变
    handleSizeChange (val) {
    },
    // 分页
    handleCurrentChange (val) {
      console.log(val, '333')
      this.page.currentPage = val
      this.getSyncList(Object.assign(this.form ? this.form : {}))
    },

    // 添加
    onAdd () {
      this.dialog.visible = true
    },
    // 编辑
    handleEdit (row) {
      if (row) {
        this.dialog.visible = true
        this.modRow = row
      }
    },
    // 弹窗回调
    handleDialogChange (code, msg) {
      // 根据code处理一些事情
      if (code === 200) {
        this.getSyncList()
      } else {
        this.$message.warning({
          message: msg
        })
      }
    }
  }
}
export const dialogMixin = {
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    // 关闭弹窗
    handleClose () {
      this.clearForm()
    },
    // 关闭之后的处理操作
    clearForm () {
      this.$refs['form'].resetFields()
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    // 取消
    onCancel () {
      this.handleClose()
    }
  }
}
export default {
  dialogMixin,
  pageMixin
}

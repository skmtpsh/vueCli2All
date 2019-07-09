<template>
  <el-dialog
    title="修改规则"
    :visible="show"
    :before-close="handleClose"
    width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="规则名称" prop="formulaName">
          <el-input v-model="form.formulaName" style="width:50%" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="拉黑天数" prop="failureTime">
          <el-input v-model="form.failureTime" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">确定修改</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>
import ruleApi from '@/api/list'
export default {
  props: ['show', 'row'], // 这时的ROW 是 当前规则的
  data () {
    return {
      // dialogVisible: false,
      loading: false,
      // 下拉列表OPTION
      options: [],
      form: {
        formulaName: '',
        failureTime: ''
      },
      rules: {
        formulaName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        failureTime: [
          { required: true, message: '请输入拉黑天数', trigger: 'blur' }
        ]
      },
      errorTxt: ''
    }
  },
  methods: {
    handleClose (done) {
      this.clearForm()
    },
    clearForm () {
      this.$refs['form'].resetFields()
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          ruleApi['RULES_MODRULES_NEW'](Object.assign(this.row, this.form, this.getParams())).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.$message.warning({
                message: '修改成功'
              })
              this.handleClose()
              this.$emit('change')
            } else {
              this.$message.warning({
                message: result.message
              })
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getParams () {
      return this.$route.query
    }
  },
  created () {
    console.log(this.row)
    if (this.row.formulaId) {
      this.form = this.row
    }
  }
}
</script>

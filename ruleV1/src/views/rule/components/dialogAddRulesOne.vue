<template>
  <el-dialog
    title="添加策略"
    :visible="show"
    :before-close="handleClose"
    width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="策略名称" prop="ruleName">
          <el-input v-model="form.ruleName" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="规则名称" prop="ruleId">
          <!-- :remote-method="getOption" -->
          <el-select
            style="width:100%"
            v-model="form.ruleIdTrue"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"

            :loading="loading"
            @change='handleChangeOption'>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.businessName"
              :value="item.ruleId + ',' + item.formulaPipeNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略编码" prop="formulaPrex" style="display:none;">
          <el-input v-model="form.formulaPrex" style="width:100%" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="allStatus">
          <el-switch
            v-model="form.allStatus"
            active-value="1"
            inactive-value="0"
            active-icon-class="switchOpen"
            inactive-icon-class="switchClose"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="规则用途" prop="rulePurpose">
          <el-select v-model="form.rulePurpose" placeholder="请选择规则用途" style="width:100%">
            <el-option label="正式" value="prod"></el-option>
            <el-option label="预备-空跑" value="pre"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>
import ruleApi from '@/api/list'
export default {
  props: ['show', 'row'],
  data () {
    return {
      // dialogVisible: false,
      loading: false,
      // 下拉列表OPTION
      options: [],
      form: {
        ruleName: '',
        formulaPrex: '',
        ruleId: '',
        ruleIdTrue: '',
        rulePurpose: '',
        allStatus: '1'
      },
      rules: {
        ruleName: [
          { required: true, message: '请输入策略名称', trigger: 'blur' }
        ],
        formulaPrex: [
          { required: true, message: '请输入策略编码', trigger: 'blur' }
        ],
        ruleId: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        allStatus: [
          { required: true, message: '请选择是否可用', trigger: 'change' }
        ],
        rulePurpose: [
          { required: true, message: '请选择规则用途', trigger: 'change' }
        ]
      },
      errorTxt: ''
    }
  },
  methods: {
    handleChangeOption (val) {
      console.log(val)
      let tempVal = val.split(',')
      this.form.ruleId = tempVal[0]
      this.form.formulaPrex = tempVal[1]
    },
    handleClose (done) {
      console.log(1)
      this.clearForm()
    },
    clearForm () {
      this.$refs['form'].resetFields()
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    getOption (query) {
      // if (query !== '') {
      ruleApi['RULESIDOPTION'](
        Object.assign({businessName: query})
      ).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.$nextTick(() => {
            this.options = result.datas
          })
        }
      }).catch(error => {
        console.log(error)
      })
      // } else {
      //   this.options = []
      // }
    },
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          ruleApi['RULESADDMOD'](Object.assign(this.form, this.row)).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.handleClose()
              this.$emit('change')
            } else {
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.getOption()
    // this.dialogVisible = this.show
    // console.log(this.row)
    // if (this.row.appId) {
    //   this.getOption(this.row.appId, 'mod')
    //   this.form = this.row
    // }
  }
}
</script>

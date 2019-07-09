<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <!-- <el-form-item label="个人审核码" :prop="isRequired ? 'interCode' : ''" :rules="isRequired ? ruleCheckcode : ruleCheckcodeRequire" > -->
      <el-form-item label="个人审核码" :prop="isRequired ? 'interCode' : 'interCode2'"  >
        <el-input v-model="form.interCode"  :disabled="disableInput" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="渠道名称" prop="canalName">
        <el-input v-model="form.canalName" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="渠道类型" prop="canalType">
        <el-select
          :disabled="!!row.canalId"
          style="width:100%"
          v-model="form.canalType"
          filterable
          remote
          reserve-keyword
          placeholder="请输入渠道类型"
          :loading="selLoading"
          @change='handleChangeOption'>
          <el-option
            v-for="item in saleOptions"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系人" prop="contactMan">
        <el-input v-model="form.contactMan" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="系统账号" prop="canalAccount">
        <el-input v-model="form.canalAccount" maxlength="11" style="width:100%" :disabled="!!row.canalId"></el-input>
      </el-form-item>
      <el-form-item label="开户行" prop="openBank">
        <el-input v-model="form.openBank" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount">
        <el-input v-model="form.bankAccount" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="对接销售" prop="saleName">
        <el-input v-model="form.saleName" style="width:100%" :disabled="!!row.canalId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import companyApi from '@/api/company'
import { dialogMixin } from '@/views/component/mixin'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    let validateTel = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value))) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }
    let validateIntNum = (rule, value, callback) => {
      if (!(/^[0-9]*$/.test(value))) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    return {
      // dialogVisible: false,
      // 下拉框loading
      selLoading: false,
      saleOptions: [],
      ruleCheckcode: { required: true, message: '请输入个人审核码', trigger: 'blur' },
      ruleCheckcodeRequire: { required: false },
      // 表单
      form: {
        interCode: '',
        canalName: '',
        canalType: '',
        canalAccount: '',
        contactMan: '',
        mobile: '',
        openBank: '',
        saleName: '',
        bankAccount: ''
      },
      rules: {
        interCode: [
          { required: true, message: '请输入个人审核码', trigger: 'blur' }
        ],
        interCode2: [
          { required: false, message: '请输入个人审核码', trigger: 'blur' }
        ],
        canalName: [
          { required: true, message: '请输入渠道名称', trigger: 'blur' }
        ],
        canalType: [
          { required: true, message: '请选择渠道类型', trigger: 'change' }
        ],
        canalAccount: [
          { required: true, message: '请输系统账号', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        contactMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        openBank: [
          { required: false, message: '请输入开户行', trigger: 'blur' }
        ],
        saleName: [
          { required: true, message: '请输入对接销售', trigger: 'blur' }
        ],
        bankAccount: [
          { required: false, message: '请输入银行账户', trigger: 'blur' },
          { validator: validateIntNum, trigger: 'blur' }
        ]
      },
      title: '添加渠道',
      disableInput: false,
      isRequired: false
    }
  },
  methods: {
    // 渠道类型
    getTypeOption () {
      companyApi['COMPANY_TYPE']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.saleOptions = result.datas
          // this.getSyncList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉框
    handleChangeOption (val) {
      this.isRequired = (val !== 'CHANNEL_TYPE_COM')
      // if (val === 'CHANNEL_TYPE_COM') {
      //   this.isRequired = true
      // } else {
      //   this.isRequired = false
      // }
    },
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
        if (valid) {
          let canalId = this.row.canalId
          let reqCommond = canalId ? 'COMPANY_MOD' : 'COMPANY_ADD'
          companyApi[reqCommond](Object.assign(
            this.form,
            {canalId}
          )).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.handleClose()
            } else {
            }
            this.$emit('change', result.code, result.message)
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
    // this.dialogVisible = this.show
    try {
      if (this.row.canalId) {
        this.form = this.row
        this.title = '修改渠道'
        if (this.form.interCode === null || this.form.interCode === '') {
          this.disableInput = false
        } else {
          this.disableInput = true
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.getTypeOption()
    }
  }
}
</script>

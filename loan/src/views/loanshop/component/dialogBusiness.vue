<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="公司名" prop="merchantName">
        <el-input v-model="form.merchantName" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="merchantAccount">
        <el-input v-model="form.merchantAccount" maxlength="11" style="width:100%" :disabled="!!row.merchantId"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactMan">
        <el-input v-model="form.contactMan" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="对接销售" prop="saleName">
        <el-input v-model="form.saleName" style="width:100%" :disabled="!!row.merchantId"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount">
        <el-input v-model="form.bankAccount" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import businessApi from '@/api/buness'
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
      form: {
        merchantName: '',
        merchantAccount: '',
        contactMan: '',
        mobile: '',
        saleName: '',
        bankAccount: ''
      },
      rules: {
        merchantName: [
          { required: true, message: '请输入公司名', trigger: 'blur' }
        ],
        merchantAccount: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        contactMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        saleName: [
          { required: true, message: '请输入对接销售', trigger: 'blur' }
        ],
        bankAccount: [
          { required: false, message: '请输入银行账户', trigger: 'blur' },
          { validator: validateIntNum, trigger: 'blur' }
        ]
      },
      title: '添加商户'
    }
  },
  methods: {
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let merchantId = this.row.merchantId
          let reqCommond = merchantId ? 'BUSINESS_MOD' : 'BUSINESS_ADD'
          businessApi[reqCommond](Object.assign(
            this.form,
            {merchantId}
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
      if (this.row.merchantId) {
        this.form = this.row
        this.title = '修改商户'
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

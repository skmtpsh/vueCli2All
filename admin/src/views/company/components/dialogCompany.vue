<template>
  <el-dialog
    title="创建企业"
    :visible="show"
    @close="handleClose"
    width="50%">
      <el-alert
        style="margin: 20px 0;"
        v-if="errorTxt"
        :title="errorTxt"
        type="error">
      </el-alert>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" >
        <el-form-item label="公司名称" prop="companyTitle">
          <el-input v-model="form.companyTitle" ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactUser">
          <el-input v-model="form.contactUser"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="业务邮箱" prop="contactEmail">
          <el-input v-model="form.contactEmail"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyPhone">
          <el-input v-model="form.companyPhone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号码" prop="companyTel">
          <el-input v-model="form.companyTel"></el-input>
        </el-form-item> -->
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="form.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="contactQQ">
          <el-input v-model="form.contactQQ"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>
<script>
import companyApi from '@/api/company'
export default {
  props: ['show'],
  data () {
    return {
      dialogVisible: false,
      form: {
        companyTitle: '',
        companyPhone: '',
        // companyTel: '',
        companyAddress: '',
        contactUser: '',
        contactPhone: '',
        contactEmail: '',
        contactQQ: ''
      },
      rules: {
        companyTitle: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyPhone: [
          { required: false, message: '请输入公司电话', trigger: 'blur' },
          {
            pattern: /^\d{3}(-)?\d{8}|\d{4}(-)?\d{7}$/,
            message: '请输入正确的公司电话'
          }
        ],
        companyTel: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          { validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
        ],
        companyAddress: [
          { required: false, message: '请输入公司地址', trigger: 'blur' }
        ],
        contactUser: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          {validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入联系人正确的手机号'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
        ],
        contactEmail: [
          { required: true, message: '请输入业务邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: '请输入正确的邮箱地址'
          }
        ],
        contactQQ: [
          { required: false, message: '请输入业务QQ', trigger: 'blur' },
          {
            pattern: /^\d{4,}$/,
            message: '请输入正确的QQ号'
          }
        ]
      },
      errorTxt: ''
    }
  },
  methods: {
    handleClose (done) {
      this.clearForm()
      // this.show = false
    },
    clearForm () {
      this.$nextTick(() => {
        this.$emit('update:show', false)
        this.$refs['form'].resetFields()
      })
    },
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          companyApi['COMPANYSAVE']({
            businessName: this.form.companyTitle,
            businessTelephone: this.form.companyPhone,
            businessMobile: this.form.companyTel,
            businessAddr: this.form.companyAddress,
            contactMan: this.form.contactUser,
            contactManMobile: this.form.contactPhone,
            contactManMail: this.form.contactEmail,
            contactManQq: this.form.contactQQ,
            applyId: ''
          }).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.handleClose()
              this.$emit('change')
            } else {
              this.$message.error(result.message)
              // this.errorTxt = result.message
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
    this.dialogVisible = this.show
  }
}
</script>

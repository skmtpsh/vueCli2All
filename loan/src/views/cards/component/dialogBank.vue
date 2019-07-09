<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="银行LOGO" prop="bankLogo">
        <section class="picUpload">
          <div class="uploadImg" >
            <uploadPic @picChange="handleChangePic" :isCheck = 'uploadTotal' :src.sync="form.bankLogo" :modsrc='form.bankLogo' v-if="uploadShow" />
          </div>
          <div class="picText">
            <div class="picBox">
              <p>请上传小于{{uploadTotal}}K的图片</p>
            </div>
          </div>
        </section>
      </el-form-item>
      <el-form-item label="银行名称：" prop="bankCode">
        <el-select
          style="width:100%"
          v-model="form.bankCode"
          filterable
          remote
          reserve-keyword
          placeholder="请输入银行名称"
          :loading="selLoading"
          @change='handleChangeOption'>
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="item in bankOptions"
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
      <!-- <el-form-item label="对接销售" prop="saleName">
        <el-input v-model="form.saleName" style="width:100%" :disabled="!!row.merchantId"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSave" :disabled="disabled">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import cardsApi from '@/api/cards'
import { dialogMixin } from '@/views/component/mixin'
import uploadPic from '@/components/upload/index'
export default {
  components: {
    uploadPic
  },
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
    // let validateIntNum = (rule, value, callback) => {
    //   if (!(/^[0-9]*$/.test(value))) {
    //     callback(new Error('请输入数字值'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 下拉框loading
      selLoading: false,
      bankOptions: [],
      form: {
        bankLogo: '',
        bankCode: '',
        contactMan: '',
        mobile: '',
        bankName: ''
      },
      rules: {
        bankLogo: [
          { required: true, message: '请选择银行LOGO', trigger: 'blur' }
        ],
        bankCode: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
          // { validator: validateIntNum, trigger: 'blur' }
        ],
        contactMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ]
      },
      title: '添加商户',
      uploadShow: false,
      uploadTotal: 100
    }
  },
  methods: {
    handleChangePic (code) {
    },
    handleChangeOption (val) {
      this.form.bankName = this.bankOptions.reduce((pre, cur) => {
        if (cur.dicCode === val) {
          return pre + cur.dicName
        }
        return pre
      }, '')
    },
    // banK Name
    getBankOption () {
      cardsApi['BANKMERCHANT_BANKS']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.bankOptions = result.datas
          // this.getSyncList()
        } else {
          this.bankOptions = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 处理保存信息
    onSave () {
      this.disabled = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let id = this.row.id
          let reqCommond = id ? 'BANKMERCHANT_UPDATE' : 'BANKMERCHANT_SAVE'
          cardsApi[reqCommond](Object.assign(
            this.form,
            { id }
          )).then(response => {
            this.disabled = false
            const result = response.data
            if (result.code === 200) {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
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
      this.getBankOption()
      if (this.row.id) {
        this.title = '修改产品'
        this.form = this.row
        // this.handleEdit()
      } else {
        // this.handleAddChannel()
      }
      this.uploadShow = true
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style lang="scss" scoped>
  .picUpload {
    background: #fff;
    padding: 0 20px;
    display: flex;
    .uploadImg {
      width: 80px;
      height: 80px;
      background-color: #f7f7f7;
      border-radius: 10px;
      position: relative;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .picText {
      flex: 2;
      .picBox {
        padding: 5px 15px;
      }
      h3 {
        margin: 10px 0;
        .red {
          color: #ed283b;
        }
      }
      p {
        color: #adadad;
        line-height: 1.6;
      }
    }
  }
</style>

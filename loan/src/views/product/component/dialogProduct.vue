<template>
  <el-dialog
    top="5vh"
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="60%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
      <el-form-item label="产品LOGO" prop="productLogo">
        <section class="picUpload">
          <div class="uploadImg" >
            <uploadPic @picChange="handleChangePic" :isCheck = 'uploadTotal' :src.sync="form.productLogo" :modsrc='form.productLogo' v-if="uploadShow" />
          </div>
          <div class="picText">
            <div class="picBox">
              <p>请上传小于{{uploadTotal}}K的图片</p>
            </div>
          </div>
        </section>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品名" prop="productName">
            <el-input v-model="form.productName" maxlength="5" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副标题" prop="productSubHead">
            <el-input v-model="form.productSubHead" maxlength="9" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="所属商户" prop="merchantId">
        <el-select
          style="width:50%"
          v-model="form.merchantId"
          filterable
          reserve-keyword
          placeholder="请输入所属商户"
          :loading="merchant.selLoading">
          <el-option
            v-for="item in merchant.options"
            :key="item.merchantId"
            :label="item.merchantName"
            :value="item.merchantId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属频道">
        <el-row>
          <el-col :span="24"
            v-for="(item, index) in form.productChannelList"
            :key="item.channelCode + index*100"
          >
            <el-form-item
              style="display:inline-block; "
              :prop = "'productChannelList.' + index + '.channelCode'"
              :rules = "{required: true, message: '请输入所属频道', trigger: 'blur'}"
              >
              <el-select
                v-model="item.channelCode"
                filterable
                reserve-keyword
                placeholder="请输入所属频道"
                :loading="channel.selLoading">
                <el-option
                  v-for="channel in channel.options"
                  :key="channel.channelCode"
                  :label="channel.channelName"
                  :value="channel.channelCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              style="display:inline-block; "
              :prop = "'productChannelList.' + index + '.productPriority'"
              :rules = "{required: true, message: '请输入优先级', trigger: 'blur'}"
              >
              <el-input-number v-model="item.productPriority" style="width:100px;" :min="0" :max="1000" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item
              style="display:inline-block; ">
              <el-button type="danger" icon="el-icon-delete" plain @click.native="handleDelChannel(item)">删除</el-button>
            </el-form-item>
          </el-col>
          <p style="margin: 0;"><el-button type="text" @click.native="handleAddChannel">添加频道</el-button></p>
        </el-row>
      </el-form-item>
      <!-- <el-form-item prop="productChannelList" style="">
        <el-select v-model="form.productChannelList" style="width:100%; display:none;"></el-select>
      </el-form-item> -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="可借额度：" prop="borrowType">
            <el-form-item>
              <el-radio-group v-model="form.borrowType" >
                <el-radio label="1" border>最高可借额度</el-radio>
                <el-radio label="2" border>借款额度范围</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <el-form-item
                style="display:inline-block; width:125px;"
                v-if="form.borrowType === '2'" prop="minBorrowLimit">
                <el-input v-model="form.minBorrowLimit" maxlength="5" placeholder="请输入最低可借额度" ></el-input>
              </el-form-item>
              <el-form-item
                style="display:inline-block; width:125px;" prop="maxBorrowLimit">
                <el-input v-model="form.maxBorrowLimit" maxlength="5" placeholder="请输入最高可借额度" ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款期限：" prop="loanType">
            <el-form-item>
              <el-radio-group v-model="form.loanType">
                <el-radio label="1" border>最高借款期限</el-radio>
                <el-radio label="2" border>借款期限区间</el-radio>
              </el-radio-group>
            </el-form-item>
            <div>
              <el-form-item
                style="display:inline-block; width:125px;"
                v-if="form.loanType === '2'" prop="minLoanPeriod">
                <el-input v-model="form.minLoanPeriod" maxlength="3" placeholder="请输入最低借款期限" ></el-input>
              </el-form-item>
              <el-form-item
                style="display:inline-block; width:125px;" prop="maxLoanPeriod">
                <el-input v-model="form.maxLoanPeriod" maxlength="3" placeholder="请输入最高借款期限" ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="借款利率：" prop="loanRate">
            <el-input v-model="form.loanRate" maxlength="5" placeholder="请输入借款利率" style="width:50%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式：" prop="computeWay">
            <el-select
              style="width:100%"
              v-model="form.computeWay"
              filterable
              placeholder="请选择结算方式"
              :loading="label.selLoading">
              <el-option
                v-for="item in compute.options"
                :key="item.dicCode"
                :label="item.dicName"
                :value="item.dicCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="H5链接：" prop="productLink">
        <el-input v-model="form.productLink" placeholder="请输入H5链接" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="标签ID：" prop="productLabelList">
        <el-select
          style="width:100%"
          v-model="form.productLabelList"
          multiple
          :multiple-limit='2'
          filterable
          placeholder="请选择标签ID"
          :loading="label.selLoading">
          <el-option
            v-for="item in label.options"
            :key="item.labelCode"
            :label="item.labelName"
            :value="item.labelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请条件："  prop="applyCondition">
            <el-input type="textarea" maxlength="30" v-model="form.applyCondition" placeholder="请输入申请条件" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请材料：" prop="applyMaterial">
            <el-input type="textarea" maxlength="30" v-model="form.applyMaterial" placeholder="请输入申请材料" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" maxlength="200" placeholder="请输入备注" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import moment from 'moment'
import productApi from '@/api/product'
import { dialogMixin } from '@/views/component/mixin'
import uploadPic from '@/components/upload/index'
export default {
  components: {
    uploadPic
  },
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    const validateLabes = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择标签'))
      } else {
        if (value.length > 2) {
          callback(new Error('最多选择3个标签'))
        }
        callback()
      }
    }
    let validateFloat = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^\d+(\.\d{0,2})?$/.test(value))) {
          callback(new Error('最多两位小数'))
        } else {
          callback()
        }
      }
    }
    let validateNum = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^[1-9]\d{0,4}$/.test(value))) {
          callback(new Error('请输入有效整数'))
        } else {
          callback()
        }
      }
    }
    let validateIntNum = (rule, value, callback) => {
      if (!value) {
        return new Error('必填信息')
      } else {
        if (!(/^(([1-9]\d{0,2}))$/.test(value))) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    var validateBorrowLow = (rule, value, callback) => {
      if (parseInt(value) > parseInt(this.form.maxBorrowLimit)) {
        callback(new Error('请输入小于最高限额值'))
      } else {
        callback()
      }
    }
    var validateBorrow = (rule, value, callback) => {
      if (parseInt(value) < parseInt(this.form.minBorrowLimit)) {
        callback(new Error('请输入大于最低限额值'))
      } else {
        callback()
      }
    }
    var validatePeriodLow = (rule, value, callback) => {
      if (parseInt(value) > parseInt(this.form.maxLoanPeriod)) {
        callback(new Error('请输入小于最高期限值'))
      } else {
        callback()
      }
    }
    var validatePeriod = (rule, value, callback) => {
      if (parseInt(value) < parseInt(this.form.minLoanPeriod)) {
        callback(new Error('请输入大于最低期限值'))
      } else {
        callback()
      }
    }
    return {
      // dialogVisible: false,
      form: {
        productLogo: '',
        productSubHead: '',
        productName: '',
        merchantId: '',
        productChannelList: [],
        borrowType: '1',
        loanType: '1',
        minBorrowLimit: '',
        maxBorrowLimit: '',
        minLoanPeriod: '',
        maxLoanPeriod: '',
        loanRate: '',
        computeWay: '',
        productLink: '',
        productLabelList: [],
        applyCondition: '',
        applyMaterial: '',
        remark: ''
      },
      rules: {
        productLogo: [
          { required: true, message: '请选择产品LOGO', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        productSubHead: [
          { required: true, message: '请输入副标题', trigger: 'blur' },
          { min: 1, max: 18, message: '长度在 1 到 9 个字符', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择商户', trigger: 'change' }
        ],
        productChannelList: [
          { required: true, message: '请添加频道', trigger: 'blur' }
        ],
        borrowType: [
          { required: true, message: '请输入可借额度', trigger: 'change' }
        ],
        loanType: [
          { required: true, message: '请输入借款期限', trigger: 'change' }
        ],
        minBorrowLimit: [
          { required: true, message: '请输入最低可借额度', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' },
          { validator: validateBorrowLow, trigger: 'blur' }
        ],
        maxBorrowLimit: [
          { required: true, message: '请输入最高可借额度', trigger: 'blur' },
          { validator: validateNum, trigger: 'blur' },
          { validator: validateBorrow, trigger: 'blur' }
        ],
        minLoanPeriod: [
          { required: true, message: '请输入最低借款期限', trigger: 'blur' },
          { validator: validateIntNum, trigger: 'blur' },
          { validator: validatePeriodLow, trigger: 'blur' }
        ],
        maxLoanPeriod: [
          { required: true, message: '请输入最高借款期限', trigger: 'blur' },
          { validator: validateIntNum, trigger: 'blur' },
          { validator: validatePeriod, trigger: 'blur' }
        ],
        loanRate: [
          { required: true, message: '请输入借款利率', trigger: 'blur' },
          { validator: validateFloat, trigger: 'blur' }
        ],
        computeWay: [
          { required: true, message: '请输入结算方式', trigger: 'blur' }
        ],
        productLink: [
          { required: true, message: '请输入H5链接', trigger: 'blur' },
          { type: 'url', message: '请输入正确H5链接', trigger: 'blur' }
        ],
        productLabelList: [
          { required: true, message: '请输入标签ID', trigger: 'blur' },
          { validator: validateLabes, trigger: 'blur' }
        ],
        applyCondition: [
          { required: true, message: '请输入申请条件', trigger: 'blur' },
          { min: 1, max: 60, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        applyMaterial: [
          { required: true, message: '请输入申请材料', trigger: 'blur' },
          { min: 1, max: 60, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      title: '添加产品',
      uploadShow: false,
      uploadTotal: 100,
      merchant: {
        selLoading: false,
        options: []
      },
      channel: {
        selLoading: false,
        options: []
      },
      label: {
        selLoading: false,
        options: []
      },
      compute: {
        selLoading: false,
        options: []
      }
    }
  },
  methods: {
    handleChangePic (code) {
      if (code === 601) {
      }
    },
    // 所属频道添加
    handleAddChannel () {
      this.form.productChannelList.push({
        proid: moment(Date.now()).format('YYYYMMDDHHmmss'),
        channelCode: '',
        productPriority: 1
      })
    },
    // 所属频道删除
    handleDelChannel (channel) {
      if (this.form.productChannelList.length === 1) {
        this.$message.warning({
          message: '频道是必填的'
        })
        return
      }
      this.form.productChannelList.splice(this.form.productChannelList.findIndex(item => item.proid === channel.proid), 1)
      console.log(this.form.productChannelList)
    },
    // 商户下拉框
    handleChangeOption (val) {
    },
    getBusinessOption () {
      productApi['SELECT_COMBINE']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.merchant.options = result.datas.merchant
          this.channel.options = result.datas.channel
          this.label.options = result.datas.label
          this.compute.options = result.datas.compute
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 处理修改数据为要保存的数据
    handleEdit () {
      let requestChannelObj = this.row.channelList.map(item => {
        return {
          proid: item.id,
          channelCode: item.channelCode,
          productPriority: item.productPriority
        }
      })
      let requestLabelObj = this.row.labelList.map(item => {
        return item.labelCode
      })
      // 整理this.form
      this.form.productLogo = this.row.productLogo
      this.form.productName = this.row.productName
      this.form.productSubHead = this.row.productSubHead
      this.form.merchantId = this.row.merchantId
      this.form.borrowType = this.row.borrowType
      this.form.loanType = this.row.loanType
      this.form.minBorrowLimit = this.row.minBorrowLimit
      this.form.maxBorrowLimit = this.row.maxBorrowLimit
      this.form.minLoanPeriod = this.row.minLoanPeriod
      this.form.maxLoanPeriod = this.row.maxLoanPeriod
      this.form.loanRate = this.row.loanRate
      this.form.computeWay = this.row.computeWay
      this.form.productLink = this.row.productLink
      this.form.applyCondition = this.row.applyCondition
      this.form.applyMaterial = this.row.applyMaterial
      this.form.remark = this.row.remark

      this.form.productChannelList = requestChannelObj
      this.form.productLabelList = requestLabelObj
    },
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let productId = this.row.id
          let productCode = this.row.productCode
          let reqCommond = productId ? 'PRODUCT_MOD' : 'PRODUCT_ADD'
          let productLabelList = this.form.productLabelList.map(item => {
            return {labelCode: item}
          })
          let requestObj = Object.assign(
            {},
            this.form,
            {productChannelList: JSON.stringify(this.form.productChannelList)},
            {productLabelList: JSON.stringify(productLabelList)},
            productId
              ? /(data:image)/i.test(this.form.productLogo) ? {productLogo: this.form.productLogo} : {productLogo: ''}
              : {productLogo: this.form.productLogo},
            {productId, productCode}
          )
          productApi[reqCommond](requestObj).then(response => {
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
      this.getBusinessOption()
      if (this.row.id) {
        this.title = '修改产品'
        this.handleEdit()
      } else {
        this.handleAddChannel()
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

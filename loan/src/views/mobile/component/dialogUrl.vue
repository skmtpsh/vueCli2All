<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="链接地址" prop="productLink">
        <el-input v-model="form.productLink" placeholder="请输入链接地址" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item label="结算方式：" prop="computeWay">
        <el-select
          style="width:100%"
          v-model="form.computeWay"
          filterable
          placeholder="请选择结算方式"
          :loading="compute.selLoading">
          <!-- <el-option key="全部" label="全部" value=""></el-option> -->
          <el-option
            v-for="item in compute.options"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接类型" prop="linkType">
        <el-select
          style="width:100%"
          v-model="form.linkType"
          filterable
          placeholder="请选择结算方式"
          :loading="link.selLoading">
          <!-- <el-option key="全部" label="全部" value=""></el-option> -->
          <el-option
            v-for="item in link.options"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import distributeApi from '@/api/distribute'
import { dialogMixin } from '@/views/component/mixin'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    return {
      // dialogVisible: false,
      // 下拉框loading\
      link: {
        selLoading: false,
        options: [
        ]
      },
      compute: {
        selLoading: false,
        options: []
      },
      // 表单
      form: {
        productLink: '',
        computeWay: '',
        linkType: ''
      },
      rules: {
        productLink: [
          { required: true, message: '请输入H5链接', trigger: 'blur' },
          { type: 'url', message: '请输入正确H5链接', trigger: 'blur' }
        ],
        computeWay: [
          { required: true, message: '请输入结算方式', trigger: 'blur' }
        ],
        linkType: [
          { required: true, message: '请输入链接类型', trigger: 'blur' }
        ]
      },
      title: '添加URL'
    }
  },
  methods: {
    getBusinessOption () {
      distributeApi['DISTRIBUTE_URL_SEL']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.compute.options = result.datas.computeList
          this.link.options = result.datas.linkList
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉框
    handleChangeOption (val) {
    },
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let productCode = this.$route.query.procode
          let productLinkId = this.row.productLinkId
          let reqCommond = productLinkId ? 'DISTRIBUTE_URL_MOD' : 'DISTRIBUTE_URL_SAVE'
          distributeApi[reqCommond](Object.assign(
            this.form,
            {productLinkId},
            {productCode}
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
      if (this.row.productLinkId) {
        this.form = this.row
        this.title = '修改URL'
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.getBusinessOption()
    }
  }
}
</script>

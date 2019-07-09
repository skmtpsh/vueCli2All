<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="渠道类型" prop="canalType">
        <el-select
          style="width:100%"
          v-model="form.canalType"
          filterable
          remote
          reserve-keyword
          placeholder="请输入渠道类型"
          :disabled="canalId"
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
      <el-form-item label="渠道方：" prop="canalId">
        <!-- :multiple-limit='2' -->
        <el-select
          style="width:100%"
          v-model="form.canalId"
          :multiple='!canalId'
          :disabled="canalId"
          filterable
          placeholder="请选择渠道方"
          :loading="canal.selLoading">
          <!-- <el-option key="全部" label="全部" value=""></el-option> -->
          <el-option
            v-for="item in canal.options"
            :key="item.canalId"
            :label="item.canalName"
            :value="item.canalId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分发类型" prop="distributeId">
        <el-select
          style="width:100%"
          v-model="form.distributeId"
          filterable
          placeholder="请选择分发类型"
          :loading="mode.selLoading">
          <!-- <el-option key="全部" label="全部" value=""></el-option> -->
          <el-option
            v-for="item in mode.options"
            :key="item.distributeId"
            :label="item.distributeMode"
            :value="item.distributeId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售人员：" prop="saleName">
        <el-input v-model="form.saleName" :disabled="canalId" placeholder="请输入销售人员"></el-input>
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
import companyApi from '@/api/company'
import { dialogMixin } from '@/views/component/mixin'
// 自定义类型
const LinkCanalType = ['CHANNEL_TYPE_INTER_ELEC', 'CHANNEL_TYPE_OUTER_ELEC']

export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    return {
      // dialogVisible: false,
      // 下拉框loading\
      selLoading: false,
      saleOptions: [],
      canal: {
        selLoading: false,
        options: [
        ]
      },
      mode: {
        selLoading: false,
        options: []
      },
      // 表单
      form: {
        canalType: '',
        distributeId: '',
        canalId: '',
        saleName: ''
      },
      rules: {
        canalType: [
          { required: true, message: '请输入渠道类型', trigger: 'change' }
        ],
        distributeId: [
          { required: true, message: '请输入分发类型', trigger: 'blur' }
        ],
        canalId: [
          { required: true, message: '请输入渠道方', trigger: 'blur' }
        ]
      },
      title: '添加分发URL'
    }
  },
  computed: {
    canalId () {
      // console.log(this.row.distributeLinkCode, !!this.row.distributeLinkCode)
      return !!this.row.distributeLinkCode
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
    getCanalOption (canalType = '') {
      distributeApi['DISTRIBUTE_LINK_CANALSEL']({
        canalType
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.canal.options = result.datas
          // 添加 自定义类型默认全部选中
          if (!this.row.distributeLinkCode) {
            if (LinkCanalType.includes(canalType)) {
              this.form.canalId = this.canal.options.map(item => {
                return item.canalId
              })
            } else {
              this.form.canalId = []
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getModeOption () {
      distributeApi['DISTRIBUTE_LINK_MODE']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.mode.options = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉框
    handleChangeOption (val) {
      this.getCanalOption(val)
      // this.form.canalId = []
    },
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let productLinkId = this.$route.query.proid
          let distributeLinkCode = this.row.distributeLinkCode
          let reqCommond = distributeLinkCode ? 'DISTRIBUTE_LINK_MOD' : 'DISTRIBUTE_LINK_ADD'
          // console.log(this.form.canalId)
          let canalId = distributeLinkCode ? this.form.canalId : this.form.canalId.join(',')
          distributeApi[reqCommond](Object.assign(
            this.form,
            {canalId},
            {productLinkId},
            {distributeLinkCode}
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
      if (this.row.distributeLinkCode) {
        this.form = this.row
        // this.form.canalId =
        this.getCanalOption()
        // console.log(this.row.canalId, this.form.canalId)
        this.title = '修改分发URL'
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.getModeOption()
      // this.getCanalOption()
      this.getTypeOption()
    }
  }
}
</script>

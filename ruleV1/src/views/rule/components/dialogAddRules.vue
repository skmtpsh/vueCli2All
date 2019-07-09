<template>
  <el-dialog
    title="添加(修改)策略集"
    :visible="show"
    :before-close="handleClose"
    width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="产品名称" prop="appId">
          <!-- :remote-method="getOption" -->
          <el-select
            style="width:100%"
            :disabled="!!row.appId"
            v-model="form.appId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :loading="loading"
            @change='handleChangeOption'>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.sn">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略集名称" prop="ruleAppName">
          <el-input v-model="form.ruleAppName" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="决策结果" prop="ruleResult">
          <el-select v-model="form.ruleResult" placeholder="请选择决策结果" style="width:100%" :disabled="!!row.appId">
            <el-option label="通过" value="pass"></el-option>
            <el-option label="拒绝" value="refuse"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNum">
          <el-input v-model="form.versionNum" style="width:100%" :disabled="!!this.row.appId"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="ruleStatus">
          <el-switch
            v-model="form.ruleStatus"
            active-value="1"
            inactive-value="0"
            active-icon-class="switchOpen"
            inactive-icon-class="switchClose"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="ruleItem">
          <el-input type="textarea" v-model="form.ruleItem" style="width:100%"></el-input>
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
      dialogVisible: false,
      loading: false,
      // 下拉列表OPTION
      options: [],
      form: {
        appId: '',
        ruleAppName: '',
        ruleResult: '',
        versionNum: '',
        ruleItem: '',
        ruleStatus: '1'
      },
      rules: {
        appId: [{ required: true, message: '请选择产品名称', trigger: 'blur' }],
        ruleAppName: [
          { required: true, message: '请输入策略集名称', trigger: 'blur' }
        ],
        ruleStatus: [
          { required: true, message: '请选择是否可用', trigger: 'change' }
        ],
        ruleResult: [
          { required: true, message: '请选择决策结果', trigger: 'change' }
        ],
        versionNum: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        ruleItem: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      errorTxt: ''
    }
  },
  methods: {
    handleChangeOption (val) {
      console.log(val)
    },
    getOption (query, type) {
      // if (query !== '') {
      ruleApi['RULESAPPIDOPTION'](Object.assign(
        type === 'mod' ? {appId: query} : {appName: query}
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.options = result.datas
          // this.row.appId ? this.form.appId = this.row.appId : ''
        }
      }).catch(error => {
        console.log(error)
      })
      // } else {
      //   this.options = []
      // }
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
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          ruleApi['RULESADDMODLEVEL'](this.form).then(response => {
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
    this.dialogVisible = this.show
    // console.log(this.row)
    if (this.row.appId) {
      this.getOption(this.row.appId, 'mod')
      this.form = this.row
    } else {
      this.getOption('')
    }
  }
}
</script>

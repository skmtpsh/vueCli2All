<template>
  <el-form :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px">
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="规则名称"
        >
          <el-input v-model="row.formulaName" disabled="" style="width:900px;"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <fieldset>
      <legend>条件</legend>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="* 执行条件"
            prop="logicSymbol"
          >
            <el-radio-group v-model="row.logicSymbol">
              <el-radio :label="'&&'">满以下所有条件</el-radio>
              <el-radio :label="'||'">满足以下任意条件</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- v-for="(item, index) in scope.row.ruleMachineVariates" -->
      <el-row
          v-for="(item, index) in dynamicValidateForm.ruleMachineVariates"
          :key="item.paramId"
        >
        <el-col :span="24" v-if="item.isUsed === '1'">
          <el-form-item
            label="条件配置"
            v-if="item.isUsed === '1'">
            <el-input v-model="item.paramName" disabled=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="item.paramSymbol"
              placeholder="请选择">
                <el-option label="大于" value=">"></el-option>
                <el-option label="小于" value="<"></el-option>
                <el-option label="等于" value="=="></el-option>
                <el-option label="大于等于" value=">="></el-option>
                <el-option label="不能于" value="!="></el-option>
                <el-option label="小于等于" value="<="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            :prop = "'ruleMachineVariates.' + index + '.paramValue'"
            :rules = "{required: true, message: '值不能为空', trigger: 'blur'}"
            >
            <el-input v-model="item.paramValue"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.prevent="removeRule(row, item, 'del')">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
          v-for="(cond, index) in dynamicValidateForm.condition"
          :key="index"
        >
        <el-col :span="24">
          <el-form-item
            label="条件配置"
            :prop = "'condition.' + index + '.ruleObj'"
            :rules = "{required: true, message: '值不能为空', trigger: 'change'}"
            >
            <!-- :remote-method="getOption" -->
            <el-select
              v-model="cond.ruleObj"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :loading="optionLoading"
              :remote-method="getOption"
              @change='handleChangeOption'>
              <el-option
                v-for="item in options"
                :key="item.fieldCode"
                :label="item.ruleName"
                :value="item.fieldCode + ',' + item.ruleName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            :prop = "'condition.' + index + '.ruleSymbol'"
            :rules = "{required: true, message: '请选择符号', trigger: 'change'}"
            >
            <el-select
              v-model="cond.ruleSymbol"
              placeholder="请选择">
                <el-option label="大于" value=">"></el-option>
                <el-option label="小于" value="<"></el-option>
                <el-option label="等于" value="=="></el-option>
                <el-option label="大于等于" value=">="></el-option>
                <el-option label="不能于" value="!="></el-option>
                <el-option label="小于等于" value="<="></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            :prop = "'condition.' + index + '.ruleValue'"
            :rules = "{required: true, message: '值不能为空', trigger: 'blur'}"
            >
            <el-input v-model="cond.ruleValue"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.prevent="removeDomain(cond)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button @click="addCondition(row.formulaNo)">新增条件</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </fieldset>
    <el-row>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm(row, 'dynamicValidateForm')">更新</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import moment from 'moment'
import ruleApi from '@/api/list'
export default {
  props: ['row', 'second'],
  data () {
    return {
      // 下拉列表OPTION
      options: [],
      optionLoading: false,
      dynamicValidateForm: {
        logicSymbol: '',
        ruleMachineVariates: [],
        condition: []
      }
    }
  },
  watch: {
    row () {
      this.dynamicValidateForm.condition = []
      this.dynamicValidateForm.ruleMachineVariates = this.row.ruleMachineVariates
    }
  },
  methods: {
    // 更新条件
    submitForm (row, formName, type = 'save') {
      let level2Id = this.$route.query.id
      if (!level2Id) {
        return false
      }
      // console.log(type)
      if (type !== 'del') { // 只有修改和保存的时候验证符号, 删除的时候不验证
        if (row.logicSymbol === 'null' || !row.logicSymbol) {
          this.$message.warning({
            message: '请选择执行条件'
          })
          return false
        }
      }
      if (row.ruleMachineVariates.length === 0 && this.dynamicValidateForm.condition.length === 0) {
        this.$message.warning({
          message: '请添加条件'
        })
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: '正在更新数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let ruleProp = this.second.ruleResult === 'refuse' ? 0 : 1 // 第二级的决策结果
      let ruleArr = []
      // 已有的条件列表
      if (row.ruleMachineVariates.length > 0) {
        row.ruleMachineVariates.forEach(item => {
          let ruleParamsList = {}

          ruleParamsList.paramId = item.paramId
          ruleParamsList.paramNo = item.paramNo
          ruleParamsList.paramName = item.paramName
          ruleParamsList.isUsed = item.isUsed
          ruleParamsList.threshold = item.paramValue
          ruleParamsList.paramSymbol = item.paramSymbol
          ruleParamsList.ruleProp = ruleProp

          // ruleParamsList.paramId = item.paramId
          // ruleParamsList.paramName = item.paramName
          // ruleParamsList.paramNo = item.paramNo
          // ruleParamsList.paramSymbol = item.paramSymbol
          // ruleParamsList.paramValue = item.paramValue
          // ruleParamsList.valueType = item.valueType
          // ruleParamsList.isUsed = item.isUsed
          ruleArr.push(ruleParamsList)
        })
      }
      // 新添加的条件列表
      if (this.dynamicValidateForm.condition.length > 0) {
        console.log(this.dynamicValidateForm.condition)
        this.dynamicValidateForm.condition.forEach(item => {
          let ruleParamsList = {}
          let ruleObj = item.ruleObj.split(',')

          ruleParamsList.paramId = ''
          ruleParamsList.paramName = ruleObj[1]
          ruleParamsList.paramNo = ruleObj[0]
          ruleParamsList.isUsed = item.isUsed
          ruleParamsList.threshold = item.ruleValue
          ruleParamsList.paramSymbol = item.ruleSymbol
          ruleParamsList.ruleProp = ruleProp

          // ruleParamsList.paramId = ''
          // ruleParamsList.paramName = ruleObj[1]
          // ruleParamsList.paramNo = ruleObj[0]
          // ruleParamsList.paramSymbol = item.ruleSymbol
          // ruleParamsList.paramValue = item.ruleValue
          // ruleParamsList.valueType = '1'
          // ruleParamsList.isUsed = '1'
          ruleArr.push(ruleParamsList)
        })
      }
      if (ruleArr.length === 0) {
        this.$message.warning({
          message: '请选择新增条件'
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(row)
          ruleApi['RULES_ADDPARAM_NEW']({
            id: level2Id,
            formulaId: row.formulaId,
            appId: this.second.appId,
            ruleId: this.second.ruleId,
            versionNum: this.second.versionNum,
            rulePurpose: this.second.rulePurpose,
            logicSymbol: row.logicSymbol,
            failureTime: row.failureTime,
            ruleParamsList: JSON.stringify(ruleArr)
          }).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.$emit('change')
              this.$message.warning({
                message: '更新成功！'
              })
              loading.close()
            } else {
              loading.close()
            }
          }).catch(error => {
            console.log(error)
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消条件
    resetForm () {
      this.$refs['dynamicValidateForm'].resetFields()
      this.dynamicValidateForm.condition = []
    },
    // 删除已有的条件
    removeRule (row, value) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        value.isUsed = '0'
        this.submitForm(row, 'dynamicValidateForm', 'del')
      }).catch(() => {
      })
    },
    // 删除新增的条件
    removeDomain (cond) {
      let condition = this.dynamicValidateForm.condition
      condition.splice(condition.findIndex(item => item.ruleId === cond.ruleId), 1)
    },
    // 新增条件
    addCondition (no) {
      this.dynamicValidateForm.condition.push({
        ruleId: moment(Date.now()).format('YYYYMMDDHHmmss'),
        ruleName: '',
        ruleNo: '',
        ruleObj: '',
        ruleSymbol: '',
        ruleValue: ''
      })
      // console.log(this.dynamicValidateForm.condition)
    },
    handleChangeOption (val) {
      console.log(val)
    },
    // 条件配置选择下拉
    getOption (query) {
      if (query !== '') {
        this.optionLoading = true
        ruleApi['RULES_SELPARAM_NEW']({
          paramName: query
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            this.optionLoading = false
            this.options = result.datas
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.options = []
      }
    }
  },
  updated () {
    // console.log('4级列表Updated')
  },
  mounted () {
    // console.log('4级列表Mounted')
  },
  created () {
    // 验证时用
    // console.log(this.row)
    this.dynamicValidateForm.ruleMachineVariates = this.row.ruleMachineVariates
    // this.getOption()
    // console.log('4级列表Created')
    // console.log(this.dynamicValidateForm.ruleMachineVariates)
  }
}
</script>

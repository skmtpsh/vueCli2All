<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标签名称" prop="labelName">
        <el-input v-model="form.labelName" maxlength="5" :disabled="!!this.row.id" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="标签备注">
        <el-input type="textarea" maxlength="200" v-model="form.remark" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import productApi from '@/api/product'
import { dialogMixin } from '@/views/component/mixin'
export default {
  mixins: [dialogMixin],
  props: ['show', 'row'],
  data () {
    return {
      // dialogVisible: false,
      form: {
        labelName: '',
        remark: ''
      },
      rules: {
        labelName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入标签备注', trigger: 'blur' }
        ]
      },
      title: '添加标签'
    }
  },
  methods: {
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let labelId = this.row.id
          let reqCommond = labelId ? 'TAGS_MOD' : 'TAGS_ADD'
          productApi[reqCommond](Object.assign(
            this.form,
            {labelId}
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
      if (this.row.id) {
        this.form = this.row
        this.title = '修改标签'
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

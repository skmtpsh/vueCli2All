<template>
  <el-dialog
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="频道名称" prop="channelName">
        <el-input v-model="form.channelName" maxlength="6" :disabled="!!this.row.id" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="频道优先级" prop="channelPriority">
        <el-input-number v-model="form.channelPriority" :min="1" :max="1000" controls-position="right" label="描述文字"  style="width:50%"></el-input-number>
      </el-form-item>
      <el-form-item label="备注">
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
        channelName: '',
        channelPriority: 1,
        remark: ''
      },
      rules: {
        channelName: [
          { required: true, message: '请输入频道名称', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        channelPriority: [
          { required: true, message: '请输入频道优先级', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      title: '添加频道'
    }
  },
  methods: {
    // 处理保存信息
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let channelId = this.row.id
          let reqCommond = channelId ? 'CHANNEL_MOD' : 'CHANNEL_ADD'
          productApi[reqCommond](Object.assign(
            this.form,
            {channelId}
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
        this.title = '修改频道'
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

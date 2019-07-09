<template>
<div>
  <div class="filter-box">
    <el-button type="primary" icon="el-icon-circle-plus" size="mini" round @click="addNotice">添加公告</el-button>
  </div>
  <el-table
    header-row-class-name="headname"
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        {{ props.row.noticeContent }}
      </template>
    </el-table-column>
    <el-table-column
      width=""
      label="公告标题"
      prop="noticeTitle">
    </el-table-column>
    <el-table-column
      width="180"
      label="操作">
      <template slot-scope="props">
        <el-button type="primary" size="mini" icon="el-icon-edit" round @click.native="handleEdit(props.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" round @click.native="handleDel(props.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="添加/编辑公告"
    :visible.sync="dialogVisible"
    @close= "handleClose"
    width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSaveNotice">发布</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</div>
</template>
<script>
import siteApi from '@/api/site'
import Editor from '@/components/editor'
export default {
  components: {
    Editor
  },
  data () {
    return {
      action: 'add',
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      tableData: [],
      loading: false,
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.clearForm()
    },
    clearForm () {
      this.form.title = ''
      this.form.content = ''
      this.$refs['form'].resetFields()
    },
    handleChange (value) {
      this.form.content = value
    },
    addNotice () {
      if (this.length > 9) {
        this.$message.error('添加公告已达上限，不可继续添加')
        return false
      }
      this.actionId = ''
      this.dialogVisible = true
    },
    handleEdit (id) {
      this.dialogVisible = true
      this.actionId = id
      siteApi['NOTICEVIEW']({
        id
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.form.title = result.datas.noticeTitle
          this.form.content = result.datas.noticeContent
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleDel (id) {
      this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        siteApi['NOTICEDEL']({
          id
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            this.getList()
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    onSaveNotice () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          siteApi[this.actionId ? 'NOTICEMOD' : 'NOTICEADD'](Object.assign({
            noticeTitle: this.form.title,
            noticeContent: this.form.content
          }, this.actionId ? {id: this.actionId} : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.dialogVisible = false
              this.getList()
            } else {
              this.$message.error('标题长度不能大于30，内容长度不能大于500')
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList () {
      this.loading = true
      siteApi['NOTICELIST']({
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.length = result.datas.length
          this.tableData = result.datas.splice(0, 10)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>

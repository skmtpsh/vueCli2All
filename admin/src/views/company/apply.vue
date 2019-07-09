<template>
  <div>
    <!-- <div class="filter-box">
      <el-button type="primary" icon="el-icon-circle-plus" size="mini" round @click="addNotice">创建企业</el-button>
    </div> -->
    <el-form :inline="true" :model="formInline" ref="formInline" size="mini" >
      <el-row>
        <el-col :lg="24" >
          <el-form-item label="申请时间：" prop="date">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="formInline.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公司名称：" prop="businessName">
            <el-input v-model="formInline.businessName" placeholder="公司名称" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactMan">
            <el-input v-model="formInline.contactMan" placeholder="联系人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-search" round @click.native='onSearch'>查询</el-button>
            <el-button type="success" icon="el-icon-upload2" round @click.native='onExport'>导出</el-button>
            <el-button type="info" icon="el-icon-circle-close-outline" round @click.native="resetFilter">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      header-row-class-name="headname"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="订单号"
        prop="orderId">
      </el-table-column>
      <el-table-column
        label="公司名称"
        prop="businessName">
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="contactMan">
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="contactManMobile">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="contactManMail">
      </el-table-column>
      <el-table-column
        label="申请时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="statusString">
      </el-table-column>
      <el-table-column
        width="280"
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="mini" icon="el-icon-edit" round v-if="props.row.status == '0'" @click.native="handleEdit(props.row)">同意创建</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" round v-if="props.row.status == '0'" @click.native="handleRefuse(props.row.id)">拒绝取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
    <el-dialog
    title="创建企业"
    :visible.sync="dialogVisibleAdd"
    width="50%">
      <el-form ref="form" :model="form" label-width="80px" :rules='rules'>
        <el-form-item label="公司名称" prop="businessName">
          <el-input v-model="form.businessName" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactMan">
          <el-input v-model="form.contactMan" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="业务邮箱" prop="contactEmail">
          <el-input v-model="form.contactEmail" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyPhone">
          <el-input v-model="form.companyPhone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号码" prop="contactManMobile">
          <el-input v-model="form.contactManMobile" disabled=""></el-input>
        </el-form-item> -->
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="form.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="contactQQ">
          <el-input v-model="form.contactQQ"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSaveNotice">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>
<script>
// import moment from 'moment'
import companyApi from '@/api/company'
import {exportExcel} from '@/utils/common'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      formInline: {
        // date: [moment().subtract('month', 1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: '',
        businessName: '',
        contactMan: ''
      },
      form: {
        businessName: '',
        contactMan: '',
        contactManMobile: '',
        companyTel: '',
        companyAddress: '',
        contactPhone: '',
        contactEmail: '',
        contactQQ: ''
      },
      rules: {
        businessName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyPhone: [
          { required: false },
          {
            pattern: /^\d{3}(-)?\d{8}|\d{4}(-)?\d{7}$/,
            message: '请输入正确的公司电话'
          }
        ],
        companyTel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {validator: function (rule, value, callback) {
            if (/^1[34578]\d{9}$/.test(value) === false) {
              callback(new Error('请输入正确的手机号'))
            } else {
              callback()
            }
          },
          trigger: 'blur'}
        ],
        companyAddress: [
          { required: false }
        ],
        contactMan: [
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
          { required: false },
          {
            pattern: /^\d{4,}$/,
            message: '请输入正确的QQ号'
          }
        ]
      },
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      dialogVisible: false,
      loading: false,
      contactManQq: '',
      dialogVisibleAdd: false,
      actionId: '',
      statusString: ''
    }
  },
  methods: {
    getParam () {
      return {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        businessName: this.formInline.businessName,
        businessId: this.formInline.businessId,
        contactMan: this.formInline.contactMan,
        startDate: this.formInline.date ? this.formInline.date[0] : '',
        endDate: this.formInline.date ? this.formInline.date[1] : ''
      }
    },
    getList () {
      this.loading = true
      companyApi['COMPANYAPPLYLIST'](this.getParam()).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.list
          this.tableTotal = result.datas.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSaveNotice () {
      this.$refs['form'].validate((valid) => {
        companyApi['COMPANYSAVE']({
          applyId: this.applyId,
          businessName: this.form.businessName,
          businessTelephone: this.form.companyPhone,
          businessMobile: this.form.contactManMobile,
          businessAddr: this.form.companyAddress,
          contactMan: this.form.contactMan,
          contactManMobile: this.form.contactPhone,
          contactManMail: this.form.contactEmail,
          contactManQq: this.form.contactQQ
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            this.dialogVisibleAdd = false
            this.getList()
          } else {
            this.$message.error(result.message)
            // this.errorTxt = result.message
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    handleEdit (row) {
      console.log(row)
      this.applyId = row.id
      this.dialogVisibleAdd = true
      this.form.businessName = row.businessName
      this.form.contactMan = row.contactMan
      this.form.contactManMobile = row.contactManMobile
      this.form.contactEmail = row.contactManMail
      this.form.contactPhone = row.contactManMobile
    },
    handleRefuse (id, status = 2) {
      companyApi['COMPANYAPPLYREFUSE']({
        id,
        status
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleClose () {
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    resetFilter () {
      this.$refs['formInline'].resetFields()
      this.getList()
    },
    addNotice () {
      this.dialogVisible = true
    },
    onSearch () {
      this.getList()
    },
    onExport () {
      if (this.formInline.date.length === 0) {
        Message.warning({
          message: '请选择申请时间'
        })
        return false
      }
      if (this.tableData.length === 0) {
        Message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      companyApi['COMPANYAPPLYEXPORT'](this.getParam()).then(response => {
        let result = response.data
        exportExcel(result)
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

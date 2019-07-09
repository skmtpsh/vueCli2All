<template>
  <div>
    <!-- <div class="filter-box">
      <el-button type="primary" icon="el-icon-circle-plus" size="mini" round @click="addNotice">创建企业</el-button>
    </div> -->
    <el-form :inline="true" ref="formInline" :model="formInline" size="mini" >
      <el-row>
        <el-col :lg="24" >
          <el-form-item label="创建时间：" prop="date">
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
          <el-form-item label="公司ID：" prop="businessId">
            <el-input v-model="formInline.businessId" placeholder="公司ID"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：" prop="businessName">
            <el-input v-model="formInline.businessName" placeholder="公司名称" style="width: 280px"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactMan">
            <el-input v-model="formInline.contactMan" placeholder="联系人"></el-input>
          </el-form-item>
            <el-button type="danger" size="mini" icon="el-icon-search" round @click.native='onSearch'>查询</el-button>
            <el-button type="success" size="mini" icon="el-icon-upload2" round @click.native='onExport'>导出</el-button>
            <el-button type="info" size="mini" icon="el-icon-circle-close-outline" round @click.native="resetFilter">重置</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="text-align:left;">
          <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus" size="mini" round @click="addNotice">创建企业</el-button>
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
        fixed
        label="公司名称"
        prop="businessName">
        <template slot-scope="props">
          <el-tag class="companyName" size="mini" round @click.native="handleShowInfo(props.row.appId)">{{props.row.businessName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="公司ID"
        prop="businessId">
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="contactMan">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="最后登录时间"
        prop="lastLoginTime">
        <template slot-scope="props">
          {{props.row.lastLoginTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="最后登录IP"
        prop="lastLoginIp">
      </el-table-column>
      <el-table-column
        label="AppId"
        prop="appId">
      </el-table-column>
      <el-table-column
        width="220"
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="mini" icon="el-icon-edit" round @click.native="handleEdit(props.row.appId,props.row.id)">编辑</el-button>
          <el-switch
          inactive-value="0"
          active-value="1"
          active-text="启用"
          inactive-text="关闭"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          v-model="props.row.isAllow"
          @change="setIsOpen(props.row.isAllow, props.row.id)"></el-switch>
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
    <diaCompany :show.sync='dialogVisible' @change="handleChangeCom" v-if="dialogVisible" />
    <diaCompanyInfo :show.sync='dialogVisibleInfo' :appId="infoId" v-if="dialogVisibleInfo" />
    <el-dialog
    title="修改企业"
    :visible.sync="dialogVisibleAdd"
    width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公司名称" prop="companyTitle">
          <el-input v-model="form.companyTitle" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactUser">
          <el-input v-model="form.contactUser"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="业务邮箱" prop="contactEmail">
          <el-input v-model="form.contactEmail"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyPhone">
          <el-input v-model="form.companyPhone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号码" prop="companyTel">
          <el-input v-model="form.companyTel" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="form.companyAddress"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="contactQQ">
          <el-input v-model="form.contactQQ"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSaveNotice">确认修改</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>
<script>
// import moment from 'moment'
import companyApi from '@/api/company'
import diaCompany from './components/dialogCompany'
import diaCompanyInfo from './components/dialogCompanyInfo'
import {exportExcel} from '@/utils/common'
import { Message } from 'element-ui'
export default {
  components: {
    diaCompany,
    diaCompanyInfo
  },
  data () {
    return {
      formInline: {
        // date: [moment().subtract('month', 1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: [],
        businessName: '',
        businessId: '',
        contactMan: ''
      },
      form: {
        companyTitle: '',
        companyPhone: '',
        // companyTel: '',
        companyAddress: '',
        contactUser: '',
        contactPhone: '',
        contactEmail: '',
        contactQQ: '',
        id: ''
      },
      rules: {
        companyTitle: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyPhone: [
          { required: false, message: '请输入公司电话', trigger: 'blur' },
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
          { required: false, message: '请输入公司地址', trigger: 'blur' }
        ],
        contactUser: [
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
          { required: false, message: '请输入业务QQ', trigger: 'blur' },
          {
            pattern: /^\d{4,}$/,
            message: '请输入正确的QQ号'
          }
        ]
      },
      infoId: '',
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      dialogVisibleAdd: false,
      dialogVisible: false,
      dialogVisibleInfo: false,
      loading: false
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
    onSaveNotice () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          companyApi['NOTICEADD'](Object.assign({
            id: this.id,
            businessName: this.form.companyTitle,
            businessTelephone: this.form.companyPhone,
            businessMobile: this.form.companyTel,
            businessAddr: this.form.companyAddress,
            contactMan: this.form.contactUser,
            contactManMobile: this.form.contactPhone,
            contactManMail: this.form.contactEmail,
            contactManQq: this.form.contactQQ
          }, this.actionId ? {id: this.userId} : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.dialogVisibleAdd = false
              this.getList()
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
      companyApi['COMPANYLIST'](this.getParam()).then(response => {
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
    handleSizeChange (val) {
      this.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleChangeCom () {
      this.getList()
    },
    handleShowInfo (appId) {
      this.infoId = appId
      this.dialogVisibleInfo = true
    },
    handleEdit (appId, id) {
      this.dialogVisibleAdd = true
      this.actionId = appId
      this.userId = id
      companyApi['NOTICEVIEW']({
        appId,
        id
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.form.companyPhone = result.datas.businessTelephone
          this.form.companyTitle = result.datas.businessName
          this.form.companyTel = result.datas.businessMobile
          this.form.companyAddress = result.datas.businessAddr
          this.form.contactUser = result.datas.contactMan
          this.form.contactPhone = result.datas.contactManMobile
          this.form.contactEmail = result.datas.contactManMail
          this.form.contactQQ = result.datas.contactManQq
        }
      }).catch(error => {
        console.log(error)
      })
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
    downLoad (data) {

    },
    onExport () {
      if (this.formInline.date.length === 0) {
        Message.warning({
          message: '请选择创建时间'
        })
        return false
      }
      if (this.tableData.length === 0) {
        Message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      companyApi['COMPANYEXPORT'](this.getParam()).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    setIsOpen (isAllow, id) {
      companyApi['COMPANYALLOW']({
        id,
        isAllow
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          // this.getList()
        } else {
          Message.warning({
            message: result.message
          })
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
  .companyName:hover {
    cursor: pointer;
  }
</style>

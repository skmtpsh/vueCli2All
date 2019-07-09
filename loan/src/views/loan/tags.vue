<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="关键词：" prop="labelName">
        <el-input v-model="form.labelName" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="date">
        <!-- <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker> -->
        <el-date-picker
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          type="daterange"
          align="left"
          unlink-panels
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <!-- <el-button type="danger" icon="el-icon-upload2" @click.native='onAdd'>添加产品</el-button> -->
      </el-form-item>
    </el-form>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onAdd'>添加标签</el-button>
      </el-col>
    </el-row>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <el-table-column
        label="标签编号"
        prop="labelCode">
      </el-table-column>
      <el-table-column
        label="标签名称"
        prop="labelName">
      </el-table-column>
      <el-table-column
        label="标签备注"
        prop="remark">
      </el-table-column>
      <el-table-column
        width="180"
        label="创建时间">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="isEnable"
        label="状态">
        <template slot-scope="props">
          <el-switch
          active-value='1'
          inactive-value='0'
          active-text="启用"
          inactive-text="关闭"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="props.row.isEnable"
          @change="setIsOpen(props.row.isEnable, props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>查看</el-button> -->
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>编辑</el-button>
          <!-- <el-button @click="handleDel(scope.row)"  size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.tableTotal">
    </el-pagination>
    <dialogChannel :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </div>
</template>
<script>
import moment from 'moment'
import dialogChannel from './component/dialogTags'
import productApi from '@/api/product'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
    dialogChannel
  },
  data () {
    return {
      // 查询条件相关
      form: {
        labelName: '',
        date: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      },
      rules: {
        labelName: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请输入日期', trigger: 'change' }
        ]
      },
      // 修改
      modRow: {}
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      return Object.assign({
        startDate: this.form.date.length > 0 ? this.form.date[0] : '',
        endDate: this.form.date.length > 0 ? this.form.date[1] : '',
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }, this.form)
    },
    // 启用开关
    setIsOpen (isEnable, row) {
      this.upDateList(row, {isEnable, labelId: row.id})
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      productApi['TAGS_STATUS'](Object.assign({}, updateObj)).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getSyncList()
        } else {
          this.$message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      productApi['TAGS_LIST'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.page.loading = false
          this.page.tableData = result.datas.datalist
          this.page.tableTotal = result.datas.rsCount
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getSyncList()
  }
}
</script>

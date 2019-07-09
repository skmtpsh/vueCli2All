<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="关键词：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="银行名称：" prop="bankName">
        <el-select
          style="width:100%"
          v-model="form.bankName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入银行名称"
          :loading="selLoading"
          @change='handleChangeOption'>
          <el-option key="全部" label="全部" value=""></el-option>
          <el-option
            v-for="item in bankOptions"
            :key="item.dicCode"
            :label="item.dicName"
            :value="item.dicCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onAdd'>添加新商户</el-button>
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
        label="银行名称"
        prop="bankName">
      </el-table-column>
      <el-table-column
        width="120"
        label="联系人"
        prop="contactMan">
      </el-table-column>
      <el-table-column
        width="120"
        label="手机号码"
        prop="mobile">
      </el-table-column>
      <el-table-column
        width="180"
        label="创建时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="状态"
        prop="deleteTime">
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
import dialogChannel from './component/dialogBank'
import cardsApi from '@/api/cards'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
    dialogChannel
  },
  data () {
    return {
      // 下拉框loading
      selLoading: false,
      bankOptions: [],
      // 查询条件相关
      form: {
        bankName: '',
        keyWord: ''
      },
      rules: {
      },
      // 修改
      modRow: {}
    }
  },
  watch: {
    'page.tableTotal': { // 监听添加数据加载 对接销售
      handler (newValue, oldValue) {
        // this.getBankOption()
      },
      deep: true
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      return Object.assign({
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }, this.form)
    },
    // 下拉框
    handleChangeOption (val) {
    },
    // banK Name
    getBankOption (query = '') {
      // if (query !== '') {
      cardsApi['BANKMERCHANT_BANKS']().then(response => {
        const result = response.data
        if (result.code === 200) {
          this.bankOptions = result.datas
          // this.getSyncList()
        } else {
          this.bankOptions = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 启用开关
    setIsOpen (isEnable, row) {
      this.upDateList(row, {isEnable, id: row.id})
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      cardsApi['BANKMERCHANT_HANDLE'](Object.assign({}, updateObj)).then(response => {
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
      cardsApi['BANKMERCHANT_LIST'](Object.assign(
        this.getParam(),
        option
      )).then(response => {
        this.page.loading = false
        const result = response.data
        if (result.code === 200) {
          this.page.tableData = result.datas.datalist
          this.page.tableTotal = result.datas.rsCount
        }
      }).catch(error => {
        this.page.loading = false
        console.log(error)
      })
    }
  },
  created () {
    this.getBankOption()
    this.getSyncList()
  }
}
</script>

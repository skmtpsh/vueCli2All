<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="24">
        <div class="tip" style="padding:1rem;">商户：<strong>{{$route.query.com}}</strong> 产品：<strong>{{$route.query.pro}}</strong></div>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="渠道名称：" prop="canalName">
        <el-input v-model="form.canalName" placeholder="请输入渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="对接销售：" prop="saleName">
        <el-input v-model="form.saleName" placeholder="请输入对接销售"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <!-- <el-button type="danger" icon="el-icon-upload2" @click.native='onAdd'>添加产品</el-button> -->
      </el-form-item>
    </el-form>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onAdd'>添加分发URL</el-button>
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onExport'>导出Excel</el-button>
        <el-button size="small" type="danger" icon="el-icon-back" style="float:right;" @click.native='onBack'>返回</el-button>
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
        width="80"
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        width="90"
        label="分发类型"
        prop="distributeMode">
      </el-table-column>
      <el-table-column
        label="URL\处理模块"
        prop="distributeLink">
        <template slot-scope="props">
          <span class="copy">{{props.row.distributeLink}}</span>
          <el-button class="btn" size="mini" :data-clipboard-text="props.row.distributeLink" v-copy>复制</el-button>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="开通时间"
        prop="createTime">
        <template slot-scope="props">
          {{props.row.createTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width="260"
        label="渠道"
        prop="canalName">
      </el-table-column>
      <el-table-column
        width="120"
        label="状态"
        prop="isEnable">
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
        width="80"
        label="对接销售"
        prop="saleName">
      </el-table-column>
      <!-- <el-table-column
        width="80"
        label="统计"
        prop="id">
      </el-table-column> -->
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-view" type="primary" :disabled="scope.row.canalIsEnable === '0'" plain>编辑</el-button>
          <el-button @click="handleDel(scope.row)" size="mini" icon="el-icon-view" type="danger" plain>删除</el-button>
          <!-- <el-button @click="handleDistri(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>统计</el-button> -->
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
    <dialogLink :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </div>
</template>
<script>
import distributeApi from '@/api/distribute'
import dialogLink from './component/dialogLink'
import { pageMixin } from '@/views/component/mixin'
import {exportExcel} from '@/utils/common'
export default {
  mixins: [pageMixin],
  components: {
    dialogLink
  },
  data () {
    return {
      // 查询条件相关
      form: {
        canalName: '',
        saleName: ''
      },
      rules: {
      },
      // 修改
      modRow: {}
    }
  },
  watch: {
    'page.tableTotal': { // 监听添加数据加载 对接销售 ?
      handler (newValue, oldValue) {
        // this.getSalesOption()
      },
      deep: true
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      let productLinkId = this.$route.query.proid
      return {
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage,
        productLinkId
      }
    },
    onBack () {
      this.$router.push({path: '/mobile/distribute'})
    },
    // 导出excel
    onExport () {
      if (this.page.tableData.length === 0) {
        this.$message.warning({
          message: '没有要导出的数据'
        })
        return false
      }
      distributeApi['DISTRIBUTE_LINK_EXPORT'](Object.assign(
        this.getParam(),
        this.form
      )).then(response => {
        let result = response.data
        exportExcel(result)
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除
    handleDel (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDateList(row, {isDel: 1, distributeLinkCode: row.distributeLinkCode})
      }).catch(() => {
      })
    },
    // 启用开关
    setIsOpen (isEnable, row) {
      this.upDateList(row, {isEnable, distributeLinkCode: row.distributeLinkCode})
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      let apiType = 'DISTRIBUTE_LINK_STATUS'
      if (updateObj.isDel === 1) {
        apiType = 'DISTRIBUTE_LINK_DEL'
      }
      distributeApi[apiType](Object.assign({}, updateObj)).then(response => {
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
      distributeApi['DISTRIBUTE_LINK_LSITS'](Object.assign(
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

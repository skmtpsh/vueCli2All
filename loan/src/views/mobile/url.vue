<template>
  <div>
    <!-- <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="甲方名称：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入甲方名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <el-button type="danger" icon="el-icon-upload2" @click.native='onAdd'>添加产品</el-button>
      </el-form-item>
    </el-form> -->
    <el-row style="margin-bottom: 20px;">
      <el-col :span="24">
        <div class="tip" style="padding:1rem;">商户：<strong>{{$route.query.com}}</strong> 产品：<strong>{{$route.query.pro}}</strong></div>
      </el-col>
    </el-row>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click.native='onAdd'>添加URL</el-button>
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
        width="40"
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        width="60"
        label="链接类型"
        prop="linkTypeName">
      </el-table-column>
      <el-table-column
        label="URL\处理模块"
        prop="productLink">
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
        label="统计"
        prop="id">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>编辑</el-button>
          <el-button @click="handleDel(scope.row)" size="mini" icon="el-icon-view" type="danger" plain>删除</el-button>
          <!-- <el-button @click="handleDistri(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>分发管理</el-button> -->
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
    <dialogUrl :show.sync='dialog.visible' @change="handleDialogChange" :row.sync='modRow' v-if="dialog.visible" />
  </div>
</template>
<script>
import distributeApi from '@/api/distribute'
import dialogUrl from './component/dialogUrl'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
    dialogUrl
  },
  data () {
    return {
      // 查询条件相关
      form: {
        keyWord: ''
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
      let productCode = this.$route.query.procode
      return {
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage,
        productCode
      }
    },
    onBack () {
      this.$router.push({path: '/mobile/distribute'})
    },
    // 删除
    handleDel (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDateList(row, {isDel: 1, productLinkId: row.productLinkId})
      }).catch(() => {
      })
    },
    // 启用开关
    setIsOpen (isEnable, row) {
      this.upDateList(row, {isEnable, productLinkId: row.productLinkId})
    },
    // 更新接口数据
    upDateList (row, updateObj = {}) {
      // 需要传多个额外参数的时候需要用到 assign
      let apiType = 'DISTRIBUTE_URL_STATUS'
      if (updateObj.isDel === 1) {
        apiType = 'DISTRIBUTE_URL_DEL'
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
      distributeApi['DISTRIBUTE_URL_LSITS'](Object.assign(
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

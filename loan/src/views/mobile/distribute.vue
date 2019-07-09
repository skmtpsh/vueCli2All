<template>
  <div>
    <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
      <el-form-item label="甲方：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入甲方"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>查询</el-button>
        <el-button type="info" icon="el-icon-circle-close-outline" @click.native="onReset">重置</el-button>
        <!-- <el-button type="danger" icon="el-icon-upload2" @click.native='onAdd'>添加产品</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
      <el-table-column
        width="320"
        label="甲方"
        prop="merchantName">
      </el-table-column>
      <el-table-column
        width="220"
        label="产品"
        prop="productName">
      </el-table-column>
      <el-table-column
        width="90"
        label="类型"
        prop="linkTypeName">
      </el-table-column>
      <el-table-column
        label="URL"
        prop="productLink">
      </el-table-column>
      <el-table-column
        width="230"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>统计</el-button> -->
          <el-button @click="handleURL(scope.row)" size="mini" icon="el-icon-share" type="danger" plain>URL管理</el-button>
          <el-button @click="handleDistr(scope.row)" size="mini" icon="el-icon-document" type="warning" plain>分发管理</el-button>
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
  </div>
</template>
<script>
import distributeApi from '@/api/distribute'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
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
      return {
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      }
    },
    // URL 管理
    handleURL (row) {
      this.$router.push({path: 'url', query: {procode: row.productCode, com: row.merchantName, pro: row.productName}})
    },
    // 查看分发
    handleDistr (row) {
      this.$router.push({path: 'link', query: {proid: row.productLinkId, com: row.merchantName, pro: row.productName}})
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      distributeApi['DISTRIBUTE_LSITS'](Object.assign(
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

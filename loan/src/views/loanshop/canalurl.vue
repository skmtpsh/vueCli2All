<template>
  <div>
    <el-row style="margin:0px 0 10px;">
      <el-col :span="24" >
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
        label="产品名称"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="商户名称"
        prop="merchantName">
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
        label="分发方式名称"
        prop="distributeMode">
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
import companyApi from '@/api/company'
import { pageMixin } from '@/views/component/mixin'
export default {
  mixins: [pageMixin],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    // 公用分页参数
    getParam () {
      let canalId = this.$route.query.canalId
      return {
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage,
        canalId
      }
    },
    onBack () {
      this.$router.push({path: '/loanshop/company'})
    },
    // 查询
    getSyncList (option = {}) {
      this.page.loading = true
      companyApi['COMPANY_DISTRI_LSITS'](Object.assign(
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

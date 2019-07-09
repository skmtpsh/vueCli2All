<template>
  <div>
    <el-table
      header-row-class-name="headname"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        width=""
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        width=""
        label="请求时间">
        <template slot-scope="props">
          {{ props.row.requestTime | FilterTime}}
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="请求IP"
        prop="requestIp">
      </el-table-column>
      <el-table-column
        width=""
        label="描述"
        prop="description">
      </el-table-column>
      <el-table-column
        width=""
        label="操作信息">
        <template slot-scope="props">
          <div class="spantxt" v-if="props.row.level === 1">
            <span><b>名称：</b>{{ `${props.row.requestInfo.ruleAppName}` }}</span>
            <span><b>描述：</b>{{ `${props.row.requestInfo.ruleItem}` }}</span>
            <span><b>结果：</b>{{ `${props.row.requestInfo.ruleResult === 'pass' ? '通过' : '拒绝'}` }}</span>
            <span><b>状态：</b>{{ `${props.row.requestInfo.ruleStatus === '1' ? '开' : '关'}` }}</span>
          </div>
          <div class="spantxt" v-if="props.row.level === 2">
            <span><b>名称：</b>{{ `${props.row.requestInfo.ruleName}` }}</span>
            <span><b>策略编码：</b>{{ `${props.row.requestInfo.formulaPrex}` }}</span>
            <span><b>结果：</b>{{ `${props.row.requestInfo.ruleResult === 'pass' ? '通过' : '拒绝'}` }}</span>
            <span><b>状态：</b>{{ `${props.row.requestInfo.allStatus === '1' ? '开' : '关'}` }}</span>
          </div>
          <div class="spantxt" v-if="props.row.level === 3 && props.row.requestInfo.formulaName">
            <span><b>名称：</b>{{ `${props.row.requestInfo.formulaName}` }}</span>
            <span><b>拉黑天数：</b>{{ `${props.row.requestInfo.failureTime}` }}</span>
            <span><b>状态：</b>{{ `${props.row.requestInfo.status === '1' ? '开' : '关'}` }}</span>
          </div>
          <div class="spantxt" v-if="props.row.level === 3 && props.row.requestInfo.logicSymbol">
            <p>
             <b>操作符号：</b><span>{{ props.row.requestInfo.logicSymbol }}</span>
            </p>
            <p v-if="props.row.requestInfo.ruleParamsList"><b>操作内容：</b>
              <span  v-for="(item, index) in JSON.parse(props.row.requestInfo.ruleParamsList)" :key="index">
                [{{ item.paramName }}、
                {{ item.paramSymbol }}、
                {{ item.paramValue }}]
              </span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width=""
        label="requestMethod"
        prop="requestMethod">
      </el-table-column>
      <el-table-column
        width=""
        label="requestUrl"
        prop="requestUrl">
      </el-table-column>
      <el-table-column
        width=""
        label="requestClass"
        prop="requestClass">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
  </div>
</template>
<script>
import logApi from '@/api/log'
export default {
  data () {
    return {
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false
    }
  },
  methods: {
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getList () {
      this.loading = true
      logApi['RULESLOGLISTMANAGER']({
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.dataList
          this.tableTotal = result.datas.count
        } else {
          this.$message.warning({
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

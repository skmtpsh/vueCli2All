<template>
  <el-dialog
    title="查看日志"
    :visible="show"
    :before-close="handleClose"
    width="80%">
    <el-table
      header-row-class-name="headname"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        width="100"
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        width="150"
        label="请求时间"
        prop="requestTime">
        <template slot-scope="props">
          {{ props.row.requestTime | FilterTime}}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="请求IP"
        prop="requestIp">
      </el-table-column>
      <el-table-column
        width=""
        label="操作详情">
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
        width="240"
        label="操作动作"
        prop="type">
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
  </el-dialog>
</template>
<script>
import logApi from '@/api/log'
export default {
  props: ['show', 'row', 'level'], // 这时的ROW 是 当前规则的
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
    handleClose (done) {
      this.clearForm()
    },
    clearForm () {
      this.$emit('update:show', false)
      this.$emit('update:row', {})
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getList () {
      this.loading = true
      logApi['RULESLOGLIST'](Object.assign({
        level: this.level,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }, this.row.formulaId ? {
        formulaId: this.row.formulaId
      } : {
        id: this.row.id
      })).then(response => {
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
    },
    getParams () {
      return this.$route.query
    }
  },
  created () {
    this.getList()
  }
}
</script>

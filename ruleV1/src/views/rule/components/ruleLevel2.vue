<template>
<div v-loading="fullscreenLoading" style="position:relative; min-height:100px;">
  <el-alert
    style="min-height:100px;"
    v-if="lists.length === 0 && !fullscreenLoading"
    :closable="false"
    title="尚未添加策略"
    type="warning"
    center
    show-icon>
  </el-alert>
  <div v-for="(item, index) in lists" :key="index + item.id">
    <el-form label-position="" inline class="table-expand"  v-if="item.allDelete === '1'">
      <el-form-item label="策略名称：" style="">
        <el-button size="mini" round @click.native="handleShowChild(item.id, row.id)">{{item.ruleName}}</el-button>
        <!-- handleShowChild(item.id, item.ruleId, item.rulePurpose, item.versionNum) -->
      </el-form-item>
      <el-form-item label="规则用途：">
        <span>{{ item.rulePurpose === 'prod' ? '正式' : '预备-空跑' }}</span>
      </el-form-item>
      <el-form-item label="规则决策结果：" >
        <span>{{ item.ruleResult === 'pass' ? '通过' : '拒绝'}}</span>
      </el-form-item>
      <el-form-item label="版本号：" >
        <span>{{ item.versionNum }}</span>
      </el-form-item>
      <el-form-item label="状态：" >
        <el-switch
        active-value="1"
        inactive-value="0"
        active-text="启用"
        inactive-text="关闭"
        active-icon-class="switchOpen"
        inactive-icon-class="switchClose"
        active-color="#13ce66"
        inactive-color="#ff4949"
        v-model="item.allStatus"
        @change="setIsOpen(item.allStatus, item)"></el-switch>
      </el-form-item>
      <el-form-item label="操作：">
        <el-button-group>
          <!-- <el-tooltip class="item" effect="dark" content="添加" placement="top" :open-delay="0">
            <el-button size="mini" type="primary"><svg-icon icon-class="add" /></el-button>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :open-delay="0">
            <el-button @click.native="editRule(item)" size="mini" type="primary"><svg-icon icon-class="edit" /></el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="导入" placement="top">
            <el-button size="mini" type="warning"><svg-icon icon-class="export" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出" placement="top">
            <el-button size="mini" type="warning"><svg-icon icon-class="import" /></el-button>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="日志" placement="top" :open-delay="0">
            <el-button @click.native="viewLog(item)" size="mini" type="info"><svg-icon icon-class="log" /></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :open-delay="0">
            <el-button @click.native="delRule(item)" size="mini" type="danger"><svg-icon icon-class="del" /></el-button>
          </el-tooltip>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
  <dialogModRulesOne :show.sync='dialogVisible' @change="handleChangeRule" :row.sync='currentRow' v-if="dialogVisible" />
</div>
</template>
<script>
import { Message } from 'element-ui'
import ruleApi from '@/api/list'
import dialogModRulesOne from './dialogModRulesOne'
export default {
  components: {
    dialogModRulesOne
  },
  props: ['row'],
  data () {
    return {
      dialogVisible: false,
      currentRow: {},
      lists: [],
      fullscreenLoading: false
    }
  },
  watch: {
    row () {
      // console.log(this.scope)
      this.getList()
      // console.log(2)
    }
  },
  methods: {
    // 查看日志
    viewLog (row) {
      this.$emit('getId', row)
    },
    // 删除规则
    delRule (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateRule(row, {allDelete: '2'})
      }).catch(() => {
      })
    },
    // 跟新数据
    updateRule (row, updateObj) {
      ruleApi['RULESADDMOD'](Object.assign({}, row, updateObj)).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
          this.$message.warning({
            message: '更新成功！'
          })
        } else {
          Message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改之后刷新列表
    handleChangeRule () {
      this.getList()
    },
    // 编辑策略
    editRule (item) {
      console.log(item)
      if (item) {
        this.dialogVisible = true
        this.currentRow = item
      }
    },
    // 父层刷新列表
    getList () {
      // this.$emit('doList')
      this.fullscreenLoading = true
      ruleApi['RULESLISTLEVEL2']({
        id: this.row.id
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.fullscreenLoading = false
          this.lists = result.datas.datalist
        }
      }).catch(error => {
        this.fullscreenLoading = false
        console.log(error)
      })
    },
    // 启用开关
    setIsOpen (allStatus, row) {
      this.updateRule(row, {allStatus})
    },
    // 第三级路由页面
    handleShowChild (id, pid) {
      // this.$router.push({path: '/rules/rulechild', query: { id, ruleId, rulePurpose, versionNum}})
      this.$router.push({path: '/rules/rulechild', query: { id, pid }})
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  .table-expand {
    padding: 10px;
    font-size: 0;
    margin-bottom: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 5px #ccc;
    .el-form-item {
      margin-bottom: 0;
      width: 32%;
    }
  }
</style>

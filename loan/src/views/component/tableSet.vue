<template>
  <div>
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="page.loading"
      :data="page.tableData" >
    <template v-for="(item) in tableColumn">
      <el-table-column
        v-if="item.type === 'string'"
        :key="item.order"
        :label="item.label"
        :prop="item.prop">
      </el-table-column>
      <el-table-column
        v-if="item.type === 'time'"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop">
        <template slot-scope="props">
          {{props.row[item.prop] | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.type === 'switch'"
        :key="item.order"
        :label="item.label"
        :prop="item.prop">
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
          v-model="props.row[item.prop]"
          @change="setIsOpen(props.row[item.prop], props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.type === 'op'"
        :width="item.width"
        :label="item.label"
        :key="item.order">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>查看</el-button> -->
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>编辑</el-button>
          <!-- <el-button @click="handleDel(scope.row)"  size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button> -->
        </template>
      </el-table-column>
      </template>
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
export default {
  props: ['tableColumn', 'page'],
  data () {
    return {
    }
  },
  methods: {
    // 页面条数改变
    handleSizeChange (val) {
    },
    // 分页
    handleCurrentChange (val) {
      // this.page.pageSize = val
      // this.getSyncList()
      console.log(val)
      this.$emit('update:page.currentPage', val)
      this.$emit('changePage', val)
    },
    // 按钮处理
    handleEdit (row) {
      console.log(row)
      this.$emit('edit', row)
    }
  }
}
</script>

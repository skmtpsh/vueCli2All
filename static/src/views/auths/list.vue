<template>
  <div>
    <div class="filterBox">
      <el-form :inline="true" :model="form" ref="form" size="small" label-width="100px" >
        <el-row>
          <el-col :span="24" >
            <el-form-item prop="appName">
              <el-input v-model="form.appName" placeholder="产品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click.native='onSearch'>搜索</el-button>
              <el-button type="primary" icon="el-icon-edit-outline" @click="onAddApp">添加产品</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- max-height="1000" -->
    <el-table
      class="tableList"
      header-row-class-name="headname"
      style="width: 100%"
      stripe
      v-loading="loading"
      :data="tableData" >
      <el-table-column
        fixed="left"
        label="AppId"
        width="180"
        prop="appId">
      </el-table-column>
      <el-table-column
        label="产品名称"
        width="120"
        prop="name">
      </el-table-column>
      <el-table-column
        label="业务类型"
        width="120"
        prop="type">
        <template slot-scope="props">
          {{props.row.type | FilterType}}
        </template>
      </el-table-column>
      <el-table-column
        label="认证项">
        <template slot-scope="props">
          <el-tag v-for="(item) in props.row.basicList" :key="item" size="small">{{item}}</el-tag>
          <el-tag type="danger" v-for="(item) in props.row.advancedList" :key="item" size="small">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="产品类型"
        width="180"
        prop="appType">
        <template slot-scope="props"> {{props.row.appType}} </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="修改时间"
        prop="updateTime">
        <template slot-scope="props">
          {{props.row.updateTime | FilterTime }}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="产品状态"
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
          v-model="props.row.deleteTime"
          @change="setIsOpen(props.row.deleteTime, props.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-view" type="primary" plain>查看</el-button>
          <el-button @click="handleEdit(scope.row)" size="mini" icon="el-icon-edit" type="warning" plain>编辑</el-button>
          <el-button @click="handleDel(scope.row)"  size="mini" icon="el-icon-delete" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableTotal">
    </el-pagination>
    <div class="mainpage" :class="show ? 'show' : ''" >
      <main class="content">
        <div class="authBaseTit">
          <h2>产品详情</h2>
        </div>
        <ul class="authItem">
          <li>
            <p><b>AppId：</b><span style="color: #F56C6C">{{authList.appId}}</span></p>
          </li>
          <li>
            <p><b>产品名称：</b><span style="color: #67c23a">{{authList.name}}</span></p>
          </li>
          <li>
            <p><b>业务类型：</b><span style="color: #67c23a">{{authList.type | FilterType}}</span></p>
          </li>
        </ul>
      </main>
      <main class="content">
        <div class="authBaseTit">
          <h2>基础认证</h2>
        </div>
        <ul class="authItem">
          <li v-for="(item, index) in authList.basicList" :key="index">
            <p>{{item}}</p>
          </li>
        </ul>
      </main>
      <main class="content">
        <div class="authBaseTit">
          <h2>高级认证</h2>
        </div>
        <ul class="authItem">
          <li v-for="(item, index) in authList.advancedList" :key="index">
            <p>{{item}}</p>
          </li>
        </ul>
      </main>
      <el-button @click="show=false" type="danger" round icon="el-icon-circle-close" style="position:absolute; right:0px; bottom: 10px;">关闭</el-button>
    </div>
  </div>
</template>
<script>
import staticApi from '@/api/list'
// import View from './components/view'
export default {
  name: '',
  // components: {
  //   View
  // },
  data () {
    return {
      form: {
        appName: ''
      },
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      authList: {},
      show: false
    }
  },
  filters: {
    FilterType (status) {
      // 0短贷；1现金分期；2商品分期
      let strStatus = ''
      if (status === '0') {
        strStatus = '短贷'
      }
      if (status === '1') {
        strStatus = '现金分期'
      }
      if (status === '2') {
        strStatus = '商品分期'
      }
      if (status === '3') {
        strStatus = '认证集合'
      }
      return strStatus
    }
  },
  methods: {
    getParam () {
      return {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
    },
    onAddApp () {
      this.$router.push({path: '/auths/manage/add'})
    },
    // 查询
    onSearch () {
      this.getList(Object.assign(this.form, {}))
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList(Object.assign(this.form))
    },
    // 查看
    handleClick (row) {
      this.show = true
      this.authList = row
    },
    // 修改信息
    handleEdit (row) {
      this.$router.push({path: '/auths/manage/add', query: {appId: row.appId, type: row.type}})
    },
    // 删除
    handleDel (row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.upDateRule(row, {deleteStatus: 0, updateType: 'delete'})
      }).catch(() => {
      })

      // this.upDateRule(row, {isdelete: '2'})
    },
    // 启用开关
    setIsOpen (productStatus, row) {
      this.upDateRule(row, {productStatus, updateType: 'status'})
    },
    // 更新接口数据
    upDateRule (row, updateObj) {
      staticApi['STATICLISTADD'](Object.assign({appName: row.name, type: row.type}, updateObj)).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.getList()
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
    getList (option = {}) {
      this.loading = true
      staticApi['STATICLISTVERIFY'](Object.assign(
        option,
        this.getParam()
      )).then(response => {
        const result = response.data
        // console.log(result)
        if (result.code === 0) {
          this.loading = false
          this.tableData = result.data
          // console.log(this.tableData)
          this.tableTotal = result.count
        } else {
          this.loading = false
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
<style lang="scss" scoped>
.mainpage {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  // height: 100%;
  background-color: #fff;
  z-index: 1500;
  box-shadow: 0px 0px 15px #666;
  margin-right: -300px;
  -webkit-transition:margin .4s ease-out;
  &.show {
    margin-right: 0px;
  }
  .content {
    // margin-bottom: 20px;
    width: 300px;
    padding: 10px 20px 0;
    background-color: #fff;

    .authBaseTit {
      padding: 10px;
      h2 {
        margin: 0;
        font-size: 16px;
      }
    }
    .authItem {
      margin: 0;
      padding: 10px;
      li {
        display: flex;
        p {
          font-size: 14px;
          margin: 5px;
          color: #606266;
        }
      }
    }
  }
}
</style>

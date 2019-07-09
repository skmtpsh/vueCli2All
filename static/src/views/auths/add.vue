<template>
  <div style="position:relative">
    <!-- <span v-loading.fullscreen.lock="fullscreenLoading"></span> -->
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="产品名称" prop="appName">
        <el-select
          v-model="form.appName"
          placeholder="请输入产品名称" :disabled="!!$route.query.appId">
          <el-option
            v-for="item in options"
            :key="item.sn"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="type">
        <el-select placeholder="请选择业务类型" v-model="form.type" :disabled="!!$route.query.appId">
          <el-option label="短贷" value="0"></el-option>
          <el-option label="现金分期" value="1"></el-option>
          <el-option label="商品分期" value="2"></el-option>
          <el-option label="认证集合" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类型" prop="appType">
        <el-select placeholder="请选择产品类型" v-model="form.appType">
          <el-option label="APP产品" value="APP产品"></el-option>
          <el-option label="公众号产品" value="公众号产品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证项配置" prop="authBaseLists" style="position: relative">
        <!-- <el-input v-model="form.authBaseLists" style="display: none"></el-input> -->
        <div class="transfer-panel">
          <p class="transfer-panel-header">
            <!-- <el-checkbox v-model="checkUnAll" :indeterminate="isIndeterminate" @change="handleUnConfChange"></el-checkbox>  -->
            未配置
          </p>
          <div class="transfer-panel-body">
            <div class="transfer-panel-list" style="height: 420px;">
              <el-checkbox-group v-model="checkUnList" @change="checkUnListChange">
                <el-checkbox class="transfer-panel-item" v-for="(auth, index) in authUnLists" :label="auth" :key="index">{{auth}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="transfer-buttons">
          <el-button
            size="small"
            :disabled='leftBtn'
            class="transfer-button"
            type="primary"
            @click.native="addToLeft">
            <i class="el-icon-arrow-left"></i> 移除
          </el-button>
          <el-button
            size="small"
            :disabled='rightBtn'
            class="transfer-button"
            type="primary"
            @click.native="addToBase"> 初级
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <el-button
            size="small"
            :disabled='rightBtn'
            class="transfer-button"
            type="primary"
            @click.native="addToAdvance"> 高级 <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div class="transfer-panel">
          <p class="transfer-panel-header">
            <!-- <el-checkbox v-model="checkUnConf" :indeterminate="isIndeterminate" @change="handleUnConfChange"></el-checkbox>  -->
          已配置 </p>
          <div class="transfer-panel-body">
            <div class="transfer-panel-list">
              <h4 class="inner-tit">初级认证 <span style="float:right">{{baseCheck}}/{{form.authBaseLists.length}}</span></h4>
              <div class="transfer-panel-inner">
                <el-checkbox-group v-model="checkedBaseAuth" @change="handleBaseChange">
                  <div v-for="(auth, index) in form.authBaseLists" :key="index" class="boxAuth">
                    <span class="boxArr">{{index+1}}</span>
                    <el-checkbox class="transfer-panel-item" :label="auth">{{auth}}</el-checkbox>
                    <span class="boxOrder">
                      <i class="el-icon-caret-top" @click="orderUp(form.authBaseLists, index)"></i>
                      <i class="el-icon-caret-bottom" @click="orderDown(form.authBaseLists, index)"></i>
                    </span>
                  </div>
                </el-checkbox-group>
              </div>
              <h4 class="inner-tit">高级认证 <span style="float:right">{{advanceCheck}}/{{form.authAdvanceLists.length}}</span></h4>
              <div class="transfer-panel-inner">
                <el-checkbox-group v-model="checkedAdvanceAuth" @change="handleAdvanceChange">
                  <div v-for="(auth, index) in form.authAdvanceLists" :key="index" class="boxAuth">
                    <span class="boxArr">-</span>
                    <el-checkbox class="transfer-panel-item" :label="auth">
                      {{auth}}
                      <!-- <option-content >{{auth}}</option-content> -->
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="产品状态" prop="productStatus">
        <el-switch
          v-model="form.productStatus"
          active-value="1"
          inactive-value="0"
          active-icon-class="switchOpen"
          inactive-icon-class="switchClose"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="产品描述" prop="appDescription">
        <el-input v-model="form.appDescription" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// const authOptions = [
//   {key: 'statusCertification', label: '实名认证'},
//   {key: 'statusIdentity', label: '身份认证'},
//   {key: 'statusContacts', label: '紧急联系人认证'},
//   {key: 'statusBasic', label: '基本信息认证'},
//   {key: 'statusTelecomOperator', label: '运营商认证'},
//   {key: 'statusZhima', label: '芝麻信用认证'},
//   {key: 'statusTaobao', label: '淘宝认证'},
//   {key: 'statusInsure', label: '社保认证'},
//   {key: 'statusChsi', label: '学历认证'},
//   {key: 'statusBasicOther', label: '证件照认证'}
// ]
import staticApi from '@/api/list'
const authOptionsNormal = ['实名认证', '身份认证', '紧急联系人认证', '基本信息认证', '运营商认证', '芝麻信用认证', '淘宝认证', '社保认证', '学历认证', '证件照认证']
export default {
  data () {
    return {
      fullscreenLoading: false,
      options: [],
      authUnLists: [], // 左侧未配置项
      isIndeterminate: false,
      checkUnAll: false, // 全选

      checkUnList: [], // 未配置选项checked项
      checkedBaseAuth: [], // 基础选项checked项
      checkedAdvanceAuth: [], // 高级选项checked项

      // authBaseLists: [], // 基础选项保存项
      // authAdvanceLists: [], // 高级选项保存项

      loading: false,
      form: {
        appName: '',
        type: '',
        appType: '',
        productStatus: '1',
        appDescription: '',
        authBaseLists: [],
        authAdvanceLists: []
      },
      rules: {
        appName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入业务类型', trigger: 'blur' }
        ],
        appType: [
          { required: true, message: '请输入产品类型', trigger: 'blur' }
        ],
        productStatus: [
          { required: true, message: '请选择是否可用', trigger: 'change' }
        ],
        authBaseLists: [
          { required: true, message: '请选择配置项', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    filteredData () {
      return false
    },
    leftBtn () {
      return !(this.checkedBaseAuth.length > 0 || this.checkedAdvanceAuth.length > 0)
    },
    rightBtn () {
      return !(this.checkUnList.length > 0)
    },
    baseCheck () {
      return this.checkedBaseAuth.length
    },
    advanceCheck () {
      return this.checkedAdvanceAuth.length
    }
  },
  watch: {
    authUnLists (val, old) {
      // console.log(val, old)
    }
  },
  methods: {
    // 交换顺序
    swapOrder (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    // 排序升序
    orderUp (lists, index) {
      if (lists.length > 1 && index !== 0) {
        this.form.authBaseLists = this.swapOrder(lists, index, index - 1)
      }
    },
    // 排序降序
    orderDown (lists, index) {
      if (lists.length > 1 && index !== (lists.length - 1)) {
        this.form.authBaseLists = this.swapOrder(lists, index, index - 1)
      }
    },
    // 还原处理未配置数据
    clearDoData () {
      let currentValue = this.authUnLists.slice()
      // const itemsToBeMoved = []
      this.checkUnList.forEach(item => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      this.checkUnList = []
      this.authUnLists = currentValue
      // this.isIndeterminate = false
    },
    // 还原初级高级
    clearHasDoData () {
      // 还原初级
      if (this.checkedBaseAuth.length > 0) {
        this.checkedBaseAuth.forEach(item => {
          const index = this.form.authBaseLists.indexOf(item)
          if (index > -1) {
            this.form.authBaseLists.splice(index, 1)
          }
        })
        this.checkedBaseAuth = []
      }
      // 还原高级
      if (this.checkedAdvanceAuth.length > 0) {
        this.checkedAdvanceAuth.forEach(item => {
          const index = this.form.authAdvanceLists.indexOf(item)
          if (index > -1) {
            this.form.authAdvanceLists.splice(index, 1)
          }
        })
        this.checkedAdvanceAuth = []
      }
    },
    // 选中到左侧
    addToLeft () {
      if (this.checkUnList.length > 0) {
        return false
      }
      // this.authUnLists = this.authUnLists.concat(this.checkedBaseAuth, this.checkedAdvanceAuth)
      this.authUnLists = [...this.authUnLists, ...this.checkedBaseAuth, ...this.checkedAdvanceAuth]
      // this.authUnLists = this.authUnLists.filter(item => {
      //   if (this.authBaseLists.indexOf(item) === -1 && this.authAdvanceLists.indexOf(item) === -1) {
      //     return item
      //   }
      // })
      this.clearHasDoData()
    },
    // 选中到基础
    addToBase () {
      // this.form.authBaseLists = this.form.authBaseLists.concat(this.checkUnList)
      this.form.authBaseLists = [...this.form.authBaseLists, ...this.checkUnList]
      this.clearDoData()
    },
    // 选中到高级
    addToAdvance () {
      // this.form.authAdvanceLists = this.form.authAdvanceLists.concat(this.checkUnList)
      this.form.authAdvanceLists = [...this.form.authAdvanceLists, ...this.checkUnList]
      this.clearDoData()
    },
    // 全选选项改变
    handleUnConfChange (val) {
      this.checkUnList = val ? authOptionsNormal : []
      // this.isIndeterminate = false
    },
    // 未配置选项单个改变
    checkUnListChange (value) {
      let checkedCount = value.length
      this.checkUnAll = checkedCount === this.authUnLists.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.authUnLists.length
    },
    // 基础选项配置
    handleBaseChange () {

    },
    // 高级选项配置
    handleAdvanceChange () {

    },
    // 未配置
    handleUnConfig () {
      // console.log(this.authUnLists)
      // let unLists = this.authUnLists.slice()
      let unLists = this.getUnLists
      // console.log(unLists)
      this.authUnLists = unLists.filter(item => {
        if (this.form.authBaseLists.indexOf(item) === -1 && this.form.authAdvanceLists.indexOf(item) === -1) {
          return item
        }
      })
    },
    // 取消
    onCancel () {
      this.$router.push({path: '/auths/manage'})
    },
    // 保存
    onSave () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          staticApi['STATICLISTADD'](Object.assign(
            this.form,
            {
              basicVerifyName: this.form.authBaseLists.join(','),
              advancedVerifyName: this.form.authAdvanceLists.join(',')
            },
            {
              updateType: this.$route.query.appId ? 'update' : 'add'
            }
          )).then(response => {
            const result = response.data
            if (result.code === 0) {
              // {name: 'dispatch', params: {paicheNo: obj.paicheNo}}
              this.$router.push({name: 'manage', params: {}})
            } else {
              this.$message.warning({
                message: result.message
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    getOption () {
      // this.fullscreenLoading = true
      staticApi['STATICLISTOPTION']().then(response => {
        const result = response.data
        if (result.code === 0) {
          this.options = result.data.productName
          this.getUnLists = result.data.allVerifyName
          // this.authUnLists = result.data.allVerifyName
          // 当传参数时，表示修改（后台没有开发查询详情接口,用的列表查询第一条）
          if (this.$route.query.appId && typeof (parseInt(this.$route.query.type)) === 'number') { // 修改时候
            this.getList()
          } else {
            this.authUnLists = this.getUnLists
          }
        } else {
          this.$message.warning({
            message: result.message
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getList () {
      staticApi['STATICLISTVERIFY'](Object.assign(this.$route.query)).then(response => {
        // this.fullscreenLoading = false
        const result = response.data
        // console.log(result)
        if (result.code === 0) {
          this.form.appName = result.data[0].name
          this.form.type = result.data[0].type
          this.form.appType = result.data[0].appType
          this.form.productStatus = result.data[0].deleteTime
          this.form.appDescription = result.data[0].appDescription
          this.form.authBaseLists = result.data[0].basicList
          this.form.authAdvanceLists = result.data[0].advancedList
          // 当传参数时，表示修改（后台没有开发查询详情接口,用的列表查询第一条）
          if (this.$route.query.appId) {
            this.handleUnConfig()
          }
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
  beforeCreate () {
    // this.$route.meta.title = this.$route.query.appId ? '修改产品' : '添加产品'
    // console.log(this.$route.meta.title)
  },
  mounted () {
    this.getOption()
    // if (this.$route.query.appId) {
    //   this.getList()
    // }
  }
}
</script>
<style lang="scss" scoped>
  .transfer-footer {
    margin-left: 10px;
    padding: 6px 5px;
  }
  .transfer-panel-box {
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 250px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .transfer-panel {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 250px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
  }
  .transfer-panel-header {
    height: 40px;
    line-height: 40px;
    background: #0f75ff;
    margin: 0;
    padding-left: 15px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    color: #fff;
  }
  .transfer-panel-body {
    // height: 420px;
  }
  .transfer-panel-list {
    margin: 0;
    padding: 6px 0;
    list-style: none;
    overflow: auto;
    box-sizing: border-box;
  }
  .boxAuth {
    position: relative;
  }
  .boxArr {
    position: absolute;
    left: 5px;
    top: 0px;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    color: #606266;
  }
  .boxOrder {
    position: absolute;
    right: 5px;
    top: 10px;
    font-size: 12px;
    height: 20px;
    line-height: 10px;
    width: 10px;
    i {
      text-align: center;
      display: inline-block;
      width: 10px;
      height: 10px;
      cursor: pointer;
      color: #606266;
      // background-color: #ccc
    }
  }
  .transfer-panel-item {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    display: block;
  }
  .transfer-panel-item+.transfer-panel-item {
    margin-left: 0;
    // margin-left: 15px;
    // margin-right: 60px;
  }
  .transfer-buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 30px;
  }
  .transfer-button {
    display: block;
  }
  .transfer-button:first-child {
    margin-bottom: 10px;
  }
  .transfer-button:nth-child(2), .transfer-button:nth-child(3) {
    margin: 0;
    margin-bottom: 10px;
  }
  .transfer-panel-inner {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    /* overflow: hidden; */
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 228px;
    height: 166px;
    overflow: auto;
    box-sizing: border-box;
    position: relative;
    margin: 5px 10px;
    .transfer-panel-item {
      margin-left: 15px;
      margin-right: 60px;
    }
  }
  .inner-tit {
    margin: 0;
    padding: 5px 10px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    // background-color: #f2f2f2;
    height: 100%;
  }
</style>

<template>
  <el-dialog
    top="5vh"
    :title="title"
    :visible="show"
    :before-close="handleClose"
    width="60%">
    <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="用户信息" name="first">
            <el-form ref="form" label-position="right" label-width="140px" >
              <el-row>
                <p>用户信息</p>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="用户姓名：" prop="userName">
                    <span>{{ form.userName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="注册时间：" prop="registerTime">
                    <span>{{ form.registerTime | FilterTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="性别：" prop="sex">
                    <span>{{ form.sex }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="近期登录时间：" prop="lastLoginTime">
                    <span>{{ form.lastLoginTime | FilterTime }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="手机号：" prop="mobile">
                    <span>{{ form.mobile }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="渠道来源：" prop="channelName">
                    <span>{{ form.channelName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
                <p>统计信息</p>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="产品浏览UV：" prop="uvCount">
                    <span>{{ form.uvCount }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="产品浏览PV：" prop="pvCount">
                    <span>{{ form.pvCount }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="信贷APP安装数：" prop="contactPhone">
                    <span>{{ form.creditCount }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="注册浏览比：" prop="ontactEmail">
                    <span>{{ form.proportion }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
                <p>设备信息</p>
              <el-row>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="终端型号：" prop="deviceModel">
                    <span>{{ form.deviceModel }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="系统类型：" prop="systemType">
                    <span>{{ form.systemType }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="设备id：" prop="deviceId">
                    <span>{{ form.deviceId }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="使用人数：" prop="count">
                    <span>{{ form.count }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="网络IP：" prop="netIp">
                    <span>{{ form.netIp }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="bgitem" label="IP归属地：" prop="ipAddr">
                    <span>{{ form.ipAddr }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="甲方浏览汇总" name="second">
            <el-form>
              <el-form-item label="" prop="countMode">
                <el-radio-group v-model="form.indexInfo" size="small" @change="changeRadio">
                  <el-radio-button label="2">近3天</el-radio-button>
                  <el-radio-button label="3">近7天</el-radio-button>
                  <el-radio-button label="4">近一个月</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-table :data="dataList">
              <el-table-column
                label="甲方产品"
                prop="productName">
              </el-table-column>
              <el-table-column
                label="最近请求时间"
                prop="requestTime">
                <template slot-scope="props">
                  {{props.row.requestTime | FilterTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="UV"
                prop="uvCount">
              </el-table-column>
              <el-table-column
                label="PV"
                prop="pvCount">
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
          </el-tab-pane>
        </el-tabs>
    </el-form>
  </el-dialog>
</template>
<script>
import userApi from '@/api/user'
import { dialogMixin, pageMixin } from '@/views/component/mixin'
export default {
  components: {
  },
  mixins: [dialogMixin, pageMixin],
  props: ['show', 'row'],
  data () {
    return {
      dataList: [],
      activeName: 'first',
      data: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        tableTotal: 0,
        loading: false
      },
      form: {
        userName: '',
        registerTime: '',
        sex: '',
        lastLoginTime: '',
        mobile: '',
        channelName: '',
        uvCount: '',
        pvCount: '',
        creditCount: '',
        proportion: '',
        deviceModel: '',
        systemType: '',
        deviceId: '',
        netIp: '',
        ipAddr: '',
        count: '',
        indexInfo: '2'
      },
      title: '用户详情'
    }
  },
  methods: {
    changeRadio (tab) {
      this.page.currentPage = 1
      this.getSyncList(tab)
    },
    // 获取表单初始化数据
    getInit () {
      this.form.userName = this.row.userName
      this.form.sex = this.row.sex ? this.row.sex : '-'
      this.form.lastLoginTime = this.row.lastLoginTime
      this.form.mobile = this.row.mobile
      this.form.registerTime = this.row.registerTime
      this.form.channelName = this.row.channelName
      userApi['USER_DETAIL'](Object.assign(
        {mobile: this.row.realMobile}
      )).then(response => {
        const result = response.data.datas
        this.form.uvCount = result.uvCount === null || result.uvCount === '' ? 0 : result.uvCount
        this.form.pvCount = result.pvCount === null || result.pvCount === '' ? 0 : result.pvCount
        this.form.creditCount = result.creditCount === null || result.creditCount === '' ? 0 : result.creditCount
        this.form.proportion = result.proportion === null || result.proportion === '' ? 0 : result.proportion
        this.form.deviceModel = result.deviceInfo ? result.deviceInfo.deviceModel : ''
        this.form.systemType = result.deviceInfo ? result.deviceInfo.systemType : ''
        this.form.deviceId = result.deviceInfo ? result.deviceInfo.deviceId : ''
        this.form.count = result.deviceInfo ? result.deviceInfo.count : ''
        this.form.netIp = result.deviceInfo ? result.deviceInfo.netIp : ''
        this.form.ipAddr = result.deviceInfo ? result.deviceInfo.ipAddr : ''
      })
    },
    handleSizeChange (val) {
    },
    // 获取汇总数据
    getSyncList (indexInfo) {
      userApi['USER_SUMMARY'](Object.assign({
        mobile: this.row.realMobile,
        indexInfo: this.form.indexInfo,
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      })).then(response => {
        const result = response.data.datas
        this.dataList = result.datalist
        this.page.tableTotal = result.rsCount
      })
    }
  },
  created () {
    this.getInit()
    this.getSyncList(2)
    try {
      if (this.row.id) {
        this.title = '用户详情'
      } else {
      }
      this.uploadShow = true
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style lang="scss" scoped>
  .picUpload {
    background: #fff;
    padding: 0 20px;
    display: flex;
    .uploadImg {
      width: 80px;
      height: 80px;
      background-color: #f7f7f7;
      border-radius: 10px;
      position: relative;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .picText {
      flex: 2;
      .picBox {
        padding: 5px 15px;
      }
      h3 {
        margin: 10px 0;
        .red {
          color: #ed283b;
        }
      }
      p {
        color: #adadad;
        line-height: 1.6;
      }
    }
  }
</style>

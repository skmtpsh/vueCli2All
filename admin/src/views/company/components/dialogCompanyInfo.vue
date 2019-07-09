<template>
  <el-dialog
    title="企业管理"
    :visible="show"
    @close="handleClose"
    width="60%">
      <el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="企业详情" name="company">
          <el-form ref="form" label-position="right" label-width="100px" >
            <el-form-item class="bgitem" label="公司名称：" prop="companyTitle">
              <span>{{ form.businessName }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="联系人：" prop="contactUser">
              <span>{{ form.contactMan }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="联系电话：" prop="contactPhone">
              <span>{{ form.contactManMobile }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="业务邮箱：" prop="ontactEmail">
              <span>{{ form.contactManMail }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="公司电话：" prop="companyPhone">
              <span>{{ form.businessTelephone }}</span>
            </el-form-item>
            <!-- <el-form-item class="bgitem" label="手机号码：" prop="companyTel">
              <span>{{ form.businessMobile }}</span>
            </el-form-item> -->
            <el-form-item class="bgitem" label="公司地址：" prop="companyAddress">
              <span>{{ form.businessAddr }}</span>
            </el-form-item>
            <el-form-item class="bgitem" label="QQ：" prop="contactQQ">
              <span>{{ form.contactManQq }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="产品管理" name="product">
          <el-table
            header-row-class-name="headname"
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              width=""
              label="产品名称"
              prop="channelName">
            </el-table-column>
            <el-table-column
              width=""
              label="产品类型"
              prop="typeCode">
            </el-table-column>
            <el-table-column
              width=""
              label="计费模式"
              prop="feeTypeName">
            </el-table-column>
            <el-table-column
              width=""
              label="价格"
              prop="feeTypeId">
              <template slot-scope="props">
                {{ props.row.feeTypeId | FilterTypeId(props.row) }}
              </template>
            </el-table-column>
            <el-table-column
              width=""
              label="查询总数"
              prop="cntLimitTotal">
              <template slot-scope="props">
                {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.cntLimitTotal }}
              </template>
            </el-table-column>
            <el-table-column
              width=""
              label="起始日期"
              prop="startDate">
              <template slot-scope="props">
                {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.startDate | FilterTime }}
              </template>
            </el-table-column>
            <el-table-column
              width=""
              label="截止日期"
              prop="endDate">
              <template slot-scope="props">
                {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.endDate | FilterTime }}
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="操作">
              <template slot-scope="props">
                <el-switch
                inactive-value="0"
                active-value="1"
                active-icon-class="switchOpen"
                inactive-icon-class="switchClose"
                v-model="props.row.status"
                @change="setIsOpen(props.row)"></el-switch>
              </template>
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
        </el-tab-pane>
        <el-tab-pane label="添加产品" name="addproduct">
          <el-form :model="formInline" ref="formInline" :rules="rules" size="mini" :inline="true" label-position="right" label-width="100px" >
            <el-row>
              <el-col :span="24">
                <el-form-item label="选择产品：" prop="parentId">
                  <el-select placeholder="请选择" v-model="formInline.parentId" @change="handleChangeOne">
                    <el-option
                      v-for="(item, index) in firstOption"
                      :key="index" :value="item.id" :label="item.typeName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="typeCode">
                  <el-select placeholder="请选择" v-model="formInline.typeCode" @change="handleChangeSecond">
                    <el-option
                      v-for="(item, index) in secondOption"
                      :key="index" :value="item.id" :label="item.typeCode">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="channelId">
                  <el-select placeholder="请选择" v-model="formInline.channelId">
                    <el-option
                      v-for="(item, index) in productOption"
                      :key="index" :value="item.channelId" :label="item.channelName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计费模式：" prop="feeTypeId">
                  <el-select placeholder="请选择" v-model="formInline.feeTypeId" @change="handleChangeFeeType">
                    <el-option
                      v-for="(item, index) in feeTypeOption" :key="index" :label="item.feeTypeName" :value="item.feeTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="价格：" prop="price" v-if="this.formInline.feeTypeId !== '13'">
                  <el-input type="number" v-model="formInline.price" placeholder="价格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="查询总数：" prop="limit" v-if="feeTypeIs">
                  <el-input v-model="formInline.limit" placeholder="查询总数"></el-input>
                </el-form-item>
                <el-form-item label="日期：" prop="date"  v-if="feeTypeIs">
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="formInline.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:left;">
                <el-form-item label=" ">
                  <el-button type="warning" icon="el-icon-plus" round @click.native='onAdd'>增加产品</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div>
          <el-table
              header-row-class-name="headname"
              v-loading="loading"
              :data="tableDataTemp"
              style="width: 100%">
              <el-table-column
                width=""
                label="产品名称"
                prop="channelName">
                <template slot-scope="props">
                  {{props.row.channelName}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="产品类型"
                prop="typeCode">
                <template slot-scope="props">
                  {{props.row.typeCode}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="计费模式"
                prop="feeTypeName">
                <template slot-scope="props">
                  {{props.row.feeTypeId | FilterType}}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="价格"
                prop="price">
                <template slot-scope="props">
                  {{ props.row.feeTypeId == '13' ? '-' : props.row.price }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="查询总数"
                prop="limit">
                <template slot-scope="props">
                  {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.limit }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="起始日期"
                prop="startDate">
                <template slot-scope="props">
                  {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.startDate | FilterTime }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="截止日期"
                prop="endDate">
                <template slot-scope="props">
                  {{ (props.row.feeTypeId != '14' && props.row.feeTypeId != '15') ? '-' : props.row.endDate | FilterTime }}
                </template>
              </el-table-column>
              <el-table-column
                width=""
                label="操作"
                prop="endDate">
                <template slot-scope="props">
                  <el-button type="text" @click.native="delData(props.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <el-col :span="24" style="padding:20px 0; text-align: center">
                <el-button type="primary" round icon="el-icon-circle-plus-outline" @click.native="confirmAdd">确认添加</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
  </el-dialog>
</template>
<script>
import moment from 'moment'
import companyApi from '@/api/company'
import productApi from '@/api/product'
import { Message } from 'element-ui'
export default {
  props: ['show', 'appId'],
  data () {
    return {
      dialogVisible: false,
      form: {},
      activeName: 'company',
      pagesize: 5,
      currentPage: 1,
      tableData: [],
      tableTotal: 0,
      loading: false,
      formInline: {
        parentId: '',
        channelTypeId: '',
        channelId: '',
        // date: [moment().subtract('month', 1).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        date: [],
        feeTypeId: '',
        price: '',
        limit: '',
        typeCode: ''
      },
      rules: {
        parentId: [
          { required: true, message: '请选择产品', trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请选择产品', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请选择产品', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        feeTypeId: [
          { required: true, message: '请选择计费模式', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请填写价格', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '请填写数量', trigger: 'blur' }
        ]
      },
      feeTypeOption: [], // 计费选项
      firstOption: [], // 第一个Select选项
      secondOption: [], // 第二个Select选项
      productOption: [], // 第三个Select选项
      tableDataTemp: [], // 临时数据Table,
      feeTypeIs: false,
      totalId: 0
    }
  },
  methods: {
    /**
     * 公司信息
     */
    getInfo () {
      companyApi['COMPANYINFO']({
        appId: this.appId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.form = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 产品列表
     */
    getList () {
      productApi['PRODUCTLIST']({
        appId: this.appId,
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.loading = false
          this.tableData = result.datas.list
          this.tableTotal = result.datas.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 启用关闭
     */
    //  只有开启会调用此方法
    onlySetOpen (row) {
      productApi['PRODUCTALLOW'](Object.assign({
        id: row.id,
        status: row.status,
        appId: this.appId,
        feeTypeId: row.feeTypeId,
        channelId: row.channelId
      }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
        startDate: moment(row.startDate).format('YYYY-MM-DD'),
        endDate: moment(row.endDate).format('YYYY-MM-DD')
      } : {})).then(response => {
        const result = response.data
        if (result.code === 200) {
        // this.getList()
        } else {
          Message.warning({
            message: result.message
          })
          row.status === '0' ? row.status = '1' : row.status = '0'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setIsOpen (row) {
      if (row.status === '1' && row.feeTypeId !== '14' && row.feeTypeId !== '15') {
        this.$confirm('是否确认启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          productApi['PRODUCTALLOW'](Object.assign({
            id: row.id,
            status: row.status,
            appId: this.appId,
            feeTypeId: row.feeTypeId,
            channelId: row.channelId
          }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
            startDate: moment(row.startDate).format('YYYY-MM-DD'),
            endDate: moment(row.endDate).format('YYYY-MM-DD')
          } : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
              // this.getList()
            } else {
              Message.warning({
                message: result.message
              })
              row.status = '0'
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          row.status === '0' ? row.status = '1' : row.status = '0'
        })
      }
      if (row.status === '1' && row.feeTypeId === '14') {
        this.$confirm('是否确认开启，开启后将扣款' + row.monthPrice + '元', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          productApi['PRODUCTALLOW'](Object.assign({
            id: row.id,
            status: row.status,
            appId: this.appId,
            feeTypeId: row.feeTypeId,
            channelId: row.channelId
          }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
            startDate: moment(row.startDate).format('YYYY-MM-DD'),
            endDate: moment(row.endDate).format('YYYY-MM-DD')
          } : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
              // this.getList()
            } else {
              Message.warning({
                message: result.message
              })
              row.status = '0'
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          row.status === '0' ? row.status = '1' : row.status = '0'
        })
      }
      if (row.status === '1' && row.feeTypeId === '15') {
        this.$confirm('是否确认开启，开启后将扣款' + row.yearPrice + '元', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          productApi['PRODUCTALLOW'](Object.assign({
            id: row.id,
            status: row.status,
            appId: this.appId,
            feeTypeId: row.feeTypeId,
            channelId: row.channelId
          }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
            startDate: moment(row.startDate).format('YYYY-MM-DD'),
            endDate: moment(row.endDate).format('YYYY-MM-DD')
          } : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
            } else {
              Message.warning({
                message: result.message
              })
              row.status = '0'
            }
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
          row.status === '0' ? row.status = '1' : row.status = '0'
        })
      }
      if (row.status === '0') {
        productApi['PRODUCTALLOW'](Object.assign({
          id: row.id,
          status: row.status,
          appId: this.appId,
          feeTypeId: row.feeTypeId,
          channelId: row.channelId
        }, (row.feeTypeId === '14' || row.feeTypeId === '15') ? {
          startDate: moment(row.startDate).format('YYYY-MM-DD'),
          endDate: moment(row.endDate).format('YYYY-MM-DD')
        } : {})).then(response => {
          const result = response.data
          if (result.code === 200) {
            // this.getList()
          } else {
            Message.warning({
              message: result.message
            })
            row.status = '0'
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    /**
     * 计费选项
     */
    getFee () {
      productApi['PRODUCTFEE']({
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.feeTypeOption = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第一个产品列表
     */
    getLevel (level) {
      productApi['PRODUCTLEVEL']({
        parentId: 0
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.firstOption = result.datas
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第一个选项change调用接口
     */
    handleChangeOne (parentId, type) {
      productApi['PRODUCTLEVEL']({
        parentId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.secondOption = result.datas
          this.formInline.channelTypeId = ''
          this.formInline.channelTypeName = ''
          this.formInline.typeCode = ''
          this.formInline.channelName = ''
          this.formInline.channelId = ''
          this.formInline.limit = ''
          this.productOption = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 第二个产品选项调用产品列表
     */
    handleChangeSecond (channelTypeId) {
      productApi['PRODUCTTYPE']({
        channelTypeId
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.productOption = result.datas
          this.formInline.channelId = ''
          this.formInline.limit = ''
          this.formInline.channelName = ''
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleChangeThird (val, type) {
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleClose (done) {
      this.$emit('update:show', false)
    },
    /*
    * 计费模式变化
    */
    handleChangeFeeType (feeType) {
      this.formInline.price = ''
      if (feeType === '14' || feeType === '15') {
        this.feeTypeIs = true
      } else {
        this.feeTypeIs = false
        this.formInline.date = ''
        this.formInline.limit = ''
      }
    },
    /**
     * Tab 选项
     */
    handleClick (tab, event) {
      if (tab.name === 'product') {
        this.getList()
      }
      if (tab.name === 'addproduct') {
        this.getLevel('optionsLevelfirst')
        this.getFee()
      }
    },
    /**
     * 确认添加产品
     */
    confirmAdd () {
      console.log(this.tableDataTemp.length)
      if (this.tableDataTemp.length === 0) {
        this.$message.error('请添加产品')
        return false
      }
      productApi['PRODUCTADD']({
        appId: this.appId,
        product: JSON.stringify(this.tableDataTemp)
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          // 添加之后的操作 还原初始数据 例如 清除临时数据等
          this.totalId = 0
          this.tableDataTemp = []
          this.$refs['formInline'].resetFields()
        } else {
          this.$message.error(result.message)
          return false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 删除数据
     */
    delData (index) {
      console.log(index, this.tableDataTemp)
      this.tableDataTemp.splice(this.tableDataTemp.findIndex(item => item.id === index), 1)
    },
    /**
     * 增加产品
     */
    onAdd () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          let tempObj = {
            id: this.totalId++,
            channelId: this.formInline.channelId,
            channelName: this.filterChannel(this.formInline.channelId),
            typeCode: this.filterCode(this.formInline.typeCode),
            channelTypeId: this.formInline.channelTypeId,
            channelTypeName: this.filterChannelType(this.formInline.channelTypeId),
            price: this.formInline.price ? this.formInline.price : '',
            feeTypeId: this.formInline.feeTypeId,
            limit: this.formInline.limit ? this.formInline.limit : '',
            startDate: this.formInline ? this.formInline.date[0] : '',
            endDate: this.formInline ? this.formInline.date[1] : ''
          }
          console.log(tempObj)
          this.tableDataTemp.push(tempObj)
        } else {
          return false
        }
      })
    },
    /**
     *
     */
    filterChannel (val) {
      let channelName = ''
      this.productOption.forEach(item => {
        if (item.channelId === val) {
          channelName = item.channelName
        }
      })
      return channelName
    },
    filterCode (val) {
      let typeCode = ''
      this.secondOption.forEach(item => {
        if (item.id === val) {
          typeCode = item.typeCode
        }
      })
      return typeCode
    },
    filterChannelType (val) {
      let channelName = ''
      this.secondOption.forEach(item => {
        if (item.id === val) {
          channelName = item.typeName
        }
      })
      return channelName
    }
  },
  filters: {
    FilterType (val) {
      let tempType = ''
      switch (val) {
        case '11':
          tempType = '查询'
          break
        case '12':
          tempType = '查的'
          break
        case '13':
          tempType = '免费'
          break
        case '16':
          tempType = '命中'
          break
        case '14':
          tempType = '包月'
          break
        case '15':
          tempType = '包年'
          break
        default:
          break
      }
      return tempType
    },
    FilterTypeId (val, row) {
      let tempPrice = ''
      switch (val) {
        case '11':
          tempPrice = row.singleQueryPrice
          break
        case '12':
          tempPrice = row.singleQueryokPrice
          break
        case '13':
          tempPrice = '-'
          break
        case '16':
          tempPrice = row.singleHitPrice
          break
        case '14':
          tempPrice = row.monthPrice
          break
        case '15':
          tempPrice = row.yearPrice
          break
        default:
          break
      }
      return tempPrice
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
      this.dialogVisible = this.show
    })
  }
}
</script>
<style>
  .el-message--warning {
    z-index: 99999!important;
  }
</style>

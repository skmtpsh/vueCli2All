<template>
  <div>
    <div class="filter-box">
      <el-button type="primary" icon="el-icon-circle-plus" size="mini" round @click="addBanner">添加Banner</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="12" v-for="(item, index) in imgList" :key="index" v-if='index<10'>
        <el-card :body-style="{ padding: '10px' }">
          <!-- <a :href="item.bannerLink" target="_blank"><img :src="item.bannerSrc" class="image"></a> -->
          <img :src="item.bannerSrc" class="image">
          <div class="imgtxt">
            <p class="title">{{item.bannerTitle}}</p>
            <p><time class="time">{{ item.updateTime | FilterTime }}</time></p>
            <div class="flex">
              <el-button type="primary" icon="el-icon-d-arrow-left" size="mini" v-if="index !== 0" circle @click.native="onSortDown(item.id)"></el-button>
              <el-button type="primary" icon="el-icon-d-arrow-right" size="mini"  v-if="(imgList.length-1) !== index" circle @click.native="onSortUp(item.id)"></el-button>
              <el-button type="primary" icon="el-icon-edit" size="mini" circle @click.native="onEdit(item)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click.native="onDel(item.id)"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="添加/编辑Banner"
      :visible.sync="dialogVisible"
      @close= "handleClose"
      width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" ></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="src">
            <section class="picUpload">
              <div class="uploadImg" >
                <uploadPic :src.sync="form.src" :modsrc='form.src' v-if="uploadShow" />
              </div>
              <div class="picText">
                <div class="picBox">
                  <p>请上传2560*800的图片</p>
                </div>
              </div>
            </section>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import siteApi from '@/api/site'
import uploadPic from '@/components/upload/index'
export default {
  components: {
    uploadPic
  },
  data () {
    return {
      form: {
        title: '',
        link: '',
        src: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        src: [
          { required: true, message: '请添加图片', trigger: 'change' }
        ]
      },
      uploadShow: false,
      editshow: false,
      dialogVisible: false,
      imgList: [],
      currentDate: new Date()
    }
  },
  updated: function () {
    this.$nextTick(() => {
    })
  },
  methods: {
    getList () {
      this.loading = true
      siteApi['BANNERLIST']({
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          console.log(response.data.datas.length)
          this.loading = false
          this.imgList = result.datas
          this.length = result.datas.length
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSortDown (id) {
      let curIndex = this.getIdIndex(id)
      if (curIndex === -1) {
        return false
      }
      if (curIndex === 0) {
        Message.warning({
          message: '第一张'
        })
        return false
      }
      siteApi['BANNERSORT']({
        before: this.imgList[curIndex - 1].id,
        later: this.imgList[curIndex].id,
        beforeSort: this.imgList[curIndex].sort,
        laterSort: this.imgList[curIndex - 1].sort
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSortUp (id) {
      let curIndex = this.getIdIndex(id)
      if (curIndex === -1) {
        return false
      }
      if (curIndex === this.imgList.length - 1) {
        Message.warning({
          message: '最后一张'
        })
        return false
      }
      siteApi['BANNERSORT']({
        before: this.imgList[curIndex + 1].id,
        later: this.imgList[curIndex].id,
        beforeSort: this.imgList[curIndex].sort,
        laterSort: this.imgList[curIndex + 1].sort
      }).then(response => {
        const result = response.data
        if (result.code === 200) {
          this.getList()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getIdIndex (id) {
      let index = -1
      this.imgList.forEach((item, i) => {
        if (item.id === id) {
          index = i
        }
      })
      return index
    },
    onEdit (item) {
      this.picid = item.id
      this.form.src = item.bannerSrc
      this.form.title = item.bannerTitle
      this.form.link = item.bannerLink
      this.dialogVisible = true
      this.editshow = true
      this.uploadShow = true
    },
    onDel (id) {
      this.$confirm('此操作将删除该Banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        siteApi['BANNERDEL']({
          id
        }).then(response => {
          const result = response.data
          if (result.code === 200) {
            this.getList()
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    onSave () { // 如果修改时没有传64位 就不传src
      this.$refs['form'].validate((valid) => {
        if (valid) {
          siteApi[this.picid ? 'BANNERMOD' : 'BANNERSAVE'](Object.assign({
            bannerLink: this.form.link,
            bannerTitle: this.form.title
          }, this.picid
            ? /(data:image)/i.test(this.form.src) ? {bannerSrc: this.form.src} : {}
            : {bannerSrc: this.form.src}, this.picid ? {id: this.picid} : {})).then(response => {
            const result = response.data
            if (result.code === 200) {
              this.getList()
              this.handleClose()
              this.picid = ''
            }
          }).catch(error => {
            this.picid = ''
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clearForm () {
      this.uploadShow = false
      this.form.title = ''
      this.form.link = ''
      this.form.src = ''
      this.$refs['form'].resetFields()
    },
    addBanner () {
      if (this.length > 9) {
        this.$message.error('添加张数已达上限，不可继续添加')
        return false
      }
      this.dialogVisible = true
      this.uploadShow = true
    },
    handleClose (done) {
      this.dialogVisible = false
      this.clearForm()
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  .el-dialog__body {
    padding: 20px!important;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: flex-end
  }
  .imgtxt {
    padding: 10px;
    font-size: 14px;
    .title {
      height: 40px;
      overflow: hidden;
    }
  }
  .image {
    width: 100%;
    height: 150px;
    display: block;
  }
 .picUpload {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    .uploadImg {
      width: 300px;
      height: 150px;
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

<template>
  <div class="page">
    <spinner :visible="loading.show" :fixed="true" :text="loading.loaddingMsg"></spinner>
    <section class="picUpload">
      <div class="uploadImg" >
        <uploadPic :src.sync="src1"/>
      </div>
      <div class="picText">
        <div class="picBox">
          <h3>材料一 <span class="red">(必填)</span></h3>
          <p>请在户口本,社保卡,工资卡,收入证明驾驶证,行驶证,征信报告中任意选择两项上传。</p>
        </div>
      </div>
    </section>
    <section class="picUpload">
      <div class="uploadImg" >
        <uploadPic :src.sync="src2" />
      </div>
      <div class="picText">
        <div class="picBox">
          <h3>材料二 <span class="red">(必填)</span></h3>
          <p>请在户口本,社保卡,工资卡,收入证明驾驶证,行驶证,征信报告中任意选择两项上传。</p>
        </div>
      </div>
    </section>
    <section class="picUpload">
      <div class="uploadImg" >
        <uploadPic :src.sync="src3" />
      </div>
      <div class="picText">
        <div class="picBox">
          <h3>材料三 <span>(非必填)</span></h3>
          <p>您可以选择上传其他证明类材料照片，认证材料的完善有利提升额度。</p>
        </div>
      </div>
    </section>
    <section class="picUpload">
      <div class="uploadImg" >
        <uploadPic :src.sync="src4" />
      </div>
      <div class="picText">
        <div class="picBox">
          <h3>材料四 <span>(非必填)</span></h3>
          <p>您可以选择上传其他证明类材料照片，认证材料的完善有利提升额度。</p>
        </div>
      </div>
    </section>
    <box class="marg">
      <x-button type="primary" @click.native="handleSubmit">确认并提交</x-button>
    </box>
  </div>
</template>
<script>
import Spinner from '@/components/spinner'
import indexApi from '@/api/index'
import uploadPic from '@/components/UploadPic/index'
import myMixin from '@/views/mixin'
import { Panel, Box, XButton } from 'vux'
export default {
  mixins: [myMixin],
  components: {
    Box,
    Panel,
    XButton,
    uploadPic,
    Spinner
  },
  data () {
    return {
      src1: '',
      src2: '',
      src3: '',
      src4: '',
      loading: {
        loaddingMsg: '',
        show: false
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.src1 === '') {
        this.$vux.toast.text('材料一必须选择', 'middle')
        return false
      }
      if (this.src2 === '') {
        this.$vux.toast.text('材料二必须选择', 'middle')
        return false
      }
      this.loading['show'] = true
      indexApi.uploadPic({
        src1: this.src1,
        src2: this.src2,
        src3: this.src3,
        src4: this.src4
      })
        .then((response) => {
          this.loading['show'] = false
          let res = response.data
          if (res.code === 200) {
            // this.$vux.toast.text(res.message, 'middle')
            this.gotoURL(res.datas.verifyTypeName, res.datas.verifyStatusLive, res.datas.verifyStatus)
          } else {
            this.$vux.toast.text(res.message, 'middle')
          }
        })
        .catch((error) => {
          this.loading['show'] = false
          this.$vux.toast.text(error, 'middle')
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../style/variable.less');
.page {
  padding: 30px;
  .picUpload {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    .uploadImg {
      width: 300px;
      height: 200px;
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
        .font-dpr(28px);
        margin: 10px 0;
        .red {
          color: #ed283b;
        }
      }
      p {
        color: #adadad;
        line-height: 1.6;
        .font-dpr(24px);
      }
    }
  }
}
</style>

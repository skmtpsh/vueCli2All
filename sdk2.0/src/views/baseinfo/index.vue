<template>
  <div class="page" style="height: 100%;">
    <!-- <input style="width:100%; height:36px;" /> -->
    <group>
      <x-input title="QQ号" placeholder="输入QQ号码" v-model="qqNumber" type="tel" :max='20' mask="99999999999999999999" :show-clear="false" text-align="right"></x-input>
      <x-input title="月收入" placeholder="输入月收入金额" v-model="monthAmount" type="tel" :max='7' mask="9999999" :show-clear="false" text-align="right"></x-input>
      <Address @change="handlePerson" title="现居地址" />
      <x-input title="详细地址" placeholder="请填写详细地址" v-model="addressDetail" type="text" @on-blur="handleBlur" @on-focus="handleFocus" :show-clear="false" text-align="right"></x-input>
    </group>
    <group>
      <x-input title="单位名称" placeholder="请输入完整的公司名称" v-model="companyName" type="text" @on-blur="handleBlur" @on-focus="handleFocus" :show-clear="false" text-align="right"></x-input>
      <Address @change="handleCompany" title="单位地址" />
      <x-input title="详细地址" placeholder="请填写详细地址" v-model="companyDetail" type="text" @on-blur="handleBlur" @on-focus="handleFocus"  :show-clear="false" text-align="right"></x-input>
      <x-input title="单位电话" placeholder="请输入单位电话号码"  v-model="companyPhone" type="tel" @on-blur="handleBlur" @on-focus="handleFocus"  :max='12' mask="999999999999" :show-clear="false" text-align="right"></x-input>
      <x-input title="单位证明人" placeholder="请输入所在单位证明人姓名" v-model="companyReference" type="text" @on-blur="handleBlur" @on-focus="handleFocus"  :show-clear="false" text-align="right"></x-input>
    </group>
    <box class="marg">
      <x-button type="primary" @click.native="submitNext">下一步</x-button>
    </box>
  </div>
</template>
<script>
import indexApi from '@/api/index'
import myMixin from '@/views/mixin'
import { Group, XButton, Box } from 'vux'
import Address from '@/components/Address/index'
export default {
  mixins: [myMixin],
  components: {
    Address,
    Group,
    XButton,
    Box
  },
  data () {
    return {
      qqNumber: '',        // QQ号
      monthAmount: '',      // 月收入
      addressValue: '',    // 地址选择
      addressDetail: '',   // 详细地址
      companyName: '',     // 单位名称
      companyValue: '',    // 单位地址
      companyDetail: '',   // 详细地址
      companyPhone: '',    // 单位电话
      companyReference: '' // 单位证明人
    }
  },
  created () {
    this.platform = this.$route.query.platform
  },
  methods: {
    handleBlur () {
      if (this.platform === 'ios') {
        this.interval = setTimeout(() => {
          this.scrollToEnd()
        }, 500)
      }
    },
    handleFocus () {
      // this.$vux.toast.text('3', 'middle')
      if (this.platform === 'ios' && this.interval) {
        clearInterval(this.interval)
      }
    },
    scrollToEnd () {
      document.body.scrollTop = document.body.scrollHeight
    },
    handleCompany (value) {
      this.companyValue = value
    },
    handlePerson (value) {
      this.addressValue = value
    },
    submitNext () {
      let regEmoji = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g

      if (this.qqNumber === '' || this.qqNumber.replace(regEmoji, '') === '') {
        this.$vux.toast.text('QQ号不能为空', 'middle')
        return false
      }
      if (this.monthAmount === '' || this.monthAmount.replace(regEmoji, '') === '') {
        this.$vux.toast.text('月收入不能为空', 'middle')
        return false
      }
      if (this.addressValue === '' || this.addressValue.replace(regEmoji, '') === '') {
        this.$vux.toast.text('请选择现居地址', 'middle')
        return false
      }
      if (regEmoji.test(this.addressDetail)) {
        this.$vux.toast.text('现居详细地址不能有表情符号', 'middle')
        return false
      }
      if (this.addressDetail === '' || this.addressDetail.replace(regEmoji, '') === '') {
        this.$vux.toast.text('现居详细地址不能为空', 'middle')
        return false
      }
      if (regEmoji.test(this.companyName)) {
        this.$vux.toast.text('单位名称不能有表情符号', 'middle')
        return false
      }
      if (this.companyName === '' || this.companyName.replace(regEmoji, '') === '') {
        this.$vux.toast.text('单位名称不能为空', 'middle')
        return false
      }
      if (this.companyValue === '' || this.companyValue.replace(regEmoji, '') === '') {
        this.$vux.toast.text('请选择单位地址', 'middle')
        return false
      }
      if (regEmoji.test(this.companyDetail)) {
        this.$vux.toast.text('单位详细地址不能有表情符号', 'middle')
        return false
      }
      if (this.companyDetail === '' || this.companyDetail.replace(regEmoji, '') === '') {
        this.$vux.toast.text('单位详细地址不能为空', 'middle')
        return false
      }
      if (this.companyPhone === '' || this.companyPhone.replace(regEmoji, '') === '') {
        this.$vux.toast.text('单位电话不能为空', 'middle')
        return false
      }
      // 验证手机号
      let regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      let regPhone = /^(\\(\d{3,4}\\)|\d{3,4}-|\d{3,4}\s|\s)?\d{7,14}$/
      if (!regPhone.test(this.companyPhone) && !regTel.test(this.companyPhone)) {
        this.$vux.toast.text('输入正确的单位电话格式', 'middle')
        return false
      }
      let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if (this.companyReference === '') {
        this.$vux.toast.text('单位证明人不能为空', 'middle')
        return false
      }
      if (!regName.test(this.companyReference)) {
        this.$vux.toast.text('请输入正确的单位证明人格式', 'middle')
        return false
      }
      this.$vux.loading.show({
        text: '数据加载..'
      })
      indexApi.saveBaseInfo({
        jobCompany: this.companyName,
        jobAddress: this.companyValue,
        jobDetailAddress: this.companyDetail,
        jobContact: this.companyPhone,
        jobPerson: this.companyReference,
        jobSalary: this.monthAmount,
        currentAddress: this.addressValue,
        currentDetailAddress: this.addressDetail,
        qq: this.qqNumber
      })
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === 200) {
            // this.$vux.toast.text(res.message, 'middle')
            this.gotoURL(res.datas.verifyTypeName, res.datas.verifyStatusLive, res.datas.verifyStatus)
          } else {
            this.$vux.toast.text(res.message, 'middle')
          }
        })
        .catch((error) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(error, 'middle')
        })
    }
  }
}
</script>

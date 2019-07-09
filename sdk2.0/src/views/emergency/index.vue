<template>
<div style="position:relative">
  <div class="danger">
    请填写真实信息，否则可能导致审核不通过
  </div>
  <group title="直系亲属联系人">
    <cell title="姓名" :value="direct.user" is-link @click.native="setName('direct')"></cell>
    <cell title="手机" :value="direct.phone" is-link @click.native="setPhone('direct')"></cell>
    <popup-picker title="与本人关系" placeholder="请选择" :data="direct.realt" v-model="direct.relation" @on-hide='setRelation'></popup-picker>
  </group>
  <group title="其他联系人">
    <cell title="姓名" :value="other.user" is-link @click.native="setPhone('other')"></cell>
    <cell title="手机" :value="other.phone" is-link @click.native="setName('other')"></cell>
    <popup-picker title="与本人关系" placeholder="请选择" :data="other.realt" v-model="other.relation" @on-hide='setRelation'></popup-picker>
  </group>
  <box class='marg'>
    <x-button type="primary" @click.native="submit">下一步</x-button>
  </box>
</div>
</template>
<script>
import indexApi from '@/api/index'
import myMixin from '@/views/mixin'
import { Group, XButton, Box, Cell, PopupPicker } from 'vux'
export default {
  mixins: [myMixin],
  components: {
    Group,
    XButton,
    Box,
    Cell,
    PopupPicker
  },
  data () {
    return {
      direct: {
        user: '请选择',
        phone: '请选择',
        relation: [],
        realt: [[
          '配偶',
          '父母',
          '兄弟姐妹',
          '子女'
        ]]
      },
      other: {
        user: '请选择',
        phone: '请选择',
        relation: [],
        realt: [[
          '同学',
          '同事',
          '朋友'
        ]]
      }
    }
  },
  mounted () {
    window.saveNameAndPhone = this.saveNameAndPhone
  },
  methods: {
    saveNameAndPhone (name, phone, type) {
      if (type === 'other') {
        this.other.user = name
        this.other.phone = phone
      }
      if (type === 'direct') {
        this.direct.user = name
        this.direct.phone = phone
      }
    },
    setPhone (type) {
      try {
        if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.openContacts.postMessage(type)
        } else {
          window.javaObj.openContacts(type)
        }
      } catch (error) {
        console.log(error)
      }
    },
    setName (type) {
      try {
        if (this.$route.query.platform === 'ios') {
          window.webkit.messageHandlers.openContacts.postMessage(type)
        } else {
          window.javaObj.openContacts(type)
        }
      } catch (error) {
        console.log(error)
      }
    },
    setRelation (a) {
      // console.log(a)
    },
    submit () {
      // console.log(this.$root)
      if (this.direct.user === '' || this.direct.user === '请选择') {
        this.$vux.toast.text('直系亲属姓名不能为空', 'middle')
        return false
      }
      if (this.direct.phone === '' || this.direct.phone === '请选择') {
        this.$vux.toast.text('直系亲属电话不能为空', 'middle')
        return false
      }
      if (this.direct.relation.length === 0) {
        this.$vux.toast.text('直系亲属与本人关系不能为空', 'middle')
        return false
      }
      if (this.other.user === '' || this.other.user === '请选择') {
        this.$vux.toast.text('其它联系人姓名不能为空', 'middle')
        return false
      }
      if (this.other.phone === '' || this.other.phone === '请选择') {
        this.$vux.toast.text('其它联系人电话不能为空', 'middle')
        return false
      }
      if (this.other.relation.length === 0) {
        this.$vux.toast.text('其它联系人与本人关系不能为空', 'middle')
        return false
      }
      if (this.direct.phone === this.other.phone) {
        this.$vux.toast.text('直系亲属电话与其它联系人电话不能相同', 'middle')
        return false
      }
      this.$vux.loading.show({
        text: '数据加载..'
      })
      indexApi.emergency({
        emergencyContactName: this.direct.user,
        emergencyContactPhone: this.direct.phone,
        emergencyContactRelation: this.direct.relation,
        otherContactName: this.other.user,
        otherContactPhone: this.other.phone,
        otherContactRelation: this.other.relation
      })
        .then((response) => {
          this.$vux.loading.hide()
          let res = response.data
          if (res.code === 200) {
            // this.$vux.toast.text(res.message, 'middle')
            this.gotoURL(res.datas.verifyTypeName, res.datas.verifyStatusLive, res.datas.verifyStatus)
            // this.$router.push({path: `/authentication/${res.datas.verifyTypeName}`, query: this.$route.query ? this.$route.query : ''})
            // this.$router.push({path: '/authentication/status', query: this.$route.query ? this.$route.query : ''})
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

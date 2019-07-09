<template>
<div class="page">
  <!-- <inline-loading v-if="loading"></inline-loading> -->
  <img class="mw-100" v-if="show" :src="outputURL">
  <input type="file" accept="image/*" ref="uploadPic" @change="handlechange" class="uploadFile">
  <span class="uploadAdd" v-if="!loading"><i class="el-icon-circle-plus icon"></i></span>
</div>
</template>
<script>
import ImageCompressor from 'image-compressor.js'
import lrz from 'lrz'
let URL = window.URL || window.webkitURL
export default {
  props: {
    upType: {
      type: Number,
      default: 1
    },
    src: {
      type: String,
      default: ''
    },
    modsrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      outputURL: '',
      show: false
    }
  },
  created () {
    if (this.modsrc) {
      this.outputURL = this.modsrc
      this.show = true
    }
  },
  updated: function () {
    this.$nextTick(() => {
      console.log(23)
    })
  },
  methods: {
    compressBolb: function (file) {
      if (!file) {
        return
      }
      this.loading = true
      let imgcompress = new ImageCompressor()
      imgcompress.compress(file, {
        checkOrientation: true,
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: 0.8,
        mimeType: '',
        convertSize: 5000000
      }).then((result) => {
        this.loading = false
        if (URL) {
          this.outputURL = URL.createObjectURL(result)
          this.show = true
        }
        this.$emit('picChange', this.outputURL)
      }).catch((err) => {
        this.show = false
        console.log(err)
      })
    },
    compressBase64 (file) {
      this.loading = true
      lrz(file)
        .then((rst) => {
          // 处理成功会执行
          this.outputURL = rst.base64
          this.show = true
          this.loading = false
          // this.$emit('picChange', rst.base64)
          this.$emit('update:src', rst.base64)
        })
        .catch((err) => {
          this.show = false
          this.loading = false
          throw new Error(err)
        })
    },
    handlechange: function (e) {
      let file = e.target.files ? e.target.files[0] : null
      /**
       * Bolb 模式 前台渲染需要 URL.createObjectURL()
       */
      if (!this.upType) {
        this.compressBolb(file)
        return false
      }
      /**
       * 转为 base64
       */
      if (file.size > 0) {
        this.compressBase64(file)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .uploadAdd {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    // background-color: #1d7ffe;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      // width: 36px;
      // height: 36px;
      font-size: 48px;
      color: #1d7ffe;
    }
  }
  img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .uploadFile {
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
</style>

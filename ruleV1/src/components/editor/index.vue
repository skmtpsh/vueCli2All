<template>
  <div id="app">
    <vue-editor
      :value="content"
      @input="handleInput" :editorToolbar="customToolbar"></vue-editor>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  // props: {
  //   content: {
  //     default: '<h1>在此处添加内容</h1>',
  //     type: String
  //   }
  // },
  data () {
    return {
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        ['image'],
        ['clean']
      ]
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  },
  watch: {
    content () {
      // this.$emit('change', this.content)
    }
  }
}
</script>

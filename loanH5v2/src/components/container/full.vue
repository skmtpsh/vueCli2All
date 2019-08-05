<template>
  <div class="sh-container-full">
    <div v-if="$slots.header" class="sh-container-full__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="sh-container-full__body" ref="body" id="container-full-body">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="sh-container-full__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sh-container-full'
}
</script>

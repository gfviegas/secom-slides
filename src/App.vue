<template lang='pug'>
article#app
  custom-header
  .slides-container
  router-view
</template>

<script>
import customHeader from '@/components/Header.vue'

export default {
  components: { customHeader },
  name: 'app'
}
</script>

<style lang="sass">
// Fontes
@import "~@/assets/fonts/fonts"

@import "~@/assets/animate.min.css"
@import "~@/assets/variables.sass"

html
  height: 0
  body
    width: 100%
    margin: 0 0
    background: $gray-dark
    #app
      font-family: 'Edo', Helvetica, Arial, sans-serif
      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale
      color: $lemon
      width: 100%
</style>

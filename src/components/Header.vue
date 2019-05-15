<template lang="pug">
header
  img.logo-ufv(src="~@/assets/logos/ufv.png", alt="logo ufv")
  h1 VIII Semana da Computação - UFV Florestal
  img.logo-secom(src="~@/assets/logos/secom.png", alt="logo")
</template>

<script>
export default {
  name: 'custom-header'
}
</script>

<style lang="sass" scoped>
@import "~@/assets/variables.sass"
header
  display: flex
  width: 100%
  background: darken($gray-dark, 2%)
  justify-content: space-around
  h1
    display: flex
    flex-direction: column
    justify-content: center
    font-size: 2rem
  img.logo-ufv
    align-self: center
    height: 5rem
    padding: 1rem 0
  img.logo-secom
    margin-left: 2rem
    height: 7.5rem
    padding: 0.2rem 0
</style>

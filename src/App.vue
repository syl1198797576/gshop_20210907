<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
//引入FooterGuide底部组件
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  components:{FooterGuide},
  mounted() {
    // this.$store.dispatch('getAdress')
    // 一上来就需要调用的写这
    this.getAddress()
    this.getUserInfo()
    console.log(this.$store)
    console.log(this)
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>

<template>
  <div>
    <footer class="footer_guide">
  <!--外卖部分-->
      <div class="guide_item" @click="goto('/msite')" :class="{on: '/msite'===$route.path}">
        <!--对象语法：类名确定，但是不知道有无这个类, 如果路径正确就添加on-->
        <span class="item_icon">
          <i class="iconfont icon-waimai"></i>
        </span>
        <span>外卖</span>
      </div>
  <!--搜索部分-->
      <div class="guide_item" @click="goto('/search')" :class="{on: '/search'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span>搜索</span>
      </div>
  <!--订单部分-->
      <div class="guide_item" @click="goto('/order')" :class="{on: '/order'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-dingdan"></i>
        </span>
        <span>订单</span>
      </div>
  <!--我的部分-->
      <div class="guide_item" @click="goto('/profile')" :class="{on: '/profile'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-geren"></i>
        </span>
        <span>我的</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
  methods:{
    //路由的跳转
    goto(path){
      if (path !== this.$route.path){
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.footer_guide  //footer
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>

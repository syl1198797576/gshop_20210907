<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo" @click="$router.replace('/search')"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text" v-if="userInfo._id" @click="$router.replace('/UserInfo')"><i class="iconfont icon-person"></i></span>
        <span class="header_login_text" @click="$router.push('/login')" v-else>登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
//引入第三方swiper
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
//引入普通组件
import HeaderTop from "@/components/HeaderTop/HeaderTop";
import ShopList from "@/components/ShopList/ShopList";
//读state
import {mapState} from 'vuex'

export default {
  name: "Msite",
  mounted() {
    // 发送请求获取数据
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  data(){
    return{
      baseImgUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components:{
    HeaderTop,
    ShopList
  },
  computed:{
    //借助mapstate生成计算属性
    ...mapState(['address','categorys','userInfo']),

    // 根据categorys一维数组生成二维数组
    categorysArr(){
      // 创建空的二维数组
      const arr = []
      // 创建空的小数组
      let minArr = []
      // 解构取出categorys
      const {categorys} = this
      // 遍历categorys
      categorys.forEach(c => {
        // 判断是否满了，满了生成一个新的
        if (minArr.length === 8){
          minArr = []
        }
        // 将新的数组塞入大数组 在新创建数组的时候塞
        if (minArr.length === 0){
          arr.push(minArr)
        }
        // 将每一个塞入小数组
        minArr.push(c)
      })
      //将二维数组返回
      return arr
    }
  },
  watch:{
    // 监视categorys数组 空数组-->不空
    categorys (){
      // 该方法在数据更新后自动调用  数据变化
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>

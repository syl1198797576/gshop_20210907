<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--下标相同就给当前下标元素添加current-->
          <li class="menu-item" v-for="(g, index) in goods" :key="index"
              :class="{current: index === currentIndex}" @click="clickLeftList(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="g.icon" v-if="g.icon"> {{ g.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(g,index) in goods" :key="index">
            <h1 class="title">{{ g.name }}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(f, index) in g.foods" :key="index" @click="showFood(f)">
                <div class="icon">
                  <img width="57" height="57" :src="f.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ f.name }}</h2>
                  <p class="desc">{{ f.description }}</p>
                  <div class="extra"> <span class="count">月售 {{ f.sellCount }} 份</span> <span>好评率 {{ f.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">
                      ￥{{ f.price }}
                    </span>
                    <span class="old" v-if="f.oldPrice">
                      ￥{{ f.oldPrice }}
                    </span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CountFood :food="f"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from '@better-scroll/core'
import CountFood from "@/components/CountFood/CountFood";
import Food from "@/components/Food/Food";
import ShopCart from "@/components/ShopCart/ShopCart";
export default {
  name: "ShopGoods",
  components: {ShopCart, Food, CountFood},
  data () {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标
      tops: [], //每个li的top
      isShowFood: false, //是否显示Food
      food: {},
    }
  },
  computed:{
    ...mapState(['goods']),

    // 需求：当右侧滑动到指定区域时高亮左侧
    currentIndex(){
      //1.拿到值
      const {scrollY, tops} = this
      //2.逻辑：返回一个区间下标
      const index = tops.findIndex((top, index) => {
        // scrollY要大于等于tops又要小于下一个tops
        return scrollY >= top && scrollY < tops[index+1]
      })
      //3.返回结果
      return index
    }
  },
  watch:{  //开启监视  goods数组有东西后再调用方法
    goods(){
      this.$nextTick(() => {
        new BScroll('.menu-wrapper', {
          click: true
        })
        this.foodsScroll = new BScroll('.foods-wrapper',  {
          probeType: 2,
          click: true
        })
        // 绑定右侧列表滚动监听
        this.foodsScroll.on('scroll', ({y}) => {
          console.log(y)
          this.scrollY = Math.abs(y)
        })
        // 绑定右侧列表滚动结束的监听
        this.foodsScroll.on('scrollEnd', ({y}) => {
          console.log('scrollEnd', y)
          this.scrollY = Math.abs(y)
        })
        // 调用getTops方法来获取top
        this.getTops()
      })
    }
  },
  methods:{
    // 获取每个li高度的方法
    getTops () {
      //1.初始化数组
      const tops = []
      let top = 0
      //2.收集
      tops.push(top)
      // 找到所有的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(l => {
        top += l.clientHeight
        tops.push(top)
      })
      //3.更新
      this.tops = tops
      console.log(tops)
    },
    // 点击左侧菜单
    clickLeftList(index) {
      const scrollY = this.tops[index];
      // 解决第一时间没法更新指定位置的问题
      this.scrollY = scrollY
      // 添加一个点击能滑动的监听
      this.foodsScroll.scrollTo(0,-scrollY,300)
    },
    // 显示点击的food
    showFood(food) {
      // 设置data中的food
      this.food = food
      // 显示food组件（调用子组件的方法）
      this.$refs.food.toggleFood()
    }
  },
  mounted() {
    this.$store.dispatch('getShopGoods')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

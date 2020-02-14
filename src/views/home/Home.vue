<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
//用于滚动
  import Scroll from "../../components/common/scroll/Scroll";
  import { getHomeMultidata,getHomeGoods } from "../../network/home";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";

  export default {
      name: "Home",
      data() {
          return {
            path:'/home/msg',
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            taboffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
          }
      },
      mixins:[itemListenerMixin,backTopMixin],
      components: {
        NavBar,
        TabControl,
        GoodsList,
        HomeSwiper,
        Scroll,
        RecommendView,
        FeatureView
      },
      created() {
        this.getHomeMultidata();
        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      mounted() {
      },
      activated() {
          this.$refs.scroll.scrollTo(0, this.saveY, 0);
          this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        //取消全局监听
        this.$bus.$off('itemImageLoad',this.itemImgListener)
      },
      methods: {
          tabClick(index) {
              switch (index) {
                case 0:
                  this.currentType = 'pop';
                  break
                case 1:
                  this.currentType = 'new';
                  break
                case 2:
                  this.currentType = 'sell';
                  break
              }
              this.$refs.tabControl.currentIndex = index;
              this.$refs.tabControl1.currentIndex = index;

            },
          getHomeMultidata() {
              getHomeMultidata().then(res => {
                //console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
              })
            },
          getHomeGoods(type) {
              const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res => {
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1;
              this.$refs.scroll.finishPullUp()
            })
          },
          contentscroll(position) {
            //决定backtop是否隐藏
            this.isShowBackTop =  -position.y > 1000
            //决定tabcontrol是否吸顶
            this.isTabFixed =  -position.y > this.taboffsetTop
          },
          loadMore() {
              this.getHomeGoods(this.currentType);
          },
          swiperImageLoad() {
            this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
          }
        },
      computed: {
          showGoods() {
            return this.goods[this.currentType].list
          }
      }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /*移动端可用，有些浏览器不适用*/
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 59px;
    left: 0;
    right: 0;
    /*margin-top: 44px;*/
    /*height: calc(100% - 59px - 44px);*/
    /*overflow: hidden;*/
  }

</style>

<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
   import DetailNavBar from "./childComps/DetailNavBar";
   import DetailSwiper from "./childComps/DetailSwiper";
   import DetailBaseInfo from "./childComps/DetailBaseInfo";
   import DetailShopInfo from "./childComps/DetailShopInfo";
   import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
   import DetailParamInfo from "./childComps/DetailParamInfo";
   import DetailCommentInfo from "./childComps/DetailCommentInfo";
   import Scroll from "../../components/common/scroll/Scroll";
   import GoodsList from "../../components/content/goods/GoodsList";
   import DetailBottomBar from "./childComps/DetailBottomBar";
   import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "../../network/detail";
   import {backTopMixin, itemListenerMixin} from "../../common/mixin";
   import {debounce} from "../../common/utils";
   // import Toast from "../../components/common/toast/Toast";
   export default {
      name: "Detail",
      data() {
        return {
          iid: null,
          topImages:[],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommends: [],
          themeTopYs: [],
          getThemeTopY: null,
          currentIndex: 0,
          // show:false,
          // message:''
        }
      },
      mixins:[itemListenerMixin, backTopMixin],
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll,
        // Toast
      },
      created() {
        this.iid = this.$route.params.iid;
        getDetail(this.iid).then((res) => {
          //1.获取数据
          const data = res.result;
          //2.取出轮播图的数据
          this.topImages =  data.itemInfo.topImages;
          //3.取出商品数据
          this.goods = new Goods(data.itemInfo,data.columns, data.shopInfo.services);
          //4.取出店铺信息
          this.shop = new Shop(data.shopInfo);
          //5.取出详情信息
          this.detailInfo = data.detailInfo;
          //6.取出参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
          //7.取出评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
          // this.$nextTick(() => {
          //   this.themeTopYs = []
          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // })
        })
        //请求推荐数据
        getRecommend().then(res => {
          //console.log(res.data.list);
          this.recommends = res.data.list
        })
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        },100)
      },
      mounted() {
      },
     destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImgListener);
     },
     methods: {
       imageLoad() {
         this.$refs.scroll.refresh();
         this.getThemeTopY();
       },
       titleClick(index) {
         //console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],400);
       },
       contentScroll(position) {
         const positionY = -position.y;
         const len = this.themeTopYs.length;
         // for(let i = 0; i < len; i++){
         //   if((i < len-1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])
         //     ||(i === len-1 && positionY >= this.themeTopYs[i])){
         //     this.$refs.navbar.currentIndex = i
         //   }
         // }
         for(let i = 0; i < len-1; i++){
           if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
             this.currentIndex = i;
             this.$refs.navbar.currentIndex = this.currentIndex
           }
         }
         this.isShowBackTop = -position.y > 1000
       },
       addToCart() {
         const product = {};
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid;
         this.$store.dispatch('addCart',product).then(res => {
         //   this.show = true;
         //   this.message = res;
         //   setTimeout(() => {
         //     this.show = false;
         //     this.message = ''
         //   },1500)
         // })
           this.$toast.show(res)
         })
         }
      }
    }
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
  .content {
    height: calc(100% - 44px - 59px);
    overflow: hidden;
  }
</style>

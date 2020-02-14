<template>
    <swiper v-if="images.length>=1" :options="swiperOption"  class="detail-swiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) of images" :key="index">
          <img class="swiper-img" :src="item" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--      <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
</template>

<script>
  export default {
    name: "Swipers",
    props: {
      images: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        swiperOption1: {
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          pagination: {
            el: '.swiper-pagination',
            clickable: true //允许分页点击跳转
          },
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //自动轮播
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,//播完一轮是否重新开始
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true,
          //开启鼠标滚轮控制Swiper切换
          mousewheel: true
        },
        swiperOption2: {
          pagination: {
            el: '.swiper-pagination'
          },
          observer: true,
          autoplay: true,
          loop: false

        }
      }
    },
    computed: {
      swiperOption() {
        let len = this.images.length
        if(len == 1){
          return this.swiperOption2
        }
        else {return this.swiperOption1}
      }

    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    flex-shrink: 0;
  }
  .swiper-img {
    width: 100%;
  }
</style>


<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    //probe 侦测 默认为0  0和1 都是不侦测
    // 2：手指滚动的过程侦测，手指离开后惯性不侦测
    //3.只要滚动都侦测
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true, //允许触发点击事件
      pullUpLoad: this.pullUpLoad //上拉加载
    });
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp"); //回调一次
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //console.log('----');
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
   watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
};
</script>

<style scoped>
</style>

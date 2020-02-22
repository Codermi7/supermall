import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      saveY: 0,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,400)
    //监听图片加载完 刷新商品容器高度 事件总线 先在main.js里设置bus总线
    //防抖函数 debounce /节流函数  throttle
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',() => {
      this.itemImgListener()
    })
    //console.log('我是混入内容');
    //获取tabcontrol的offsettop属性
    //组件的属性$el
    //this.taboffsetTop = this.$refs.tabControl
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
},
deactivated() {
  this.saveY = this.$refs.scroll.getScrollY()
  //取消全局监听
  this.$bus.$off('itemImageLoad',this.itemImgListener)
},
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: "pop",
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break;
        case 1:
          this.currentType = "new"
          break;
        case 2:
          this.currentType = "sell"
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    }
  }
}

<template>
  <div class="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <div id="tab-content">
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          v-show="isTabFixed"
          class="tab-show"
          ref="tab1"
        ></tab-control>
        <scroll
          class="scroll"
          :data="[categoryData]"
          ref="scroll"
          :probe-type="3"
          @scroll="contentscroll"
        >
          <tab-content-category
            :subcategories="showSubcategory"
            class="category-content"
            @imageLoad="imageLoad"
          ></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" ref="tab" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import TabControl from "../../components/content/tabControl/TabControl";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../network/category";
import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";
import {itemListenerMixin,backTopMixin} from "../../common/mixin";
export default {
  name: "Category",
  components: {
    NavBar,
    TabControl,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabContentDetail
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      taboffsetTop: 0,
      isTabFixed: false,
      currentType: "pop"
    };
  },
  created() {
    this.getCategory();
    console.log("===")
    setTimeout(() => {
      this.getSubcategories(0);
    }, 500);
    
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  updated() {
    this.$refs.scroll.refresh();
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.imageLoad();
  },
  mixins: [itemListenerMixin,backTopMixin],
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) {
        return {};
      }
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
      });
    },
    getCategoryDetail(type) {
      //获取商品分类的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        //解构赋值
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },
    selectItem(index) {
      this.getSubcategories(index);
      this.$refs.scroll.refresh();
    },
    imageLoad() {
      this.taboffsetTop = this.$refs.tab.$el.offsetTop;
    },
    contentscroll(position) {
      //决定backtop是否隐藏
      this.isShowBackTop =  -position.y > 1000
      //决定tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
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
      this.$refs.tab.currentIndex = index;
      this.$refs.tab1.currentIndex = index;
    }
  
  }
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.cate-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 55px;
  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
.scroll {
  height: 100%;
}
.tab-show {
  position: fixed;
  width: 70%;
  top: 44px;
  right: 0;
}
</style>

<template>
    <tab-bar class="tab-bar">
      <tab-bar-item path="/home"><span slot="img" class="iconfont">&#xe65d;</span><div slot="name">首页</div></tab-bar-item>
      <tab-bar-item path="/category"><span slot="img" class="iconfont">&#xe7f9;</span><div slot="name">分类</div></tab-bar-item>
      <tab-bar-item path="/cart"><span slot="img" class="iconfont">&#xe613;</span><div slot="name">购物车</div></tab-bar-item>
      <tab-bar-item path="/profile"><span slot="img" class="iconfont">&#xe66e;</span><div slot="name">我的</div></tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
      components: {
          TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>
.tab-bar {
  z-index: 8;
}
</style>

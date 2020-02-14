<template>
  <div class="tab-bar ignore">
<!--    <div class="tab-bar-item"><span class="iconfont">&#xe65d;</span>首页</div>-->
<!--    <div class="tab-bar-item"><span class="iconfont">&#xe7f9;</span>分类</div>-->
<!--    <div class="tab-bar-item"><span class="iconfont">&#xe613;</span>购物车</div>-->
<!--    <div class="tab-bar-item"><span class="iconfont">&#xe66e;</span>我的</div>-->
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  .tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  }
</style>

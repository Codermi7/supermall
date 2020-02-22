<template>
  <scroll id="tab-menu">
  <div class="menu-list">
      <div class="menu-item"
           v-for="(item,index) in categories"
           :class="{active:index === currentIndex}"
           @click="itemClick(index)">
          {{item.title}}
      </div>
  </div>
  </scroll>
</template>
<script>
import Scroll from "../../../components/common/scroll/Scroll"
    export default {
      name: "TabMMenu",
      props: {
          categories:{
              type: Array,
              default() {
                  return []
              }
          }
      },
      data() {
          return {
              currentIndex: 0
          }
      },
      components: {
          Scroll
      },
      methods: {
          itemClick(index) {
              this.currentIndex = index;
              this.$emit('selectItem',index)
          }
      }
    };
</script>
<style scoped>
  #tab-menu {
      height: 100%;
      width: 30%;
      box-sizing: border-box;
      background-color: #f6f6f6;
  }
  .menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
   .menu-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
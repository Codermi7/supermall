<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
    :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabControl",
      data() {
        return {
          currentIndex:0
        }
      },
      props: {
          titles: {
            type: Array,
            default() {
              return []
            }
          }
      },
      methods: {
        itemClick(item) {
          this.currentIndex = item;
          this.$emit('tabClick',item)
        }
      }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
  }
  .active span{
    color: var(--color-high-text);
    padding: 5px;
    border-bottom: 2px solid var(--color-high-text);
  }
</style>

<template>
  <div class="tab-bar-item" @click="itemClick">
    <span :class="{active:isActive}">
      <slot name="img"></slot>
    </span>
    <div :style="activeStyle">
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff88c2"
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      //console.log(this.$route.path.indexOf(this.path));
      //indexof() 找不到则返回-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      if (this.$route.path === this.path) {
        return;
      } 
      else {
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 59px;
  font-size: 16px;
  padding: 5px 0;
}
.tab-bar-item span {
  font-size: 24px;
}
.active {
  color: #ff88c2;
}
</style>

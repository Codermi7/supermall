<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
    export default {
      name: "CheckButton",
      props: {
        isChecked: {
          type: Boolean,
          default: true
        }
      }
    }
</script>

<style scoped>
  .check-button {
    padding: 1px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>

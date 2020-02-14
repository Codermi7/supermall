<template>
<div class="wrapper">
  <ul class="content">
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
    <li>5555</li>
  </ul>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Category",
      data() {
          return {
            scroll: null
          }
      },
      mounted() {
          //probe 侦测 默认为0  0和1 都是不侦测
          // 2：手指滚动的过程侦测，手指离开后惯性不侦测
          //3.只要滚动都侦测
          this.scroll = new BScroll(document.querySelector('.wrapper'),{
            probeType: 3,
            click: true,//允许触发点击事件
            pullUpLoad: true//上拉加载
          })
        this.scroll.on('scroll',(position) => {
         // console.log(position);
        })
        this.scroll.on('pullingUp',() => {
          console.log('上拉加载更多');//回调一次
          setTimeout(() => {
            this.scroll.finishPullUp()
          },2000)
        })
      }
    }
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>

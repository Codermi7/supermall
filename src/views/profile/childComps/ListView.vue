<template>
  <div class="list-view">
    <div v-for="(item,index) in listData" class="item-info">
      <span class="iconfont font" :style="colorStyle(index)" v-html="item.icon"></span>
      <span class="name-info">{{item.info}}</span>
    </div>
  </div>
</template>


<script>
    export default {
      name: "ListView",
      props: {
        listData:{
          type:Array,
          default(){
            return []
          }
        },
      },
      methods: {
        colorStyle(index) {
          return {color:this.listData[index].iconColor};
        }
      }
    }
</script>

<style scoped>
  .font {
    font-size: 24px;
  }
  .item-info {
    margin: 0 5px;
    padding: 15px 20px 5px;
    border-bottom: 2px solid #f2f5f8;
  }
  .name-info {
    padding-left: 25px;
  }
</style>

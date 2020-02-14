<template>
  <div id="detailNav">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/home/back.svg">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      data() {
        return {
          titles: ['商品', '参数', '评论', '推荐'],
          currentIndex: 0
        }
      },
      components: {
        NavBar
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index
          this.$emit('titleClick',index)
        },
        backClick() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .titles {
   display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>

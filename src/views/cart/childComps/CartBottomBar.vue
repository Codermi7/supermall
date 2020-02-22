<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isAllCheck" @click.native="allCheckClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calculate">
      去计算({{checkLenght}})
    </div>


  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
    export default {
      name: "CartBottomBar",
      components: {
        CheckButton
      },
      methods: {
        allCheckClick() {
        // if(this.isAllCheck){
          //   //console.log(this.$store.state.cartList);
          //   for(let item of this.$store.state.cartList){
          //     item.checked = false
          //   }
          // }
          // else {
          //   for(let item of this.$store.state.cartList){
          //     item.checked = true
          //   }
          // }
          if(this.isAllCheck){
            this.$store.state.cartList.forEach(item => item.checked = false)
          }
          else {
            this.$store.state.cartList.forEach(item => item.checked = true)
          }
        },
        calculate() {
          if(!this.$store.state.cartList.filter(item => item.checked).length){
            this.$toast.show('请勾选要买的商品')
          }
        }
      },
      computed: {
        totalPrice() {
          return '￥'+this.$store.state.cartList.filter(item => {
            return item.checked
          }).reduce((pre,item) => {
            return pre + item.price * item.count
          },0).toFixed(2)
        },
        checkLenght() {
          return this.$store.state.cartList.filter(item => item.checked).length
        },
        isAllCheck() {
          // return this.$store.state.cartList.filter(item => item.checked).length ===
          //   this.$store.getters.cartLength
          if(this.$store.getters.cartLength === 0) return false;
          return !this.$store.state.cartList.find(item => !item.checked)
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    position: fixed;
    bottom: 58px;
    display: flex;
    width: 100%
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 100%;
  }
  .check-button {
    height: 23px;
    width: 23px;
    line-height: 23px;
    /* touch-action: none; */
  }
  .total-price {
    margin-left: 20px;
  }
  .calculate {
    background-color: var(--color-high-text);
    padding: 0 5px;
    position: absolute;
    right: 0;
  }
</style>

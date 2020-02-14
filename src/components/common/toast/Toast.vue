<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
    export default {
      name: "Toast",
      props: {
        // message: {
        //   type: String,
        //   default: ''
        // },
        // show: {
        //   type: Boolean,
        //   default: false
        // }
      },
      data() {
        return {
          message: '',
          isshow: false
        }
      },
      methods: {
        show(message,duration=1500){
          this.isshow = true;
          this.message = message;
          setTimeout(() => {
            this.isshow = false;
            this.message = ''
          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast {
    position: fixed;
    background-color: rgba(0,0,0,.75);
    color: #fff;
    padding: 8px 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 9;
  }
</style>

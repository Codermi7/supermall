<template>
  <div class="user-info">
    <div class="info-img">
      <img src="~/assets/img/profile/tx0.jpg">
    </div>
    <div class="info-center">
      <div class="login"><span>登录</span>/<span>注册</span></div>
      <div><span class="iconfont font">&#xe63f;</span><span>暂无绑定手机号</span></div>
    </div>
    <div class="info-out">
      <span class="iconfont font">&#xe67b;</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "UserInfo"
    }
</script>

<style scoped>
  .user-info {
    display: flex;
    background-color: var(--color-tint);
    color: #fff;
  }
  .info-img {
    padding: 10px 10px 20px;
  }
  .info-img img{
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  .font {
    font-size: 24px;
  }
  .info-center {
    padding: 25px 5px;
    flex: 1;
  }
  .login {
    padding: 0px 5px;
  }
  .info-out {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
</style>

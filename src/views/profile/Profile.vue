<template>
  <div class="profile">
    <nav-bar class="pro-nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view class="order-info" :list-data="orderList"></list-view>
    <list-view class="service-info" :list-data="serviceList"></list-view>
  </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import UserInfo from "./childComps/UserInfo";
    import ListView from "./childComps/ListView";
    export default {
      name: "Profile",
      components: {
        NavBar,
        UserInfo,
        ListView
      },
      data() {
        return {
          orderList: [
            {icon:'&#xe63a;',iconColor:'#ff8198',info:'我的消息'},
            {icon:'&#xe674;',iconColor:'#ff8198',info:'积分商城'},
            {icon:'&#xe654;',iconColor:'#ff8198',info:'会员卡'}
          ],
          serviceList: [
            {icon:'&#xe612;',iconColor:'#999',info:'设置'},
            {icon:'&#xe608;',iconColor:'#999',info:'关于'}
          ]
        }
      }
    }
</script>

<style scoped>
 .pro-nav {
   background-color: var(--color-tint);
   color: #fff;
   box-shadow: 0 1px 1px var(--color-tint);
 }
  .account {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    border-bottom: 2px solid #f2f5f8;
  }
  .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
 .account-item {
   width: 100%;
   background-color: #fff;
   text-align: center;
   color: #666;
   font-size: 13px;
 }
  .account-info {
    margin-top: 6px;
  }
  .service-info {
    padding-top: 20px;
  }
</style>

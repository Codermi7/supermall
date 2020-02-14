import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/home/Home')
// const About=()=>import('../components/About')
// const User=()=>import('../components/User')
// const Msg=()=>import('../components/HomeMsg')
// const News=()=>import('../components/HomeNews')
const Profile=()=>import('../views/profile/Profile')
const Category=()=>import('../views/category/Category')
const Cart=()=>import('../views/cart/Cart')
const Detail = () => import('../views/detail/Detail')
//安装插件 npm install vue-router --save
Vue.use(VueRouter)
//创建对象
const routes = [
  {
    path:'',
    //redirect重定向 默认路径
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title:'首页'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title:'档案'
    },
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode:'history'

})
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this,location).catch(err => err)
// }
// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this,location).catch(err => err)
// }
export default router

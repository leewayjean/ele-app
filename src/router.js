import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:"active",
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("./views/Index.vue"),
      redirect:"/goods",
      children:[
        {path:"/goods",component:() => import("./views/page/Goods.vue")},
        {path:"/order",component:() => import("./views/page/Order.vue")},
        {path:"/me",component:() => import("./views/page/Me.vue")},
        {path:"/address",component:() => import("./views/Address.vue")},
        {path:"/citysList",component:() => import("./views/Citys.vue")}
      ]
    },
    {
      path:'/login',
      name:"login",
      component:() => import("./views/Login.vue")
    }
  ]
})

// 路由全局守卫
// router.beforeEach((to,from,next) => {
//   if(to.path == "/login"){
//     next();
//   }else {
//     // 登录成功的同时，存储登录状态
//     if(localStorage.is_login){
//       next()
//     }else{
//       next("/login")
//     }
//   }
// })

export default router;




 import Vue from 'vue'

 import VueRouter from 'vue-router'

 Vue.use(VueRouter)

 // imports pages 

 import ListProducts from '../views/ListProducts.vue'

 import ListOrders from '../views/ListOrders.vue'

 const Routes = [

  // ListProducts route

  {
    path: '/',
    name: 'ListProducts',
    component: ListProducts ,

    meta:{
    //  middleware:"guest",

   }
  } ,

  

  {
    path: '/ListOrders',
    name: 'ListOrders',
    component: ListOrders ,

    meta:{
    //  middleware:"guest",

   }
  } ,

] 




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
 // routes

 routes:[

  ...Routes ,
 

 ] });



 export default router
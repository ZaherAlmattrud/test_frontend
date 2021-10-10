<template>

<v-app>

     <v-navigation-drawer
      absolute
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title> {{ user.userName }} </v-list-item-title>
            <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list  >
        <v-list-item
          v-for="item in pages"
          :key="item.title"
          :to="item.route"
          
       
        >
          <v-list-item-icon>
            <v-icon color="black"  >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
       <template v-slot:append>
         <v-divider></v-divider>
        <div class="pa-2">
          <v-btn block  >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>


      <!-- <v-app-bar app>
    
  </v-app-bar> -->

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>

    </v-container>

  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>

   

    



</v-app>
  
</template>

<script>
import { mdiViewDashboardOutline } from "@mdi/js";
 

export default {
     data () {
      return {
        
        user :{
            userName:   'Admin'  , 
            email: 'Admin@gmail.com' ,
        },

        pages: [

          { title: 'Products', icon:  mdiViewDashboardOutline , route:'/' },

          { title: 'Orders', icon:  mdiViewDashboardOutline , route:'/ListOrders' },
         
         
          
        ],
         
      }
    },
    methods: {
     
    },
}
</script>

<style>
</style>

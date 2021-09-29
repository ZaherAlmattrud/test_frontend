<template>
  <SiteLayout>
    <div class="dashboard-page">


      <v-container class="group_1">
        <v-row class="text-center">
         
          <v-col cols="12">
            
          </v-col>

        </v-row>
      </v-container>
     
    </div>
  </SiteLayout>
</template>

<script>


import SiteLayout from "../../layouts/SiteLayout.vue";

export default {
  data() {
    return {
     
    };
  },
  components: {
    SiteLayout,
  },
};
</script>

<style >
.dashboard-page {
  margin-right: 255px;
   
}
.group_1 {
  margin:10px;
  background-color: rgb(206, 232, 236);
  border-radius: 30px;
}
.group_2 {
   margin:10px;
  background-color: rgb(154, 182, 235);
  border-radius: 30px;
}
</style>
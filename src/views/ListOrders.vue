<template>
  <div class="page">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="orders"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Orders</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"

                  @click="create()"
                >
                  New Orders
                </v-btn>
            
        
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="loadOrders"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>


    <v-alert :value="alert_1" type="success"> Success </v-alert>

    <v-alert :value="alert_2" type="error"> {{ backEndErrorMessage}} , {{backEndErrorMessageDetails.supplier_id_message}}  

          </v-alert>

  </div>
</template>

<script>
import axios from "axios";



export default {
  data: () => ({

    orders: [],

    index : -1 ,

    order: {

      ID : null ,

      OrderDate: null,

      OrderNumber: null,

      customer_id:null,

      TotalAmount:null,
    },

    defaultOrder:{

      id : null ,

      OrderDate: null,

      OrderNumber: null,

      customer_id:null,

      TotalAmount:null,

    } ,

    dialog: false,

    dialogDelete: false,

    headers: [
      { text: "Number", value: "OrderNumber", sortable: false },
      { text: "Customer", value: "customer_id", sortable: false },
      { text: "Date", value: "OrderDate", sortable: false },
      { text: "Total", value: "TotalAmount", sortable: false },

      { text: "Actions", value: "actions", sortable: false },
    ],

   

    alert_1: false,

    alert_2: false,

    backEndErrorMessage:'',

    backEndErrorMessageDetails:{

          product_name_message : '',

          supplier_id_message : '' ,

          unit_price_message : '',
    }


  }),

  



  computed: {
    formTitle() {
      return this.index === -1 ? "New Order" : "Edit Order";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {

    this.loadOrders();
  },

  mounted(){

   
    if(alert){
      this.hide_alert();
    }
  
  } ,

  methods: {

     hide_alert: function (event) {

       console.log(event);

      console.log('Hide')
      // `event` is the native DOM event
      window.setInterval(() => {

         this.alert_1 = false;
         this.alert_2 = false;

        console.log("hide alert after 3 seconds");
      }, 10000)    
    }
    ,
    loadOrders() {
      axios
        .get("/api/order")
        .then((response) => {
          this.orders = response.data.data;

          console.log(this.orders);
        })
        .catch((error) => {

          console.log(error);
        })
        .finally(() => {});
    },

    editItem(item) {

     console.log(item);
   

    },

    deleteItem(item) {

      
     // this.editedItem = Object.assign({}, item);
      this.order = Object.assign({},item );

     // this.editedIndex = this.products.indexOf(item);
      this.index = this.orders.indexOf(item);

      this.dialogDelete = true;
    },

    deleteItemConfirm() {


      let ID = this.order.ID;

      console.log('ID : '+ID)

      axios
        .delete("/api/order/" + ID)
        .then((response) => {


      // delete object local after success api
      
      this.orders.splice(this.index, 1);

      this.alert_1 = true;

      console.log(response);

        })
        .catch((error) => {

         this.alert_2 = true;

          console.log(error);
        })
        .finally(() => {

     
             
        });

      this.closeDelete();

    },

    close() {

      this.dialog = false;

      this.$nextTick(() => {

        this.order = Object.assign({}, this.defaultOrder);
       
      });

      this.$refs.form.reset()
    },

    closeDelete() {

      this.dialogDelete = false;

      this.index = -1 ;

    },

    create(){

         this.$router.push('/CreateOrder')
    },

    save() {



     

      if (this.index > -1) { // update
        
        

      } else { // create 
        
      }
  },

  
  }
   
  
};
</script>

<style >
.page {
  margin-right: 255px;
}
</style>
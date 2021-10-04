<template>
  <div class="page">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="products"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Products</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Product
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                     <v-form  ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.ProductName"
                          autocomplete="nope"
                          label="Product Name"
                         :rules="productNameRules"
                          required

                        ></v-text-field>
                      
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.SupplierId"
                          label="Supplier ID"
                        
                         :rules="supplierRules"
 required
                          autocomplete="off"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.UnitPrice"
                          autocomplete="off"
                          label="Unit Price"
  :rules="unitPriceRules"
                        
                        ></v-text-field>
                      </v-col>
                    </v-row>
                     </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
          <v-btn color="primary" @click="loadProducts"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>


    <v-alert :value="alert" :type="alertType"> {{alertMessage}} </v-alert>

  </div>
</template>

<script>
import axios from "axios";



export default {
  data: () => ({
    products: [],

    productID: -1,

    editedId: -1,

    dialog: false,

    dialogDelete: false,

    headers: [
      { text: "ID", value: "ID", sortable: false },
      { text: "Product Name", value: "ProductName", sortable: false },
      { text: "Supplier ID", value: "SupplierId", sortable: false },
      { text: "Unit Price", value: "UnitPrice", sortable: false },

      { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,

    editedItem: {

      ProductName: null,

      SupplierId: null,

      UnitPrice:null,
    },

    defaultItem: {

      ProductName: null,

      SupplierId: null,

      UnitPrice: null,
    },

    productNameRules:[

      v => !!v || 'the product name is required and cannot be empty'
    ] ,

    supplierRules:[

      v => !!v || 'the supplier is required and cannot be empty'
    ] ,

    unitPriceRules:[

      v => !!v || 'the unit Price is required and cannot be empty' ,
      v => ( v > 0  ) || 'the price must be a positive number'
    ] ,

    alert: false,
    alertType : null ,
    alertMessage:'',



  }),

  



  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Product" : "Edit Product";
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
    this.loadProducts();
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

         this.alert = false;
         this.alertType = null ,
         this.alertMessage = '',

        console.log("hide alert after 3 seconds");
      }, 5000)    
    }
    ,
    loadProducts() {
      axios
        .get("/api/product")
        .then((response) => {
          this.products = response.data.data;

          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    editItem(item) {

      this.productID = item.ID;
      
      console.log(item);

      this.editedIndex = this.products.indexOf(item);

      this.editedItem = Object.assign({}, item);

      this.dialog = true;

    },

    deleteItem(item) {
      let ID = item.ID;

      this.editedId = ID;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let ID = this.editedId;

      console.log(ID);

      axios
        .delete("/api/product/" + ID)
        .then((response) => {


      // delete object local after success api
      
      const productIndex = this.products.findIndex((p) => p.ID === ID);

      // remove one product

      this.products.splice(productIndex, 1);

         this.alert = true;

         this.alertType = 'success' ,

         this.alertMessage = ' success operation',

      console.log(response);

        })
        .catch((error) => {

         this.alert = true;

         this.alertType = 'error' ,

         this.alertMessage = ' error operation',

          console.log(error);
        })
        .finally(() => {});

     

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });

      this.$refs.form.reset()
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {


    if (this.$refs.form.validate()){

      if (this.editedIndex > -1) {
        // update product

        //   console.log('update');

        // validation 

        

       

        // update api

        let ID = this.productID;

        console.log(ID);

        axios
          .put("/api/product/" + ID, {
            ProductName: this.editedItem.ProductName,

            supplier_id: this.editedItem.SupplierId,

            UnitPrice: this.editedItem.UnitPrice,
          })
          .then((response) => {
            let status = response.status;

             // update local  after success api

             Object.assign(this.products[this.editedIndex], this.editedItem);

              this.alert = true;

         this.alertType = 'success' ,

         this.alertMessage = ' success operation',

            console.log(status);
          })
          .catch((error) => {

             this.alert = true;

         this.alertType = 'error' ,

         this.alertMessage = ' error operation',
            console.log(error);
          })
          .finally(() => {});

        this.productID = -1;
      } else {
        // create product

        //console.log('create');

    

        //

        axios
          .post("/api/product/", {
            ProductName: this.editedItem.ProductName,

            SupplierId: this.editedItem.SupplierId,

            UnitPrice: this.editedItem.UnitPrice,
          })
          .then((response) => {

            let status = response.status;

        // create local  after success api
        let $lastID = this.products[this.products.length - 1].ID;

        this.editedItem["ID"] = $lastID + 1;

        this.products.push(this.editedItem);

        this.alert = true;

         this.alertType = 'success' ,

         this.alertMessage = ' success operation',

            console.log(status);
          })
          .catch((error) => {

             this.alert = true;

         this.alertType = 'error' ,

         this.alertMessage = ' error operation',
            console.log(error);
          })
          .finally(() => {});
      }

      this.close();
    }

     

    }
  },

  

   
  
};
</script>

<style >
.page {
  margin-right: 255px;
}
</style>
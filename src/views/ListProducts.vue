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
            <v-dialog v-model="dialog" max-width="800px">
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
                          v-model="product.ProductName"
                          autocomplete="nope"
                          label="Product Name"
                         :rules="productNameRules"
                          required
                          outlined

                        ></v-text-field>
                      
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="product.supplier_id"
                          label="Supplier ID"
                        
                         :rules="supplierRules"
                         outlined
 required
                          autocomplete="off"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="product.UnitPrice"
                          autocomplete="off"
                          outlined
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
                  <v-btn color="error"   @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="success"   @click="save"> Save </v-btn>
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


    <v-alert :value="alert_1" type="success"> Success </v-alert>

    <v-alert :value="alert_2" type="error"> {{ backEndErrorMessage}} , {{backEndErrorMessageDetails.supplier_id_message}}  

          </v-alert>

  </div>
</template>

<script>
import axios from "axios";



export default {
  data: () => ({

    products: [],

    index : -1 ,

    product: {

      ID : null ,

      ProductName: null,

      supplier_id: null,

      UnitPrice:null,
    },

    defaultProduct:{

      ID : null ,

      ProductName: null,

      supplier_id: null,

      UnitPrice:null,

    } ,

    dialog: false,

    dialogDelete: false,

    headers: [
      { text: "ID", value: "ID", sortable: false },
      { text: "Product Name", value: "ProductName", sortable: false },
      { text: "Supplier ID", value: "supplier_id", sortable: false },
      { text: "Unit Price", value: "UnitPrice", sortable: false },

      { text: "Actions", value: "actions", sortable: false },
    ],

   

  

   

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
      return this.index === -1 ? "New Product" : "Edit Product";
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

         this.alert_1 = false;
         this.alert_2 = false;

        console.log("hide alert after 3 seconds");
      }, 10000)    
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



      
      this.product = Object.assign({},item );

      this.index = this.products.indexOf(item);

      console.log("index : "+this.index)

      this.dialog = true;

    },

    deleteItem(item) {

      
     // this.editedItem = Object.assign({}, item);
      this.product = Object.assign({},item );

     // this.editedIndex = this.products.indexOf(item);
      this.index = this.products.indexOf(item);

      this.dialogDelete = true;
    },

    deleteItemConfirm() {


      let ID = this.product.ID;

      axios
        .delete("/api/product/" + ID)
        .then((response) => {


      // delete object local after success api
      
      this.products.splice(this.index, 1);

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

        this.product = Object.assign({}, this.defaultProduct);
       
      });

      this.$refs.form.reset()
    },

    closeDelete() {

      this.dialogDelete = false;

      this.index = -1 ;

    },

    save() {



    if (this.$refs.form.validate()){

      if (this.index > -1) { // update
        
        let ID = this.product.ID;

        let indx = this.index;

       

        axios
          .put("/api/product/" + ID, this.product)
          .then((response) => {

            this.product = response.data.data;

             // update product local in array  after success api
        

             Object.assign( this.products[indx], this.product);

             this.alert_1 = true;

          
          })
          .catch((error) => {

            

             this.alert_2 = true;

             console.log(error.response.data.details);

             this.backEndErrorMessage = error.response.data.message ;

             this.backEndErrorMessageDetails.supplier_id_message = error.response.data.details.supplier_id[0] ;

            
               


          })
          .finally(() => {});

                this.index = -1 ;

      } else { // create 
        
        //

        axios
          .post("/api/product/",this.product)
          .then((response) => {

            let newProduct = response.data.data;

        // create local  after success api
       

        this.products.push( newProduct );

        this.alert_1 = true;

         
          })
          .catch((error) => {

             this.alert_2 = true;
             console.log(error.response.data.details);

             this.backEndErrorMessage = error.response.data.message ;

             this.backEndErrorMessageDetails.supplier_id_message = error.response.data.details.supplier_id[0] ;


        
            console.log(error);
          })
          .finally(() => {});
      }

     
    }

      this.close();

    }
  },

  

   
  
};
</script>

<style >
.page {
  margin-right: 255px;
}
</style>
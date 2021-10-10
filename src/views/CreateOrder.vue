<template>
  <div class="page">
    <label> Create Order </label>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="6" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              outlined
              label="Date"
              type="date"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" md="6">
            <v-autocomplete
              ref="country"
              v-model="country"
              outlined
              :rules="[() => !!country || 'This field is required']"
              :items="customers"
              label="Customer"
              placeholder="Select..."
              required
              item-text="FullName"
              return-object
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    color="green"
                    small
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-autocomplete
                            ref="country"
                            outlined
                            :items="products"
                            label="Product"
                            placeholder="Select..."
                            required
                            item-text="ProductName"
                            return-object
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field  outlined label="Quantity"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
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
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
         dialog: false,
      dialogDelete: false,
      customers: [],
      products: [],

      headers: [
        {
          text: "Product Name",
          value: "name",
        },
        { text: "Quantity", value: "quantity" },

        { text: "Actions", value: "actions", sortable: false },
      ],

      desserts: [
        {
          name: "Frozen Yogurt",
          quantity: 159,
        },
        {
          name: "Ice cream sandwich",
          quantity: 237,
        },
      ],
    };
  },

  created() {

    this.loadCustomer();

    this.loadProducts();
  },
  methods: {
    loadCustomer() {
      axios
        .get("/api/customer")
        .then((response) => {
          this.customers = response.data.data;

          console.log(this.customers);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

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
  },
};
</script>

<style>
.page {
  margin-right: 255px;
}
</style>
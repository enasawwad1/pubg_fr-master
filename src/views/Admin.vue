<template>
  <div>
    <div class="btns-group">
      <v-btn
        large
        color="success"
        class="ma-3 float-left text-none btn-mobile"
        dark
        @click="showProducts"
      >Products</v-btn>

      <v-btn
        large
        color="success"
        class="ma-3 float-left text-none btn-mobile"
        dark
        @click="showUsers"
      >Users</v-btn>
      <router-link to="/Admin/newDealer">
        <v-btn large color="success" class="ma-3 float-left text-none btn-mobile" dark>New Dealer</v-btn>
      </router-link>
      <router-link to="/Admin/newProduct">
        <v-btn large color="success" class="ma-3 float-left text-none btn-mobile" dark>New Product</v-btn>
      </router-link>
      <v-btn
        large
        color="success"
        class="ma-3 float-left text-none btn-mobile"
        dark
        @click="openOptionsForm"
      >Pubg UC's</v-btn>
    </div>
    <div class="table-data" v-if="products_users_flag">
      <v-col cols="12">
        <material-card
          key="1"
          id="1"
          ref="1"
          color="#521e69"
          flat
          full-width
          title="Products"
          text="Here you can control your products"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_products" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            key="1"
            id="1"
            ref="1"
            :headers="headers_products"
            :items="all_products_items"
            :search="search_products"
            :items-per-page="10"
          >
            <template v-slot:item.action="{ item }">
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-pencil theme--light primary--text edit"
                @click="editProduct(item)"
              ></i>
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-close theme--light error--text deletee"
                @click="deleteProductConfirmation(item)"
              ></i>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </div>
    <div class="table-data" v-if="!products_users_flag">
      <v-col cols="12">
        <material-card
          key="3"
          id="3"
          ref="3"
          color="#521e69"
          flat
          full-width
          title="Users"
          text="Here you can control all users"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_users" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            key="3"
            id="3"
            ref="3"
            :headers="headers_users"
            :items="all_users_data"
            :search="search_users"
            :items-per-page="10"
          >
            <template v-slot:item.valid="{ item }">
              <v-chip v-if="item.valid == 'false'" color="red" dark>Blocked</v-chip>
            </template>
            <template v-slot:item.actionss="{ item }">
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-pencil theme--light primary--text edit"
                @click="editUser(item)"
              ></i>
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-close theme--light error--text deletee"
                @click="deleteUserConfirmation(item)"
              ></i>
              <i class="fas fa-ban block pointer" @click="blockUser(item)"></i>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </div>
    <div class="table-data">
      <v-col cols="12">
        <material-card
          key="2"
          id="2"
          ref="2"
          color="#521e69"
          flat
          full-width
          title="Pubg Charging Oreders"
          text="Here you can find all Pubg Charging Oreders from customers"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_charge_orders" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            key="2"
            id="2"
            ref="2"
            :headers="headers_charge_orders"
            :items="all_charge_orders"
            :search="search_charge_orders"
            :items-per-page="10"
          >
            <template v-slot:item.t_code2="{ item }">
              <v-chip v-if="item.t_code2.length == 0" color="red" dark>Pending</v-chip>
              <v-chip v-else color="green" dark>Done</v-chip>
            </template>
            <template v-slot:item.actionss="{ item }">
              <!-- <i class="fas fa-check pointer font-asom-icon" style="color:#4caf50" @click="donePI(item)"></i>
              <i class="fas fa-history pointer font-asom-icon" style="color:rgb(82, 30, 105)" @click="pendingPI(item)"></i>
              -->
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-pencil theme--light primary--text edit"
                @click="editPubgTrans(item)"
              ></i>
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-close theme--light error--text deletee"
                @click="deletePubgTrans(item)"
              ></i>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </div>

    <div class="table-data">
      <v-col cols="12">
        <material-card
          key="4"
          id="4"
          ref="4"
          color="#521e69"
          flat
          full-width
          title="Website Transactions"
          text="Here you can Find all Transactions"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_trans" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table
            key="4"
            id="4"
            ref="4"
            :headers="headers_trans"
            :items="my_all_transactions"
            :search="search_trans"
            :items-per-page="10"
          >
           <!--  <template v-slot:item.tranActions="{ item }">
              <i
                aria-hidden="true"
                class="v-icon mdi mdi-close theme--light error--text"
                @click="deleteWebsiteTransConfirmation(item)"
              ></i>
            </template> -->
          </v-data-table>
        </material-card>
      </v-col>
    </div>

    <div class="table-data">
      <v-col cols="12">
        <material-card
          key="5"
          id="5"
          ref="5"
          color="#521e69"
          flat
          full-width
          title="Support Requests"
          text="Here you can Find all Support Requests from Users"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_support" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table
            key="5"
            id="5"
            ref="5"
            :headers="headers_support"
            :items="all_support_messages"
            :search="search_support"
            :items-per-page="10"
          >
            <template v-slot:item.actns="{ item }">
              <i class="far fa-comment-alt pointer" @click="showSupportMessage(item)">
                <span style="margin: 5px;">show</span>
              </i>
              <i
                class="v-icon mdi mdi-close theme--light error--text pointer"
                style="margin-left:12px;"
                @click="deleteSupportItemConfirmation(item)"
              ></i>
            </template>
            <template v-slot:item.actns2="{ item }">
              <i class="far fa-comment-alt pointer" @click="showSupportMessage(item)">
                <span style="margin: 5px;">show</span>
              </i>
              <i
                class="v-icon mdi mdi-close theme--light error--text pointer"
                style="margin-left:12px;"
                @click="deleteSupportItemConfirmation(item)"
              ></i>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </div>

    <div class="table-data">
      <v-col cols="12">
        <material-card
          key="6"
          id="6"
          ref="6"
          color="#521e69"
          flat
          full-width
          title="Main Products"
          text="Here you can change main products pictures ONLY!"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="main_products_search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table
            key="6"
            id="6"
            ref="6"
            :headers="headers_main_products"
            :items="my_prod_types"
            :search="main_products_search"
            :items-per-page="10"
          >
            <template v-slot:item.actionsPic="{ item }">
              <i
                class="mdi mdi-pencil theme--light primary--text edit"
                @click="changeProductPic(item)"
              >change picture</i>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </div>

    <v-row justify="center" v-if="object_to_edit">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{object_to_edit.purpose}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="object_to_edit.product_item_name"
                    label="product name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="object_to_edit.product_item_price_dealer"
                    label="price for dealers"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="price for customers"
                    v-model="object_to_edit.product_item_price_customer"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="object_to_edit.product_item_link"
                    label="product link"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="object_to_edit.product_item_key" label="Key" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="container">
                    <div class="large-12 medium-12 small-12 cell">
                      <label>Files</label>
                    </div>
                    <div class="large-12 medium-12 small-12 cell">
                      <div v-for="(file, key) in files" :key="key" class="file-listing">
                        {{ file.name }}
                        <span
                          class="remove-file"
                          v-on:click="removeFile( key )"
                        >Remove</span>
                      </div>
                    </div>
                    <br>
                    <div class="large-12 medium-12 small-12 cell">
                      <button
                        style="color:white;background: red;padding: 4px 8px 4px 8px;background-color: rgb(82, 30, 105);"
                        v-on:click.prevent="addFiles()"
                      >click to change product picture</button>
                      <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()">
                    </div>
                    <br>
                  </div>
                </v-col>
                <v-col>
                  <v-select
                    :items="my_prod_types"
                    item-text="name"
                    item-value="id"
                    v-model="prod_name_to_edit"
                    @change="setProductType"
                    label="product type"
                    required
                  ></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Gaming', 'Software', 'Cards']"
                  label="category"
                  required
                ></v-autocomplete>
                </v-col>-->
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditModal">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateProduct">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center" v-if="uc_flag">
      <v-dialog v-model="uc_flag" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Pubg UC's for Users</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op1" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op2" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op3" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op4" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op5" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op6" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op7" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op8" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op9" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op10" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op11" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op12" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="my_options.op13" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="uc_flag = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveUCS">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center" v-if="user_to_edit">
      <v-dialog v-model="user_edit_dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{user_to_edit.purpose}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="user_to_edit.name" label="name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="user_to_edit.user_type.type" label="user type" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="phone" v-model="user_to_edit.phone" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user_to_edit.password" label="password" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user_to_edit.email" label="email" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user_to_edit.address" label="address" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field type="number" v-model="user_to_edit.credit" label="credit" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field type="number" v-model="user_to_edit.debit" label="debit" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditUserModal">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="delete_dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure ?</v-card-title>

          <v-card-text>you can not revert the changes after doing this action.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#521e69 darken-1" text @click="closeDeleteProductConfirmation">No</v-btn>

            <v-btn color="#521e69 darken-1" text @click="deleteProduct">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="delete_web_trans_dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure ?</v-card-title>

          <v-card-text>you can not revert the changes after doing this action.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#521e69 darken-1" text @click="delete_web_trans_dialog = false">No</v-btn>

            <v-btn color="#521e69 darken-1" text @click="deleteWebsiteTrans">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="delete_support_item_dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure ?</v-card-title>

          <v-card-text>you can not revert the changes after doing this action.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#521e69 darken-1" text @click="delete_support_item_dialog = false">No</v-btn>

            <v-btn color="#521e69 darken-1" text @click="deleteSupportItem">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="delete_dialog_pubg" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure ?</v-card-title>

          <v-card-text>you can not revert the changes after doing this action.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#521e69 darken-1" text @click="closeDeleteProductConfirmation">No</v-btn>

            <v-btn color="#521e69 darken-1" text @click="deletePubgTransConfirmed">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="delete_user_dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure ?</v-card-title>

          <v-card-text>you can not revert the changes after doing this action.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeDeleteUserConfirmation">No</v-btn>

            <v-btn color="green darken-1" text @click="deleteUser">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="blockedUnblockedSuccess" max-width="290">
        <v-card>
          <v-card-title class="headline">Process Status</v-card-title>

          <v-card-text>User Blocked/Unblocked Successfully</v-card-text>
          <!-- 
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeDeleteUserConfirmation">No</v-btn>

            <v-btn color="green darken-1" text @click="deleteUser">Yes</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="show_support_message" max-width="290">
        <v-card>
          <v-card-title class="headline">Message</v-card-title>

          <v-card-text>{{support_message_obj}}</v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center" v-if="edit_pubg_item_falg">
      <v-dialog v-model="edit_pubg_item_falg" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">add Transaction</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="pubg_item_to_edit.t_code"
                    label="Item Transaction"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeHandler">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updatePubgItem">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center" v-if="edit_prod_picture">
      <v-dialog v-model="edit_prod_picture" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">change product picture</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <span>{{main_prod_to_change_pic.name}}</span>
              </v-row>
              <v-row>
                <div class="container">
                  <div class="large-12 medium-12 small-12 cell">
                    <label>Files</label>
                  </div>
                  <div class="large-12 medium-12 small-12 cell">
                    <div v-for="(file, key) in files" :key="key" class="file-listing">
                      {{ file.name }}
                      <span class="remove-file" v-on:click="removeFile( key )">Remove</span>
                    </div>
                  </div>
                  <br>
                  <div class="large-12 medium-12 small-12 cell">
                    <button
                      style="color:white;background: red;padding: 4px 8px 4px 8px;background-color: rgb(82, 30, 105);"
                      v-on:click.prevent="addFiles()"
                    >click to change product picture</button>
                    <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()">
                  </div>
                  <br>
                </div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="edit_prod_picture = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateMainProductPic">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import cookies from "js-cookie";
import api from "axios";

export default {
  data() {
    return {
      main_products_search: "",
      files: [],
      edit_pubg_item_falg: false,
      pubg_item_to_edit: null,
      show_support_message: false,
      support_message_obj: "",
      headers_support: [],
      my_all_transactions: [],
      blockedUnblockedSuccess: false,
      my_options: {
        op1: "",
        op2: "",
        op3: "",
        op4: "",
        op5: "",
        op6: "",
        op7: "",
        op8: "",
        op9: "",
        op10: "",
        op11: "",
        op12: "",
        op13: ""
      },
      UCOptions: [],
      uc_flag: false,
      prod_name_to_edit: { name: "", id: "" },
      my_prod_types: [],
      object_to_edit: null,
      user_to_edit: null,
      object_to_edit_2: null,
      main_prod_to_change_pic: null,
      edit_prod_picture: false,
      dialog: false,
      user_edit_dialog: false,
      delete_dialog: false,
      delete_dialog_pubg: false,
      delete_user_dialog: false,
      item_to_delete: null,
      user_to_delete: null,
      all_products_items: [],
      all_charge_orders: [],
      all_support_messages: [],
      all_users_data: [],
      all_main_products: [],
      search: "",
      search_users: "",
      search_products: "",
      search_charge_orders: "",
      search_support: "",
      search_trans: "",
      products_users_flag: true,
      /* obj.name = newVal[i].products[j].name;
          obj.id = newVal[i].products[j].id;
          obj.category_name = newVal[i].name;
          obj.category_id = newVal[i].id; */
      headers_main_products: [
        {
          sortable: false,
          text: "ID",
          value: "id"
        },
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Category Name",
          value: "category_name"
        },
        { text: "Actions", value: "actionsPic", sortable: false }
      ],
      headers_products: [
        {
          sortable: false,
          text: "Name",
          value: "product_item_name"
        },
        {
          sortable: false,
          text: "Product",
          value: "product_name"
        },
        {
          sortable: false,
          text: "Category",
          value: "category_name"
        },
        /* {
          sortable: false,
          text: "Quantity",
          value: "product_item_quantity"
        }, */
        /*  {
          sortable: false,
          text: "Prices (dealers)",
          value: "product_item_price_dealer",
          align: "left"
        },*/
        {
          sortable: false,
          text: "Prices (customers)",
          value: "product_item_price_customer",
          align: "left"
        },
        {
          sortable: false,
          text: "Key/Serial",
          value: "product_item_key",
          align: "left"
        },
        { text: "Actions", value: "action", sortable: false }
      ],
      headers_charge_orders: [
        {
          sortable: false,
          text: "User Name",
          value: "username",
          width: "10%"
        },
        {
          sortable: false,
          text: "Mobile",
          value: "mobile",
          width: "10%"
        },
        {
          sortable: false,
          text: "Pubg Name",
          value: "p_name",
          width: "10%"
        },
        {
          sortable: false,
          text: "Pubg ID",
          value: "p_id",
          width: "10%"
        },
        {
          sortable: false,
          text: "Amount Of Charge",
          value: "amount_of_charge",
          width: "10%"
        },
        {
          sortable: false,
          text: "transaction",
          value: "t_code",
          width: "30%"
        },

        { text: "Status", value: "t_code2", width: "10%" },
        { text: "Actions", value: "actionss", sortable: false, width: "10%" }
      ],

      headers_users: [
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "E-mail",
          value: "email"
        },
        {
          sortable: false,
          text: "Address",
          value: "address"
        },
        {
          sortable: false,
          text: "Type",
          value: "user_type.type"
        },
        /* {
          sortable: false,
          text: 'City',
          value: 'city'
        }, */

        {
          sortable: false,
          text: "Phone",
          value: "phone",
          align: "left"
        },
        {
          sortable: false,
          text: "Credit",
          value: "credit",
          align: "left"
        },
        {
          sortable: false,
          text: "Debit",
          value: "debit",
          align: "left"
        },
        { text: "Status", value: "valid", sortable: false },

        { text: "Actions", value: "actionss", sortable: false }
      ],
      /*  items_users: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738'
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738'
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142'
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735'
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542'
        }, {
          name: 'Mason Porter',
          country: 'Chile',
          city: 'Gloucester',
          salary: '$78,615'
        }
      ], */
      headers_trans: [
        {
          sortable: false,
          text: "Transaction ID",
          value: "id"
        },
        {
          sortable: false,
          text: "Transaction",
          value: "name"
        },

        {
          sortable: false,
          text: "product Item Id",
          value: "productItemId"
        },
        {
          text: "Date",
          value: "createdAt",
          width: "25%"
        },
        { text: "Actions", value: "tranActions", sortable: false }
      ],

      item_web_trans: null,
      delete_web_trans_dialog: false,
      item_support_to_delete: null,
      delete_support_item_dialog: false
    };
  },
  computed: {
    ...mapGetters({
      all_products: "getAllProductsWithKeys",
      all_users: "getAllUsers",
      all_transactions: "getAllTransactions",
      prodTypes: "productsTypes",
      pubgPricesList: "pubgPrices",
      pubgOrdersList: "pubgOrders",
      supportMessagesLocal: "supportMessages"
    })
  },

  watch: {
    all_transactions(newVal) {
      if (newVal !== undefined && newVal !== null && newVal.length > 0) {
        this.my_all_transactions = [...newVal];

        for (let i in this.my_all_transactions) {
          this.my_all_transactions[i].createdAt = new Date(
            this.my_all_transactions[i].createdAt
          ).toLocaleString();
          if (
            this.my_all_transactions[i].productItemId == null ||
            this.my_all_transactions[i].productItemId == undefined
          ) {
            this.my_all_transactions[i].productItemId = "------";
          }
        }
        this.my_all_transactions = this.reverseFun(this.my_all_transactions);
      }
    },
    supportMessagesLocal(newVal) {
      if (newVal !== undefined && newVal.length > 0) {
        this.all_support_messages = newVal;
      }
      for (let i in this.all_support_messages) {
        if (
          this.all_support_messages[i].date !== undefined &&
          this.all_support_messages[i].date !== null
        ) {
          this.all_support_messages[i].date = new Date(
            this.all_support_messages[i].date
          ).toLocaleString();
        }
      }
      this.all_support_messages = this.reverseFun(this.all_support_messages);
    },
    pubgOrdersList(newVal) {
      let obj = {
        id: 1,
        username: "",
        mobile: "",
        p_name: "",
        p_id: "",
        amount_of_charge: "",
        t_code: "",
        t_code2: ""
      };
      if (newVal !== undefined && newVal.length > 0) {
        for (let i in newVal) {
          obj.id = newVal[i].id;
          obj.username =
            newVal[i].username !== undefined && newVal[i].username !== null
              ? newVal[i].username
              : "";
          obj.mobile =
            newVal[i].mobile_number !== undefined &&
            newVal[i].mobile_number !== null
              ? newVal[i].mobile_number
              : "";
          obj.p_name =
            newVal[i].userPubgName !== undefined &&
            newVal[i].userPubgName !== null
              ? newVal[i].userPubgName
              : "";
          obj.p_id =
            newVal[i].userPubgId !== undefined && newVal[i].userPubgId !== null
              ? newVal[i].userPubgId
              : "";
          obj.amount_of_charge =
            newVal[i].amount_of_charge !== undefined &&
            newVal[i].amount_of_charge !== null
              ? newVal[i].amount_of_charge.split("_")[0]
              : "";
          obj.t_code =
            newVal[i].amount_of_charge !== undefined &&
            newVal[i].amount_of_charge !== null &&
            newVal[i].amount_of_charge.split("_")[1]
              ? newVal[i].amount_of_charge.split("_")[1]
              : "-----";
          obj.t_code2 =
            newVal[i].amount_of_charge !== undefined &&
            newVal[i].amount_of_charge !== null &&
            newVal[i].amount_of_charge.split("_")[1]
              ? newVal[i].amount_of_charge.split("_")[1]
              : "";
          let my_obj = JSON.parse(JSON.stringify(obj));

          this.all_charge_orders.push(my_obj);
        }
        this.all_charge_orders = this.reverseFun(this.all_charge_orders);
      }
    },
    pubgPricesList(newVal) {
      if (newVal) {
        for (let i = 0; i < newVal.length; i++) {
          let x = `op${i + 1}`;
          this.my_options[x] = newVal[i].value;
        }
        // debugger
        let r = [];
        for (let e = 0; e < Object.keys(this.my_options).length; e++) {
          let z = `op${e + 1}`;

          r.push(this.my_options[z].split("UC")[0]);
        }
        r = r.sort(function(a, b) {
          return a - b;
        });

        for (let t = 0; t < r.length; t++) {
          for (let j = 0; j < Object.keys(this.my_options).length; j++) {
            let c = `op${j + 1}`;
            if (r[t] == this.my_options[c].split("UC")[0]) {
              r[t] = this.my_options[c];
            }
          }
        }

        for (let i = 0; i < r.length; i++) {
          let x = `op${i + 1}`;
          this.my_options[x] = r[i];
        }
        console.log(this.my_options);
      }
    },
    prodTypes(newVal) {
      let obj = {
        id: "",
        name: "",
        category_name: "",
        category_id: ""
      };

      for (let i in newVal) {
        for (let j in newVal[i].products) {
          obj.name = newVal[i].products[j].name;
          obj.id = newVal[i].products[j].id;
          obj.category_name = newVal[i].name;
          obj.category_id = newVal[i].id;
          let my_obj = JSON.parse(JSON.stringify(obj));
          this.my_prod_types.push(my_obj);
        }
      }
    },
    all_products(newVal) {
      let obj = {};
      for (let i in newVal) {
        /* for (let j in newVal[i].products) {
          for (let r in newVal[i].products[j].product_items) { */

        if (newVal[i].product != null && newVal[i].product != undefined) {
          obj.category_id = newVal[i].product.categoryId;
          obj.product_id = newVal[i].product.id;
          obj.product_item_id = newVal[i].id;
          obj.category_name = this.getParenatName(newVal[i].product.categoryId);
          obj.product_name = newVal[i].product.name;
          obj.product_item_name = newVal[i].name;
          obj.product_item_price_dealer = newVal[i].price_for_dealer;
          obj.product_item_price_customer = newVal[i].price_for_customer;
          obj.product_item_link = newVal[i].link;
          obj.product_item_quantity = newVal[i].quantity;

          obj.product_item_key = newVal[i].key;

          this.all_products_items.push(obj);
          obj = {};
        }

        /*  }
        } */
      }
      this.all_products_items = this.reverseFun(this.all_products_items);
    },
    all_users(newVal) {
      this.all_users_data = this.reverseFun(newVal);
    }
  },
  created() {
    let user_id = localStorage.getItem("user_id");

    if (user_id != undefined && user_id != null && user_id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16") {
      this.getProductsTypes();
      this.getAllUsers();
      this.getAllTransactions();
      this.getPubgPrices();
      this.getPubgOrders();
      this.getSupportMessage();
      this.getAllProducts();
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    this.getSupportHeaders();
    this.$eventBus.$on("userBlocked", () => {
      this.blockedUnblockedSuccess = true;
    });
  },
  methods: {
    changeProductPic(item) {
      this.main_prod_to_change_pic = null;
      this.main_prod_to_change_pic = item;
      this.edit_prod_picture = true;
    },
    updateMainProductPic() {
      let formData = new FormData();
      if (this.files.length > 0) {
        formData.append("productImage", this.files[0]);
      }

      let my_product = {
        name: this.main_prod_to_change_pic.name,
        description: this.main_prod_to_change_pic.name,
        categoryId: this.main_prod_to_change_pic.category_id
      };

      Object.keys(my_product).forEach(key => {
        formData.append(key, my_product[key]);
      });
      try {
        let res = this.$http.put(
          `https://hthastore.com/api/product/${
            this.main_prod_to_change_pic.id
          }`,
          formData
        );

        this.main_prod_to_change_pic = null;
        this.edit_prod_picture = false;
      } catch (error) {
        console.log(error);
        this.main_prod_to_change_pic = null;
        this.edit_prod_picture = false;
      }
    },
    deleteWebsiteTransConfirmation(item) {
      this.item_web_trans = item;
      this.delete_web_trans_dialog = true;
    },
    deleteWebsiteTrans() {
      try {
        let res = this.$http.delete(
          `https://hthastore.com/api/transactions/${this.item_web_trans.id}`
        );
        this.delete_web_trans_dialog = false;
      } catch (error) {
        console.log(error);
        this.delete_web_trans_dialog = false;
      }
    },
    deleteSupportItemConfirmation(item) {
      this.item_support_to_delete = item;
      this.delete_support_item_dialog = true;
    },
    deleteSupportItem() {
      try {
        let res = this.$http.delete(
          `https://hthastore.com/api/support/${this.item_support_to_delete.id}`
        );
        this.delete_support_item_dialog = false;

        let index = this.all_support_messages.findIndex(
          item => item.id == this.item_support_to_delete.id
        );
        if (index != -1) {
          this.all_support_messages.splice(index, 1);
        }
      } catch (error) {
        console.log(error);
        this.delete_support_item_dialog = false;
      }
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
    addFiles() {
      this.files.length = 0;
      this.$refs.files.click();
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },
    reverseFun(arr) {
      try {
        let r = [...arr];
        r = r.reverse();
        return r;
      } catch (error) {
        console.log("Error While Reversing.");
        return [];
      }
    },
    /* let obj = {
        id:1,
        username:"",
        mobile:"",
        p_name:"",
        p_id:"",
        amount_of_charge:"",
        t_code:"",
        t_code2:"",

      } */
    closeHandler() {
      this.pubg_item_to_edit.t_code = "-----";
      this.pubg_item_to_edit.t_code2 = "";
      this.edit_pubg_item_falg = false;
    },
    async updatePubgItem() {
      if (this.pubg_item_to_edit.t_code.length > 0) {
        let data = {
          id: this.pubg_item_to_edit.id,
          username:
            this.pubg_item_to_edit.username !== null &&
            this.pubg_item_to_edit.username !== undefined
              ? this.pubg_item_to_edit.username
              : "",
          userPubgName: this.pubg_item_to_edit.p_name,
          mobile_number:
            this.pubg_item_to_edit.mobile !== null &&
            this.pubg_item_to_edit.mobile !== undefined
              ? this.pubg_item_to_edit.mobile
              : "",
          userPubgId: this.pubg_item_to_edit.p_id,
          amount_of_charge:
            this.pubg_item_to_edit.amount_of_charge +
            "_" +
            this.pubg_item_to_edit.t_code
        };
        await this.$store.dispatch("updatePubgItem", {
          data: data
        });

        this.pubg_item_to_edit.t_code2 = this.pubg_item_to_edit.t_code;

        this.edit_pubg_item_falg = false;
      }
    },
    deletePubgTrans(item) {
      this.item_to_delete = item;
      this.delete_dialog_pubg = true;
    },
    async deletePubgTransConfirmed() {
      this.delete_dialog_pubg = false;
      await this.$store.dispatch("deletePubgItem", {
        id: this.item_to_delete.id
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    editPubgTrans(item) {
      this.pubg_item_to_edit = item;
      this.edit_pubg_item_falg = true;
    },
    getParenatName(id) {
      for (let i in this.my_prod_types) {
        if (id == this.my_prod_types[i].category_id) {
          console.log(this.my_prod_types[i].category_name);
          return this.my_prod_types[i].category_name;
        }
      }
    },
    showSupportMessage(item) {
      try {
        this.support_message_obj = item.message;
        this.show_support_message = true;
      } catch (error) {}
    },
    getSupportHeaders() {
      if (window.innerWidth < 768) {
        this.headers_support = [
          {
            sortable: false,
            text: "UserName",
            value: "name"
          },
          {
            sortable: false,
            text: "Email",
            value: "email"
          },
          {
            sortable: false,
            text: "Date",
            value: "date"
          },
          { text: "Actions", value: "actns", width: "10%", sortable: false }
        ];
      } else {
        this.headers_support = [
          {
            sortable: false,
            text: "UserName",
            value: "name"
          },
          {
            sortable: false,
            text: "Email",
            value: "email"
          },
          {
            sortable: false,
            text: "Date",
            value: "date"
          },
          {
            sortable: false,
            text: "Message",
            value: "message"
          },
          { text: "Actions", value: "actns2", width: "15%", sortable: false }
        ];
      }
    },
    async saveUCS() {
      this.UCOptions = [];

      for (let i = 0; i < 13; i++) {
        let x = `op${i + 1}`;
        if (this.my_options[x].length > 0) {
          let item = {
            label: this.my_options[x],
            value: this.my_options[x]
          };
          this.UCOptions.push(item);
        }
      }
      this.uc_flag = false;
      await this.$store
        .dispatch("updatePubgPricesList", {
          list: this.UCOptions
        })
        .then(res => {
          console.log("sssssss");
        })
        .catch(err => {
          console.log("fffffff");
        });
    },
    openOptionsForm() {
      this.uc_flag = true;
    },
    async getAllProducts() {
      this.$store.dispatch("getAllProducts_2");
    },
    async getAllUsers() {
      this.$store.dispatch("getAllUsers");
    },
    async getAllTransactions() {
      this.$store.dispatch("getAllTransactions");
    },
    async getProductsTypes() {
      await this.$store.dispatch("getProductsTypes");
    },
    async getPubgPrices() {
      await this.$store.dispatch("getPubgPrices");
    },
    async getPubgOrders() {
      await this.$store.dispatch("getPubgOrders");
    },
    async getSupportMessage() {
      await this.$store.dispatch("getSupportMessage");
    },

    setProductType(event) {
      this.object_to_edit.product_id = event;
      let index = this.my_prod_types.findIndex(item => item.id === event);

      if (index !== -1) {
        this.object_to_edit.product_name = this.my_prod_types[index].name;
      }
      // product_item_id
    },
    showProducts() {
      this.products_users_flag = true;
    },
    showUsers() {
      this.products_users_flag = false;
    },
    editProduct(item) {
      this.object_to_edit = { ...item };
      this.prod_name_to_edit = {
        name: "",
        id: ""
      };
      this.prod_name_to_edit.name = this.object_to_edit.product_name;
      this.prod_name_to_edit.id = this.object_to_edit.product_id;
      this.object_to_edit.purpose = "Edit Product";

      this.dialog = true;
    },
    editUser(item) {
      this.user_to_edit = { ...item };
      this.user_to_edit.purpose = "Edit User";

      this.user_edit_dialog = true;
    },
    deleteProductConfirmation(item) {
      this.item_to_delete = item;
      this.delete_dialog = true;
    },
    deleteUserConfirmation(item) {
      this.user_to_delete = item;
      this.delete_user_dialog = true;
    },

    blockUser(user) {
      if (user.valid !== undefined) {
        if (user.valid == "false") {
          user.valid = "true";
          this.$store.dispatch("blockUser", {
            id: user.id,
            valid: "true"
          });
        } else {
          user.valid = "false";
          this.$store.dispatch("blockUser", {
            id: user.id,
            valid: "false"
          });
        }
      }
    },
    closeDeleteProductConfirmation() {
      this.item_to_delete = null;
      this.delete_dialog = false;
      this.delete_dialog_pubg = false;
    },
    closeDeleteUserConfirmation() {
      this.user_to_delete = null;
      this.delete_user_dialog = false;
    },
    async deleteProduct() {
      await this.$store.dispatch("deleteProduct", {
        id: this.item_to_delete.product_item_id
      });
      let index = this.all_products_items.findIndex(
        item => item.product_item_id === this.item_to_delete.product_item_id
      );
      if (index !== -1) {
        this.all_products_items.splice(index, 1);
      }
      this.closeDeleteProductConfirmation();
    },
    async deleteUser() {
      await this.$store.dispatch("deleteUser", {
        id: this.user_to_delete.id
      });

      let index = this.all_users_data.findIndex(
        item => item.id === this.user_to_delete.id
      );
      if (index !== -1) {
        this.all_users_data.splice(index, 1);
      }
      this.closeDeleteUserConfirmation();
    },
    async updateProduct() {
      let index = this.all_products_items.findIndex(
        item => item.product_item_id === this.object_to_edit.product_item_id
      );

      if (index !== -1) {
        if (
          this.all_products_items[index].product_item_key ==
          this.object_to_edit.product_item_key
        ) {
          let array_of_same_name_products = [];
          for (let i in this.all_products_items) {
            if (
              this.all_products_items[i].product_item_name ==
              this.all_products_items[index].product_item_name
            ) {
              array_of_same_name_products.push(this.all_products_items[i]);
            }
          }

          let array_of_items_to_change = [];
          let k = "";
          let id = null;
          for (let j in array_of_same_name_products) {
            k = array_of_same_name_products[j].product_item_key;
            id = array_of_same_name_products[j].product_item_id;
            Object.assign(array_of_same_name_products[j], this.object_to_edit);
            array_of_same_name_products[j].product_item_key = k;
            array_of_same_name_products[j].product_item_id = id;
            k = "";
            id = null;
            array_of_items_to_change.push(array_of_same_name_products[j]);
          }

          for (let r in array_of_items_to_change) {
            let formData = new FormData();
            if (this.files.length > 0) {
              formData.append("productImage", this.files[0]);
            }
            if (array_of_items_to_change[r].purpose) {
              delete array_of_items_to_change[r].purpose;
            }
            let my_product = {
              name: array_of_items_to_change[r].product_item_name,
              quantity: 1,
              price_for_dealer:
                array_of_items_to_change[r].product_item_price_dealer,
              price_for_customer:
                array_of_items_to_change[r].product_item_price_customer,
              link: array_of_items_to_change[r].product_item_link,
              key: array_of_items_to_change[r].product_item_key
            };
            Object.keys(my_product).forEach(key => {
              if (!my_product[key] || my_product[key].length === 0) {
                delete my_product[key];
              }
            });
            Object.keys(my_product).forEach(key => {
              formData.append(key, my_product[key]);
            });
            await this.$store.dispatch("updateProduct", {
              product: array_of_items_to_change[r],
              data: formData
            });
          }

          this.files = [];

          /* this.dialog = false;
          setTimeout(() => {
            window.location.reload();
          }, 2000); */
        } else {
          try {
            //change only this product item key
            Object.assign(this.all_products_items[index], this.object_to_edit);

            for (let key in this.object_to_edit) {
              if (
                this.object_to_edit[key] !== null &&
                this.object_to_edit[key].length == 0
              ) {
                this.object_to_edit[key] = null;
              }
            }

            if (this.object_to_edit.purpose) {
              delete this.object_to_edit.purpose;
            }

            let my_product = {
              name: object_to_edit.product_item_name,
              quantity: 1,
              price_for_dealer: object_to_edit.product_item_price_dealer,
              price_for_customer: object_to_edit.product_item_price_customer,
              link: object_to_edit.product_item_link,
              key: object_to_edit.product_item_key
            };
            Object.keys(my_product).forEach(key => {
              if (!my_product[key] || my_product[key].length === 0) {
                delete my_product[key];
              }
            });
            let formData = new FormData();
            if (this.files.length > 0) {
              formData.append("productImage", this.files[0]);
            }

            Object.keys(this.object_to_edit).forEach(key => {
              formData.append(key, my_product[key]);
            });

            await this.$store.dispatch("updateProduct", {
              product: this.object_to_edit,
              data: formData
            });
            this.files = [];

            /* setTimeout(() => {
            window.location.reload();
          }, 2000); */
          } catch (error) {}
        }
      }
    },
    async updateUser() {
      if (this.user_to_edit.credit.length == 0) {
        this.user_to_edit.credit = 0;
      }
      if (this.user_to_edit.debit.length == 0) {
        this.user_to_edit.debit = 0;
      }
      this.user_to_edit.credit =
        Number(this.user_to_edit.credit) + Number(this.user_to_edit.debit);
      let index = this.all_users_data.findIndex(
        item => item.id === this.user_to_edit.id
      );
      if (index !== -1) {
        Object.assign(this.all_users_data[index], this.user_to_edit);
      }
      this.user_edit_dialog = false;
      await this.$store.dispatch("updateUserInfo", {
        user: this.user_to_edit
      });
      // window.location.reload();
    },
    closeEditModal() {
      this.dialog = false;
    },
    closeEditUserModal() {
      this.user_edit_dialog = false;
    }
  }
};
</script>

<style>
input[type="file"] {
  visibility: hidden;
  width: 0px;
  height: 0px;
}

div.file-listing {
  width: 200px;
}
.font-asom-icon {
  color: green;
  font-size: 17px;
  margin: 0 11px 0 0px;
}
td.text-start {
  max-width: 600px;
}

@media screen and (max-width: 768px) {
  .v-application .ma-3 {
    margin: 8px 0px 0px 10px !important;
  }

  .btn-mobile {
    padding: 0 5px 0px 5px !important;
  }
  .v-data-table-header-mobile__wrapper {
    display: none;
  }

  .v-application--is-ltr .v-data-footer__pagination {
    margin: 0 10px 0 0px;
  }
}
</style>

<style scoped>
.block {
  font-size: 16px;
  margin: 0px -16px 0 10px;
  color: #ef0d0d;
}
.table-data {
  padding: 87px 0 0 0;
}

.edit {
  margin: 0 10px 0 0;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}

.deletee {
  cursor: pointer;
}
</style>


<template>
  <div>
    <div style="background: #EAEAEA;position:relative;height: 65px;">
      <router-link to="/">
        <img class="logoFav" :src="viaJs">
      </router-link>
      <div class="multi-select">
        <button class="srch-btn" @click="getSearchRes">search</button>

        <input class="inpt-search" type="text" v-model="searchText">
      </div>
    </div>

    <div>
      <template v-if="mobile_flag">
        <v-app-bar-nav-icon @click.stop="showDrawer"></v-app-bar-nav-icon>

        <v-navigation-drawer
          ref="dr"
          v-model="drawer"
          app
          right
          floating
          persistent
          mobile-break-point="768"
          width="260"
        >
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
              <template v-if="login_flag">
                <v-list-item>
                  <v-list-item-title
                    style="font-size: 15px !important;font-weight: bolder !important;"
                  >{{getUserName()}}</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item v-if="admin_flag" to="/Admin">
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item>

              <v-list-item v-for="(item,index) in my_links" :key="index+9995" :to="item.to">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span>credit</span>

                  <span class="products-number-2">{{my_credit ? my_credit : 0}}</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <span>debit</span>

                  <span class="products-number-2">{{my_debit ? my_debit * -1 : 0}}</span>
                </v-list-item-title>
              </v-list-item>

              <template v-if="login_flag">
                <v-list-item
                  class="vv-list-item"
                  v-for="(item, index) in items"
                  :key="index+111214"
                >
                  <v-list-item-title @click="doAction(item)">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </template>

              <!-- <div class="shopping-cart-par">
                <span>credit</span>

                <span class="products-number-2">{{my_credit ? my_credit : 0}}</span>
              </div>-->
              <!-- <div class="shopping-cart-par">
                <span>debit</span>

                <span class="products-number-2">{{my_debit ? my_debit * -1 : 0}}</span>
              </div>-->
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="shopping-cart-par-mobile">
              <div class="shopping-cart-par">
                <i class="fas fa-shopping-cart shopping-cart"></i>
                <div>
                  <span class="products-number">{{totalItems}}</span>
                </div>
              </div>
            </div>
          </template>
          <v-list>
            <v-list-item class="vv-list-item" v-for="(item, index) in cart_options" :key="index">
              <v-list-item-title @click="doPurchaseAction(item)">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-toolbar
          class="hidden-xs-and-down container"
          :style="{ backgroundImage: `url(${custom_header})` }"
        >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn v-if="admin_flag" to="/Admin" title="Admin">Admin</v-btn>
            <v-btn
              v-for="item in my_links"
              :key="item.icon"
              :to="item.to"
              :title="item.text"
            >{{ item.text }}</v-btn>
          </v-toolbar-items>

          <v-menu offset-y v-if="login_flag">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <div class="profile-img">
                  <i class="fas fa-chevron-circle-down arrow-down"></i>
                  <span>{{getUserName()}}</span>
                  <!-- <img
                    src="https://images.safarway.com/327abd3f-e1da-4328-b817-8f8af1f20992_xs.jpg"
                  >-->
                </div>
              </div>
            </template>
            <v-list>
              <v-list-item class="vv-list-item" v-for="(item, index) in items" :key="index">
                <v-list-item-title @click="doAction(item)">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="shopping-cart-par">
            <span>credit</span>

            <span class="products-number-2">{{my_credit ? my_credit : 0}}</span>
          </div>
          <div class="shopping-cart-par">
            <span>debit</span>

            <span class="products-number-2">{{my_debit ? my_debit * -1 : 0}}</span>
          </div>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <div class="shopping-cart-par">
                  <i class="fas fa-shopping-cart shopping-cart"></i>
                  <div>
                    <span class="products-number">{{totalItems}}</span>
                  </div>
                </div>
              </div>
            </template>
            <v-list>
              <v-list-item class="vv-list-item" v-for="(item, index) in cart_options" :key="index">
                <v-list-item-title @click="doPurchaseAction(item)">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>
      <v-dialog v-model="showAllProducts" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Products
            <span class="products-total">Total : {{totalPrice}}$</span>
          </v-card-title>

          <v-simple-table fixed-header height="auto">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart_items" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.price_for_dealer !== undefined ? item.price_for_dealer : item.price_for_customer }} × {{item.qnty_req}} piece</td>
                  <!-- <td v-else>{{ item.price_for_customer }} × {{item.qnty_req}} piece</td> -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-divider></v-divider>
          <v-select
            class="payments-methods"
            :items="payments_methods"
            item-text="name"
            item-value="id"
            v-model="defaultSelected"
            @change="setPaymentMethodType"
            label="Payments Method*"
          ></v-select>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="continuePurchaseProcess()">Continue</v-btn>
            <v-btn color="primary" text @click="showAllProducts = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="my_account_pay_dialog" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Payment Result
            <span class="products-total-2">Total : {{totalPrice}}$</span>
          </v-card-title>
          <br>
          <br>
          <div v-show="purchase_success">
            <span class="purchase-success-2">Thank you for your purchase from Hthastore !</span>
            <span class="purchase-success-2 coloring">your purchase : {{this.user_purchase}}$</span>
            <span class="purchase-success-2 coloring">you can find your products in your profile</span>
          </div>
          <div
            class="purchase-success"
            v-show="purchase_failed"
          >Sorry your account credit not enough! you can try another payment method or delete some products.</div>
          <br>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="refreshPage()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="overlay_" fullscreen full-width>
        <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
          <v-layout justify-center align-center class="loaderr">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>

      <v-dialog v-model="data_requested_not_found" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Payment Result</v-card-title>
          <br>
          <div>Sorry, some of the products you have ordered are not currently available, please fill in your order again.</div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="refreshPage()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="general_search_flag" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Search Result</v-card-title>
          <template
            v-if="my_cats_search_result.length ==0 && 
                          my_productType_search_result.length == 0 && 
                          my_productItem_search_result.length == 0"
          >
            <br>
            <div class="search-items">Sorry, there is no result for : {{searchText}}</div>
          </template>
          <template v-else>
            <br>
            <div class="res-title" v-if="my_cats_search_result.length != 0">Product Categories</div>

            <div class="search-items" v-for="(item,index) in my_cats_search_result" :key="index">
              <router-link style="text-decoration: none;" to="/">
                <span @click="general_search_flag = false">{{item.name}}</span>
              </router-link>
            </div>

            <hr v-if="my_cats_search_result.length != 0">
            <div class="res-title" v-if="my_productType_search_result.length != 0">Product Types</div>

            <div
              class="search-items"
              v-for="(item,index) in my_productType_search_result"
              :key="index+1000"
            >
              <router-link
                style="text-decoration: none;"
                :to="{name : 'product', params : {id:item.id,name:item.name}}"
              >
                <span @click="general_search_flag = false">{{item.name}}</span>
              </router-link>
            </div>

            <hr v-if="my_productType_search_result.length != 0">
            <div class="res-title" v-if="my_productItem_search_result.length != 0">Product Items</div>

            <div
              class="search-items"
              v-for="(item,index) in my_productItem_search_result"
              :key="index+10000"
            >
              <router-link
                style="text-decoration: none;"
                :to="{name : 'product', params : {id:item.productId,name:getParenatName(item)}}"
              >
                <span @click="general_search_flag = false">{{item.name}}</span>
              </router-link>
            </div>
          </template>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="general_search_flag = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="user_not_logged" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Login Required</v-card-title>
          <br>
          <div class="search-items">you must Log in or Sign up to continue with this action.</div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/Login">
              <v-btn color="primary" text @click="user_not_logged = false">Login</v-btn>
            </router-link>
            <v-btn color="primary" text @click="user_not_logged = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="user_not_auth" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Blocked</v-card-title>
          <br>
          <div
            class="search-items"
          >Sorry, you are blocked!.Contact your administrator or Website Support to request permission.</div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="user_not_auth = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
// Utilities
import { mapMutations, mapGetters, mapState } from "vuex";
import * as cookies from "js-cookie";
import custom_header from "../../assets/header2.jpg";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {},
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    my_final_obj: null,
    is_dealer: false,
    drwaer_flag: false,
    mobile_flag: false,
    drawer: false,
    group: null,
    payment_was_selected: false,
    user_not_logged: false,
    user_not_auth: false,
    general_search_flag: false,
    my_cats_search_result: [],
    my_productType_search_result: [],
    my_productItem_search_result: [],
    searchText: "",
    selected: null,
    multi_select_options: [],
    admin_flag: false,
    use_debit_not_credit: false,
    use_credit_not_debit: false,
    data_requested_not_found: false,
    my_credit_used_flag: false,
    pay_pal_used_flag: false,
    all_products_available: false,
    user_purchase: 0,
    my_account_pay_dialog: false,
    purchase_success: false,
    purchase_failed: false,
    my_pay_method: 1,
    payments_methods: [
      {
        name: "My Account",
        id: 1
      },
      {
        name: "PayPal",
        id: 2
      }
    ],
    defaultSelected: {
      name: "My Account",
      id: 1
    },
    my_credit: 0,
    my_debit: 0,
    viaJs: require("../../assets/logo-fav3.png"),
    custom_header,
    overlay_: false,
    zIndex: 555,
    showAllProducts: false,
    dialog: false,
    login_flag: false,
    my_cart_items: [],
    items: [{ title: "My Profile" }, { title: "Log Out" }],
    cart_options: [
      { title: "Continue your purchase" },
      { title: "Delete all products" }
    ],
    my_links: [],
    links: [
      {
        to: "/Admin",
        icon: "mdi-bell",
        text: "Admin"
      },
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Home"
      },
      /* {
        to: "/user-profile",
        icon: "mdi-account",
        text: "User Profile"
      }, */
      {
        to: "/pubg",
        icon: "mdi-xbox-controller",
        text: "Pubg Charging"
      },
      {
        to: "/Login",
        icon: "",
        text: "Sign in"
      }
    ]
  }),

  computed: {
    ...mapGetters({
      cart_items: "getCartItems",
      product_items: "productsItems",
      credit: "credit",
      debit: "debit",
      profile: "userProfile",
      all_products_founded: "getProductsFounded",
      my_res_esarch: "getSearchRes",
      all_products: "getAllProducts"
    }),
    totalPrice() {
      let total = 0;
      // if (this.is_dealer) {
        
      for (let i in this.cart_items) {
        if (this.cart_items[i].price_for_dealer != undefined) {
          total +=
            this.cart_items[i].price_for_dealer * this.cart_items[i].qnty_req;
        } else {
          total +=
            this.cart_items[i].price_for_customer * this.cart_items[i].qnty_req;
        }
      }
      /* } else {
        for (let i in this.cart_items) {
          
        }
      } */

      return total;
    },
    totalItems() {
      let total = 0;

      for (let i in this.cart_items) {
        total += this.cart_items[i].qnty_req;
      }
      return total;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    },
    my_res_esarch(newVal) {
      if (newVal !== undefined && newVal !== null) {
        this.general_search_flag = true;

        if (
          newVal.category !== undefined &&
          newVal.category !== null &&
          newVal.category.length > 0
        ) {
          this.my_cats_search_result = [...newVal.category];
        }
        if (
          newVal.productType !== undefined &&
          newVal.productType !== null &&
          newVal.productType.length > 0
        ) {
          this.my_productType_search_result = [...newVal.productType];
        }
        if (
          newVal.productItem !== undefined &&
          newVal.productItem !== null &&
          newVal.productItem.length > 0
        ) {
          this.my_productItem_search_result = [...newVal.productItem];
          for (let i = 0; i < this.my_productItem_search_result.length; i++) {
            if (
              this.my_productItem_search_result[i].quantity == undefined ||
              this.my_productItem_search_result[i].quantity == 0 ||
              this.my_productItem_search_result[i].quantity == null
            ) {
              this.my_productItem_search_result.splice(i, 1);
              i = i - 1;
            }
          }
        }
      }
    },
    all_products_founded(newVal) {
      if (newVal == 1) {
        if (this.pay_pal_used_flag) {
          this.doBuyByPayPal();
        } else {
          this.doBuyByMyCredit();
        }
      } else if (newVal == -1) {
        this.data_requested_not_found = true;
      } else {
        this.data_requested_not_found = true;
      }
    },
    profile(newVal) {
      if (newVal !== undefined && newVal !== null) {
        if (newVal.credit !== undefined && newVal.credit !== null) {
          this.my_credit = newVal.credit;
        }
        if (newVal.debit !== undefined && newVal.debit !== null) {
          this.my_debit = newVal.debit;
        }
      }
    },
    credit(newVal) {
      if (newVal) {
        this.my_credit = newVal;
      }
    },
    debit(newVal) {
      if (newVal) {
        this.my_debit = newVal;
      }
    },
    cart_items(newVal) {
      if (newVal) {
        this.my_cart_items = [...newVal];
      }
    }
  },
  created() {
    this.getPermm();
    //this.getAllProducts();

     if (localStorage.getItem("user_id") !== undefined && localStorage.getItem("user_id") !== null) {
      this.$store
        .dispatch("getUserProfile", {
          id: localStorage.getItem("user_id")
        });
    }
    window.addEventListener("beforeunload", e => {
      cookies.set("ref", true);
    });
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.mobile_flag = true;
    }
    console.log("window.innerWidth >> ", window.innerWidth);

    this.$eventBus.$on("checkProdctItemsAvailabilityBus", () => {
      console.log("check_-_-_Bus");
      this.checkProdctItemsAvailability_2();
    });
    this.$eventBus.$on("userNotLogged", () => {
      this.user_not_logged = true;
    });
    this.$eventBus.$on("userNotAuth", () => {
      this.user_not_auth = true;
    });

    this.$eventBus.$on("login", () => {
      if (
        localStorage.getItem("user_id") !=
        "2b3f2622-36fe-4ecc-aa88-3db2c47fae16"
      ) {
        this.admin_flag = false;
      }
      this.userLogIn();
    });

    this.$eventBus.$on("admin_here", () => {
      this.admin_flag = true;
    });
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),

    showDrawer() {
      this.drawer = !this.drawer;
    },
    getParenatName(item) {
      if (this.all_products !== null) {
        for (let i = 0; i < this.all_products.length; i++) {
          for (let j = 0; j < this.all_products[i].products.length; j++) {
            if (this.all_products[i].products[j].id == item.productId) {
              return this.all_products[i].products[j].name;
            }
          }
        }
      }
    },
    getSearchRes() {
      if (this.searchText.length > 0) {
        this.$store.dispatch("generalSearch", {
          data: this.searchText
        });
      }
    },
    setPaymentMethodType(e) {
      this.my_pay_method = e;
    },
    updateSelected(e) {},
    getLogo() {
      //src/static/logo-fav.png
      return `static/logo-fav.png`;
    },
    async getAllProducts() {
      this.$store.dispatch("getAllProducts");
    },
    getPermm() {
      let id = localStorage.getItem("user_id");

      if (id === undefined || id === null) {
        this.my_links = [
          {
            to: "/",
            icon: "mdi-view-dashboard",
            text: "Home"
          },

          {
            to: "/pubg",
            icon: "mdi-xbox-controller",
            text: "Pubg Charging"
          },
          {
            to: "/Login",
            icon: "",
            text: "Sign in"
          }
        ];
      } else {
        this.login_flag = true;
        let id = localStorage.getItem("user_id");
        if (id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16") {
          this.admin_flag = true;
          this.my_links = [
            {
              to: "/",
              icon: "mdi-view-dashboard",
              text: "Home"
            },

            {
              to: "/pubg",
              icon: "mdi-xbox-controller",
              text: "Pubg Charging"
            }
          ];
        } else {
          this.my_links = [
            {
              to: "/",
              icon: "mdi-view-dashboard",
              text: "Home"
            },

            {
              to: "/pubg",
              icon: "mdi-xbox-controller",
              text: "Pubg Charging"
            }
          ];
        }
      }
    },
    getUserName() {
      let name = localStorage.getItem("name");
      if (name !== undefined) {
        return name;
      } else {
        return "guest";
      }
    },
    userLogIn() {
      let index = this.my_links.findIndex(item => item.text == "Sign in");

      if (index !== -1) {
        this.my_links.splice(index, 1);
      }
      this.login_flag = true;
    },
    fff() {
      /*  let index = this.links.findIndex(item => item.text == "Sign in");

      if (index !== -1) {
        this.links.splice(index, 1);
      } */
    },
    refreshPage() {
      window.location.reload();
    },
    continuePurchaseProcess(item) {
      this.showAllProducts = false;
      let choosen_products = [];
      let obj = {
        name: "",
        price: "",
        description: "item",
        productItemId: null,
        currency: "USD",
        quantity: 1
      };
      let amount = {
        currency: "USD",
        total: 0
      };
      // if (this.is_dealer) {
        
        for (let i in this.cart_items) {
          for (let j = 0; j < this.cart_items[i].qnty_req; j++) {
            obj.name = this.cart_items[i].name;
            obj.price = this.cart_items[i].price_for_dealer != undefined ? this.cart_items[i].price_for_dealer : this.cart_items[i].price_for_customer;
            obj.productItemId = this.cart_items[i].ids[j];
            amount.total += this.cart_items[i].price_for_dealer != undefined ? this.cart_items[i].price_for_dealer : this.cart_items[i].price_for_customer;
            let my_obj = Object.assign({}, obj);
            choosen_products.push(my_obj);
          }
        }
     /*  } else {
        for (let i in this.cart_items) {
          for (let j = 0; j < this.cart_items[i].qnty_req; j++) {
            obj.name = this.cart_items[i].name;
            obj.price = this.cart_items[i].price_for_customer;
            obj.productItemId = this.cart_items[i].ids[j];
            amount.total += this.cart_items[i].price_for_customer;
            let my_obj = Object.assign({}, obj);
            choosen_products.push(my_obj);
          }
        }
      } */

      let final_obj = {
        itemList: choosen_products,
        amount: amount,
        userId:
          localStorage.getItem("user_id") !== undefined
            ? localStorage.getItem("user_id")
            : ""
      };
      this.my_final_obj = final_obj;

      this.user_purchase = amount.total;

      if (this.my_pay_method == 2) {
        this.buyByPayPal(final_obj);
      } else {
        if (this.my_credit >= this.user_purchase) {
          this.use_credit_not_debit = true;
          this.buyByMyCredit(final_obj);
        } else {
          this.my_account_pay_dialog = true;
          this.purchase_failed = true;
        }
      }
    },
    doPurchaseAction(item) {
      if (
        item.title == "Continue your purchase" &&
        this.cart_items.length > 0
      ) {
        this.showAllProducts = true;
      } else if (
        item.title == "Delete all products" &&
        this.cart_items.length > 0
      ) {
        this.cart_items.length = 0;
        this.$store.dispatch("removeAllCartItems");
        window.location.reload();
      }
    },
    buyByPayPal(final_obj) {
      // request to check if all requested products available,then
      // if(true) => ask server to delete this products , then go to paypal
      // else => tell the user that the requested products sold out - you need to fill
      // your order again =>(refresh page to get new products)

      this.pay_pal_used_flag = true;
      if (!this.payment_was_selected) {
        // this.checkProdctItemsAvailability(final_obj);
        this.$eventBus.$emit("activatePayPAl", this.user_purchase);
      } else {
        this.doBuyByPayPal();
      }
      this.payment_was_selected = true;
    },
    doBuyByPayPal() {
      this.$eventBus.$emit("activatePayPAl", this.user_purchase);
    },
    buyByMyCredit(final_obj) {
      //request to check if all requested products available,then
      // if(true) => ask server to give me this products and delete them , then update user credit-debit from backend
      // else => tell the user that the requested products sold out - you need to fill
      // your order again =>(refresh automatically page to get new products)
      this.my_credit_used_flag = true;

      if (!this.payment_was_selected) {
        this.checkProdctItemsAvailability(final_obj);
      } else {
        this.doBuyByMyCredit();
      }
      this.payment_was_selected = true;
    },
    doBuyByMyCredit() {
      this.purchase_success = true;
      this.my_account_pay_dialog = true;

      let id = localStorage.getItem("user_id");

      this.my_credit -= this.user_purchase;

      this.$store.dispatch("reduceCredit", {
        data: this.user_purchase,
        id: id,
        usedWay: "credit"
      });
    },
    async checkProdctItemsAvailability(final_obj) {
      await this.$store.dispatch("checkProdctItemsAvailability", {
        products: final_obj
      });
    },
    async checkProdctItemsAvailability_2() {
      console.log("checkProdctItemsAvailability_2", this.my_final_obj);
      await this.$store.dispatch("checkProdctItemsAvailability", {
        products: this.my_final_obj
      });
    },
    doAction(item) {
      if (item.title == "My Profile") {
        this.$router.push("/user-profile");
      } else if (item.title == "Log Out") {
        localStorage.removeItem("name");
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        this.admin_flag = false;
        this.login_flag = false;
        this.getPermm();
        this.my_credit = 0;
        this.my_debit = 0;
        this.$store.dispatch("resetCreditDebit");
        if (this.$route.name != "Home") {
          this.$router.push("/");
        }
        window.location.reload();
      }
    }
  }
};
</script>
<style scoped>
.hide-show {
  display: none;
}
.res-title {
  margin: 10px 0 10px 11px;
  font-size: 18px;
  font-weight: bolder;
}
.search-items {
  margin: 0px 0 5px 27px;
}
.inpt-search {
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
  width: 80%;
  height: 31px;
  margin: 8px 0 0 10px;
}
@media screen and (max-width: 768px) {
  .search-items {
    margin: 0px 12px 5px 23px;
  }
  .inpt-search {
    width: 70%;
  }
}
.srch-btn {
  border: 1px solid black;
  padding: 1px 8px 1px 8px;
  border-radius: 3px;
  background-color: #521e69;
  color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.multi-select {
  width: 400px;
  position: absolute;
  top: 10px;
  right: 2px;
}

@media screen and (max-width: 768px) {
  .multi-select {
    top: 63px;
    width: 96%;
  }
}

.payments-methods {
  display: block;
  width: 305px;
  margin: 21px 0 0 12px;
}
.logoFav {
  width: 200px;
  margin: 3px 0 3px 0;
}

.products-total {
  margin: -32px 0px 0px 75%;
  font-size: 17px;
  color: #4caf50;
}

.products-total-2 {
  margin: -32px 0px 0px 80%;
  font-size: 17px;
  color: #4caf50;
}

.purchase-success {
  padding: 0 10px 0 22px;
}

.purchase-success-2 {
  display: block;
  padding: 0 10px 0 22px;
}

.coloring {
  color: green;
  font-weight: bold;
}
.loaderr {
  margin: 55% 0 0 0;
}

.products-number {
  position: absolute;
  right: -7px;
  top: -10px;
  background-color: #eb1e1e;
  color: white;
  border-radius: 50%;
  width: 23px;
  height: 23px;
  text-align: center;
  line-height: 1.4;
  margin-left: auto;
  margin-right: auto;
}

.products-number-2 {
  background-color: #eb1e1e;
  color: white;

  padding: 0 5px 0 5px;
  margin: 0 0 0 5px;
  border-radius: 3px;
}
.shopping-cart-par {
  position: relative;
  cursor: pointer;
  padding: 0 0 0 8px;
}

@media screen and (max-width: 768px) {
  .shopping-cart-par-mobile {
    position: absolute;
    top: 15px;
    right: 78px;
  }

  .products-total {
    margin: -32px 0px 0px 69%;
  }

  .products-total-2 {
    margin: -32px 0px 0px 69%;
  }
}
.vv-list-item {
  cursor: pointer;
}
.shopping-cart {
  font-size: 20px;
  margin: 7px 10px 0 0;
}
.arrow-down {
  font-size: 16px;
  color: white !important;
  margin: 16px -1px 0px 0px;
}

.profile-img {
  width: fit-content;
  height: 45px;
  display: inline-flex;
  margin: 0px 0px 0 11px;
  cursor: pointer;
}

.profile-img img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.profile-img span {
  display: inline-block;
  margin: 11px 8px 0 7px;
  width: fit-content;
}
.container {
  width: 1110px;
  height: 60px;
  color: white;
  z-index: 10;
  background-size: cover;
  background-position: 100%;
  border-radius: 5px !important;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}

@media screen and (max-width: 768px) {
  .container {
    margin: inherit;
    width: inherit !important;
  }
}

.v-toolbar__items > a {
  background-color: unset !important;
  color: inherit;
  box-shadow: none;
}
</style>
<style>
@media screen and (max-width: 768px) {
  .v-app-bar__nav-icon {
    position: absolute;
    top: 5px !important;
    right: 6px !important;
    width: 60px !important;
    height: 60px !important;
  }
}
.v-navigation-drawer--absolute {
  position: absolute;
  top: 0px !important;
  z-index: 30 !important;
}

.theme--light.v-application {
  background: #eeeeee !important;
  color: rgba(0, 0, 0, 0.87);
}
.v-dialog--fullscreen {
  background: black !important;
  opacity: 0.5 !important;
}
.v-toolbar__content {
  height: 39px !important;
}
.v-application .grey.lighten-3 {
  padding: 0 !important;
}

@media screen and (max-width: 768px) {
  .v-application .grey.lighten-3 {
    margin: 60px 0 0 0;
  }
}

.v-btn__content {
  text-transform: none;
}
</style>

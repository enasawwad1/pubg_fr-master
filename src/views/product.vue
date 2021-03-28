<template>
  <div>
    <p class="main-title">{{product_name}}</p>
    <div class="parent-div" v-for="(item,index) in my_product_items" :key="index">
      <div class="section">
        <div class="category" @mouseover="showOverlay(index)" @mouseleave="hideOverlay(index)">
          <div class="img-div" style="width:100%">
            <img :src="getCover(item)" alt>
          </div>
          <div class="details">
            <p class="cut-content cut-content-2">{{item.name}}</p>
            <p class="cut-content">{{item.price_for_dealer !== undefined ? item.price_for_dealer : item.price_for_customer}}$</p>
            <!-- <p class="cut-content buy-now">Buy Now</p> -->
          </div>
          <v-overlay :absolute="true" :opacity="0.8" :value="false" :ref="index">
            <div class="item-details">
              <!-- <p class="cut-content">version: {{item.name}}</p> -->
              <p>{{item.name}}</p>

              <p class="cut-content">Price: {{item.price_for_dealer !== undefined ? item.price_for_dealer : item.price_for_customer}}$</p>
              <p
                class="cut-content pointer"
                v-if="item.link !== undefined &&item.link !== null"
                @click="goToWebsite(item.link)"
              >Link: {{item.link}}</p>
              <p class="cut-content">Quantity: {{item.count}}</p>
            </div>
          </v-overlay>
        </div>
      </div>
      <div class="qnty-parent">
        <input
          readonly
          :id="'inp'+index"
          class="qnty"
          type="number"
          name="quantity"
          min="1"
          :max="item.count"
          v-model="item.qnty_req"
        >
        <!-- <span class="plus-minus"> + </span>
        <span class="plus-minus"> - </span>-->
        <button class="plus-minus" @click="increaseQnty(item,$event,index)">+</button>
        <button class="plus-minus" @click="decreaseQnty(item,$event,index)">-</button>
      </div>
      <div class="buy-now-btn-parent">
        <v-btn
          class="buy-now-btn"
          small
          :id="'btnn'+index"
          color="success"
          dark
          @click="addItemToCart(item,$event)"
          :class="{'disable-events': pay_pal_process_flag}"
        >Add To Cart</v-btn>
      </div>
    </div>
    <!-- <div class="paypal-container" v-show="pay_pal_process_flag">
      <div ref="paypal"></div>
    </div>-->
    <div id="paypal-button-container" class="paypal-container" v-show="pay_pal_process_flag"></div>
    <v-dialog v-model="paypal_payment_done" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Payment Result
          <span class="products-total-2">Total : {{final_paypal_product.price}}$</span>
        </v-card-title>
        <br>
        <br>
        <div v-show="true">
          <span class="purchase-success-2">Thank you for your purchase from Hthastore !</span>
          <span class="purchase-success-2 coloring">your purchase : {{final_paypal_product.price}}$</span>
          <span class="purchase-success-2 coloring">you can find your products in your profile</span>
        </div>
        <div
          class="purchase-success"
          v-show="false"
        >Sorry your account credit not enough! you can try another payment method or delete some products.</div>
        <br>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="refreshPage()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as cookies from "js-cookie";

export default {
  name: "product",
  data() {
    return {
      notfound: require("../assets/notfound.png"),
      is_dealer: false,
      pay_pal_block_Actions: false,
      paypal_payment_done: false,
      pay_pal_process_flag: false,
      loaded: false,
      paidFor: false,
      final_paypal_product: {
        price: 0,
        description: "HthaStore"
      },
      product_id: "",
      product_name: "",
      my_product_items: [],
      items: [
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Professional",
            price: "7",
            key: "ZPSI-PW...",
            quantity: "8"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Ultimate",
            price: "10",
            key: "WQF8-YU...",
            quantity: "3"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        },
        {
          details: {
            name: "Home",
            price: "12",
            key: "FLKU-VT...",
            quantity: "12"
          },
          img_src: "https://www.gstatic.com/webp/gallery/4.sm.webp"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      product_items: "productsItems",
      items_cart: "getCartItems",
      user_auth: "userStatus"
    })
  },
  watch: {
    "$route.params.id": function(id) {
      this.reRenderThePage();
    },
    product_items(newVal) {
      
      for (let i = 0; i < newVal.product_items.length; i++) {
        if (
          newVal.product_items[i].quantity !== undefined &&
          newVal.product_items[i].quantity !== null &&
          newVal.product_items[i].quantity > 0 &&
          newVal.product_items[i].name.indexOf("slide") == -1
        ) {
          newVal.product_items[i].count = 1;
          newVal.product_items[i].qnty_req = 1;
          newVal.product_items[i].ids = [];
          newVal.product_items[i].ids.push(newVal.product_items[i].id);
          for (let j = i + 1; j < newVal.product_items.length; j++) {
            if (
              newVal.product_items[j].quantity !== undefined &&
              newVal.product_items[j].quantity !== null &&
              newVal.product_items[j].quantity > 0 &&
              newVal.product_items[j].name == newVal.product_items[i].name
            ) {
              newVal.product_items[i].count++;
              newVal.product_items[i].ids.push(newVal.product_items[j].id);
              newVal.product_items.splice(j, 1);
              j = j - 1;
            }
          }
        } else {
          newVal.product_items.splice(i, 1);
          i = i - 1;
        }
      }

      this.my_product_items = newVal.product_items;
      this.product_name = newVal.name;
    }
  },
  created() {
   /*  let user__type = cookies.get("user__type");
    if (user__type !== undefined && user__type !== null && user__type == 1) {
      this.is_dealer = true;
    } */

    if (this.$route.params.id) {
      this.reRenderThePage();
    }
  },

  mounted() {
    this.$eventBus.$on("activatePayPAl", data => {
      this.final_paypal_product.price = data;
      this.pay_pal_process_flag = true;
      setTimeout(() => {
        window.scrollTo(
          0,
          document.body.scrollHeight || document.documentElement.scrollHeight
        );
      }, 1000);
    });

    this.$nextTick(() => {
    
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AfqPF6s4thArahAwz85QbNO-owqJnZYYRcuPRHPfgGqZ1GYCAroThqOvLh6Xne5JsWiVIxb6QTLGrvPb&currency=USD";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    });
    let me = this;
    
  },
  updated() {},
  beforeDestroy() {
    if (
      this.pay_pal_process_flag == true &&
      this.paypal_payment_done == false
    ) {
      //this.restoreDataToDataBase();
    }
    this.pay_pal_process_flag == false;
  },
  methods: {
    getCover(item) {
      if (
        item.coverPhoto !== undefined &&
        item.coverPhoto !== null &&
        item.coverPhoto.length > 0
      ) {
        let path = item.coverPhoto.split("/")[1];
        return `https://hthastore.com/api/${path}`;
      } else {
        return this.notfound
      }
    },
    goToWebsite(link) {
      window.open(link, "_blank");
    },
    restoreDataToDataBase() {
      for (let i in this.items_cart) {
        for (let j = 0; j < this.items_cart[i].qnty_req; j++) {
          this.items_cart[i].id = this.items_cart[i].ids[j];
          this.$store.dispatch("updateProduct2", {
            product: this.items_cart[i]
          });
        }
      }
      this.$store.dispatch("removeAllCartItems");
    },
    reRenderThePage() {
      this.product_id = this.$route.params.id;
      this.getProductsItems();
      this.product_name = this.$route.params.name;
    },
    windowClosed: function() {},
    setLoaded: function() {
      /* if (this.$refs.paypal !== undefined) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              console.log("createOrder>>", data, actions);
              return actions.order.create({
                purchase_units: [
                  {
                    description: this.final_paypal_product.description,
                    amount: {
                      currency_code: "USD",
                      value: this.final_paypal_product.price
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.data;
              console.log(order);
              this.saveOrder(order);
            },
            onError: err => {
              //   window.location.reload();
            },
            onCancel: err => {
              //  window.location.reload();
            }
          })
          .render(this.$refs.paypal);
      } */
      let me = this;
      
      paypal.Buttons({

            // Set up the transaction
            createOrder: function(data, actions) {

                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: me.final_paypal_product.price
                        }
                    }]
                });
            },

            // Finalize the transaction
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show a success message to the buyer
                    // console.log('Transaction completed',details);
                    me.saveOrder(details);

                });
            }


        }).render('#paypal-button-container');
    },
    async saveOrder(order) {
      this.pay_pal_process_flag = false;
      this.paypal_payment_done = true;
      let data = {};
      this.$eventBus.$emit("checkProdctItemsAvailabilityBus");

      try {
        data = {
          username: localStorage.getItem("name"),
          paypal_id: order.id,
          amount: order.purchase_units[0].amount.value,
          currency: "USD"
        };
      } catch (e) {
        console.log("transaction error");
      }

      await this.$store.dispatch("saveOrderDetails", {
        order: data
      });
    },
    refreshPage() {
      window.location.reload();
    },
    increaseQnty(item, event, index) {
      try {
        let my_inp = "inp" + index;

        if (item.count > item.qnty_req) {
          item.qnty_req++;
          document.getElementById(my_inp).value = item.qnty_req;
        }
      } catch (e) {}
    },
    decreaseQnty(item, event, index) {
      try {
        let my_inp = "inp" + index;

        if (item.qnty_req > 1) {
          item.qnty_req--;
          document.getElementById(my_inp).value = item.qnty_req;
        }
      } catch (e) {}
    },
    getStatus(item, index) {
      let flag = false;

      for (let i in this.items_cart) {
        if (item.id == this.items_cart[i].id) {
          flag = true;
        }
      }
      let c = "btnn" + index;
      document.getElementById(c);
      if (!flag) {
        // e.currentTarget.childNodes[0].innerText == "Add To Cart"
      } else {
        // e.currentTarget.childNodes[0].innerText == "Remove From Cart"
      }
    },
    addItemToCart(item, e) {
      let id = localStorage.getItem("user_id");

      if (id == undefined) {
        this.$eventBus.$emit("userNotLogged");
      } else if (this.user_auth == "false") {
        this.$eventBus.$emit("userNotAuth");
      } else {
        if (e.currentTarget.childNodes[0].innerText == "Add To Cart") {
          e.currentTarget.childNodes[0].innerText = "Remove From Cart";

          this.$store.dispatch("addCartItem", {
            item: item
          });
        } else {
          e.currentTarget.childNodes[0].innerText = "Add To Cart";
          this.$store.dispatch("removeCartItem", {
            id: item.id
          });
        }
      }
    },
    async getProductsItems() {
      await this.$store.dispatch("getProductsItems", {
        prod_id: this.product_id
      });
    },
    showOverlay(index) {
      this.$refs[index][0].value = true;
    },
    hideOverlay(index) {
      this.$refs[index][0].value = false;
    }
  }
};
</script>

<style scoped>
.disable-events {
  pointer-events: none;
}
.purchase-success-2 {
  display: block;
  padding: 0 10px 0 22px;
}

.coloring {
  color: green;
  font-weight: bold;
}
.products-total-2 {
  margin: -32px 0px 0px 80%;
  font-size: 17px;
  color: #4caf50;
}

.paypal-container {
  display: block;
  margin: 30px auto;
  width: 450px;
}

@media screen and (max-width: 768px) {
  .paypal-container {
    width: 310px;
  }
}
.qnty-parent {
  width: 90%;
}
.plus-minus {
  width: 25px;
  font-size: 17px;
  font-weight: bold;
  background: #521e69;
  height: 21px;
  margin: 4px 0px 0 1px;
  color: white;
  border: 1px solid;
  border-radius: 3px;
  line-height: 1px;
}
.qnty {
  width: 70%;
  height: 20px;
  border: 1px solid #938484;
  border-radius: 3px;
}

.parent-div {
  display: inline-block;
  width: 20%;
  margin: 0 0 0 50px;
}

@media screen and (max-width: 768px) {
  .qnty {
    width: 62%;
    height: 20px;
    border: 1px solid #938484;
    border-radius: 3px;
  }

  .parent-div {
    display: inline-block;
    width: 45%;
    margin: 0 0 0 15px;
  }
  .buy-now-btn {
    margin: 5px 0 0 0;
    width: 83%;
    text-transform: none;
  }
}

.main-title {
  text-align: center;
  font-weight: bold;
  font-size: 25px;
}
.section {
  display: inline-block;
}

.item-details {
  padding: 18px 0 0 7px;
}

.category {
  position: relative;
  display: inline-block;
  height: auto;
  margin: 20px 30px 0 0;
  border: 1.5px solid #c8c8c8;
  border-radius: 5px;
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .category {
    /* width: 40%; */
  }
}
.details {
  /* display: inline-block; */
  margin: auto 6px;
}

.details p {
  display: flex;
}

.img-div {
  display: inline-block;
}
.img-div img {
  width: 100%;
  height: 130px;
  min-height: 130px;
  object-fit: cover;
}

.cut-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
}
.cut-content-2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
  width: 174px;
}
.buy-now-btn {
  margin: 5px 0 0 0;
  width: 86.5%;
  text-transform: none;
}
</style>
<style>
.v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>

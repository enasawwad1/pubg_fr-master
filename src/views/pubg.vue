<template>
  <div class="login-page">
    <div class="note-class">
      <strong>Note:</strong> HthaStore charge Only Pubg Global.
    </div>
    <div class="form">
      <form class="register-form">
        <span class="errormsg" v-if="error_flag">{{req_fe}} is required.</span>
        <input type="text" v-model="obj.userPubgName" placeholder="Enter Your Pubg Name*">
        <input type="text" v-model="obj.userPubgId" placeholder="Enter Your Pubg ID*">
        <input type="text" v-model="obj.username" placeholder="Enter Your Name">
        <input type="number" v-model="obj.mobile_number" placeholder="Ex: +970XXXXXXXXX">
        <v-container fluid class="contrr">
          <p>choose your UC: {{ obj.amount_of_charge }}</p>
          <v-radio-group v-model="obj.amount_of_charge" row :mandatory="false">
            <template v-for="(item,index) in my_radios">
              <v-radio class="rd-btn" :label="item.label" :value="item.value" :key="index"></v-radio>
            </template>
            <!-- <v-radio class="rd-btn" label="Radio 2" value="radio-2"></v-radio>
            <v-radio class="rd-btn" label="Radio 3" value="radio-3"></v-radio>
            <v-radio class="rd-btn" label="Radio 4" value="radio-4"></v-radio>
            <v-radio class="rd-btn" label="Radio 5" value="radio-5"></v-radio>
            <v-radio class="rd-btn" label="Radio 6" value="radio-6"></v-radio>
            <v-radio class="rd-btn" label="Radio 7" value="radio-7"></v-radio>-->
          </v-radio-group>
        </v-container>
        <button style="background-color: #521e69 !important" @click.prevent="charge()">
          <template v-if="!chargingFlag">
            <i class="fas fa-spin fa-spinner"></i>
            Please Wait ...
          </template>
          <template v-else>Charge</template>
        </button>
        <span
          style="background: white !important;"
          class="success"
          v-if="success_cat"
        >Charged Successfully</span>
      </form>
      <!--  <div style="margin-top:15px;" class="paypal-container" v-show="pay_pal_process_flag">
        <div ref="paypal"></div>
      </div>-->
      <div
        id="paypal-button-container-pubg"
        style="margin-top:15px;"
        class="paypal-container"
        v-show="pay_pal_process_flag"
      ></div>
    </div>
    <v-row justify="center">
      <v-dialog v-model="show_payment_methods_flag" scrollable persistent max-width="300px">
        <v-card>
          <v-card-title>Select Payment Method</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-radio-group v-model="payment_selected" column>
              <v-radio label="PayPal" value="paypal"></v-radio>
              <v-radio label="My Credit" value="credit"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="show_payment_methods_flag = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="continuePurchase()">Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="paypal_payment_done" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Payment Result</v-card-title>
        <br>
        <br>
        <div style="margin-left: 15px;" v-show="payment_ok">
          <span>Thank you for Dealing with Hthastore, your request will be handled as soon as possible.</span>
        </div>
        <div
          class="purchase-success"
          v-show="payment_not_ok"
          style="margin-left: 15px;"
        >Sorry your account credit not enough! you can try another payment method or another UC.</div>
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
import Flickity from "vue-flickity";
import { setTimeout } from "timers";
import * as cookies from "js-cookie";

// import PayPal from "vue-paypal-checkout";

export default {
  components: {},
  computed: {
    ...mapGetters({
      pubgPricesList: "pubgPrices",
      user_auth: "userStatus",
      credit: "credit"
    })
  },
  watch: {
    pubgPricesList(newVal) {
      if (newVal !== undefined && newVal.length > 0) {
        for (let i in newVal) {
          let my_obj = JSON.parse(JSON.stringify(newVal[i]));
          this.my_radios.push(my_obj);
        }

        let r = []
        for (let i in this.my_radios) {
          r.push(this.my_radios[i].value.split('UC')[0]);
        }
        r =r.sort(function(a, b){return a-b})

        for(let i in r){
          for(let j in this.my_radios){
            
            if(r[i] == this.my_radios[j].value.split('UC')[0]){
              
              r[i] = this.my_radios[j]
            }
          }
        }
        this.my_radios = [...r]
        
      }
    }
  },
  created() {
    this.getPubgPrices();
  },
  mounted() {
    this.$nextTick(() => {
      /*  const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AfqPF6s4thArahAwz85QbNO-owqJnZYYRcuPRHPfgGqZ1GYCAroThqOvLh6Xne5JsWiVIxb6QTLGrvPb";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script); */
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AfqPF6s4thArahAwz85QbNO-owqJnZYYRcuPRHPfgGqZ1GYCAroThqOvLh6Xne5JsWiVIxb6QTLGrvPb&currency=USD";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    });
  },
  data() {
    return {
      payment_not_ok: false,
      payment_ok: false,
      paypal_payment_done: false,
      payment_selected: "credit",
      final_paypal_product: {
        price: 0,
        description: "HthaStore"
      },
      pay_pal_process_flag: false,
      chargingFlag: true,
      show_payment_methods_flag: false,
      req_fe: "",
      success_cat: false,
      loaded: false,
      paidFor: false,
      product: {
        price: 77.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg"
      },
      error_flag: false,
      obj: {
        userPubgName: "",
        userPubgId: "",
        username: "",
        mobile_number: "",
        amount_of_charge: ""
      },

      my_radios: [],
      flickityOptions: {
        contain: true,
        initialIndex: 0,
        rightToLeft: true,
        prevNextButtons: true,
        pageDots: false,
        groupCells: 1,
        cellAlign: "right"
      }
    };
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
    continuePurchase() {
      let id = localStorage.getItem("user_id");

      if (this.payment_selected == "credit") {
        if (id == undefined) {
          this.$eventBus.$emit("userNotLogged");
        } else {
          if (this.credit < this.final_paypal_product.price) {
            this.payment_not_ok = true;
            this.paypal_payment_done = true;
          } else {
            this.show_payment_methods_flag = false;
            this.$store.dispatch("reduceCredit", {
              data:this.final_paypal_product.price,
              id: id,
              usedWay: "credit"
            });
            this.$store.dispatch("chargePubgAccount", {
              data: this.obj
            });
            this.payment_ok = true;
            this.paypal_payment_done = true;
          }
        }
      } else {
        this.show_payment_methods_flag = false;
        this.pay_pal_process_flag = true;
      }
    },
    setLoaded: function() {
      /*  if (this.$refs.paypal !== undefined) {

        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
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

      paypal
        .Buttons({
          // Set up the transaction
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: me.final_paypal_product.price
                  }
                }
              ]
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
        })
        .render("#paypal-button-container-pubg");
    },

    async saveOrder(order) {
      this.pay_pal_process_flag = false;
      // this.paypal_payment_done = true;
      /*  let data = {};
      try {
        data = {
          username: this.obj.userPubgName,
          paypal_id: order.purchase_units[0].payments.captures[0].id,
          amount: order.purchase_units[0].amount.value,
          "currency":"USD"
          
        };
      } catch (e) {
        console.log("transaction error");
      }

      await this.$store.dispatch("saveOrderDetails", {
        order: data
      }); */
      this.$store.dispatch("chargePubgAccount", {
        data: this.obj
      });
      this.payment_ok = true;
      this.paypal_payment_done = true;
    },
    async getPubgPrices() {
      await this.$store.dispatch("getPubgPrices");
    },

    charge() {
      if (this.obj.username !== undefined && this.obj.username.length == 0) {
        delete this.obj.username;
      }
      if (
        this.obj.mobile_number !== undefined &&
        this.obj.mobile_number.length == 0
      ) {
        delete this.obj.mobile_number;
      }

      if (this.obj.userPubgName.length == 0) {
        this.req_fe = "Pubg Name";
        this.error_flag = true;
      } else if (this.obj.userPubgId.length == 0) {
        this.req_fe = "Pubg Id";

        this.error_flag = true;
      } else if (this.obj.amount_of_charge.length == 0) {
        this.req_fe = "amount of charge (UC's amount)";
        this.error_flag = true;
      } else {
        this.req_fe = "";
        this.error_flag = false;
        
        try {
          this.final_paypal_product.price = this.obj.amount_of_charge
            .split("-")[1]
            .split("$")[0];
        } catch (error) {}

        this.show_payment_methods_flag = true;
        /* this.$store.dispatch("chargePubgAccount", {
          data: this.obj
        });
        setTimeout(()=>{
        this.chargingFlag = true;
        this.success_cat = true;

        },2000) */
      }
      /* this.obj;
      debugger; */
    }
  }
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.note-class {
  text-align: center;
  font-size: 19px;
  margin: 0 0 10px 0;
}
.success {
  display: block;
  color: black;
}
.errormsg {
  color: red;
  float: left;
  padding: 0 0 11px 0;
}
.rd-btn {
  margin-bottom: 30px;
  font-weight: bold;
}
.contrr {
  position: relative;
  z-index: 1;
  max-width: 100% !important;
  margin: 0 auto;
}
.gender {
  display: flex;
  margin: 0 0 0 -66px;
}

.carousel-cell {
  width: 200px;
  height: 150px;
  margin-right: 10px;
  background: #8c8;
  border-radius: 5px;
  counter-increment: carousel-cell;
  transition: 0.2s;
}

.carousel-cell:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 0 0px 1px black;
}

.actionsOverlay {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: none;
}

.carousel-cell:hover .actionsOverlay {
  display: block;
}

/* cell number */
.carousel-cell:before {
  display: block;
  text-align: center;
  content: counter(carousel-cell);
  line-height: 200px;
  font-size: 80px;
  color: white;
}

.label-gender {
  cursor: pointer;
}

.form .gender input {
  display: inline-block;
  width: 15%;
  margin: 6px -28px 23px 39px;
}

@media only screen and (max-width: 768px) {
  .form .gender input {
    margin: 6px -21px 23px 39px;
  }

  .note-class {
    text-align: center;
    font-size: 16px;
    margin: 0 0 10px 0;
  }
}
.login-page {
  width: 100%;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 100%;
  max-width: 560px;
  margin: 0 auto 100px;
  padding: 35px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

@media only screen and (max-width: 768px) {
  .form {
    width: 90%;
  }
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 54%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

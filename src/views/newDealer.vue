<template>
  <div class="login-page">
    <div class="form">
      <form class="register-form">
        <span class="incorrectUserPass" v-if="confirm_not_correct">the confirm password not match the password.</span>

        <input v-model="dealer.name" type="text" placeholder="full name">
        <input v-model="dealer.username" type="text" placeholder="username">
        <input v-model="dealer.password" type="password" placeholder="password">
        <input v-model="confirm_password" type="password" placeholder="confirm password">
        <input v-model="dealer.email" type="text" placeholder="E-mail">
        <input v-model="dealer.address" type="text" placeholder="address">
        <input v-model="dealer.phone" type="text" placeholder="Ex: +970XXXXXXXXX">
        <div class="gender">
          <input v-model="dealer.gender" type="radio" name="gender" id="Male" value="Male" checked>
          <label class="label-gender" for="Male">Male</label>
          <input v-model="dealer.gender" type="radio" name="gender" id="Female" value="Female">
          <label class="label-gender" for="Female">Female</label>
        </div>
        <button style="background-color:#521e69 !important" @click.prevent="createUser()">create</button>
      
      </form>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import cookies from "js-cookie";

export default {
  created() {

    let user_id = localStorage.getItem("user_id");

    if (user_id != undefined && user_id != null && user_id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16") {
      
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      my_prod_types:[],
      confirm_not_correct:false,
      confirm_password:"",
        dealer:{
          username:'',
          name:'',
          password:'',
          email:'',
          address:'',
          phone:'',
          gender:'Male'
        }
    };
  },
  computed:{
    ...mapGetters({
      prodTypes :'productsTypes'
    })
  },
  watch:{
    prodTypes(newVal){
      
      this.my_prod_types = newVal;
    }
  },  
  methods: {
    async getProductsTypes(){
      await this.$store.dispatch('getProductsTypes');
    },
      createUser(){
        if(this.confirm_password != this.dealer.password){
        this.confirm_not_correct = true;
      }else {
        this.$store.dispatch('addDealer',{
          dealer:this.dealer
        })
      }
      },
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.incorrectUserPass {
  padding: 5px 21px 5px 21px;
  border-radius: 3px;
  color: #fff;
  background-color: #f3692d !important;
}
.gender {
  display: flex;
  margin: 0 0 0 -66px;
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
  .gender {
  display: flex;
      margin: 0 -130px 0 -60px;
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
  padding: 45px;
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
  margin: 16px 0 15px;
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

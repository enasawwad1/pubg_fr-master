<template>
  <div class="login-page">
    <div class="form">
      <div class="btns-group">
        <!-- <input class="btn-gr" type="radio" value="Product Item">
        <input class="btn-gr" type="radio" value="Product">
        <input class="btn-gr" type="radio" value="Category">-->

        <input
          type="radio"
          name="options"
          id="Product Item"
          value="Product Item"
          checked
          @click="changeTab('Item')"
        >
        <label class="label-options" for="Product Item">Product Item</label>
        <input
          type="radio"
          name="options"
          id="Product"
          value="Product"
          @click="changeTab('product')"
        >
        <label class="label-options" for="Product">Product</label>
        <input type="radio" name="options" id="Category" value="Category" @click="changeTab('cat')">
        <label class="label-options" for="Category">Category</label>
      </div>
      <form class="register-form" v-if="product_tab">
        <span class="error-msg" v-if="error_flag">the product {{error_mess}} is required field</span>
        <input v-model="product.name" type="text" placeholder="Product Name*">
        <v-select
          :items="my_prod_types"
          item-text="name"
          item-value="id"
          @change="setProductType"
          label="Product Type*"
        ></v-select>
        <input v-model="product.dealers_price" type="number" placeholder="Price For Dealers*">
        <input v-model="product.customers_price" type="number" placeholder="Price For Customers*">
        <input v-model="product.key" type="text" placeholder="Product Key*">
        <!-- <input v-model="product.quantity" type="number" placeholder="Quantity"> -->
        <input v-model="product.link" type="text" placeholder="Link">
        <!-- <input v-model="product.image" type="text" placeholder="Cover Photo"> -->
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
            <button v-on:click.prevent="addFiles()">Add Files</button>
            <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()">
          </div>
          <br>
          <!-- <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="submitFiles()">Submit</button>
          </div>-->
        </div>
        <button style="background-color:#521e69 !important" @click.prevent="createProduct()">
          <template v-if="!creatingPro">
            <i class="fas fa-spin fa-spinner"></i>
            Please Wait ...
          </template>
          <template v-else>create</template>
        </button>
        <span
          style="background: white !important;"
          class="success"
          v-if="success"
        >Product Created Successfully</span>
      </form>
      <form class="register-form" v-if="productFull_tab">
        <span class="error-msg" v-if="error_flag_2">the product {{error_mess_2}} is required field</span>
        <input v-model="productFull.name" type="text" placeholder="Product Name*">
        <input v-model="productFull.description" type="text" placeholder="Product Description*">
        <v-select
          :items="my_prod_cats"
          item-text="name"
          item-value="id"
          @change="setProductFullType"
          label="Product Category*"
        ></v-select>
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
            <button v-on:click.prevent="addFiles()">Add Files</button>
            <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()">
          </div>
          <br>
          <!-- <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="submitFiles()">Submit</button>
          </div>-->
        </div>
        <button @click.prevent="createProductFull()">
          <template v-if="!creatingProFull">
            <i class="fas fa-spin fa-spinner"></i>
            Please Wait ...
          </template>
          <template v-else>create</template>
        </button>
        <span
          style="background: white !important;"
          class="success"
          v-if="success_full"
        >Product Created Successfully</span>
      </form>
      <form class="register-form" v-if="cat_tab">
        <span class="error-msg" v-if="error_flag_3">the category {{error_mess_3}} is required field</span>
        <input v-model="category.name" type="text" placeholder="Category Name*">
        <input v-model="category.description" type="text" placeholder="Category Description*">

        <button @click.prevent="createCategory()">
          <template v-if="!createCategoryFlag">
            <i class="fas fa-spin fa-spinner"></i>
            Please Wait ...
          </template>
          <template v-else>create</template>
        </button>
        <span
          style="background: white !important;"
          class="success"
          v-if="success_cat"
        >Product Created Successfully</span>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import cookies from "js-cookie";

export default {
  created() {
    let user_id = localStorage.getItem("user_id");

    if (user_id != undefined && user_id != null && user_id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16") {
      this.getProductsTypes();
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      files: [],
      cat_tab: false,
      product_tab: true,
      productFull_tab: false,
      error_mess: "",
      error_flag: false,
      error_mess_2: "",
      error_flag_2: false,
      error_flag_3: false,
      error_mess_3: "",
      creatingPro: true,
      creatingProFull: true,
      createCategoryFlag: true,
      success: false,
      success_full: false,
      success_cat: false,
      my_prod_types: [],
      my_prod_cats: [],
      category: {
        name: "",
        description: ""
      },
      productFull: {
        name: "",
        description: "",
        categoryId: ""
      },
      product: {
        name: "",
        productId: "",
        category: "",
        type: "",
        dealers_price: "",
        customers_price: "",
        key: "",
        quantity: "",
        link: "",
        image: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      prodTypes: "productsTypes"
    })
  },
  watch: {
    prodTypes(newVal) {
      let obj = {
        id: "",
        name: ""
      };
      let catObj = {
        id: "",
        name: ""
      };
      for (let i in newVal) {
        catObj.name = newVal[i].name;
        catObj.id = newVal[i].id;
        let my_obj_2 = JSON.parse(JSON.stringify(catObj));
        this.my_prod_cats.push(my_obj_2);
        for (let j in newVal[i].products) {
          obj.name = newVal[i].products[j].name;
          obj.id = newVal[i].products[j].id;
          let my_obj = JSON.parse(JSON.stringify(obj));
          this.my_prod_types.push(my_obj);
        }
      }
    }
  },
  methods: {
    addFiles() {
      this.files.length = 0;
      this.$refs.files.click();
    },

    /*
        Submits files to the server
      */
    submitFiles() {
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      /* axios.post( '/select-files',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        }); */
    },

    /*
        Handles the uploading of files
      */
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1);
    },
    async getProductsTypes() {
      await this.$store.dispatch("getProductsTypes");
    },
    setProductType(event) {
      this.product.productId = event;
    },
    setProductFullType(event) {
      this.productFull.categoryId = event;
    },

    changeTab(val) {
      if (val == "Item") {
        this.product_tab = true;
        this.productFull_tab = false;
        this.cat_tab = false;
      } else if (val == "product") {
        this.product_tab = false;
        this.productFull_tab = true;
        this.cat_tab = false;
      } else {
        this.product_tab = false;
        this.productFull_tab = false;
        this.cat_tab = true;
      }
    },
    createProduct() {
      
      if (this.product.name.length == 0) {
        this.error_mess = "name";
        this.error_flag = true;
      } else if (this.product.productId.length == 0) {
        this.error_mess = "type";
        this.error_flag = true;
      } else if (this.product.dealers_price.length == 0) {
        this.error_mess = "dealers price";
        this.error_flag = true;
      } else if (this.product.customers_price.length == 0) {
        this.error_mess = "customers price";
        this.error_flag = true;
      } else if (this.product.key.length == 0) {
        this.error_mess = "key";
        this.error_flag = true;
      } else if (this.files.length == 0) {
        this.error_mess = "cover photo";
        this.error_flag = true;
      }else {
        this.error_flag = false;
        this.creatingPro = false;
        let me = this;

        let my_product = {
          name: this.product.name,
          quantity: 1,
          price_for_dealer: this.product.dealers_price,
          price_for_customer: this.product.customers_price,
          link: this.product.link,
          productId: this.product.productId,
          key: this.product.key
        };
        Object.keys(my_product).forEach(key => {
          if (my_product[key].length === 0) {
            delete my_product[key];
          }
        });

        let formData = new FormData();
        if (this.files.length > 0) {
          formData.append("productImage", this.files[0]);
        }

        Object.keys(my_product).forEach(key => {
          formData.append(key, my_product[key]);
        });

        this.$store
          .dispatch("addProduct", {
            product: formData
          })
          .then(res => {
            me.creatingPro = true;
            me.success = true;
          });
      }
    },
    createCategory() {
      if (this.category.name.length == 0) {
        this.error_mess_3 = "name";
        this.error_flag_3 = true;
      } else if (this.category.description.length == 0) {
        this.error_mess_3 = "description";
        this.error_flag_3 = true;
      } else {
        this.error_flag_3 = false;
        this.createCategoryFlag = false;
        let me = this;

        this.$store
          .dispatch("addCategory", {
            cat: this.category
          })
          .then(res => {
            me.createCategoryFlag = true;
            me.success_cat = true;
          });
      }
    },
    createProductFull() {
      if (this.productFull.name.length == 0) {
        this.error_mess_2 = "name";
        this.error_flag_2 = true;
      } else if (this.productFull.description.length == 0) {
        this.error_mess_2 = "description";
        this.error_flag_2 = true;
      } else if (this.productFull.categoryId.length == 0) {
        this.error_mess_2 = "category";
        this.error_flag_2 = true;
      } else if (this.files.length == 0) {
        this.error_mess_2 = "cover photo";
        this.error_flag_2 = true;
      } else {
        this.error_flag_2 = false;
        this.creatingProFull = false;
        let me = this;

        let formData = new FormData();
        if (this.files.length > 0) {
          formData.append("productImage", this.files[0]);
        }

        Object.keys(this.productFull).forEach(key => {
          formData.append(key, this.productFull[key]);
        });

        

        /* for (var value of formData.values()) {
          console.log(value);
        } */
        this.$store
          .dispatch("addProductFull", {
            product: formData
          })
          .then(res => {
            me.creatingProFull = true;
            me.success_full = true;
          });
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

input[type="file"] {
  visibility: hidden;
  width: 0px;
  height: 0px;
}

div.file-listing {
  width: 200px;
}

span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}

.error-msg {
  color: red;
  font-family: none;

  float: left;
  padding: 0 0 15px 0;
}
.success {
  display: block;
  color: black;
}
.form .btns-group {
  display: inline-block;
  text-align: left;
  width: 100%;
  margin: 0px 0 30px -110px;
}
.form .btns-group input {
  display: inline-block;
  width: 5%;
  margin: 0px 0px 0 50px;
  cursor: pointer;
}

.form .btns-group label {
  cursor: pointer;
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

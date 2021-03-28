<template>
  <div>
    <!-- <div class="main-img"></div> -->

    <v-carousel class="main-img" :hide-delimiters="hideDelimiters" :touchless="false">
      <v-carousel-item v-for="(color,index) in colors" :key="index">
        <v-sheet :color="color.color" height="270px" tile>
          <v-row
            class="fill-height"
            :style="{'background': `url('${color.url}')` ,'background-position': 'center','background-size': '100% 140%'}"
            align="center"
            justify="center"
          >
            <!-- <div class=""></div> -->
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <template v-for="(item,index) in all_data">
      <main-sections v-if="item.items.length >0" :section="item" :key="index"></main-sections>
    </template>

    <!-- <div class="section" v-for="(item,index) in all_data" :key="index">
      <h3>{{item.section}}</h3>
      <hr class="line">
      <div class="category" v-for="(item_2,index_2) in item.items" :key="index_2">
        <router-link
          style="text-decoration: none;"
          :to="{name : 'product', params : {id:item_2.details.name}}"
        >
          <div class="img-div">
            <img :src="item_2.img_src" alt>
          </div>
          <div class="details">
            <p class="cut-content">{{item_2.details.name}}</p>
          </div>
        </router-link>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import mainSections from "../components/dashBoard/section";
import cookies from "js-cookie";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    mainSections
  },
  data() {
    return {
      all_data: [],
      overlay_: false,
      hideDelimiters: true,
      colors: [
        {
          color: "#f8692b",
          url: "https://images4.alphacoders.com/827/827439.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      all_products: "getAllProducts"
    })
  },
  watch: {
    all_products(newVal) {
      let slide = {
        color: "#f8692b",
        url: ""
      };
      let obj = {
        section: "",

        items: []
      };
      let inside_obj = {
        product_id: "",
        details: {
          name: "",
          price: "",
          key: ""
        },
        img_src: ""
      };
      
      for (let i in newVal) {
        
        if(newVal[i].products && newVal[i].products.length > 0){
        obj.section = newVal[i].name;
        for (let j in newVal[i].products) {
            if(newVal[i].products[j].product_items && newVal[i].products[j].product_items.length > 0){
              inside_obj.details.name = newVal[i].products[j].name;
            inside_obj.product_id = newVal[i].products[j].id;
            inside_obj.img_src = newVal[i].products[j].coverPhoto;
            let c = JSON.parse(JSON.stringify(inside_obj));
            obj.items.push(c);
            
            for(let r in newVal[i].products[j].product_items){
              if (newVal[i].products[j].product_items[r].name.indexOf("slide") != -1) {
                
            slide.url =
              newVal[i].products[j].product_items[r].coverPhoto !== null &&
              newVal[i].products[j].product_items[r].coverPhoto !== undefined &&
              newVal[i].products[j].product_items[r].coverPhoto.length > 0
                ? `https://hthastore.com/api/${newVal[i].products[j].product_items[r].coverPhoto.split("/")[1]}`
                : "";
            let ob = JSON.parse(JSON.stringify(slide));
            this.colors.push(ob);
            console.log(this.colors)
          }
            }
        }
          
        }

        let my_obj = JSON.parse(JSON.stringify(obj));
        obj.items = [];
        this.all_data.push(my_obj);
      }
      }
    }
  },

  created() {
    this.getProducts();
    // this.$router.replace({ query: { payerId: "ELR53B7ABWKXG",paymentId:'PAYID-LXKDWAI9S718850U3532621A' } })
  },
  mounted() {
   
    if (this.$route.query.paymentId !== undefined) {
      let pay_obj = {
        payerId: this.$route.query.PayerID,
        paymentId: this.$route.query.paymentId,
        amount: {
          currency: "USD",
          total: cookies.get("amount")
        }
      };

      this.$store
        .dispatch("successBuy", {
          obj: pay_obj
        })
        .then(() => {
          this.$router.push("/");
        });
      cookies.remove("amount");
    }
  },
  updated() {},
  methods: {
    async getProducts() {
      await this.$store.dispatch("getAllProducts");
    }
  }
};
</script>

<style scoped>
.main-img {
  width: 100%;
  height: 270px !important;
  /* background: url("https://images4.alphacoders.com/827/827439.jpg");
  background-position: center;
  background-size: 100% 140%; */
  margin: 0 auto;
}

.main-img-2 {
}
.section {
  margin: 25px 0px 30px 0px;
}

.category {
  display: inline-block;
  width: 15%;
  height: auto;
  margin: 20px 30px 0 10px;
  border: 1.5px solid #c8c8c8;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .category {
    width: 30%;
  }
}
.section h3 {
  margin: 0 0 0 10px;
}
.line {
  background: black;
  border-top: 1px solid;
}

.details {
  /* display: inline-block; */
  margin: auto 6px;
}

.details a {
  display: flex;
  text-decoration: none !important;
}

.img-div {
  display: inline-block;
}
.img-div img {
  width: 100%;
  height: 100%;
  border: 3px;
}

.cut-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


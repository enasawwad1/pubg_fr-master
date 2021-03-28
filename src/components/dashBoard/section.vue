<template>
  <div class="section">
    <h3>{{mySection.section}}</h3>
    <hr class="line">
    <div class="category" v-for="(item_2,index_2) in mySection.items" :key="index_2">
      <router-link
        style="text-decoration: none;"
        :to="{name : 'product', params : {id:item_2.product_id,name:item_2.details.name}}"
      >
        <div class="img-div" style="width:100%">
          <img :src="getCover(item_2.img_src)" alt>
        </div>
        <div class="details">
          <p class="cut-content">{{item_2.details.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    section: Object
  },
  watch: {
    section(newVal) {
      if (newVal) {
        this.mySection = newVal;
      }
    }
  },
  data() {
    return {
      mySection: this.section,
      notfound: require("../../assets/notfound.png"),
    };
  },
  created() {},
  methods: {
    getCover(item) {
      
      if (item !== undefined && item !== null && item.length > 0) {
        let path = item.split("/")[1];
        return `https://hthastore.com/api/${path}`;

      } else {
        return this.notfound
      }
    }
  }
};
</script>
<style scoped>
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
    height: 130px;
    min-height: 130px;
    object-fit: cover;
}

.cut-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
</style>

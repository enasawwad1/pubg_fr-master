<template>
  <div v-if="my_profile != null">
    <div>
      <v-col>
        <material-card color="#521e69" title="User Profile" text="Edit User profile">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Full Name" class="purple-input" v-model="my_profile.name"/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Username"
                    class="purple-input"
                    v-model="my_profile.username"
                  />
                </v-col>

                <!-- <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>-->

                <v-col cols="12" md="6">
                  <v-text-field v-model="my_profile.password" label="password" class="purple-input"/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="my_profile.email" label="E-mail" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="my_profile.address" label="Address" class="purple-input"/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="my_profile.phone" type="number" label="Phone" class="purple-input"/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="my_profile.gender" label="Gender" class="purple-input"/>
                </v-col>

                <!--   <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                  />
                </v-col>-->

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="my_profile.credit"
                    label="Credit"
                    class="purple-input"
                    disabled
                  />
                </v-col>
                <v-col cols="12" md="6" v-if="my_profile.id != 1">
                  <v-text-field
                    v-model="my_profile.debit"
                    label="Debit"
                    class="purple-input"
                    disabled
                  />
                </v-col>
                <v-col cols="12" md="6" v-if="my_profile.id != 1">
                  <v-text-field
                    v-model="my_profile.user_type.type"
                    label="Type"
                    class="purple-input"
                    disabled
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn color="success" @click="updateUserProfile()">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </div>

    <div class="table-data">
      <v-col>
        <material-card
          color="#521e69"
          flat
          full-width
          title="User Products"
          text="Here you can find all products with licenses and keys number"
        >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search_f" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
          key="2"
          id="2"
          ref="2"
            :headers="getMyHeaders()"
            :items="my_user_product"
            :search="search_f"
            :items-per-page="10"
          ></v-data-table>
        </material-card>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import cookies from "js-cookie";

export default {
  //

  data() {
    return {
      empty_field:"",
      search_f: "",
      my_headers: [],
      my_profile: null,
      my_user_product: []
    };
  },
  created() {
    // this.getUserProfile();
    let id = localStorage.getItem("user_id");

    if (id !== undefined && id !== null && id.length > 0) {
      this.getUserProfile(id);
      this.getUserProduct(id);
    }
  },
  mounted() {},
  computed: {
    ...mapGetters({
      profile: "userProfile",
      user_product: "userProduct"
    })
  },
  watch: {
    user_product(newVal) {
      
      if (newVal.length > 0 && newVal !== undefined && newVal !== null) {
        this.my_user_product = newVal;

        Object.keys(this.my_profile).forEach(key => {
          if(this.my_profile[key] == undefined || this.my_profile[key] == null || this.my_profile[key].length==0){
            this.my_profile[key] = ""
          }
        });
      }
    },
    profile(newVal) {
      if (newVal) {
        this.my_profile = newVal;
        if (this.my_profile.debit !== undefined) {
          this.my_profile.debit *= -1;
        }

         Object.keys(this.my_profile).forEach(key => {
          if(this.my_profile[key] == undefined || this.my_profile[key] == null || this.my_profile[key].length==0){
            this.my_profile[key] = ""
          }
        });
      }
    }
  },
  methods: {
    getMyHeaders(){
      if(this.my_profile.userTypeId == 1){
        return [
        {
          sortable: false,
          text: "Product Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Price",
          value: 'price_for_customer'
        },

        {
          sortable: false,
          text: "Key",
          value: "key"
        },
        {
          sortable: false,
          text: "Link",
          value: "link"
        }
        ]
      }else{ 
        return [
        {
          sortable: false,
          text: "Product Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Price",
          value: 'price_for_dealer'
        },

        {
          sortable: false,
          text: "Key",
          value: "key"
        },
        {
          sortable: false,
          text: "Link",
          value: "link"
        }
        ]
      }
    },
    async getUserProduct(id) {
      await this.$store.dispatch("getUserProduct", {
        id: id
      });
    },
    async getUserProfile(id) {
      await this.$store.dispatch("getUserProfile", {
        id: id
      });
    },
    async updateUserProfile() {
      let data = {};
      if(this.my_profile.valid == undefined || this.my_profile.valid == null){
        this.my_profile.valid = true;
      }
      if(this.my_profile.id !== undefined){
        delete this.my_profile.id
      }
      if(this.my_profile.valid !== undefined){
        delete this.my_profile.valid
      }
      if(this.my_profile.createdAt !== undefined){
        delete this.my_profile.createdAt
      }
      if(this.my_profile.updatedAt !== undefined){
        delete this.my_profile.updatedAt
      }
      if(this.my_profile.user_type !== undefined){
        delete this.my_profile.user_type
      }
      await this.$store.dispatch("updateUserProfile", {
        id: localStorage.getItem("user_id"),
        data: this.my_profile
      });
    }
  }
};
</script>

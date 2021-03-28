<template>
  <v-footer id="core-footer" class="footer" height="60">
    <div @click="showSupportModal">
      <i class="far fa-question-circle" style="font-size: 18px;margin: 0px 3px 0 0;cursor: pointer;"></i>
      <span  class="support">Support</span>
    </div>
    <v-dialog v-model="support_flag" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Get in Touch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <span v-if="error_flag" style="color: red;margin-left: 14px;">all fields required.</span>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="support_object.name" label="Your Name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="support_object.email" label="Your Email"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-textarea
                  label="Message..."
                  v-model="support_object.message"
                  auto-grow
                  outlined
                  rows="3"
                  row-height="25"
                  maxlength="250"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
          <v-btn color="blue darken-1" text @click="sendData">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      All Rights Reserved For Hthastore
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    error_flag:false,
    support_flag: false,
    support_object: {
      name: "",
      email: "",
      date: "",
      message: ""
    },
    links: [
      { name: "Home", Link: "/#" },
      { name: "Creative Tim", Link: "https://www.creative-tim.com" },
      { name: "About Us", Link: "https://creative-tim.com/presentation" },
      { name: "Blog", Link: "https://blog.creative-tim.com" }
    ]
  }),
  methods: {
    showSupportModal() {
      this.support_flag = true;
    },
    closeModal() {
      this.support_flag = false;
      this.error_flag = false;
    },
    sendData() {
      //date
      if(this.support_object.name.length == 0 ||
          this.support_object.email.length == 0 ||
          this.support_object.message.length == 0){
this.error_flag = true;
      }else{
      this.support_object.date = new Date().toJSON();
      this.$store.dispatch("supportMessage", {
        data: this.support_object
      });
      this.support_flag = false;
      this.error_flag = false;
      }
      

    }
  }
};
</script>

<style>
#core-footer {
  z-index: 0;
}
.footer {
  color: white !important;
  background: #f8692b !important;
  width: 1110px !important;
  max-width: 1110px !important;
  margin: auto;
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .footer {
    margin: inherit;
    width: inherit !important;
  margin-top: 30px;

  }
}

.support {
  color: white !important;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}
</style>

<template>
  <v-app-bar id="core-app-bar" absolute app color="transparent" flat height="88">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn v-if="responsive" dark icon @click.stop="onClick">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items v-show="$route.name !== 'Login' && $route.name !== 'Admin'">
      <v-row align="center" class="mx-0">
        <!-- <div class="text-center">
          <router-link :to="{name:'Login', params:{flag:'SignIn'}}"><v-btn class="custom-btn">Sign in</v-btn></router-link>
        </div>
        <div class="text-center">
          <router-link :to="{name:'Login', params:{flag:'SignUp'}}"><v-btn outlined class="custom-btn">Sign up</v-btn>
          </router-link>
        </div> -->
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";

export default {
  data: () => ({
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One"
    ],
    title: null,
    responsive: false
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  }
};
</script>

<style>
/* Fix coming in v2.0.8 */

.custom-btn{
  text-transform: none !important;
  background-color: #f5f5f5;
  margin: 0 15px 0 0;
}
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>

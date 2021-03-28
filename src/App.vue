<template>
  <v-app>
    <!-- <core-app-bar /> -->
    <!-- <h1 style="text-align:center;margin: 45px 0 0 0;    color: #434343;">... الموقع قيد التطوير</h1> -->
    <!-- <h1 style="text-align:center;margin: 15px 0 0 0;    color: #434343;">Coming Soon ...</h1> -->

    <core-drawer />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
  
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View')
    }
  }
</script>
<style>
.theme--light.v-application {
    background: #EAEAEA !important;
    margin: 0 auto !important;
    width: 1110px !important;
    color: rgba(0,0,0,.87);
}

@media screen and (max-width: 768px) {
 .theme--light.v-application {
    margin: inherit;
    width: inherit !important;
  }
}


</style>

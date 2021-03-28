<template>
  <v-content class="grey lighten-3 container" style="background-color: #EAEAEA !important">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
         </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',

    metaInfo () {
      return {
        title: 'HthaStore'
      }
    }
  }
</script>
<style scoped>
.container{
  width:1110px;
}

@media screen and (max-width: 768px) {
  .container {
    width: inherit !important;
  }
}
</style>
<style>

</style>



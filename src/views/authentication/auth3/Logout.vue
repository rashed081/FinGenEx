<template>
  <div></div>
</template>
<script lang="ts">


import router from '@/router/app_router';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "LogoutView",
 setup(){
  //this.$Progress.start();
    store.dispatch("Logout").then(() => {
      router.push({ name: "login" })
      //this.$Progress.finish();
    })
  
 }
})

</script>
<style lang=""></style>

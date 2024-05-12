<template>
  <loginView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import loginView from '../components/Login.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    loginView,
  },
 
});
</script>

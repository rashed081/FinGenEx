<template>
  <div></div>
</template>
<script lang="ts">
import router from '@/router/app_router';
import store from '@/store';
import { defineComponent } from 'vue';
import { useProgress } from '@marcoschulte/vue3-progress';
export default defineComponent({
  name: "LogoutView",
  setup() {
    const progress = useProgress().start();
    store.dispatch("Logout").then(() => {
      router.push({ name: "login" })
      progress.finish();
    })

  }
})

</script>
<style lang=""></style>

<template>
      <v-overlay if isoverlay="true"
          activator="parent"
          location-strategy="connected"
          scroll-strategy="block"
          class="align-center justify-center"
        > <v-progress-circular
          color="primary"
          indeterminate
          size="84"
          class="loaderMargin"
        ></v-progress-circular></v-overlay>
</template>
<script>
import { defineComponent, ref, toRefs,watch } from 'vue';

export default defineComponent({
    props: {
        isoverlay: Boolean,
        },
    setup(props, { emit }) {
        function loader(){
      if (isoverlay) {
        setTimeout(() => {
        isoverlay.value = false
      }, 3000)
      }
    }
      
    },
    
})
</script>
<style scoped>
.loaderMargin{
  margin-left: 47% !important;
  margin-top: 3% !important;
}
</style>

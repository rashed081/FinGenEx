<script  lang="ts">
export default{
  name:"CardHeaderFooter",
  setup(){}
}
const props = defineProps({
  title: String
});
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- Card with Header & Footer -->
  <!-- -------------------------------------------------------------------- -->
  <v-card variant="outlined" elevation="0" class="baseColor">
    <v-card-actions>
      <slot name="footer" />
    </v-card-actions>
  </v-card>
</template>

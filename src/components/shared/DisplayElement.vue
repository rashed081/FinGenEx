<template>
  <div class="text-subtitle-1 mb-2">
    <span class="font-weight-semibold mr-2">{{ dataLabel }} :</span>
    <span>{{ dataValue }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRef, toRefs } from 'vue';
import { string } from 'yup/lib/locale';

export default defineComponent({
  props: {
    dataLabel: {
      required: true,
    },
    dataValue: {
      required: true,
    },
    
  },
  name: 'DisplayElement',
});
</script>
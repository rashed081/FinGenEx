<template>
  <div>
 
  
        <v-text-field id="datepicker" placeholder="dd/mm/yyyy"  @input="updateValue($event.target.value)" ></v-text-field>
  
    <div>Selected date: {{ selectedDate }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch, type PropType } from 'vue';
// import  $ from 'jquery';
import 'jquery-ui';

import {dateMixin} from '@/mixins/DateMixin'

export default defineComponent({
  name: "DatePickerWithText",
  props: {
    modelValue: {
      type: String as any,
      required: true
    },
    // The `emit` function is required to emit the `update:modelValue` event
    // with the new value. `emit` is passed automatically by Vue 3.
    'onUpdate:modelValue': {
      type: Function as PropType<(value: string) => void>,
      required: false
    }
  },
  setup(props,{emit}) {
    const selectedDate = ref<string | null>("");
      const myElement = $('placeholder') as JQuery;
    onMounted(() => {
      // Initialize the datepicker
      const datePicker = jQuery('#datepicker').datepicker({
        dateFormat: 'mm/dd/yy',
        showOn: "button",
        buttonImage: "./src/assets/images/datepic1.png",
        buttonImageOnly: true,
        showMonthAfterYear: true,
        showOtherMonths: true,
        onSelect: (dateText: string) => {
          myElement.attr('placeholder', dateText);
          selectedDate.value = (dateText);
          
          emit('update:modelValue', dateMixin().$addAutoSlashToDate(selectedDate.value))
        }
      });



      // Update the datepicker's selected date when the reactive ref changes
      // const dispose = watch(selectedDate, (newVal) => {
      //   if (newVal) {
      //     datePicker.datepicker('setDate', newVal);
      //   }
      // });

      // // Cleanup
      // onUnmounted(() => {
      //   dispose();
      //   datePicker.datepicker('destroy');
      // });
    });
    
    const updateValue = (value: string) => {
      emit('update:modelValue', value)
    }
  
    return { selectedDate,updateValue}
  }
});
</script>

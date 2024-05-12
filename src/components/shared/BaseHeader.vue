<script  lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { string } from 'yup/lib/locale';
export default defineComponent({
  emits: [
    'close',
    'onSubmitFromChildren',
    'onRefreshFromChildren',
    'onExitFromChildren',
    'onViewFromChildren',
    'onDeleteFromChildren'

  ],
  name: 'CountryModal',
  props: {
    title: String,
    button1: String,
    button2: String,
    button3: String,
    button4: String,
    button5: String,
    isTwoButton: Boolean,
    isThreeButton: Boolean,
    isFourButton: Boolean,
    isFiveButton: Boolean,
    isDisable:Boolean,
  },
  setup(props, { emit }) {
  
    const onSubmit=async()=>{
      emit("onSubmitFromChildren");
    }
    const onDelete= async()=>{
      emit("onDeleteFromChildren")
    }
    const onRefresh=()=>{
      emit("onRefreshFromChildren")
    }
    const onView=async()=>{
      emit("onViewFromChildren")
    }
    const onExit=async()=>{
      emit("onExitFromChildren")
    }
    return{
      onSubmit,
      onDelete,
      onRefresh,
      onView,
      onExit,
    }
  }
});
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- Card with Header & Footer -->
  <!-- -------------------------------------------------------------------- -->
  <v-card variant="outlined" elevation="0" class="baseColor">
    <v-card-actions>
      <h4 class="title">{{ title }}</h4>
      <slot name="footer" />
      <v-row v-if="isTwoButton">
            <v-col cols="12" md="12" class="text-right labelColor">
              <!-- Refresh -->
              <v-btn
                class="mr-0 btn-bg-green"
                @click="onRefresh"
                >{{ button1 }}</v-btn
              >
              <!-- Exit -->
              <v-btn
                class="mr-0 btn-bg-dark-red"
                @click="onExit"
                >{{ button2 }}</v-btn
              ></v-col
            ></v-row
          >
          <v-row v-if="isThreeButton">
            <v-col cols="12" md="12" class="text-right labelColor">
              <!-- Ok -->
              <v-btn
                class="mr-0 btn-bg-green"
                @click="onSubmit"
                :disabled="isDisable"
                >{{ button1 }}</v-btn
              >
              <!-- Refresh -->
              <v-btn
                class="mr-0 btn-bg-dark-red"
                @click="onRefresh"
                >{{ button2 }}</v-btn
              >
              <!-- Exit -->
              <v-btn
                class="mr-0 btn-bg-purple"
                @click="onExit"
                >{{ button3 }}</v-btn
              ></v-col
            ></v-row
          >
          <v-row v-if="isFourButton">
            <!-- <v-col cols="12" md="6" class="text-right"> </v-col> -->
            <v-col cols="12" md="12" class="text-right labelColor">
              <v-btn
                class="mr-0 btn-bg-green"
                @click="onSubmit"
                :disabled="isDisable"
                >{{ button1 }}</v-btn
              >
              <v-btn
                class="mr-0 btn-bg-purple"
                @click="onView"
                >{{ button2 }}</v-btn
              >
              <!-- Ok -->
              <v-btn
                class="mr-0 btn-bg-blue"
                @click="onRefresh"
                >{{ button3 }}</v-btn
              >
              <!-- Refresh -->
              <v-btn
                class="mr-0 btn-bg-red"
                @click="onExit"
                >{{ button4 }}</v-btn
              >
              <!-- Exit -->
            </v-col>
          </v-row>
          <v-row v-if="isFiveButton">
            <v-col cols="12" md="12" class="text-right labelColor">
              <!-- Ok -->
              <v-btn
                class="mr-0 btn-bg-green"
                @click="onSubmit"
                :disabled="isDisable"
                >{{ button1 }}</v-btn
              >
              <!-- Delete -->
              <v-btn
                class="mr-0 btn-bg-dark-red"
                @click="onDelete"
                >{{ button2 }}</v-btn
              >
              <!-- View -->
              <v-btn
                class="mr-0 btn-bg-purple"
                @click="onView"
                >{{ button3 }}</v-btn
              >
              <!-- Refresh -->
              <v-btn
                class="mr-0 btn-bg-blue"

                >{{ button4 }}</v-btn
              >
              <!-- Exit -->
              <v-btn
                class="mr-0 btn-bg-red"

                >{{ button5 }}</v-btn
              >
            </v-col>
          </v-row>
    </v-card-actions>
  </v-card>
</template>
<style scoped>
.title{
    color: white;
    margin-top: -8px;
}
.v-btn.v-btn--density-default {
    height: 20px !important;
    margin-top: 3px !important;
}

</style>


<!-- <template>
  <v-row>
    <v-col cols="12" lg="6">
      <CardHeaderFooter title="'Action Button with Link'">
        <template v-slot:footer>
          <div class="text-right w-100">
            <v-btn color="secondary" variant="flat" class="mr-3">Submit</v-btn>
            <v-btn color="secondary" variant="flat" class="mr-3">Clear</v-btn>
          </div>
        </template>
      </CardHeaderFooter>
    </v-col></v-row
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import CardHeaderFooter from "../shared/CardHeaderFooter.vue"


export default defineComponent({
name:"BaseHeader",
components:{CardHeaderFooter},
setup(){
    //jjj
}
  
})
</script> -->

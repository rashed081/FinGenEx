<template>
  <v-container class="fill-height" fluid style="min-height: 434px">
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="9" md="7">
          <v-img class="imgLogo" src="../../src/assets/images/LEADS-logo.png" contain>
              </v-img>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>


<script lang="ts">
import type Applists from "@/commonModels/AppLists";
import { generateFunctionList } from "@/components/FloatingMenuCard/Navigation";

import store from "@/store";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "HomePage",
  setup() {
    const route = useRoute()
    function cmp(a: any, b: any) {
      // ascending order sorting comparator
      if (a.FastPath < b.FastPath) return -1;
      else return 1;
    }
    

    let firstPathList: any = [];
    console.log("list",firstPathList)
    if(firstPathList.length<0){
      window.location.reload()
    }
    const currentUserAccessData = JSON.parse(store.getters.getUserAccessData);
    if (currentUserAccessData !== null) {
      let functionList: Array<Applists> = generateFunctionList(currentUserAccessData);
      firstPathList = functionList.sort(cmp);
    }


    sessionStorage.setItem("RoutingPage", JSON.stringify(firstPathList));



    return { firstPathList }
  }


});

</script>

<style scoped>
.imgLogo{
  margin-top: 25% !important;
  margin-left: -5% !important;
}
</style>




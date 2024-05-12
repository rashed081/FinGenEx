<script lang="ts">


import { HomeApplication } from "@/../public/configURL";
import type Applists from "@/commonModels/AppLists";
import { generateFunctionList } from "@/components/FloatingMenuCard/Navigation";
import { commonMixin } from "@/mixins/CommonMixin";
import { defineComponent, computed, ref, watch } from "vue";

import { useStore } from "vuex";

export default defineComponent({
  name: "NavView",
  emits: ["event"],

  setup() {
    let selectedAppInfo: any = ref({
      selectedApp: null,
      selectedItem: null,
    })
    let search = ref(null);
    let firstPathList: Array<Applists> = []
    let currentUserAccessData: any = null;
    const store = useStore();
    function cmp(a: any, b: any) {
      if (a.FastPath < b.FastPath) return -1;
      else return 1;
    }
    const AppList = JSON.parse(sessionStorage.getItem("AplicationList") as any) ||null;
    //const AppList = computed(() => commonMixin().generateAppicationList(store.getters.getUserAppList))

    function toggleFullScreen() {
      //console.log("some code are implemented")
    }

    currentUserAccessData = JSON.parse(store.getters.getUserAccessData);

    if (currentUserAccessData !== null) {
      let functionList: Array<Applists> = generateFunctionList(currentUserAccessData);
      firstPathList = functionList.sort(cmp);
    }

    watch(() => "store.getters.getUserAccessData" as any, (newValue) => {
      currentUserAccessData = newValue;
      if (currentUserAccessData !== null) {
        let functionList = generateFunctionList(currentUserAccessData);
        firstPathList = functionList.sort(cmp);
      }
    }, { deep: true });

    return {
      AppList,
      toggleFullScreen,
      commonMixin,
      HomeApplication,
      selectedAppInfo,
      cmp,
      firstPathList,
      search,

    }
  }
})






</script>

<template v-slot:prepend-inner>
  <div>
  <v-combobox  v-model="selectedAppInfo.selectedApp" label="App List" :items="AppList" item-title="ApplicationName"
    item-value="ApplicationId" 
    :search-input.sync="search" background-color="grey lighten-2"
    hide-details hide-selected :menu-props="{ closeOnContentClick: true, maxHeight: 300, maxWidth: 150 }"
    no-data-text="No data found" return-object
    @change="(event: any) => commonMixin().redirectToAnotherApp(selectedAppInfo.selectedApp)">
  </v-combobox></div>
</template>

<style  scoped>

</style>

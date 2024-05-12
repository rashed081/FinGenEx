<script lang="ts">


import { generateFunctionList } from "@/components/FloatingMenuCard/Navigation";
import { commonMixin } from "@/mixins/CommonMixin";
import router from "@/router/app_router";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NavView",
  emits: ["event"],

  setup() {
    let selectedAppInfo: any = ref({
      selectedApp: null,

    })
    const selectedItem = ref(null);
    let search = ref(null);
    let firstPathList: Array<any> = []
    let currentUserAccessData: any = null;
    const store = useStore();
    function cmp(a: any, b: any) {
      // ascending order sorting comparator
      if (a.FastPath < b.FastPath) return -1;
      else return 1;
    }

    currentUserAccessData = JSON.parse(store.getters.getUserAccessData);
    if (currentUserAccessData !== null) {
      let functionList: Array<string> = generateFunctionList(currentUserAccessData);
      firstPathList = functionList.sort(cmp);
    }
    
    
    watch(() => (store.getters.getUserAccessData) as any, (newValue) => {
      currentUserAccessData = newValue;
      if (currentUserAccessData !== null) {
        let functionList = generateFunctionList(currentUserAccessData);
        firstPathList = functionList.sort(cmp);
      }
    }, { deep: true });

    let optionHide=false;
    const selectItem = () => {
      firstPathList.forEach(element => {
      
        if (selectedItem.value == element.FastPath) {
          router.push(element.TargetPath.substr(element.TargetPath.lastIndexOf('/') + 1))
          optionHide=true;
          selectedItem.value=element.title;
        }
      });

    };

    return {
      commonMixin,
      selectedAppInfo,
      cmp,
      firstPathList,
      search,
      selectedItem,
      selectItem,
      optionHide


    }
  }
})



// const props = defineProps({
//   closesearch: {
//     type: Function,
//     required: false
//   }
// });
</script>

<template v-slot:prepend-inner>
  <v-combobox v-model="selectedItem" :items="firstPathList" item-title="ConcatName" class="customInput"
    item-value="FastPath" label="Search Path..." :search-input.sync="search" background-color="grey lighten-2"
   clearable hide-details hide-selected :menu-props="{ closeOnContentClick: true, maxHeight: 300, maxWidth: 150 }"
    no-data-text="No data found" @keydown.enter="selectItem">

    <template v-slot:item="{ item }">
      <template v-if="item">
        <v-list-item link :to="{ path: item.raw.TargetPath.substr(item.raw.TargetPath.lastIndexOf('/') + 1) }">{{
          item.props.title }}</v-list-item>
      </template>
    </template>

  </v-combobox>
</template>

<style scoped></style>

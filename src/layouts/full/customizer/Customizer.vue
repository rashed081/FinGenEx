<script setup lang="ts">

import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/layouts/full/customizer/customizer';
import type Applists from '@/commonModels/AppLists';
import { useStore } from 'vuex';
import { generateFunctionList } from '@/components/FloatingMenuCard/Navigation';

const theme = useTheme();
const customizer = useCustomizerStore();
//new added
let items: any = [];
let selectedItem: string = ''

let selectedAppInfo: any = ref({
  selectedApp: null,
  selectedItem: null,
})
let search = ref(null);
let firstPathList: any = []
let currentUserAccessData: any = null;
const store = useStore();
function cmp(a: any, b: any) {
  // ascending order sorting comparator
  if (a.FastPath < b.FastPath) return -1;
  else return 1;
}

currentUserAccessData = JSON.parse(store.getters.getUserAccessData);
if (currentUserAccessData !== null) {
  let functionList: Array<Applists> = generateFunctionList(currentUserAccessData);
  firstPathList = functionList.sort(cmp);
}
watch(() => "store.getters.getUserAccessData" as any, (newValue: any) => {
  currentUserAccessData = newValue;
  if (currentUserAccessData !== null) {
    let functionList = generateFunctionList(currentUserAccessData);
    firstPathList = functionList.sort(cmp);
  }
}, { deep: true });


//end new
// themes font Family options
const Layout = ref(['Vertical', 'Horizontal']);
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="280"
    class="bg">
    <perfect-scrollbar style="height: 100%">
      <div class="pa-5">
        <div class="relative">
          <!-- <v-list :items="firstPathList" ></v-list> -->
          <!-- <v-list-item v-model="selectedAppInfo.selectedItem" :items="firstPathList" item-title="ConcatName"
              item-value="FunctionId" :search-input="search" label="Search Path..."
              :menu-props="{ closeOnContentClick: true }" solo :allow-overflow="false" no-data-text="No data found">
              <template v-slot:item="{ item }">
                <template v-if="item">
                  <v-list-item link :to="{ path: item.raw.TargetPath }">{{ item.props.title }}</v-list-item>
                </template>
              </template>
            </v-list-item> -->
          <!-- <ul>
            <li v-for="item in firstPathList" :key="item.FastPath" link :to="{ path: item.TargetPath }">
              {{ item.ConcatName }}
            
            </li>
          </ul> -->


          <v-list  dense >
     

     <v-list-group value="fastpathList">
      <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Payment Services"
              ></v-list-item>
            </template>
       <v-list-item 
         v-for="item in firstPathList"
         :key="item.FastPath"
         link :to="{ path: item.TargetPath }"
       >{{ item.ConcatName }}
      
         <v-list-item-icon>
           <!-- <v-icon v-text="item.icon"></v-icon> -->
         </v-list-item-icon>
         <!-- <v-list-item-content>
           <v-list-item-title
             v-text="generateSidebarOptions(item)"
           ></v-list-item-title>
         </v-list-item-content> -->
       </v-list-item>
     </v-list-group>
   </v-list>
          <!-- <v-card class="scrollable">
                <v-list color="#0D1E51" dark> -->
          <!-- {{ functionList }} -->
          <!-- <v-list-item-group class="multi_column" v-model="selectedAppInfo.selectedItem" color="primary">
                    <v-list-item v-for="item in firstPathList" :key="item.FastPath">
                      <v-list-item-content>
                        <router-link :to="{ path: item.link }">
                          {{ item.ConcatName }} -->
          <!-- {{ item.link }} -->
          <!-- </router-link>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card> -->
        </div>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<style lang="scss">
.bg {
  background: rgb(5 75 117) !important;
}
</style>

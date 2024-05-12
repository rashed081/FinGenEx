<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/layouts/full/customizer/customizer';
// Icon Imports
import { AccessPointIcon, BellIcon, SettingsIcon, LanguageIcon, SearchIcon, Menu2Icon } from 'vue-tabler-icons';

// dropdown imports
import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import MegaMenuDD from './MegaMenuDD.vue';
import Searchbar from './Searchbar.vue';
import FastPasthList from './FastPasthList.vue';
import router from '@/router/app_router';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}

watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="80">
    <v-btn
      class="hidden-md-and-down text-secondary floatingMenu"
      color="white"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <div class="mx-2 v-col-2 v-col-xl-2 v-col-lg-2 d-none d-lg-block">
    
    <a @click="router.push('home');">
                <img class="logoLeads"
                src="@/assets/images/leads.png" />
              </a></div>


    <!-- <v-sheet v-if="showSearch" class="search-sheet v-col-12">
      <Searchbar :closesearch="searchbox" />
    </v-sheet> -->

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    
    <div class="mx-10 v-col-2 v-col-xl-2 v-col-lg-2 d-none d-lg-block comboBoxStyle">
      <Searchbar />
    </div>
    <div class=" v-col-2 v-col-xl-2 v-col-lg-2 d-none d-lg-block comboBoxStyle">
      <FastPasthList />
    </div>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Messages -->
    <!-- ---------------------------------------------- -->
    <div class="iconStyle">
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary icon" color="white"  v-bind="props">
          <span><v-icon  color="white" v-bind="props"> mdi-file-document </v-icon></span>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <NotificationDD />
      </v-sheet>
    </v-menu>
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" location="bottom">
      <template v-slot:activator="{ props }">
        
        <v-btn  icon class="text-primary" color="white"  v-bind="props">
          <span><v-icon @click="router.push('home')" color="white" v-bind="props"> mdi-home </v-icon></span>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200" elevation="12">
        <LanguageDD />
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary" color="white"  v-bind="props">
          <span><v-icon  color="white" v-bind="props"> mdi-bell </v-icon></span>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <NotificationDD />
      </v-sheet>
    </v-menu>
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary" color="white"  v-bind="props" >
          <span><v-icon  color="white" v-bind="props"  @click="router.push('Logout')">mdi-power </v-icon></span>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <NotificationDD />
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary" color="white" v-bind="props">
          <span><v-icon  color="white" v-bind="props">mdi-account </v-icon></span>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </div>
  </v-app-bar>
</template>
<style scoped>
.logoLeads{
  max-height: 25px !important;
  min-width: 130px !important;
  margin-left: 20px !important;
  margin-top: 7px;
}
.bg{
  background-color: white !important;
}
.floatingMenu{
  margin-left: 30px !important;
  height: 30px;
}
.comboBoxStyle{
  margin-top: -5px;
}
.iconStyle{
  margin-right: 1.5%;
}


</style>

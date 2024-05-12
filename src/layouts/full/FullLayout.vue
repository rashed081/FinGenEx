<script setup lang="ts">

import { RouterView } from 'vue-router';;
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import Customizer from './customizer/Customizer.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import { useCustomizerStore } from '@/layouts/full/customizer/customizer';

fetch('../../../../public/LoginInfo.json')
      .then(response => response.json())
      .then(jsonData => {
        sessionStorage.setItem('LoginData', JSON.stringify(jsonData));
      });
      
const customizer = useCustomizerStore();
</script>

<template>
  <v-locale-provider>
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <Customizer />
      <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
      <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
  

      <v-main>
        <v-container fluid class="page-wrapper">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <RouterView />
            <v-btn
              class="customizer-btn"
              size="large"
              icon
              variant="flat"
              color="secondary"
              @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
            >
            <span><v-icon  color="white" class="menuIcon">mdi-menu-left </v-icon></span>
            </v-btn>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
<style scoped>
.bg-secondary {
  background: rgb(5 75 117) !important;
  margin-top: 100px;
}

</style>
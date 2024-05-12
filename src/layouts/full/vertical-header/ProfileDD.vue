


<script setup lang="ts">
import store from '@/store';
import { ref } from 'vue';

import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
const swt1 = ref(true);
const swt2 = ref(false);

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 325px">
      <v-list>
        <v-list-item to="/profie" active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-calendar </v-icon></span>
          </template>

          <v-list-item-title class="font-weight-semibold">Transaction Date: {{ store.getters.getTransDate }}</v-list-item-title>
        </v-list-item>

        <v-list-item to="/profie" active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-account </v-icon></span>
          </template>

          <v-list-item-title class="font-weight-semibold"> {{ store.getters.getUserId }}</v-list-item-title>
        </v-list-item>

        <v-list-item active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-bank </v-icon></span>
          </template>
          <i class="feather icon-log-out"></i> Branch:{{ store.getters.getBranchID }} - {{ store.getters.getBranchName }}
          <template v-slot:append>
            <v-chip color="warning" class="text-white" text="Change" variant="flat" size="small" />
          </template>
        </v-list-item>
        <v-list-item active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-help-circle </v-icon></span>
          </template>
          <i class="feather icon-log-out"></i> Help
        </v-list-item>
        <v-list-item active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-key-variant </v-icon></span>
          </template>
          <i class="feather icon-log-out"></i> User Password
          <template v-slot:append>
            <v-chip color="warning" class="text-white" text="Change" variant="flat" size="small" />
          </template>
        </v-list-item>
        <v-list-item active-color="secondary" rounded="md">
          <template v-slot:prepend>
            <span><v-icon class="mr-3" color="black">mdi-information </v-icon></span>
          </template>
          <i class="feather icon-log-out"></i> About BankUltimas
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>


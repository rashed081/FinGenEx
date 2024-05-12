<template>
  <!-- Page Heading -->
  <v-card style="height: 55px !important" elevation="2" class="baseColor">
    <v-card-actions class="d-flex justify-space-between">
      <v-card-title class="title text-h2 labelColor">Customer</v-card-title>
      <v-row>
        <v-col cols="12" md="12" class="text-right labelColor">
          <!-- Ok -->
          <v-btn class="mr-0 btn-bg-green" @click="onSubmit" :disabled="isDisable">OK</v-btn>
          <!-- View -->
          <v-btn class="mr-0 btn-bg-purple" @click="onView">View</v-btn>
          <!-- Refresh -->
          <v-btn class="mr-0 btn-bg-blue" @click="onRefresh">Refresh</v-btn>
          <!-- Exit -->
          <v-btn class="mr-0 btn-bg-red" @click="onExit">Exit</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <v-container>
    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">

      <!-- Customer Profile Header -->
      <v-card style="height: 45px !important" elevation="2" class="mx-auto baseColor" max-width="980">
        <v-card-title class="title text-h4 labelColor">Customer Profile</v-card-title>
      </v-card>
      <!-- Form  -->
      <v-card-text>
        <v-row>
          <v-col cols="2" sm="2">
            <v-text-field label="Customer ID" v-model="customerInfoHandler.CUSTOMER_ID" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Customer Name" v-model="customerInfoHandler.CUSTOMER_NAME" required></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field label="Father Name" v-model="customerInfoHandler.FATHER_NAME" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Mother Name" v-model="customerInfoHandler.MOTHER_NAME" required></v-text-field>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.GENDER" label="Gender" :items="ListOfGenderType"
              item-title="label" item-value="value">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3">
            <v-menu ref="birthdateMenu" :close-on-content-click="true" transition="scale-transition" offset-y
              min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field label="Date of Birth" prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"
                  v-model="customerInfoHandler.DATE_OF_BIRTH"></v-text-field>
              </template>
              <v-date-picker @input="birthdateMenu = true"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.MARITAL_ST" label="Marital Status"
              :items="ListOfMaritalStatusType" item-title="label" item-value="value">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Spouse Name" v-model="customerInfoHandler.SPOUSE_NAME" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="NID" v-model="customerInfoHandler.NID" required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Popup Window -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-toolbar flat color="info" dark>
          <v-toolbar-title>Customer List</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-data-table :headers="headers" :items="customers" item-key="CUSTOMER_ID" class="elevation-1">
            <template v-slot:item.MODIFY="{ item }">
              <v-btn small color="primary" @click="modifyCustomer(item)">Modify</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type CustomerInfoInterface from '../models/CustomerInfoInterface';

const customerInfoHandler = ref<CustomerInfoInterface>({}).value;

onMounted(() => {
  customerInfoHandler.CUSTOMER_ID = '[AUTO]';
});


let ListOfMaritalStatusType = [
  { label: 'Married', value: 'Married' },
  { label: 'Never Married', value: 'Never Married' },
  { label: 'Divorced', value: 'Divorced' },
  { label: 'Widow', value: 'Widow' }
];
let ListOfGenderType = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Others', value: 'Others' }
];

const dialog = ref(false);
const headers = [
  { text: 'Customer Name', value: 'CUSTOMER_NAME' },
  { text: 'Customer ID', value: 'CUSTOMER_ID' },
  { text: 'Spouse Name', value: 'SPOUSE_NAME' },
  { text: '', value: 'MODIFY' },
];
const customers = [
  {
    CUSTOMER_NAME: 'John Doe',
    CUSTOMER_ID: '12345',
    SPOUSE_NAME: 'Jane Doe',
  },
  {
    CUSTOMER_NAME: 'Jane Smith',
    CUSTOMER_ID: '67890',
    SPOUSE_NAME: 'John Smith',
  },
  //...s
];

async function modifyCustomer(item: any) {
  console.log(`Modify customer: ${item.CUSTOMER_NAME}`);
  // Add your logic to modify the customer here
}



async function ClearDataFields() {

}
async function OnSubmit() { }
async function onExit() { }
async function onRefresh() { }
async function onView() {
  dialog.value = true;
}

</script>

<style scoped>
.title {
  color: white;
  margin-top: -8px;
}

.v-btn.v-btn--density-default {
  height: 35px !important;
  margin-top: 3px !important;
}
</style>
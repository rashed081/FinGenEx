<template>
  <!-- Page Heading -->
  <v-card style="height: 55px !important" elevation="2" class="baseColor ">
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
  <v-container >
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


    <!-- Introducer and Address Information -->
    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">
      <!-- Tab Header -->
      <v-tabs style="height: 39px !important" elevation="2" class="baseColor px-2" v-model="activeTab">
        <v-tab class="title text-h4 labelColor">Introducer Info</v-tab>
        <v-tab class="title text-h4 labelColor">Address List</v-tab>
      </v-tabs>

      <!-- Introducer -->
      <v-tab-item v-if="activeTab === 0">
        <v-card elevation="1" class="mx-auto pt-7 " max-width="960">
          <!-- Form  -->
          <v-card-text>
            <v-card-title class="text-h4">Introducer Information</v-card-title>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4">
                <v-autocomplete v-model="customerInfoHandler.INTRODUCER_TYPE" label="Introducer Type"
                  :items="ListOfIntroducerTypes" item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Introducer Acc Branch" v-model="customerInfoHandler.INTRODUCER_ACC_BRANCH"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Introducer Acc no" v-model="customerInfoHandler.INTRODUCER_ACC_NO"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Introducer Details" v-model="customerInfoHandler.INTRODUCER_DETAILS"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" v-if="selectedIntroducerType==='Peoples Representative'">
                <v-text-field label="Introducer Details" v-model="customerInfoHandler.INTRODUCER_DETAILS"
                  required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Address List -->
      <v-tab-item v-if="activeTab === 1">
        <v-card elevation="1" class="mx-auto pt-7 " max-width="960">
          <!-- Form  -->
          <v-card-text>
            <v-card-title class="text-h4">Address List</v-card-title>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4">
                <v-autocomplete v-model="customerInfoHandler.ADDRESS_TYPE" label="Address Type"
                  :items="ListOfAddressTypes" item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Address" v-model="customerInfoHandler.ADDRESS_DETAILS" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="City/Town/Area" v-model="customerInfoHandler.CITY" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Zip/Postal Code" v-model="customerInfoHandler.ZIP_CODE" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="customerInfoHandler.COUNTRY" label="Country" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="customerInfoHandler.DIVISION" label="Division / State"
                  :items="ListOfAddressTypes" item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="customerInfoHandler.DISTRICT" label="District" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="customerInfoHandler.THANA" label="Thana" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Phone No" v-model="customerInfoHandler.PHONE_NO" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Mobile No" v-model="customerInfoHandler.MOBILE_NO" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Email" v-model="customerInfoHandler.EMAIL" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-btn class="btn-bg-primary mt-3" @click="onAddressAdd">Add</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-card>



  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type CustomerInfoInterface from '../models/CustomerInfoInterface';

const customerInfoHandler = ref<CustomerInfoInterface>({}).value;


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
let ListOfIntroducerTypes = [
  'Bank Employee with PA No',
  'Account Holder',
  'Peoples Representative',
];
let ListOfAddressTypes = [
  { label: 'Present Address', value: 'Present Address' },
  { label: 'Permanent Address', value: 'Permanent Address' }
];

const activeTab = ref(0);
const selectedIntroducerType = ref('');

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
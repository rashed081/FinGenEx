<template>
  <!-- Page Heading -->
  <BaseHeader :title="'CustomerInfo'" :is-four-button="true" :button1="'OK'" :button2="'View'" :button3="'Refresh'"
    :button4="'Exit'" @onSubmitFromChildren="OnSubmit" @onViewFromChildren="OnView" @onRefreshFromChildren="OnRefresh"
    @onExitFromChildren="OnExit" />

  <v-container>
    <!-- Customer Basic Info Section -->

    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">
      <!-- Customer Profile Header -->
      <v-card style="height: 45px !important" elevation="2" class="mx-auto baseColor" max-width="980">
        <v-card-title class="title text-h4 labelColor">Customer Profile</v-card-title>
      </v-card>
      <!-- Form  -->
      <v-card-text>
        <v-row>
          <v-col cols="2" sm="2">
            <v-text-field label="Customer ID" @blur="handleBlur" v-on:keypress="[rules.isDecimal($event)]"
              v-model="customerInfoHandler.CUSTOMER_ID"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Customer Name" v-model="customerInfoHandler.CUSTOMER_NAME"
              :rules="[rules.required('true')]" v-on:keypress="[rules.isLetter($event)]" required></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field label="Father Name" v-model="customerInfoHandler.FATHERS_NAME"
              v-on:keypress="[rules.isLetter($event)]" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Mother Name" v-model="customerInfoHandler.MOTHERS_NAME"
              v-on:keypress="[rules.isLetter($event)]" required></v-text-field>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.GENDER" label="Gender" :items="ListOfGenderType"
              v-on:keypress="[rules.isLetter($event)]" item-title="label" item-value="value">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Date of Birth" prepend-icon="mdi-calendar" v-model="customerInfoHandler.DATE_OF_BIRTH"
              type="date"></v-text-field>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.MARITAL_ST" label="Marital Status"
              v-on:keypress="[rules.isLetter($event)]" :items="ListOfMaritalStatusType" item-title="label"
              item-value="value">
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Spouse Name" v-model="customerInfoHandler.SPOUSE_NAME"
              v-on:keypress="[rules.isLetter($event)]" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="NID" v-model="customerInfoHandler.CUSTOMER_NID"
              v-on:keypress="[rules.isDecimal($event)]" required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Introducer & Address Section -->

    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">
      <!-- Tab Header -->
      <v-tabs style="height: 39px !important" elevation="2" class="baseColor px-2" v-model="activeTab">
        <v-tab class="title text-h4 labelColor">Introducer Info</v-tab>
        <v-tab class="title text-h4 labelColor">Address List</v-tab>
      </v-tabs>

      <!-- Introducer -->
      <v-tab-item v-if="activeTab === 0">
        <v-card elevation="1" class="mx-auto " max-width="960">
          <v-card-text>
            <v-card-title class="text-h4">Introducer Information</v-card-title>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4">
                <v-autocomplete v-model="introInfoHandler.INTRO_TYPE" label="Introducer Type"
                  :items="ListOfIntroducerTypes" item-title="label" item-value="value"
                  @change="handleIntroTypeChange"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" v-if="introInfoHandler.INTRO_TYPE === '1'">
                <v-text-field label="Introducer Employee ID" v-model="introInfoHandler.INTRO_EMPLOYEE_ID"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="introInfoHandler.INTRO_TYPE === '1'">
                <v-text-field label="Introducer PA No" v-model="introInfoHandler.INTRO_PA_NO" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="introInfoHandler.INTRO_TYPE === '2'">
                <v-text-field label="Introducer Acc Branch" v-model="introInfoHandler.INTRO_ACCOUNT_BRANCH"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="introInfoHandler.INTRO_TYPE === '2'">
                <v-text-field label="Introducer Acc no" v-model="introInfoHandler.INTRO_ACCOUNT_NUMBER"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Introducer Details" v-model="introInfoHandler.INTRO_DETAILS"
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
                <v-autocomplete v-model="addressHandler.ADDRESS_TYPE" label="Address Type"
                  :items="ListOfAddressTypes" item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Address" v-model="addressHandler.ADDRESS_DETAILS" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="City/Town/Area" v-model="addressHandler.CITY" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Zip/Postal Code" v-model="addressHandler.ZIP_CODE" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.COUNTRY" label="Country" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.DIVISION" label="Division / State"
                  :items="ListOfAddressTypes" item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.DISTRICT" label="District" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.THANA" label="Thana" :items="ListOfAddressTypes"
                  item-title="label" item-value="value"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Phone No" v-model="addressHandler.PHONE_NO" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Mobile No" v-model="addressHandler.MOBILE_NO" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Email" v-model="addressHandler.EMAIL" required></v-text-field>
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
import { ref, watch } from 'vue';
import BaseHeader from '@/components/shared/BaseHeader.vue';
import type CustomerInfoInterface from '../models/CustomerInfoInterface';
import Service from '../services/CustomerInfoHandlerService';
import { toast } from 'vue3-toastify';
import rules from '@/mixins/rules';
import { dateMixin } from '@/mixins/DateMixin';
import type IntroducerInfoInterface from '../models/IntroducerInfoInterface';
import type AddressInterface from '../models/AddressInterface';

let customerInfoHandler = ref<CustomerInfoInterface>({}).value;
let introInfoHandler = ref<IntroducerInfoInterface>({}).value;
let addressHandler = ref<AddressInterface>({}).value;

customerInfoHandler.INTRODUCER = introInfoHandler;

let activeTab = ref();
let introFieldsVisible = ref(true);

let ListOfMaritalStatusType = [
  { label: 'Married', value: '1' },
  { label: 'Single', value: '2' },
  { label: 'Divorced', value: '3' },
  { label: 'Widow', value: '4' }
];
let ListOfGenderType = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  { label: 'Others', value: '3' }
];
let ListOfIntroducerTypes = [
  { label: 'Bank Employee with PA No', value: '1' },
  { label: 'Account Holder', value: '2' },
  { label: 'Peoples Representative', value: '3' }
];
let ListOfAddressTypes = [
  { label: 'Present Address', value: '1' },
  { label: 'Permanent Address', value: '2' }
];

async function handleIntroTypeChange() {
  if (introInfoHandler.INTRO_TYPE === '1' || introInfoHandler.INTRO_TYPE === '2') {
    introFieldsVisible.value = true;
  } else {
    introFieldsVisible.value = false;
  }
}

watch(() => introInfoHandler.INTRO_TYPE, (newType, oldType) => {
  if (newType !== oldType) {
    introInfoHandler.INTRO_EMPLOYEE_ID = '';
    introInfoHandler.INTRO_PA_NO = '';
    introInfoHandler.INTRO_ACCOUNT_BRANCH = '';
    introInfoHandler.INTRO_ACCOUNT_NUMBER = '';
    introInfoHandler.INTRO_DETAILS = '';
  }
});

async function handleBlur() {
  //debugger
  customerInfoHandler.CUSTOMER_ID = customerInfoHandler.CUSTOMER_ID?.toString().padStart(10, '0');
  customerInfoHandler.INTRODUCER = customerInfoHandler.INTRODUCER;
  console.log(customerInfoHandler);
  if (customerInfoHandler.CUSTOMER_ID != null) {
    try {
      await Service.GetCustomerByID(customerInfoHandler.CUSTOMER_ID).then((res: any) => {
        console.log(res);
        updateFormFields(res);
      });
    }
    catch (error) {
      console.error(error);
    }
  }
}

async function OnSubmit() {
  let Msg = ref({}) as any;
  console.log(customerInfoHandler);
  customerInfoHandler.DATE_OF_BIRTH = dateMixin().$convertToDDMMMYYFormat(customerInfoHandler.DATE_OF_BIRTH);
  if (customerInfoHandler.CUSTOMER_ID == null) {
    try {
      await Service.InsertCustomerData(customerInfoHandler).then((res: any) => {
        if (res) {
          Msg.value = res.responseData;
          toast.success("Saved Successfuly, Customer ID: " + Msg.value.CUSTOMER_ID);
        }
      })
    }
    catch (error) {
      console.error(error);
    }
    await ClearDataFields();
  }
  else {
    toast.warn("Customer or Introducer Already Exists!");
  }
}

async function OnExit() { }

async function OnRefresh() {
  await ClearDataFields();
}

async function OnView() { }

async function ClearDataFields() {
  customerInfoHandler.CUSTOMER_NID = '',
    customerInfoHandler.CUSTOMER_NAME = '',
    customerInfoHandler.DATE_OF_BIRTH = '',
    customerInfoHandler.FATHERS_NAME = '',
    customerInfoHandler.MARITAL_ST = '',
    customerInfoHandler.MOTHERS_NAME = '',
    customerInfoHandler.GENDER = '',
    customerInfoHandler.SPOUSE_NAME = ''
}

function updateFormFields(customerData: any) {
  //debugger
  customerInfoHandler.CUSTOMER_NAME = customerData.CUSTOMER_NAME;
  customerInfoHandler.CUSTOMER_NID = customerData.CUSTOMER_NID;
  customerInfoHandler.DATE_OF_BIRTH = dateMixin().$convertToDDMMYYYYFormat(customerData.DATE_OF_BIRTH);
  customerInfoHandler.FATHERS_NAME = customerData.FATHERS_NAME;
  customerInfoHandler.MARITAL_ST = customerData.MARITAL_ST;
  customerInfoHandler.MOTHERS_NAME = customerData.MOTHERS_NAME;
  customerInfoHandler.GENDER = customerData.GENDER;
  customerInfoHandler.SPOUSE_NAME = customerData.SPOUSE_NAME;
  introInfoHandler.INTRO_TYPE = ListOfIntroducerTypes.find(
    (type) => type.value === customerData.INTRODUCER?.INTRO_TYPE?.toString()
  )?.label || '';
  introInfoHandler.INTRO_EMPLOYEE_ID = customerData.INTRODUCER?.INTRO_EMPLOYEE_ID || '';
  introInfoHandler.INTRO_PA_NO = customerData.INTRODUCER?.INTRO_PA_NO || '';
  introInfoHandler.INTRO_ACCOUNT_BRANCH = customerData.INTRODUCER?.INTRO_ACCOUNT_BRANCH || '';
  introInfoHandler.INTRO_ACCOUNT_NUMBER = customerData.INTRODUCER?.INTRO_ACCOUNT_NUMBER || '';
  introInfoHandler.INTRO_DETAILS = customerData.INTRODUCER?.INTRO_DETAILS || '';
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
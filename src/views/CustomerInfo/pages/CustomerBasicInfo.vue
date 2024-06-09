<template>
  <!-- Page Heading -->
  <BaseHeader :title="'CUSTOMER BASIC INFORMATION'" :is-four-button="true" :button1="'OK'" :button2="'View'"
    :button3="'Refresh'" :button4="'Exit'" @onSubmitFromChildren="OnSubmit" @onViewFromChildren="OnView"
    @onRefreshFromChildren="OnRefresh" @onExitFromChildren="OnExit" class="position-css" />

  <v-container>
    <!-- Customer Basic Info Section -->

    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">
      <!-- Customer Profile Header -->
      <v-card style="height: 45px !important" elevation="2" class="mx-auto baseColor" max-width="1000">
        <v-card-title class="title text-h4 labelColor">CUSTOMER PROFILE</v-card-title>
      </v-card>
      <!-- Form  -->
      <v-card-text>
        <v-row>
          <v-col cols="2" sm="2">
            <v-text-field @blur="handleBlur" v-on:keypress="[rules.isDecimal($event)]"
              v-model="customerInfoHandler.CUSTOMER_ID">
              <template v-slot:label>
                <span>Customer ID <span style="color: red">*</span></span>
              </template></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Customer Name" v-model="customerInfoHandler.CUSTOMER_NAME"
              v-on:keypress="[rules.isLetter($event)]">
              <template v-slot:label>
                <span>Customer Name <span style="color: red">*</span></span>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field label="Father Name" v-model="customerInfoHandler.FATHERS_NAME"
              v-on:keypress="[rules.isLetter($event)]">
              <template v-slot:label>
                <span>Father's Name <span style="color: red">*</span></span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Mother Name" v-model="customerInfoHandler.MOTHERS_NAME"
              v-on:keypress="[rules.isLetter($event)]">
              <template v-slot:label>
                <span>Mother's Name <span style="color: red">*</span></span>
              </template>
            </v-text-field>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.GENDER" label="Gender" :items="ListOfGenderType"
              v-on:keypress="[rules.isLetter($event)]" item-title="label" item-value="value">
              <template v-slot:label>
                <span>Gender <span style="color: red">*</span></span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field label="Date of Birth" prepend-icon="mdi-calendar" v-model="customerInfoHandler.DATE_OF_BIRTH"
              type="date">
              <template v-slot:label>
                <span>Date of Birth <span style="color: red">*</span></span>
              </template>
            </v-text-field>
          </v-col>
          <v-col sm="3" cols="12">
            <v-autocomplete v-model="customerInfoHandler.MARITAL_ST" label="Marital Status"
              v-on:keypress="[rules.isLetter($event)]" :items="ListOfMaritalStatusType" item-title="label"
              @update:model-value="ClearSpouseDataFields(customerInfoHandler.MARITAL_ST)" item-value="value">
              <template v-slot:label>
                <span>Marital Status <span style="color: red">*</span></span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="Spouse Name" v-model="customerInfoHandler.SPOUSE_NAME"
              v-on:keypress="[rules.isLetter($event)]" :disabled="customerInfoHandler.MARITAL_ST === '2'"
              :rules="[rules.required('true')]">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field label="NID" v-model="customerInfoHandler.CUSTOMER_NID"
              v-on:keypress="[rules.isDecimal($event)]">
              <template v-slot:label>
                <span>NID <span style="color: red">*</span></span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Introducer & Address Section -->

    <v-card elevation="2" class="mx-auto mt-5 py-5" max-width="1000">
      <!-- Tab Header -->
      <v-tabs style="height: 39px !important" elevation="2" class="baseColor px-2" v-model="activeTab">
        <v-tab class="title text-h4 labelColor">INTRODUCER INFO</v-tab>
        <v-tab class="title text-h4 labelColor">ADDRESS INFO</v-tab>
      </v-tabs>

      <v-tab-item v-if="activeTab === 0">
        <v-card elevation="0" class="mx-auto" max-width="960">
          <v-card-text>
            <v-card-title class="text-h4">Introducer Information</v-card-title>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4">
                <v-autocomplete v-model="introInfoHandler.INTRO_TYPE" label="Introducer Type"
                  :items="ListOfIntroducerTypes" item-title="label" item-value="value"
                  @update:model-value="ClearIntroducerDataFields()"></v-autocomplete>
              </v-col>
            </v-row>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4" v-if="isBankEmployee()">
                <v-text-field label="Introducer Employee ID" v-model="introInfoHandler.INTRO_EMPLOYEE_ID" required>
                  <template v-slot:label>
                    <span>Introducer Employee ID <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="isBankEmployee()">
                <v-text-field label="Introducer PA No" v-model="introInfoHandler.INTRO_PA_NO">
                  <template v-slot:label>
                    <span>Introducer PA No <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="isAccountHolder()">
                <v-text-field label="Introducer Acc Branch" v-on:keypress="[rules.isLetter($event)]"
                  v-model="introInfoHandler.INTRO_ACCOUNT_BRANCH">
                  <template v-slot:label>
                    <span>Introducer Acc Branch <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="isAccountHolder()">
                <v-text-field label="Introducer Acc no" v-on:keypress="[rules.isDecimal($event)]"
                  v-model="introInfoHandler.INTRO_ACCOUNT_NUMBER">
                  <template v-slot:label>
                    <span>Introducer Acc no <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4" v-if="introInfoHandler.INTRO_TYPE != undefined">
                <v-text-field label="Introducer Details" v-model="introInfoHandler.INTRO_DETAILS"
                  required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <!-- Address List -->
      <v-tab-item v-if="activeTab === 1">
        <v-card elevation="0" class="mx-auto pt-7" max-width="960">
          <!-- Form  -->
          <v-card-text>
            <v-card-title class="text-h4">Address List</v-card-title>
            <v-row cols="12" sm="12">
              <v-col cols="12" sm="4">
                <v-autocomplete v-model="addressHandler.ADDRESS_TYPE_ID" label="Address Type"
                  :items="ListOfAddressTypes" item-title="label" item-value="value"
                  @update:model-value="loadCountries()">
                  <template v-slot:label>
                    <span>Address Type <span style="color: red">*</span></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Address" v-on:keypress="[rules.isAddress($event)]"
                  v-model="addressHandler.ADDRESS_DETAILS" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="City/Town/Area" v-on:keypress="[rules.isLetter($event)]"
                  v-model="addressHandler.CITY" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Zip/Postal Code" v-on:keypress="[rules.isDecimal($event)]"
                  v-model="addressHandler.ZIP_CODE" maxlength="5">
                  <template v-slot:label>
                    <span>Zip Code <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.COUNTRY_NM" label="Country" :items="countries"
                  item-title="COUNTRY_NM" item-value="COUNTRY_NM" @update:model-value="handleCountryChange()">
                  <template v-slot:label>
                    <span>Country <span style="color: red">*</span></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.DIVISION_NM" label="Division / State" :items="divisions"
                  item-title="DIVISION_NM" item-value="DIVISION_NM" @update:model-value="handleDivisionChange()">
                  <template v-slot:label>
                    <span>Division / State <span style="color: red">*</span></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.DISTRICT_NM" label="District" :items="districts"
                  item-title="DISTRICT_NM" item-value="DISTRICT_NM" @update:model-value="handleDistrictChange()">
                  <template v-slot:label>
                    <span>District <span style="color: red">*</span></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-autocomplete v-model="addressHandler.THANA_NM" label="Thana" :items="thanas" item-title="THANA_NM"
                  item-value="THANA_NM">
                  <template v-slot:label>
                    <span>Thana <span style="color: red">*</span></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Phone No" v-on:keypress="[rules.isDecimal($event)]"
                  v-model="addressHandler.PHONE_NO" maxlength="11">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Mobile No" v-on:keypress="[rules.isDecimal($event)]"
                  v-model="addressHandler.MOBILE_NO" maxlength="11">
                  <template v-slot:label>
                    <span>Mobile No <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field label="Email" v-on:keypress="[rules.EmailRules('Email')]" v-model="addressHandler.EMAIL"
                  required>
                  <template v-slot:label>
                    <span>Email <span style="color: red">*</span></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-btn color="primary" class="mt-3" @click="onAddressAdd()">Save</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <!-- Address Data Table -->
        <v-card elevation="0" class="mx-auto mt-5 px-2 py-3" max-width="940" v-if="addresses.length > 0">
          <EasyDataTable rowsPerPage="2" checkboxColumnWidth="1" borderCell tableMinHeight clickEventType="double"
            :headers="addressHeaders" :items="addresses">
            <template v-slot:item-actions="item">
              <div class="actions-wrapper mx-auto">
                <v-icon @click="editAddress(item)" class="mx-4">mdi-pencil</v-icon>
                <v-icon small @click="deleteAddress(item)" class="mx-2">mdi-delete</v-icon>
              </div>
            </template>
          </EasyDataTable>
        </v-card>
      </v-tab-item>
    </v-card>



    <!-- Confirm Delete Dialogue -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <!-- <v-card-title class="headline">Delete Address</v-card-title> -->
        <v-card-text>Are you sure you want to delete this address?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="confirmDeleteAddress">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import BaseHeader from '@/components/shared/BaseHeader.vue';
import type CustomerInfoInterface from '../models/CustomerInfoInterface';
import Service from '../services/CustomerInfoHandlerService';
import { toast } from 'vue3-toastify';
import rules from '@/mixins/rules';
import router from '@/router/app_router';
import { dateMixin } from '@/mixins/DateMixin';
import type IntroducerInfoInterface from '../models/IntroducerInfoInterface';
import type AddressInterface from '../models/AddressInterface';
import { VDialog, VBtn, VCardText, VCardActions } from 'vuetify/components';

let customerInfoHandler = ref<CustomerInfoInterface>({}).value;
let introInfoHandler = ref<IntroducerInfoInterface>({}).value;
let addressHandler = ref<AddressInterface>({}).value;


let activeTab = ref();
let countries = ref<any[]>([]);
let divisions = ref<any[]>([]);
let districts = ref<any[]>([]);
let thanas = ref<any[]>([]);
let addresses = ref<AddressInterface[]>([]);
let isEditing = ref(false);
let deleteDialog = ref(false);
//const buttonText = computed(() => (isEditing.value ? 'Save' : 'Add'));

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
const addressHeaders = [
  { text: 'Address Type', value: 'ADDRESS_TYPE_NM' },
  { text: 'Country', value: 'COUNTRY_NM' },
  { text: 'Division', value: 'DIVISION_NM' },
  { text: 'District', value: 'DISTRICT_NM' },
  { text: 'Thana', value: 'THANA_NM' },
  { text: 'Address', value: 'ADDRESS_DETAILS' },
  { text: 'Action', value: 'actions' }
];

async function loadCountries() {
  try {
    await Service.GetCountries().then((res: any) => {
      countries.value = res;
    });
  } catch (error) {
    toast.error('Error fetching countries');
  }
}

async function loadDivisions() {
  const selectedCountry = countries.value.find((e) => e.COUNTRY_NM == addressHandler.COUNTRY_NM);
  addressHandler.COUNTRY_ID = selectedCountry.COUNTRY_ID;
  if (addressHandler.COUNTRY_ID !== '') {
    try {
      await Service.GetDivisions(addressHandler.COUNTRY_ID).then((res: any) => {
        divisions.value = res;
      });
    } catch (error) {
      toast.error('Error fetching division');
    }
  }

}

async function loadDistricts() {
  const selectedDivision = divisions.value.find((e) => e.DIVISION_NM == addressHandler.DIVISION_NM);
  addressHandler.DIVISION_ID = selectedDivision.DIVISION_ID;
  if (addressHandler.DIVISION_ID !== '') {
    try {
      await Service.GetDistricts(addressHandler.DIVISION_ID).then((res: any) => {
        districts.value = res;
      });
    } catch (error) {
      toast.error('Error fetching district');
    }
  }
}

async function loadThanas() {
  const selectedDistrict = districts.value.find((e) => e.DISTRICT_NM == addressHandler.DISTRICT_NM);
  addressHandler.DISTRICT_ID = selectedDistrict.DISTRICT_ID;
  if (addressHandler.DISTRICT_ID !== '') {
    try {
      await Service.GetThanas(addressHandler.DISTRICT_ID).then((res: any) => {
        thanas.value = res;

      });
    } catch (error) {
      toast.error('Error fetching thanas');
    }
  }
  //debugger

}

async function handleBlur() {
  if (customerInfoHandler.CUSTOMER_ID) {
    customerInfoHandler.CUSTOMER_ID = customerInfoHandler.CUSTOMER_ID?.toString().padStart(10, '0');
    try {
      const customerData = await Service.GetCustomerByID(customerInfoHandler.CUSTOMER_ID);
      console.log("list of cust:", customerData)
      customerData.isAdd = false;
      customerData.isOld = true;
      customerData.INTRODUCER.isAdd = false;
      customerData.INTRODUCER.isOld = true;

      updateFormFields(customerData);
      if (customerData.ADDRESSES.length > 0) {
        customerData.ADDRESSES.forEach(address => {
          address.CloneObj = { ...address };
          address.isAdd = false;
          address.isOld = true;
        });
        addresses.value = customerData.ADDRESSES
      }
      else {
        addresses.value = [];
      }

    }
    catch (error) {
      console.error(error);
      toast.warning("Error fetching data, please try again!")
    }
  }
}

async function OnSubmit() {
  let Msg = ref({}) as any;
  console.log(customerInfoHandler);
  customerInfoHandler.ADDRESSES = addresses.value;
  customerInfoHandler.INTRODUCER = introInfoHandler;
  customerInfoHandler.DATE_OF_BIRTH = dateMixin().$convertToDDMMMYYFormat(customerInfoHandler.DATE_OF_BIRTH);
  if (checkCustomerInfoFields()) {
    try {
      await Service.InsertCustomerData(customerInfoHandler).then((res: any) => {
        if (res) {
          Msg.value = res.responseData;
          toast.success('Saved Successfuly, Customer ID: ' + Msg.value.CUSTOMER_ID);
        }
      });
    } catch (error) {
      console.error(error);
    }
    await ClearCustomerDataFields();
    introInfoHandler.INTRO_TYPE = undefined;
    await ClearIntroducerDataFields();
    await ClearAddressDataFields();
    customerInfoHandler.CUSTOMER_ID = undefined;
  }
  else if (customerInfoHandler.CUSTOMER_ID != null || customerInfoHandler.CUSTOMER_ID == "") {
    toast.warn('Customer id should be empty!');
  }
}

async function OnExit() {
  router.push('home');
}

async function OnRefresh() {
  customerInfoHandler.CUSTOMER_ID = undefined;
  await ClearCustomerDataFields();
  introInfoHandler.INTRO_TYPE = '';
  await ClearIntroducerDataFields();
  await ClearAddressDataFields();
  addresses.value = [];
}

async function OnView() {
  alert("Button function has not been implemented yet!!!")
}

async function ClearCustomerDataFields() {
  customerInfoHandler.CUSTOMER_NID = undefined,
    customerInfoHandler.CUSTOMER_NAME = undefined,
    customerInfoHandler.DATE_OF_BIRTH = undefined,
    customerInfoHandler.FATHERS_NAME = undefined,
    customerInfoHandler.MARITAL_ST = undefined,
    customerInfoHandler.MOTHERS_NAME = undefined,
    customerInfoHandler.GENDER = undefined,
    customerInfoHandler.SPOUSE_NAME = undefined;
  customerInfoHandler.CloneObj = undefined;
  customerInfoHandler.isAdd = true;
  customerInfoHandler.isOld = false;
}

async function ClearIntroducerDataFields() {
  introInfoHandler.INTRO_EMPLOYEE_ID = undefined;
  introInfoHandler.INTRO_PA_NO = undefined;
  introInfoHandler.INTRO_ACCOUNT_BRANCH = undefined;
  introInfoHandler.INTRO_ACCOUNT_NUMBER = undefined;
  introInfoHandler.INTRO_DETAILS = undefined;
  introInfoHandler.CloneObj = undefined;
  introInfoHandler.isAdd = true;
  introInfoHandler.isOld = false;
}

async function ClearAddressDataFields() {
  addressHandler.ADDRESS_DETAILS = undefined || "",
    addressHandler.CITY = undefined,
    addressHandler.ZIP_CODE = undefined,
    addressHandler.COUNTRY_ID = undefined,
    addressHandler.COUNTRY_NM = undefined,
    addressHandler.DIVISION_ID = undefined,
    addressHandler.DIVISION_NM = undefined,
    addressHandler.DISTRICT_ID = undefined,
    addressHandler.DISTRICT_NM = undefined,
    addressHandler.THANA_ID = undefined,
    addressHandler.THANA_NM = undefined,
    addressHandler.PHONE_NO = undefined,
    addressHandler.MOBILE_NO = undefined,
    addressHandler.EMAIL = undefined,
    isEditing.value = false,
    addressHandler.CloneObj = undefined,
    addressHandler.isAdd = true,
    addressHandler.isOld = false
  //addresses.value=[]
}

async function ClearSpouseDataFields(marital_status) {
  if (marital_status == 2) {
    customerInfoHandler.SPOUSE_NAME = '';
  }
}

async function updateFormFields(customerData: any) {
  customerInfoHandler.CUSTOMER_NAME = customerData.CUSTOMER_NAME;
  customerInfoHandler.CUSTOMER_NID = customerData.CUSTOMER_NID;
  customerInfoHandler.DATE_OF_BIRTH = dateMixin().$convertToCalendarFormat(customerData.DATE_OF_BIRTH);
  customerInfoHandler.FATHERS_NAME = customerData.FATHERS_NAME;
  customerInfoHandler.MARITAL_ST = customerData.MARITAL_ST;
  customerInfoHandler.MOTHERS_NAME = customerData.MOTHERS_NAME;
  customerInfoHandler.GENDER = customerData.GENDER;
  customerInfoHandler.SPOUSE_NAME = customerData.SPOUSE_NAME;
  customerInfoHandler.isOld = customerData.isOld;
  customerInfoHandler.isAdd = customerData.isAdd;
  customerInfoHandler.CloneObj = { ...customerData };

  introInfoHandler.INTRO_TYPE = customerData.INTRODUCER?.INTRO_TYPE || '';
  introInfoHandler.INTRO_EMPLOYEE_ID = customerData.INTRODUCER?.INTRO_EMPLOYEE_ID || '';
  introInfoHandler.INTRO_PA_NO = customerData.INTRODUCER?.INTRO_PA_NO || '';
  introInfoHandler.INTRO_ACCOUNT_BRANCH = customerData.INTRODUCER?.INTRO_ACCOUNT_BRANCH || '';
  introInfoHandler.INTRO_ACCOUNT_NUMBER = customerData.INTRODUCER?.INTRO_ACCOUNT_NUMBER || '';
  introInfoHandler.INTRO_DETAILS = customerData.INTRODUCER?.INTRO_DETAILS || '';
  introInfoHandler.INTRO_ID = customerData.INTRODUCER?.INTRO_ID || '';
  introInfoHandler.isAdd = customerData.INTRODUCER?.isAdd;
  introInfoHandler.isOld = customerData.INTRODUCER?.isOld;
  introInfoHandler.CloneObj = { ...customerData.INTRODUCER };

  const selectedAddressType = ListOfAddressTypes.find((type) => type.value === addressHandler.ADDRESS_TYPE_ID);
  addressHandler.ADDRESS_TYPE_NM = selectedAddressType?.label || '';

  addresses.value = { ...customerData.Address };
}

async function onAddressAdd() {
  addressHandler.ADDRESS_TYPE_NM = ListOfAddressTypes.find(nm => nm.value == addressHandler.ADDRESS_TYPE_ID)?.label;
  if (thanas.value.length > 0) {
    const selectedThana = thanas.value.find((e) => e.THANA_NM == addressHandler.THANA_NM);
    addressHandler.THANA_ID = selectedThana.THANA_ID;
  }
  if (!isEditing.value) {
    const existingAddressIndex = addresses.value.findIndex(address => address.ADDRESS_TYPE_ID === addressHandler.ADDRESS_TYPE_ID);
    if (existingAddressIndex!== -1) {
      addresses.value[existingAddressIndex] = {...addressHandler };
      toast.success('Address updated successfully');
    } else {
      addresses.value.push({...addressHandler });
      toast.success('Address added successfully');
    }
    ClearAddressDataFields();
  } else {
    let selectedAddressIndex = addresses.value.findIndex((e) => e.ADDRESS_TYPE_ID === addressHandler.ADDRESS_TYPE_ID
      || e.ADDRESS_TYPE_NM === addressHandler.ADDRESS_TYPE_NM);
    addresses.value[selectedAddressIndex] = {...addressHandler };
    addressHandler.ADDRESS_TYPE_ID = undefined;
    ClearAddressDataFields();
    toast.success('Address Updated successfully');
  }
}

async function editAddress(item: AddressInterface) {
  addressHandler.ADDRESS_TYPE_ID = item.ADDRESS_TYPE_ID;
  addressHandler.ADDRESS_TYPE_NM = item.ADDRESS_TYPE_NM;
  console.log(addressHandler.ADDRESS_TYPE_NM);
  addressHandler.COUNTRY_ID = item.COUNTRY_ID;
  addressHandler.COUNTRY_NM = item.COUNTRY_NM;
  addressHandler.DIVISION_ID = item.DIVISION_ID;
  addressHandler.DIVISION_NM = item.DIVISION_NM;
  addressHandler.DISTRICT_ID = item.DISTRICT_ID;
  addressHandler.DISTRICT_NM = item.DISTRICT_NM;
  addressHandler.THANA_ID = item.THANA_ID;
  addressHandler.THANA_NM = item.THANA_NM;
  addressHandler.CITY = item.CITY;
  addressHandler.ADDRESS_DETAILS = item.ADDRESS_DETAILS;
  addressHandler.EMAIL = item.EMAIL;
  addressHandler.PHONE_NO = item.PHONE_NO;
  addressHandler.MOBILE_NO = item.MOBILE_NO;
  addressHandler.ZIP_CODE = item.ZIP_CODE;
  addressHandler.isAdd = false;
  addressHandler.isOld = true;
  addressHandler.CloneObj = item as string;
  isEditing.value = true;

  await loadCountries();
  await loadDivisions();
  await loadDistricts();
  await loadThanas();
}

function deleteAddress(item: AddressInterface) {
  alert("Not Implemented Yet");
  // console.log(item);
  // //addressHandler = { ...item };
  // deleteDialog.value = true;
}

function confirmDeleteAddress() {

  // const index = addresses.value.findIndex((address) => address.ADDRESS_TYPE_ID === addressHandler.ADDRESS_TYPE_ID);
  // if (index !== -1) {
  //   addresses.value.splice(index, 1);
  //   //addressHandler = reactive({});
  //   deleteDialog.value = false;
  //   toast.success('Address deleted successfully');
  //   console.log(addresses.value);
  // }
}

function checkCustomerInfoFields() {
  let emptyFields: Array<string> = [];
  if (customerInfoHandler.CUSTOMER_ID == null || customerInfoHandler.CUSTOMER_ID === "" && customerInfoHandler.isAdd == true) {
    if (customerInfoHandler.CUSTOMER_NAME == null || customerInfoHandler.CUSTOMER_NAME === " ") {
      emptyFields.push("Customer Name");
    }
    if (customerInfoHandler.FATHERS_NAME == null || customerInfoHandler.FATHERS_NAME === " ") {
      emptyFields.push("Father's Name");
    }
    if (customerInfoHandler.MOTHERS_NAME == null || customerInfoHandler.MOTHERS_NAME === " ") {
      emptyFields.push("Mother's Name");
    }
    if (customerInfoHandler.DATE_OF_BIRTH == null || customerInfoHandler.DATE_OF_BIRTH === " ") {
      emptyFields.push("Date of Birth");
    }
    if (customerInfoHandler.GENDER == null || customerInfoHandler.GENDER === " ") {
      emptyFields.push("Gender");
    }
    if (customerInfoHandler.MARITAL_ST == null || customerInfoHandler.MARITAL_ST === " ") {
      emptyFields.push("Marital Status");
    }
  }
  if (introInfoHandler.INTRO_TYPE != undefined) {
    if (introInfoHandler.INTRO_TYPE == '1') {
      if (introInfoHandler.INTRO_EMPLOYEE_ID == undefined || introInfoHandler.INTRO_EMPLOYEE_ID.trim() == "")
        emptyFields.push('Intro Employee Id')
      if (introInfoHandler.INTRO_PA_NO == undefined || introInfoHandler.INTRO_PA_NO.trim() == "")
        emptyFields.push('Intro Pa no')
    }
    if (introInfoHandler.INTRO_TYPE == '2') {
      if (introInfoHandler.INTRO_ACCOUNT_NUMBER == undefined || introInfoHandler.INTRO_ACCOUNT_NUMBER == " ")
        emptyFields.push('Intro Account Number')
      if (introInfoHandler.INTRO_ACCOUNT_BRANCH == undefined || introInfoHandler.INTRO_ACCOUNT_BRANCH == " ")
        emptyFields.push('Intro Account Branch')
    }
  }
  if (emptyFields.length > 0) {
    toast.warn(`Required field cannot be empty!`);
    return false;
  }
  else return true;
}



function checkAddressFields() {
  let emptyFields: Array<string> = [];
  if(addressHandler.ADDRESS_TYPE_NM == undefined || addressHandler.ADDRESS_TYPE_ID == undefined)
    emptyFields.push('Address Type');
  if(addressHandler.COUNTRY_ID == undefined )
    emptyFields.push('Country')
  if(addressHandler.DIVISION_ID == undefined)
    emptyFields.push('Division')
  if(addressHandler.DISTRICT_ID == undefined)
    emptyFields.push('District')
  if(addressHandler.THANA_ID == undefined || addressHandler.THANA_NM == undefined)
    emptyFields.push('Thana')
  if(addressHandler.ZIP_CODE==undefined || addressHandler.ZIP_CODE.trim() == "")
    emptyFields.push('Zip Code')
  if(addressHandler.EMAIL == undefined || addressHandler.EMAIL.trim() =="")
    emptyFields.push('Email');
  if(addressHandler.MOBILE_NO == undefined)
    emptyFields.push('Mobile no');
  
  if (emptyFields.length > 0) {
    toast.warn(`Required field cannot be empty!`);
    return false;
  }
  else return true;
}


// function checkAge(value: string): boolean | string {
//   if (!value) {
//     toast.warn("Date of Birth is required");
//   }

//   const today = new Date();
//   const birthDate = new Date(value);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   if (age < 18) {
//     toast.warn("Customer must be at least 18 years old");
//   }

//   return true;
// }

// function checkValidNidLength(value: string): boolean | string {
//   if (value.length !== 10 && value.length !== 13 && value.length !== 17) {
//     toast.warn("Invalid NID");
//     return false;
//   }
//   return true;
// }

function isAccountHolder() {
  if (introInfoHandler.INTRO_TYPE === '2')
    return true;
  return false;
}

function isBankEmployee() {
  if (introInfoHandler.INTRO_TYPE === '1')
    return true;
  return false;
}

async function handleCountryChange() {
  addressHandler.DIVISION_NM = undefined;
  addressHandler.DIVISION_ID = undefined;
  addressHandler.DISTRICT_NM = undefined;
  addressHandler.DISTRICT_ID = undefined;
  addressHandler.THANA_NM = undefined;
  addressHandler.THANA_ID = undefined;
  await loadDivisions();
}

async function handleDivisionChange() {
  addressHandler.DISTRICT_NM = undefined;
  addressHandler.DISTRICT_ID = undefined;
  addressHandler.THANA_NM = undefined;
  addressHandler.THANA_ID = undefined;
  await loadDistricts();
}

async function handleDistrictChange() {
  addressHandler.THANA_ID = undefined;
  addressHandler.THANA_NM = undefined;
  await loadThanas();
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

.position-css {
  padding-top: 10px;
  padding-bottom: 40px;
}
</style>

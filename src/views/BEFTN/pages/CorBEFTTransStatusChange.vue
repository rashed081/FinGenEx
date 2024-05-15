<template>
  <BaseHeader :title="'7185: BEFT Status Change'" :is-four-button="true" :button1="'Accept'" :button2="'Exception'"
    :button3="'Refresh'" :button4="'Exit'" @onSubmitFromChildren="OnSubmit" @onViewFromChildren="OnDecline"
    @onRefreshFromChildren="OnRefresh" @onExitFromChildren="OnExit" />
  <v-card scrollable style="height: 100% !important">
    <v-card-text id="inward-css" class="overflow-auto">
      <v-form>
        <v-row>
          <v-col md="6">
            <v-card outlined>
              <v-card-text>
                <v-card-title>Clearing Information</v-card-title>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-autocomplete v-model="objBEFTTransReg.EFFECTIVE_ENTRY_DT" label="Effective Date :"
                      :items="ListOfLstxtOrgnEffDt" item-title="label" item-value="value"
                      :rules="rules.elementaryRules.required" @update:modelValue="LsdEffectiveDateChange()">
                    </v-autocomplete>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-text-field label="Branch :" v-model="objBEFTTransReg.BRANCH_ID"
                      :rules="rules.elementaryRules.required" @update:modelvalue="BranchUpdateControl()">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-autocomplete v-model="objBEFTTransReg.TRANS_TYPE" label="Transaction Type:"
                      :items="ListOfLsdTransType" item-title="label" item-value="value"
                      @update:modelValue="LsdTransTypeChange()">
                    </v-autocomplete>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-autocomplete v-model="objBEFTTransReg.EFT_FILEID" label="Function Type:"
                      :items="ListOfLsdFunctionType" item-title="label" item-value="value"
                      @update:model-value="LsdFunctionTypeChange()">
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field label="Account No :" v-model="objBEFTTransReg.RECEIVER_ACC_NO"
                      v-on:keypress="[rules.isDecimal($event)]" @update:modelValue="LstxtRcvrAccNo_TextChanged">
                      <!-- :rules="[rules.required('true')]" -->
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-btn @click="btnView_Click">Show</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="6">
            <!-- Transaction Summary -->
            <v-card outlined>
              <v-card-text>
                <v-card-title>Transaction Summary</v-card-title>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field label="Debit Transactions" :readonly="true" v-model="obj_ListofTransSummary.vdrhoncnt"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-text-field label="" :readonly="true" v-model="obj_ListofTransSummary.vdrhonamt"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field label="Credit Transactions" :readonly="true" v-model="obj_ListofTransSummary.vcrhoncn"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-text-field label="" v-model="obj_ListofTransSummary.vcrhonamt" :readonly="true"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" cols="12">
                    <v-text-field label="Total Transactions" v-model="obj_ListofTransSummary.vtotcnt" :readonly="true"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12">
                    <v-text-field label="" v-model="obj_ListofTransSummary.vtotamt" :readonly="true"
                      :rules="[rules.required('true')]">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card outlined v-if="isEnableOutwardRegistry">
          <v-card-text>
            <v-card-title>Outward Registry</v-card-title>
            <v-row>
              <v-col cols="12" md="12">
                <EasyDataTable rowsPerPage="10" checkboxColumnWidth="1" borderCell buttonsPagination tableMinHeight
                  clickEventType="double" :headers="gvOutReg_headers" :items="gvOutReg"
                  v-model:items-selected="gvOutReg_selectedArr">
                  <template #item-operation="item">
                    <div class="operation-wrapper">
                      <v-btn @click="List_gvOutReg_Selected_Items(item)">View</v-btn>
                    </div>
                  </template>
                </EasyDataTable>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card outlined v-if="isEnableAddendaInfo">
          <v-card-text>
            <v-card-title>Addenda Information</v-card-title>
            <v-row>
              <v-col md="12" cols="12">
                <EasyDataTable :items-per-page="10" checkboxColumnWidth="1" borderCell showIndex buttonsPagination
                  tableMinHeight clickEventType :headers="gvAddendaReg_headers" :items="gvAddendaReg" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import service from '@/views/BEFTN/Services/CorBEFTTransStatusChangeService';
import rules from '@/mixins/rules';
import store from '@/store';
import type ICOR_BEFT_TRANS_REG from '../models/ICOR_BEFT_TRANS_REG';
import { toast } from 'vue3-toastify';
import type ICOR_BEFT_TRANS_ADR from '../models/ICOR_BEFT_TRANS_ADR';
import router from '@/router/app_router';
import { dateMixin } from '@/mixins/DateMixin';
import ErrorPopup from '@/components/shared/ErrorPopup';
import commonMethods from '@/apputility/commonMethods';
import BEFTTransInService from '../Services/CorBEFTTransInService';

let objBEFTTransReg = ref<ICOR_BEFT_TRANS_REG>({}).value;
let objBEFTNTrnsADR = ref<ICOR_BEFT_TRANS_ADR>({}).value;
let headOfficeBranchId = ref();
async function Page_Load() {
  await BranchChangeControl();
  await BindEffectiveDate();
  objBEFTTransReg.TRANS_TYPE = ListOfLsdTransType[0].value;
  objBEFTTransReg.EFT_FILEID = ListOfLsdFunctionType[0].value;
  objBEFTTransReg.RECEIVER_ACC_NO = '';
}
Page_Load();
async function BranchChangeControl() {
  await service.GetHOBranch(store.getters.getBranchServiceType).then((res: any) => {
    headOfficeBranchId.value = res;
    objBEFTTransReg.BRANCH_ID = store.getters.getBranchID;
  });
}
async function OnSubmit() {
  await btnAuth_Click();
}
async function OnDecline() {
  await btnDecline_Click();
}
async function OnRefresh() {
  objBEFTTransReg.EFFECTIVE_ENTRY_DT = ListOfLstxtOrgnEffDt.value[0].value;
  objBEFTTransReg.BRANCH_ID = store.getters.getBranchID;
  objBEFTTransReg.TRANS_DATE = store.getters.getTransDate;
  obj_ListofTransSummary.ListOfLsTransection.value = [];
  gvOutReg.value = [];
  gvAddendaReg.value = [];
  objBEFTTransReg.RECEIVER_ACC_NO = '';
  objBEFTTransReg.TRANS_TYPE = ListOfLsdTransType[0].value;
  objBEFTTransReg.EFT_FILEID = ListOfLsdFunctionType[0].value;
  isEnableOutwardRegistry.value = false;
  isEnableAddendaInfo.value = false;
}
async function ClearDataFields() {
  obj_ListofTransSummary.ListOfLsTransection = {};
  obj_ListofTransSummary.vdrhoncnt = null;
  obj_ListofTransSummary.vdrhonamt = null;
  obj_ListofTransSummary.vcrhoncn = null;
  obj_ListofTransSummary.vcrhonamt = null;
  obj_ListofTransSummary.vtotcnt = null;
  obj_ListofTransSummary.vtotamt = null;
  gvOutReg.value = [];
  gvAddendaReg.value = [];
  isEnableOutwardRegistry.value = false;
  isEnableAddendaInfo.value = false;
}
let ListOfLstxtOrgnEffDt = ref([{ label: '', value: '' }]);
async function BindEffectiveDate() {
  await service
    .GetNextEffDate(dateMixin().$convertToDDMMMYYFormat(store.getters.getTransDate), objBEFTTransReg.BRANCH_ID)
    .then((res: any) => {
      let ListofEffDate = dateMixin().$convertFromDDMMMYYtoDDMMYYYYFormat(res.responseData);
      ListOfLstxtOrgnEffDt.value = [
        {
          label: store.getters.getTransDate,
          value: store.getters.getTransDate
        },
        {
          label: ListofEffDate,
          value: ListofEffDate
        }
      ];
      objBEFTTransReg.EFFECTIVE_ENTRY_DT = ListOfLstxtOrgnEffDt.value[0].value;
    });
}

let ListOfLsdTransType = [
  {
    label: 'Both ',
    value: ''
  },

  {
    label: 'Credit ',
    value: 'C'
  },

  {
    label: 'Debit ',
    value: 'D'
  }
];
let ListOfLsdFunctionType = [
  {
    label: 'Singel Update ',
    value: 'S'
  },

  {
    label: 'File Update ',
    value: 'F'
  }
];
const gvOutReg_headers = ref<any[]>([
  { text: 'Addenda', value: 'operation' },
  // { text: 'EFT_REG_SL', value: 'EFT_REG_SL' },
  { text: 'Entry Date', value: 'EFT_REG_DT' },
  { text: 'Eff.Date', value: 'EFFECTIVE_ENTRY_DT' },
  { text: 'Disc. Data', value: 'DISCRETIONARY_DATA' },
  { text: 'SECC', value: 'ENTRY_CLASS_CODE' },
  { text: 'Srvic Cd', value: 'SERVICE_CODE' },
  { text: 'Cr./Dr.', value: 'EFT_DR_CR' },
  { text: 'ORIG Ac No', value: 'ORGN_AC_NO' },
  { text: 'ORIG Rout', value: 'ORGN_ROUT_NO' },
  { text: 'Chq Dgt', value: 'ORGN_CHK_DGT' },
  { text: 'ORIG Branch', value: 'ORGN_BRANCH_NAME' },
  { text: 'RCV Rout', value: 'RSPD_ROUT_NO' },
  { text: 'Chq Dgt', value: 'RSPD_CHK_DGT' },
  { text: 'Rcv Branch', value: 'RSPD_BRANCH_NAME' },
  { text: 'T C', value: 'TRANS_CODE' },
  { text: 'Amount', value: 'EFT_AMOUNT' },
  { text: 'DFI Ac No', value: 'RSPD_AC_NO' },
  { text: 'Rcvr Id', value: 'RECEIVER_ID' },
  { text: 'Id Num', value: 'IDNUMBER' },
  { text: 'Rcvr Nm', value: 'RECEIVER_NAME' },
  { text: 'Indiv Id', value: 'INDIVIDUALID' },
  { text: 'Indiv Nm', value: 'INDIVIDUAL_NAME' },
  { text: 'Rcv CompId', value: 'RECEIVINGCOMPANYID' },
  { text: 'Rcv Comp', value: 'RECEIVINGCOMPANY' },
  { text: 'Comp Id', value: 'COMPANY_ID' },
  { text: 'Comp Name', value: 'COMPANY_NAME' },
  { text: 'Comp Ent Des', value: 'COMPANY_ENTRY_DES' },
  { text: 'Comp Desc Date', value: 'COMPANY_DESC_DT' },
  { text: 'Comp Desc Data', value: 'COMPANY_DESC_DATA' }
]);
async function List_gvOutReg_Selected_Items(item) {
  objBEFTNTrnsADR.EFT_REG_SL = item.EFT_REG_SL;
  await gvOutReg_SelectedAddendaIndexChanged();
}
let isEnableAddendaInfo = ref(false);
let gvAddendaReg = ref([] as any);
async function gvOutReg_SelectedAddendaIndexChanged() {
  gvAddendaReg.value = [];
  await BEFTTransInService.TransAdrList(objBEFTNTrnsADR.EFT_REG_SL).then((res: any) => {
    gvAddendaReg.value = res.responseData;
    if (gvAddendaReg.value.length > 0) {
      isEnableAddendaInfo.value = true;
    } else {
      ErrorPopup.showErrorPopup('No Data Found! ');
      isEnableAddendaInfo.value = false;
    }
  });
}
const gvAddendaReg_headers = ref<any[]>([
  { text: 'AddSeq', value: 'ADDENDASEQNUM' },
  { text: 'Type Code', value: 'ADD_TYPE_CODE' },
  { text: 'TraceNumber', value: 'TRACENUMBER' },
  { text: 'PaymentInfo', value: 'PAYMENTINFO' },
  { text: 'Entry Dtl Seq', value: 'ENTRY_DETAIL_SEQNUM' },
  { text: 'Invoice No.', value: 'INVOICE_NUMBER' },
  { text: 'Invoice_Dt', value: 'INVOICE_DT' },
  { text: 'Inv Gross Amount', value: 'INVOICE_GROSS_AMT' },
  { text: 'Amount Paid', value: 'AMOUNT_PAID' },
  { text: 'Purchase Order', value: 'PURCHASE_ORDER' },
  { text: 'Adj. Amount', value: 'ADJUSTMENT_AMOUNT' },
  { text: 'Adj. Desc.', value: 'ADJUSTMENT_DESCRIPTION' },
  { text: 'Adj. Code', value: 'ADJUSTMENT_CODE' }
]);
let gvOutReg_selectedArr = ref<any[]>([]);
async function btnAuth_Click() {
  let Msg = ref('') as any;
  let count = 0;
  if (gvOutReg_selectedArr.value.length != 0) {
    for (let i = 0; i < gvOutReg_selectedArr.value.length; i++) {
      count++;
    }
    if (count > 0 || gvOutReg_selectedArr.value.length > 0) {
      let auth_status_id = 'U';
      await service
        .BeftTransRegOutAuthChange(gvOutReg_selectedArr.value, 'OCE', auth_status_id, objBEFTTransReg.EFFECTIVE_ENTRY_DT, 'A')
        .then((res: any) => {
          Msg.value = res.responseData;
        });
      if (Msg.value != null) {
        gvOutReg_selectedArr.value = [];
        toast.success(count + ' Saved Successfuly, Batch No.' + Msg.value);
      }
    }
    await GetData();
  } else {
    ErrorPopup.showErrorPopup('No Transaction to save !!!');
  }
}
async function btnDecline_Click() {
  let Msg = ref('') as any;
  let count = 0;
  if (gvOutReg_selectedArr.value.length != 0) {
    for (let i = 0; i < gvOutReg_selectedArr.value.length; i++) {
      if (gvOutReg_selectedArr.value != null) {
        if (gvOutReg_selectedArr.value.length > 0) {
          count++;
        }
      }
    }
    if (count > 0) {
      let auth_status_id = 'U';
      await service
        .BeftTransRegOutAuthChange(
          gvOutReg_selectedArr.value,
          'OCE',
          auth_status_id,
          dateMixin().$convertToDDMMMYYFormat(objBEFTTransReg.EFFECTIVE_ENTRY_DT),
          'E'
        )
        .then((res: any) => {
          Msg.value = res.responseData;
        });
      if (Msg.value != null) {
        gvOutReg_selectedArr.value = [];
        toast.success(count + ' Saved Successfuly, Batch No.' + Msg.value);
      }
    }
    await GetData();
  } else {
    ErrorPopup.showErrorPopup('No Transaction to Decline !!!');
  }
}
let obj_ListofTransSummary = ref<any>({
  ListOfLsTransection: {},
  vdrhoncnt: null,
  vdrhonamt: null,
  vcrhoncn: null,
  vcrhonamt: null,
  vtotcnt: null,
  vtotamt: null
}).value;



async function GetTransSummary() {
  obj_ListofTransSummary.ListOfLsTransection = [];
  await service
    .GetTransSummaryStatusChange(
      objBEFTTransReg.BRANCH_ID,
      'OCE',
      dateMixin().$convertToDDMMMYYFormat(objBEFTTransReg.EFFECTIVE_ENTRY_DT),
      0,
      'U',
      objBEFTTransReg.RECEIVER_ACC_NO,
      objBEFTTransReg.TRANS_TYPE,
      2
    )
    .then((res: any) => {
      obj_ListofTransSummary.ListOfLsTransection = res.responseData;
      obj_ListofTransSummary.vdrhoncnt = obj_ListofTransSummary.ListOfLsTransection.vdrhoncnt;
      obj_ListofTransSummary.vdrhonamt = obj_ListofTransSummary.ListOfLsTransection.vdrhonamt;
      obj_ListofTransSummary.vcrhoncn = obj_ListofTransSummary.ListOfLsTransection.vcrhoncn;
      obj_ListofTransSummary.vcrhonamt = obj_ListofTransSummary.ListOfLsTransection.vcrhonamt;
      obj_ListofTransSummary.vtotcnt = obj_ListofTransSummary.ListOfLsTransection.vtotcnt;
      obj_ListofTransSummary.vtotamt = obj_ListofTransSummary.ListOfLsTransection.vtotamt;
    });
}



//update model values
async function LsdEffectiveDateChange() {
  await BranchChangeControl();
  objBEFTTransReg.TRANS_TYPE = ListOfLsdTransType[0].value;
  objBEFTTransReg.EFT_FILEID = ListOfLsdFunctionType[0].value;
  objBEFTTransReg.RECEIVER_ACC_NO = '';
  await ClearDataFields();
}
async function BranchUpdateControl() {
  objBEFTTransReg.TRANS_TYPE = ListOfLsdTransType[0].value;
  objBEFTTransReg.EFT_FILEID = ListOfLsdFunctionType[0].value;
  objBEFTTransReg.RECEIVER_ACC_NO = '';
  await ClearDataFields();
}
async function LsdTransTypeChange() {
  objBEFTTransReg.EFT_FILEID = ListOfLsdFunctionType[0].value;
  objBEFTTransReg.RECEIVER_ACC_NO = '';
  await ClearDataFields();
}
async function LsdFunctionTypeChange() {
  objBEFTTransReg.RECEIVER_ACC_NO = '';
  await ClearDataFields();
}
async function LstxtRcvrAccNo_TextChanged() {
  objBEFTTransReg.RECEIVER_ACC_NO = commonMethods.Get_Padded_Account_No(objBEFTTransReg.RECEIVER_ACC_NO);
  await ClearDataFields();
}

let gvOutReg = ref<any[]>([]);
async function GetData() {
  gvOutReg.value = [];
  await service
    .TransOutRegStatusChgList(
      objBEFTTransReg.BRANCH_ID,
      dateMixin().$convertToDDMMMYYFormat(objBEFTTransReg.EFFECTIVE_ENTRY_DT),
      objBEFTTransReg.RECEIVER_ACC_NO,
      'OCE',
      0,
      objBEFTTransReg.TRANS_TYPE,
      'A',
      2,
      objBEFTTransReg.EFT_FILEID
    )
    .then((res: any) => {
      gvOutReg.value = res.responseData;
      if (gvOutReg.value.length > 0) {
        isEnableOutwardRegistry.value = true;
      } else {
        toast.error('No Data Found!');
        isEnableOutwardRegistry.value = false;
      }
    });
  if (gvOutReg.value.length > 0) {
    await GetTransSummary();
  }
}
let isEnableOutwardRegistry = ref(false);
async function btnView_Click() {
  await ClearDataFields();
  await GetData();
}

async function OnExit() {
  router.push('home');
}
</script>
<style scoped>
#inward-css {
  max-height: 525px !important;
}
</style>
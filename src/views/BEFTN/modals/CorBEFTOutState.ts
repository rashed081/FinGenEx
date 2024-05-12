<template>
    <div>
  <v-dialog v-model="showBEFTOutStatePopup" @click:outside="OnExit" max-width="70%" min-heght="auto">
    <v-card class="overlay"  outlined >
      <br>
    <BaseHeader
    :title="'BEFT Outward Control'"
    :is-one-button="true"
    :button1="'Exit'"
    @onExitFromChildren="OnExit()"
  />
  <v-card outlined>
      <v-card-text>
        <v-row>
          <v-col md="12" cols="12">
            <EasyDataTable
              rowsPerPage="10"
              checkboxColumnWidth="1"
              borderCell
              buttonsPagination
              tableMinHeight
              clickEventType="double"
              :headers="List_gvOutRegHeaders"
              :items="List_gvOutReg"
              >
              <template #item-operation="item">
                <div class="operation-wrapper">
                  <v-btn @click="List_gvOutReg_SelectedArr(item)">Select</v-btn>
                </div>
              </template>
            </EasyDataTable>
          </v-col>
        </v-row>
      </v-card-text>
      </v-card>
      <v-card outlined  v-if="isVisibleAddendaInfo">
      <v-card-text>
        <v-row>
          <v-col md="12" cols="12">
            <EasyDataTable
              rowsPerPage="10"
              checkboxColumnWidth="1"
              borderCell
              buttonsPagination
              tableMinHeight
              clickEventType="double"
              :headers="gvAddendaReg_headers"
              :items="List_gvAddendaReg_Items">
            </EasyDataTable> 
          </v-col>
        </v-row>
      </v-card-text>
      </v-card>
      </v-card>
    </v-dialog>
</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseHeader from '@/components/shared/BaseHeader.vue';
import Services from '@/views/BEFTN/Services/CorBEFTOutControlService';
import ErrorPopup from '@/components/shared/ErrorPopup';
import { mergeProps } from 'vue';
import { toast } from 'vue3-toastify';
import BEFTTransInService from '../Services/CorBEFTTransInService';

export default defineComponent({
    name: '',
    components: { BaseHeader, },
    props:{
        List_gvOutReg:{
            type: Array as any
        },
    },
    setup(){
        const List_gvOutRegHeaders = ref<any[]>([
            { text: 'Addenda', value: 'operation' },
            { text: 'EFT_REG_SL', value: 'EFT_REG_SL' },
            { text: 'Branch Id', value: 'BRANCH_ID' },
            { text: 'Eff. Date', value: 'EFFECTIVE_ENTRY_DT' },
            { text: 'SECC', value: 'ENTRY_CLASS_CODE' },
            { text: 'Cr/Dr', value: 'EFT_DR_CR' },
            { text: 'ORIG Ac No', value: 'ORGN_AC_NO' },
            { text: 'ORIG Rout', value: 'ORGN_ROUT_NO' },
            { text: 'Chq Dgt', value: 'ORGN_CHK_DGT' },
            { text: 'RCV Rout', value: 'RSPD_ROUT_NO' },
            { text: 'Chq Dgt', value: 'RSPD_CHK_DGT' },
            { text: 'Rcv Branch', value: 'RSPD_BRANCH_NAME' },
            { text: 'T C', value: 'TRANS_CODE' },
            { text: 'Amount', value: 'EFT_AMOUNT' },
            { text: 'DFI Ac No', value: 'RSPD_AC_NO' },
            { text: 'Rcvr Nm', value: 'RECEIVER_NAME' },
            { text: 'Indiv Nm', value: 'INDIVIDUAL_NAME' },
            { text: 'Comp Desc Data', value: 'COMPANY_DESC_DATA' },
            // { text: '', value: '' },
        ]);
        let isVisibleAddendaInfo = ref(false);
        let List_gvAddendaReg_Items = ref([]);
        async function List_gvOutReg_SelectedArr(items){
          // debugger;
          await BEFTTransInService.TransAdrList(items.EFT_REG_SL).then((res: any)=>{
            List_gvAddendaReg_Items.value = res.responseData;
            if(List_gvAddendaReg_Items.value.length <= 0)
            {
              toast.error('No Addenda Found! ');
            }
            console.log('List_gvAddendaReg_Items',List_gvAddendaReg_Items.value);
            if(List_gvAddendaReg_Items.value.length > 0)
            {
              isVisibleAddendaInfo.value = true;
            }
            else{
              // ErrorPopup.showErrorPopup('No data Found! ');
              List_gvAddendaReg_Items.value = [];
              isVisibleAddendaInfo.value = false;
            }
          })
        }
    const gvAddendaReg_headers = ref<any[]>([
      { text: 'SeqNo', value: 'ADDENDASEQNUM' },
      { text: 'TraceNumber', value: 'TRACENUMBER' },
      { text: 'PaymentInfo', value: 'PAYMENTINFO' },
      { text: 'Add Info', value: 'ADDENDAINFO' },
      { text: 'Return Reason', value: 'RETURNREASON' },
      { text: 'Inv No.', value: 'INVOICE_NUMBER' },
      { text: 'Inv Dt', value: 'INVOICE_DT' },
      { text: 'Inv Amount', value: 'INVOICE_GROSS_AMT' },
      { text: 'Amount Paid', value: 'AMOUNT_PAID' },
      { text: 'Purchase Order', value: 'PURCHASE_ORDER' },
      { text: 'DateOfDeath', value: 'DATEOFDEATH' }
    ]);
        const showBEFTOutStatePopup = ref(false);
        const showBEFTOutStateDialog = () =>{
          showBEFTOutStatePopup.value = true;
          console.log('showBEFTOutStatePopup',showBEFTOutStatePopup.value);
        }
        async function OnExit(){
          showBEFTOutStatePopup.value = false;
          List_gvAddendaReg_Items.value = [];
          isVisibleAddendaInfo.value = false;
        }
        return{
            OnExit,
            List_gvOutRegHeaders,
            List_gvOutReg_SelectedArr,
            showBEFTOutStatePopup,
            showBEFTOutStateDialog,
            List_gvAddendaReg_Items,
            gvAddendaReg_headers,
            isVisibleAddendaInfo,
            
        }
    }
})
</script>
import type BindComboInfo from '@/commonModels/BindComboInfo';
import mixin from '@/mixins/APIHandlingMixin';
import CommonService from '@/mixins/CommonService';
import { ref } from 'vue';
import type ICOR_BEFT_TRANS_REG from '../models/ICOR_BEFT_TRANS_REG';
import { toast } from 'vue3-toastify';
import { dateMixin } from '@/mixins/DateMixin';

const currFunctionNm = 'BEFT Status Change';

const apiUrl = JSON.parse(sessionStorage.getItem('apiUrlPath') as any);
const List_gvOutReg_Items = async () => {};
const List_gvAddendaReg_Items = async () => {};
function LstxtRcvrAccNoChange() {}
const GetNextEffDate = async (eff_Date, branchID) => {
  const BusinessData = {
    peffdate: eff_Date,
    pbranchid: branchID
  };
  const resData = await mixin.$postApiCall(currFunctionNm, apiUrl.CorePaymentServicesAPIPath, 'BEFTFetch/GetNextEffDate', BusinessData);
  if (resData) {
    return resData;
  }
};
const GetTransSummaryStatusChange = async (pbranchid, transType, effdate, trans_Status, AuthStatus, pac_no, peft_dr_cr, returnFlag) => {
  const BusinessData = {
    pbranchid: pbranchid,
    ptype: transType,
    peffdate: effdate,
    ptrans_status: trans_Status,
    pauth_status: AuthStatus,
    pac_no: pac_no,
    peft_dr_cr: peft_dr_cr,
    preturn_flag: returnFlag
  };
  const resData = await mixin.$postApiCall(
    currFunctionNm,
    apiUrl.CorePaymentServicesAPIPath,
    'BEFTFetch/GetTransSummaryStatusChange',
    BusinessData
  );
  if (resData) {
    return resData;
  }
};
const TransOutRegStatusChgList = async (
  pbranch_id,
  peffective_entry_dt,
  porgn_ac_no,
  ptrans_type,
  ptrans_status,
  peft_dr_cr,
  pauth_status_id,
  preturn_flag,
  pfunction_id
) => {
  const BusinessData = {
    pbranch_id: pbranch_id,
    peffective_entry_dt: peffective_entry_dt,
    porgn_ac_no: porgn_ac_no,
    ptrans_type: ptrans_type,
    ptrans_status: ptrans_status,
    peft_dr_cr: peft_dr_cr,
    pauth_status_id: pauth_status_id,
    preturn_flag: preturn_flag,
    pfunction_id: pfunction_id
  };
  const resData = await mixin.$postApiCall(
    currFunctionNm,
    apiUrl.CorePaymentServicesAPIPath,
    'BEFTFetch/TransOutRegStatusChgList',
    BusinessData
  );
  if (resData) {
    return resData;
  } else {
    toast.error('No Reg Status Change List Data Fount ');
  }
};

const BeftTransRegOutAuthChange = async (OBJ_COR_BEFT_TRANS_REG_LIST, trans_type, auth_status_id, valuedate, ACCEPT_EXCEPTION) => {
  const BusinessData = {
    OBJ_COR_BEFT_TRANS_REG_LIST: OBJ_COR_BEFT_TRANS_REG_LIST,
    trans_type: trans_type,
    auth_status_id: auth_status_id,
    valuedate: valuedate,
    ACCEPT_EXCEPTION: ACCEPT_EXCEPTION
  };
  const resData = await mixin.$postApiCall(
    currFunctionNm,
    apiUrl.CorePaymentServicesAPIPath,
    'BEFTSave/BeftTransRegOutAuthChange',
    BusinessData
  );
  if (resData) {
    return resData;
  }
};

const GetHOBranch = async (BRANCH_Service_Type) => {
  const BusinessData = {
    BRANCH_Service_Type: BRANCH_Service_Type
  };
  const listOfType: any[] = await mixin.$getApiCall(currFunctionNm, apiUrl.ConfigParameterAPIPath, 'Common/GetHOBranch', BusinessData);
  if (listOfType) {
    return listOfType;
  }
};

export default {
  List_gvAddendaReg_Items,
  List_gvOutReg_Items,
  LstxtRcvrAccNoChange,
  GetNextEffDate,
  TransOutRegStatusChgList,
  GetTransSummaryStatusChange,
  BeftTransRegOutAuthChange,
  GetHOBranch,
};

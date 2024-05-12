import { useStore } from '../store/index'
import { ref } from 'vue';
import  mixin  from '../mixins/APIHandlingMixin';
//import { APIServicePath } from '../../public/configURL';
import store from "@/store";

const APIServicePath=JSON.parse(sessionStorage.getItem("ApiUrl") as any)


const applicationInfo = JSON.parse(sessionStorage.getItem("AplicationList") as any) ||null;

export const commonMixin = () => {
    const store = useStore();
    const currFunctionNm = ref("Hold Instruction Transaction");
    function getUrl(item: any) {
        alert("dekhi ase kina")
        const data = {
            UserId: "",
            JwtToken: ""
        };


        data.UserId = store.getters.getUserId;
        data.JwtToken = store.getters.getToken;
        const requestData = {
            data: {}
        };
        requestData.data = data;
        const request = btoa(JSON.stringify(requestData));
        return item + "/" + request;

    }

    function generateAppicationList(item: any) {

        

        const permittedApplications = item;
        if (!permittedApplications) {
            return [];
        }

        const memo: any = {};

        permittedApplications.forEach((application: any) => {
            memo[application["ApplicationId"]] = true;
        });
        const commonApplications = applicationInfo.filter(
            (a: any) => a.ApplicationId,

        );

        return commonApplications;
    }

    function redirectToAnotherApp(item: any) {
        const url = getUrl(item.ApplicationUrl);
        clearSession();
        window.open(url, '_self')
    }
    function redirectToHomeApp(item: any) {
        const url = getUrl(item.url);
        clearSession();
        window.open(url, '_self')
    }

    function clearSession() {
        store
            .dispatch("resetSession")
            .then(() => {
                /* eslint-disable */
            })
            .catch(() => {
                /* eslint-disable */
            });
    }

    function preventRightClick(e: any) {
        e.preventDefault();
    }
    function number2words(inputNumber: any) {
        if (typeof inputNumber === "string" && !inputNumber)
            return "";
        const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const number = parseFloat(inputNumber).toFixed(2).split(".");
        const num = parseInt(number[0]);
        const digit = parseInt(number[1]);
        const len = num.toString().length;
        if (len > 18) return 'overflow';
        const n = ('0000000' + num).substr(-7).match(/^(\d{2})(\d{2})(\d{1})(\d{2})$/) as any;
        const d = ('00' + digit).substr(-2).match(/^(\d{2})$/) as any;
        let largeSection = '';

        if (len > 7) {
            const extractedNo = ('000000000' + (num.toString().substr(0, len - 7))).substr(-9);
            const cn = extractedNo.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/) as any;
            largeSection += (cn[1] != 0) ? (a[Number(cn[1])] || b[cn[1][0]] + ' ' + a[cn[1][1]]) + 'Crore ' : '';
            largeSection += (cn[2] != 0) ? (a[Number(cn[2])] || b[cn[2][0]] + ' ' + a[cn[2][1]]) + 'Lakh ' : '';
            largeSection += (cn[3] != 0) ? (a[Number(cn[3])] || b[cn[3][0]] + ' ' + a[cn[3][1]]) + 'Thousand ' : '';
            largeSection += (cn[4] != 0) ? (a[Number(cn[4])] || b[cn[4][0]] + ' ' + a[cn[4][1]]) + 'Hundred ' : '';
            largeSection += (cn[5] != 0) ? (a[Number(cn[5])] || b[cn[5][0]] + ' ' + a[cn[5][1]]) : '';
        }
        if (!n) return;
        let str = '';
        str += (parseInt(inputNumber) === 0) ? 'Zero Taka ' : '';
        str += (largeSection != '') ? largeSection + 'Crore ' : '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Lakh ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Thousand ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Hundred ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Taka ' : '';
        str += (d[1] != 0) ? ((str != '') ? "and " : '') + (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]) + 'Paisa ' : 'Only!';
        return str;
    }

    function Get_Padded_Number(pACCOUNT_NUMBER: any) {
        let PAccNo = "";
        if (pACCOUNT_NUMBER && pACCOUNT_NUMBER.length < 11 && pACCOUNT_NUMBER.length > 3) {
            PAccNo =
                pACCOUNT_NUMBER.substr(0, 3) +
                pACCOUNT_NUMBER.substr(3, pACCOUNT_NUMBER.length).padStart(8, "0");
        } else {
            PAccNo = pACCOUNT_NUMBER;
        }
        return PAccNo;
    }
    async function getProductId(branchId: any, accNo: any) {

        const businessData = {
            BRANCH_ID: branchId,
            AccountNo: accNo
        };

        const resData = await mixin.$getApiCall(
            currFunctionNm,
            APIServicePath.ConfigParameterAPIPath,
            "Common/GetAccProductId",
            businessData
        );

        return resData;
    }
    async function getApplicationType(productId: any) {
        const businessData = {
            pPRODUCT_ID: productId
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Config",
            "/Common/GetApplicationType",
            businessData
        );
        return resData;
    }
    async function GetTransAmtList() {
        const businessData = {
            PRODUCT_ID: ""
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Config",
            "/Common/GetTransAmountList",
            businessData
        );
        return resData;
    }
    async function getExchangeRateDDL() {
        const businessData = {
            NAME_VALUE_LIST: "1",
            EXCHG_RATE_ID: "",
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Config",
            "/Common/GetExchangeRateCategoryList",
            businessData
        );
        return resData;
    }
    async function glValidAccountCheck(branchId: any, GLAccountNo: any, GLSLNo: any, allowIBTA: any) {
        const businessData = {
            BRANCH_ID: branchId,
            GL_ACC_SL: GLSLNo,
            GL_ACC_NO: GLAccountNo,
            ALLOW_GLTYPE: "ALIE",
            ALLOW_IBTA: allowIBTA,
            ALLOW_SUNDSUS: null,
            ALLOW_FORGNCURR: null,
            AllOW_OFFBS: null,
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "GL",
            "/CommonGL/ValidGLAccount1",
            businessData
        );
        if (resData) {
            if (resData.ERROR_MSG) {
                //$root.$snackbar.seterrortext(resData.ERROR_MSG);
                return 0;
            } else if (resData.Valid_Acc == "1") {
                return 1;
            } else {
                //$root.$snackbar.seterrortext("GL Account is not valid");
                return 0;
            }
        }
    }
    async function getBusRuleConfig(busRuleId: any) {
        const businessData = {
            BUS_RULE_ID: busRuleId
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Config",
            "Common/GetBusRuleConfig",
            businessData
        );
        return resData;
    }
    async function isValidClientAccount(branchId: any, accNo: any, drCr = "D") {
        const businessData = {
            BRANCH_ID: branchId,
            ACCNO: accNo,
            DR_CR: drCr
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Config",
            "/Common/ValidClientAccount",
            businessData
        );
        return resData;
    }
    async function getCorCusProfile(customerId: any, userId: any, queueId: any) {
        const businessData = {
            CUSTOMER_ID: customerId,
            QUEUE_ID: queueId,
            USER_ID: userId
        };
        const resData = await mixin.$getApiCall(
            currFunctionNm,
            "Customer",
            "/CorCusProfileFetch/GetCorCusProfile",
            businessData
        );
        return resData;
    }
    return {
        generateAppicationList,
        getUrl,
        clearSession, getApplicationType,
        redirectToAnotherApp,
        preventRightClick, number2words,
        redirectToHomeApp, GetTransAmtList,
        getProductId, isValidClientAccount, glValidAccountCheck,
        Get_Padded_Number, getExchangeRateDDL, getCorCusProfile, getBusRuleConfig
    }
};

import mixin from '@/mixins/APIHandlingMixin';


const currFunctionNm = 'BEFT Status Change';
const apiUrl = JSON.parse(sessionStorage.getItem('apiUrlPath') as any);

const InsertCustomerData = async (customerInfoHandler) => {
    //const BusinessData = {customerInfoHandler:customerInfoHandler};
    const resData = await mixin.$postApiCall(
      currFunctionNm,
      apiUrl.CoreLoanAPIPath,
      'CustomerInfo/CustomerInfoPost',
      customerInfoHandler
    );
    if (resData) {
      return resData;
    }
  };

  const InsertIntroducerData = async (introducerInfoHandler) => {
    //const BusinessData = {customerInfoHandler:customerInfoHandler};
    const resData = await mixin.$postApiCall(
      currFunctionNm,
      apiUrl.CoreLoanAPIPath,
      'CustomerInfo/IntroducerInfoPost',
      introducerInfoHandler
    );
    if (resData) {
      return resData;
    }
  };

const GetCustomerByID = async (p_customer_id : any)=>{
    const BusinessData = {
      customer_id: p_customer_id
    };
    const responseObj: any = await mixin.$getApiCall(
      currFunctionNm, 
      apiUrl.CoreLoanAPIPath, 
      'CustomerInfo/GetCustomerInfoByID', 
      BusinessData);
    if (responseObj) {
      return responseObj;
    }
  }

  export default{
    InsertCustomerData,
    GetCustomerByID,
    InsertIntroducerData
  };
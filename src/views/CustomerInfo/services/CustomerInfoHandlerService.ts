import mixin from '@/mixins/APIHandlingMixin';


const currFunctionNm = 'BEFT Status Change';
const apiUrl = JSON.parse(sessionStorage.getItem('apiUrlPath') as any);

const InsertCustomerData = async (customerInfoHandler) => {
    //const BusinessData = {customerInfoHandler:customerInfoHandler};
    const resData = await mixin.$postApiCall(
      currFunctionNm,
      apiUrl.CoreLoanAPIPath,
      'CustomerInfo/PostCustomerInfo',
      customerInfoHandler
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
};

const GetCountries = async () => {
    const responseObj: any = await mixin.$getApiCall(
      currFunctionNm, 
      apiUrl.CoreLoanAPIPath, 
      'CustomerInfo/GetALlCountries', 
      {}
    );
    if (responseObj) {
      return responseObj;
    }
};

const GetDivisions = async (p_country_id:any) => {
  const BusinessData = {
    country_id: p_country_id
  };
  const responseObj: any = await mixin.$getApiCall(
    currFunctionNm, 
    apiUrl.CoreLoanAPIPath, 
    'CustomerInfo/GetDivisions', 
    BusinessData
  );
  if (responseObj) {
    return responseObj;
  }
};

const GetDistricts = async (p_division_id:any) => {
  const BusinessData = {
    division_id: p_division_id
  };
  const responseObj: any = await mixin.$getApiCall(
    currFunctionNm, 
    apiUrl.CoreLoanAPIPath, 
    'CustomerInfo/GetDistricts', 
    BusinessData
  );
  if (responseObj) {
    return responseObj;
  }
};

const GetThanas = async (p_district_id:any) => {
  const BusinessData = {
    district_id: p_district_id
  };
  const responseObj: any = await mixin.$getApiCall(
    currFunctionNm, 
    apiUrl.CoreLoanAPIPath, 
    'CustomerInfo/GetThanas', 
    BusinessData
  );
  if (responseObj) {
    return responseObj;
  }
};
 

export default{
    InsertCustomerData,
    GetCustomerByID,
    GetCountries,
    GetDivisions,
    GetDistricts,
    GetThanas
  };
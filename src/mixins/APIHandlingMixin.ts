import { toast } from 'vue3-toastify';
//import { GatewayURL } from "@/../public/configURL";
import axios from 'axios';
import { computed, ref } from 'vue';
import { useStore } from '../store/index';
import {useProgress} from '@marcoschulte/vue3-progress';


const GatewayURL=JSON.parse(sessionStorage.getItem("apiUrlPath") as any) || null

//const GatewayURL=(JSON.parse(sessionStorage.getItem("ApiUrl") as any)).GatewayURL.CoreAPIGatewatyURL

// export const mixin = () => {
    const store = useStore()
    //const getApiBodyData = computed(() => store.getters.getApiBodyData());
    let reqBodyCommon = ({
        BusinessData: {}
    })

    const returnPostResult = ({
        status: false,
        message: "",
        responseData: null
    })

    const reuseData = ref("Test for mixin")
    function reuseMethod() {
        let count = 0;
        count++;
        return count;
    }

    function $postConfig(requestpath: any, serviceConfig: any) {
        requestpath = "Url path"
        const config = serviceConfig.URL + serviceConfig.ServicePath + requestpath;
        return config;
    }


    function $getApiCallConfig(requestData: any, apiName: any) {

        const requestString = JSON.stringify(requestData.data);
        //const token = computed(() => store.getters.getToken()).value;
        const token = store.getters.getToken;
        const config = {
            method: requestData.method,
            //url: GatewayURL.CoreAPIGatewatyURL + APIServicePath[apiName] + requestData.path,
            url: GatewayURL.GatewayURL.CoreAPIGatewatyURL + apiName + requestData.path,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            },
            params: {
                requestString: btoa(requestString),
            },
        };
        return config;
    }

    function $postApiCallConfig(requestData: any, apiName: any) {
        const token = computed(() => store.getters.getToken).value;
        ;
        const config = {
            method: requestData.method,
            url: GatewayURL.GatewayURL.CoreAPIGatewatyURL + apiName + requestData.path,
            // url: GatewayURL.CoreAPIGatewatyURL + APIServicePath[apiName] + requestData.path,
            data: requestData.data,
            headers: {

                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            },
        };
        return config;
    }


    function $getApiCall(functionName: any, apiName: string | number, apiPath: any, businessData: any, isNullResultExpected = false, showErrorSnackbar = true) {

        reqBodyCommon = computed(() => store.getters.getApiBodyData(functionName)).value;
        reqBodyCommon.BusinessData = businessData;
        const parameter = {
            path: apiPath,
            method: "get",
            data: reqBodyCommon,
        };
        const config = $getApiCallConfig(parameter, apiName);
        //const progress=useProgress().start();
        return axios(config)
            .then((response) => {
                if ("responseStatus" in response.data) {
                    if (!response.data.responseStatus) {

                        if (response.data.responseMessage) {
                            toast.error(response.data.responseMessage);
                        }


                        else {
                            toast.error("Error occurred in API");
                        }
                        //progress.finish();
                        
                        return null;
                    } else {
                        const responseData = JSON.parse(response.data.responseBusinessData);
                        if (responseData !== 0 && (!responseData || responseData === null || responseData.length === 0)) {
                            if (!isNullResultExpected) {
                                //this.$root.$snackbar.seterrortext("No data found", showErrorSnackbar);
                                toast.error("No data found");
                                //progress.finish();
                            }
                            return null;
                        } else {
                          //progress.finish();
                            return responseData;
                        }
                    }
                } else {
                    if (!response.data.ResponseStatus) {
                        if (response.data.ResponseMessage)
                        toast.error("No data found")
                           
                        // this.$root.$snackbar.seterrortext(response.data.ResponseMessage, showErrorSnackbar);
                        else
                            //this.$root.$snackbar.seterrortext("Error occurred in API", showErrorSnackbar);
                            //this.$Progress.fail();
                            return null;
                    } else {
                        const responseData = JSON.parse(response.data.ResponseBusinessData);
                        if (responseData !== 0 && (!responseData || responseData === null || responseData.length === 0)) {
                            if (!isNullResultExpected) {
                                //this.$root.$snackbar.seterrortext("No data found", showErrorSnackbar);
                                //this.$Progress.fail();
                            }
                            return null;
                        } else {
                            //this.$Progress.finish();
                            return responseData;
                        }
                    }
                }
            })
            .catch((e) => {
                if ("response" in e) {
                    if ("responseMessage" in e.response.data)
                    toast.error("No data found")
                    // this.$root.$snackbar.seterrortext(e.response.data.responseMessage, showErrorSnackbar);
                    else
                    toast.error("No data found")
                    //this.$root.$snackbar.seterrortext(e.response.data.ResponseMessage, showErrorSnackbar);
                } else
                    //this.$root.$snackbar.seterrortext(e, showErrorSnackbar);
                    //this.$Progress.fail();
                    return null;
            });
    }



    //newly api calling process only post api

    function $getApiCalling(functionName: any, apiName: string | number, apiPath: any, businessData: any, isNullResultExpected = false, showErrorSnackbar = true) {

        //reqBodyCommon = computed(() => store.getters.getApiBodyData(functionName)).value;
        ;
        reqBodyCommon =  store.getters.getApiBodyData(functionName);
        reqBodyCommon.BusinessData = businessData;
        const parameter = {
            path: apiPath,
            method: "POST",
            data: reqBodyCommon,
        };
        const config = $getApiCallConfig(parameter, apiName);
        //this.$Progress.start();
        return axios(config)
            .then((response) => {
                if ("responseStatus" in response.data) {
                    if (!response.data.responseStatus) {

                        if (response.data.responseMessage)
                            console.log("error massage");
                        //this.$root.$snackbar.seterrortext(response.data.responseMessage, showErrorSnackbar);
                        else
                            // this.$root.$snackbar.seterrortext("Error occurred in API", showErrorSnackbar);
                            //this.$Progress.fail();
                            return null;
                    } else {
                        const responseData = JSON.parse(response.data.responseBusinessData);
                        if (responseData !== 0 && (!responseData || responseData === null || responseData.length === 0)) {
                            if (!isNullResultExpected) {
                                //this.$root.$snackbar.seterrortext("No data found", showErrorSnackbar);
                                //this.$Progress.fail();
                            }
                            return null;
                        } else {
                            //this.$Progress.finish();
                            return responseData;
                        }
                    }
                } else {
                    if (!response.data.ResponseStatus) {
                        if (response.data.ResponseMessage)
                        toast.error("No data found");
                        // this.$root.$snackbar.seterrortext(response.data.ResponseMessage, showErrorSnackbar);
                        else
                            //this.$root.$snackbar.seterrortext("Error occurred in API", showErrorSnackbar);
                            //this.$Progress.fail();
                            return null;
                    } else {
                        const responseData = JSON.parse(response.data.ResponseBusinessData);
                        if (responseData !== 0 && (!responseData || responseData === null || responseData.length === 0)) {
                            if (!isNullResultExpected) {
                                //this.$root.$snackbar.seterrortext("No data found", showErrorSnackbar);
                                //this.$Progress.fail();
                            }
                            return null;
                        } else {
                            //this.$Progress.finish();
                            return responseData;
                        }
                    }
                }
            })
            .catch((e) => {
                if ("response" in e) {
                    if ("responseMessage" in e.response.data)
                    toast.error("No data found");
                    // this.$root.$snackbar.seterrortext(e.response.data.responseMessage, showErrorSnackbar);
                    else
                    toast.error("No data found");
                    //this.$root.$snackbar.seterrortext(e.response.data.ResponseMessage, showErrorSnackbar);
                } else
                    //this.$root.$snackbar.seterrortext(e, showErrorSnackbar);
                    //this.$Progress.fail();
                    return null;
            });
    }

    //end




    function $postApiCall(functionName: any, apiName: any, apiPath: any, businessData: any) {
        reqBodyCommon = computed(() => store.getters.getApiBodyData(functionName)).value;
        reqBodyCommon.BusinessData = businessData;


        const parameter = {
            path: apiPath,
            method: "POST",
            data: reqBodyCommon,
        };

        const config = $postApiCallConfig(parameter, apiName);

        //this.$Progress.start();
        return axios(config)
       
            .then((response) => {
                const returnMsg = response.data;
                if (returnMsg === null || returnMsg.length === 0) {
                    //this.$root.$snackbar.seterrortext("No response returned");
                    returnPostResult.status = false;
                    //this.$Progress.fail();
                    return returnPostResult;
                } else {
                    if ("responseStatus" in response.data) {
                        if (returnMsg.responseStatus) {
                            //this.$root.$snackbar.setsuccesstext(returnMsg.responseMessage);
                            returnPostResult.status = true;
                            returnPostResult.message = returnMsg.responseMessage;
                            returnPostResult.responseData = JSON.parse(returnMsg.responseBusinessData);
                            //this.$Progress.finish();
                            return returnPostResult;
                        } else {
                            //this.$root.$snackbar.seterrortext(returnMsg.responseMessage);
                            returnPostResult.status = false;
                            returnPostResult.message = returnMsg.responseMessage;
                            //this.$Progress.fail();
                            return returnPostResult;
                        }
                    } else {
                        if (returnMsg.ResponseStatus) {
                            //this.$root.$snackbar.setsuccesstext(returnMsg.ResponseMessage);
                            returnPostResult.status = true;
                            returnPostResult.message = returnMsg.ResponseMessage;
                            returnPostResult.responseData = JSON.parse(returnMsg.ResponseBusinessData);
                            //this.$Progress.finish();
                            return returnPostResult;
                        } else {
                            //this.$root.$snackbar.seterrortext(returnMsg.ResponseMessage);
                            returnPostResult.status = false;
                            returnPostResult.message = returnMsg.ResponseMessage;
                            //this.$Progress.fail();
                            return returnPostResult;
                        }
                    }
                }
            })
            .catch((e) => {
                if ("response" in e) {
                    if ("responseMessage" in e.response.data) {
                        //this.$root.$snackbar.seterrortext(e.response.data.responseMessage);
                        returnPostResult.message = e.response.data.responseMessage;
                    } else {
                        //this.$root.$snackbar.seterrortext(e.response.data.ResponseMessage);
                        returnPostResult.message = e.response.data.ResponseMessage;
                    }
                } else {
                    //this.$root.$snackbar.seterrortext(e);
                    returnPostResult.message = e;
                }
                returnPostResult.status = false;
                //this.$Progress.fail();
                return returnPostResult;
            });
    }


   

export default {
    $postConfig,

    $getApiCallConfig,
    $postApiCallConfig,
  
    $postApiCall,
  
    $getApiCall,
    $getApiCalling

}


















import type { GetterTree } from 'vuex' // we use mapGratter as alternative to GettersTree
import type { State } from './state'


export type Getters={
    isLoggedIn(state:State):any
    getInstituteType(state:State):any;
    getToken(state:State):any;
    getFunctionID(state:State):any;
    getApiBodyData(state:State,getters:Getters):any;
    getUserAccessData(state:State):void;
    getUserId(state:State):any;
    getUserAppList(state:State):any;
    getTransDate(state:State):any;
    getBranchID(state:State):any;
    getBranchName(state:State):any;
    getBranchServiceType(state:State):any;

    apiName(state:State):any

}

export const getters:GetterTree<State,State> & Getters={
    isLoggedIn(state){
        return state.access_token !== null && state.access_token !== "null" && getters.getUserId;
    },
    getInstituteType(state){
        return state.general_Info.InstituteType;
    },
 
    getToken(state){
        return state.access_token;
    },

    getApiBodyData:(state, getters) => (functionName:any) => {
        
        const apiBodyData = {
            "UserId": state.logIn_Info.UserId,
            "BranchId": state.logIn_User_Info.HOME_BRANCH_ID,
            "FunctionId": getters.getFunctionID(functionName),
            "BusinessData": {},
            "RequestId": "",
            "RequestCliedIP": "",
            "RequestCliedAgent": "",
            "RequestAppIP": "",
            "RequestAppBaseUrl": "",
            "InstitueId": "",
            "SessionId": "",
            "RequestDateTime": "",
            "SessionTimeout": 0
        };
        return apiBodyData;
    },
    
    getFunctionID: (state) => (functionName:any) => {
        const filteredFunctions:any = state.user_Access_Info.filter(function(funcData:any) {
            return funcData.FunctionName == functionName;
        });
    
        return filteredFunctions[0].FunctionId;
    },

    getUserAccessData:(state)=> {
        const userAccData=JSON.stringify(state.user_Access_Info);
        return userAccData;
    },
    getUserId(state) {
        if (!state.logIn_Info)
            return null;
        return state.logIn_Info.UserId;
    },
    getUserAppList(state) {
        const userApp = state.user_app_access;
        return userApp;
    },
    getTransDate(state) {
        const transdt = state.logIn_Info.TransDate.split('T');
        const revTransdt = transdt[0].split('-').reverse().join('-').replaceAll("-", "/");
        return revTransdt;
    },
    getBranchID(state) {
        return state.logIn_User_Info.HOME_BRANCH_ID;
    },
    getBranchName(state) {
        return state.logIn_User_Info.HOME_BRANCH_NM;
    },
    getBranchServiceType(state) {
        return state.logIn_User_Info.BRANCH_SERVICE_TYPE;
    },
    apiName(state){
        return state.apiUrlPath
    }
    
}
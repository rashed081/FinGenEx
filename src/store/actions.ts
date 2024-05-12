import type { ActionContext, ActionTree } from 'vuex'
import type { Mutations } from './mutations'
import { state, State } from './state'
import axios from "axios";
import { LoginData } from "../../public/loginConfig";
import { GatewayURL, CoreSecurityAPI } from "../../public/configURL";
import type { ILoginInfo } from "../commonModels/ILoginfo"



//let LoginData =JSON.parse(sessionStorage.getItem("LoginData") as any)


const LoginBusinessData = {
    UserId: null,
    Password: null,
    Application: LoginData.APPLICATION_ID,
};

const LoginBody = {
    //port: CoreSecurityAPI.PORT,
    path: CoreSecurityAPI.LOGIN_PATH,
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    data: {
        requestId: null,
        requestCliedIP: LoginData.LOCAL_IP,
        requestCliedAgent: null,
        requestAppIP: LoginData.LOCAL_IP,
        requestAppBaseUrl: null,
        BusinessData: "",
        functionId: null,
        branchId: null,
        userId: null,
        institueId: null,
        sessionId: null,
        requestDateTime: null,
        sessionTimeout: 0,
    },
};



type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    LogIn(LoginInfo: ILoginInfo, credentials: any): any,
    resetSession(context: ActionAugments): any,
    setStateFromModuleWiseData(context: ActionAugments, apiResponse: any): any
    setStateFromLogInData(context: ActionAugments, apiResponse: any): any,
    CreateMenuByID(LoginInfo: ILoginInfo, state: State): any,


}

export const actions: ActionTree<State, State> & Actions = {

    LogIn(loginfo: any, credentials) {
        //console.log("credentials from log in page: action:",credentials)

        // creating login body
        LoginBusinessData.UserId = credentials.userid;
        LoginBusinessData.Password = credentials.password;
        //console.log("LoginBusinessData.UserId",LoginBusinessData.UserId)
        LoginBody.data.BusinessData = JSON.stringify(LoginBusinessData);
        const requestPath = GatewayURL.CoreAPIGatewatyURL + CoreSecurityAPI.ServicePath + LoginBody.path;
        // make axios call
        return new Promise((resolve, reject) => {
            axios
                .post(requestPath, LoginBody.data)
                .then((response) => {
                    if (response.data.ResponseStatus === false) {
                        reject(response);
                    } else {
                        loginfo.dispatch('setStateFromLogInData', response).then(() => {
                            resolve(response);
                        })
                    }
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    Logout({ dispatch }) {
        return new Promise((resolve, reject) => {
            const LogoutBody = {
                port: CoreSecurityAPI.PORT,
                path: CoreSecurityAPI.LOGOUT_PATH,
                method: "POST",
                data: {
                    RequestAppIP: LoginData.LOCAL_IP,
                    RequestCliedIP: LoginData.LOCAL_IP,
                    SessionTimeout: "1",
                    SessionId: "199",
                    BusinessData: JSON.stringify({
                        UserId: state.logIn_Info.UserId,
                        AccessToken: state.access_token,
                    }),
                },
            };
            const requestPath =
                GatewayURL.CoreAPIGatewatyURL + CoreSecurityAPI.ServicePath + LogoutBody.path;

            axios
                .post(requestPath, LogoutBody.data, {
                    headers: {
                        "Authorization": `Bearer ${state.access_token}`
                    },
                })
                .then((response) => {
                    dispatch('resetSession').then(() => {
                        resolve(response);
                    })
                })
                .catch(function () {
                    dispatch('resetSession').then((response) => {
                        reject(response);
                    })
                });
        });
    },

    resetSession(context) {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("logIn_Info");
        sessionStorage.removeItem("logIn_User_Info");
        sessionStorage.removeItem("user_Access_Info");
        sessionStorage.removeItem("general_Info");
        sessionStorage.removeItem("userApp_Access");
        sessionStorage.removeItem("ApiUrl");
        sessionStorage.removeItem("AplicationList");
        sessionStorage.removeItem("RoutingPage")
        context.commit("setToken", null);
        context.commit("setLogInBaseData", null);
        context.commit("setLoginUserData", null);
        context.commit("setUserAccessData", null);
        context.commit("setGeneralData", null);
        context.commit("setUserAppAccess", null);
    },
    setStateFromModuleWiseData(context, apiResponse) {
    
        const actualData = JSON.parse(apiResponse.data.ResponseBusinessData);
        const logInUser = actualData.LogInUserModuleWise;
        const functionAccess = logInUser.UserFunctionAccess;
        const userAppAccess = logInUser.UserApplicationAccess;
        sessionStorage.setItem("logIn_User_Info", JSON.stringify(logInUser));
        sessionStorage.setItem("user_Access_Info", JSON.stringify(functionAccess));
        sessionStorage.setItem("general_Info", JSON.stringify(actualData));
        sessionStorage.setItem("logIn_Info", JSON.stringify(actualData.LoginUser));
        sessionStorage.setItem("userApp_Access", JSON.stringify(userAppAccess));
        //sessionStorage.setItem("RoutingPage", JSON.stringify(functionAccess));

   
        context.commit("setLogInBaseData", actualData.LoginUser);
        context.commit("setLoginUserData", logInUser);
        context.commit("setUserAccessData", functionAccess);
        context.commit("setGeneralData", actualData);
        context.commit("setUserAppAccess", userAppAccess);



    },
    setStateFromLogInData(context, apiResponse) {
        const actualData = apiResponse.data;
        sessionStorage.setItem("access_token", actualData.JwtToken);
        context.commit("setToken", actualData.JwtToken);
    },
    async CreateMenuByID(loginfo: any, userid) {

        const get_menu_by_id_body = {
            path: "Security/GetUserAccessAfterLogin",
            method: "POST",
            data: {
                businessData: {
                    UserId: userid,
                    ModuleId: LoginData.MODULE_ID,
                    ApplicationId: LoginData.APPLICATION_ID,
                },
            },
        };

        const requestPath =
            GatewayURL.CoreAPIGatewatyURL + CoreSecurityAPI.ServicePath + get_menu_by_id_body.path;
        // make axios call
        return new Promise((resolve, reject) => {
            axios
                .post(requestPath, get_menu_by_id_body.data, {
                    headers: {
                        "Authorization": `Bearer ${state.access_token}`
                    },
                })
                .then((response) => {

                    if (response.data.ResponseStatus === false) {
                        return reject(response);
                    } else {


                        loginfo.dispatch('setStateFromModuleWiseData', response).then(() => {

                            return resolve(response);
                        })
                    }
                })
                .catch(function (error) {
                    return reject(error);
                });
        });
    },

}

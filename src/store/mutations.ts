import type { State } from "./state";
import type { MutationTree } from 'vuex'


export type Mutations = {
    setToken(state: State, access_token: any): any,
    setLogInBaseData(state: State, logIn_Info: any): any,
    setLoginUserData(state: State, logInUserInfo: any): any,
    setUserAccessData(state: State, userAccessInfo: any): any,
    setGeneralData(state: State, generalInfo: any): any,
    setUserAppAccess(state: State, user_App_Access: any): any;
   
    
}

export const mutations: MutationTree<State> & Mutations = {

    setToken(state, access_token) {
        state.access_token = access_token;
    },
    setLogInBaseData(state, logIn_Info) {
        state.logIn_Info = logIn_Info;
    },
    setLoginUserData(state, logInUserInfo) {
        state.logIn_User_Info = logInUserInfo;
    },
    setUserAccessData(state, userAccessInfo) {
        state.user_Access_Info = userAccessInfo;
    },
    setGeneralData(state, generalInfo) {
        state.general_Info = generalInfo;
    },
    setUserAppAccess(state, user_App_Access) {
        state.user_app_access = user_App_Access;
    }

}
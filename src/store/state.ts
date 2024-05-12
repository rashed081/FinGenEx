




export class State {
    access_token: any;
    logIn_User_Info: any;
    user_Access_Info: any;
    general_Info: any;
    logIn_Info: any;
    user_app_access: any;
    apiUrlPath:any;
    ApplicationInfo:any;
    FastPath:string | undefined ;
    RoutingPath:any;

}
export const state: State = { 
    access_token: sessionStorage.getItem("access_token") || null,
    logIn_User_Info: JSON.parse(sessionStorage.getItem("logIn_User_Info") as any) ||null,
    user_Access_Info: JSON.parse(sessionStorage.getItem("user_Access_Info") as any) || null,
    general_Info: JSON.parse(sessionStorage.getItem("general_Info")as any) ||null,
    logIn_Info: JSON.parse(sessionStorage.getItem("logIn_Info")as any) ||null,
    user_app_access: JSON.parse(sessionStorage.getItem("userApp_Access") as any) ||null,
    apiUrlPath:JSON.parse(sessionStorage.getItem("ApiUrl") as any) ||null,
    ApplicationInfo:JSON.parse(sessionStorage.getItem("AplicationList") as any) ||null,
    FastPath:JSON.parse(sessionStorage.getItem("FastPath") as string) ||null,
    RoutingPath:JSON.parse(sessionStorage.getItem("RoutingPage") as any) ||null,
  
 };


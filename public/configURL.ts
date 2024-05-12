const GatewayURL = {
  CoreAPIGatewatyURL: "http://localhost/CoreAPIGateWay/",
};

const APIServicePath = {
  CoreGLAPIPath: "GL/CoreGeneralLedgerAPI/",
  ConfigParameterAPIPath: "ConfigParameter/CoreConfigParameterAPI/",
  CoreSecurityAPIPath: "Security/CoreSecurityAPI/",
  CoreCustomerAPIPath: "Customer/CoreCustomerAPI/",  
  CoreAuthorizationAPIPath: "Authorization/CoreAuthorizationAPI/",
  CoreDepositAPIPath: "Deposit/CoreDepositAPI/",
  CoreTransactionAPIPath: "Transaction/CoreTransactionAPI/",
  CoreRemittanceAPIPath: "Remittance/CoreRemittanceAPI/",
  CoreInstructionAPIPath: "Instruction/CoreInstructionAPI/",
};




const CoreSecurityAPI = {
  PORT: null,
  LOGIN_PATH: "Security/DoLogin",
  LOGOUT_PATH: "Security/DoLogout",
  ServicePath: APIServicePath.CoreSecurityAPIPath,

};

//ServicePath.CoreRemittancePath,  ///Remittance/CoreRemittanceAPI

const HomeApplication = {
  url: "http://localhost:8081/home"
}
const CurrentApplication = {
 url: "http://localhost:8084/home"
}
const HomeLoginPath = {
  url: "http://localhost:8081/login"
};
export {
  GatewayURL,
  APIServicePath,
  CoreSecurityAPI,
  HomeApplication,
  CurrentApplication,
  HomeLoginPath
};
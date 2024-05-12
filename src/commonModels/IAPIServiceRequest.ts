export default interface APIServiceRequest {
    
        requestId?:string;
        requestCliedIP?: string;
        requestCliedAgent?:string;
        requestAppIP?:string;
        requestAppBaseUrl?:string;
        businessData?:string;
        functionId?:string;
        branchId?:string;
        userId?:string;
        institueId?:string;
        sessionId?:string;
        requestDateTime?:string;
        sessionTimeout?: number;
      
}
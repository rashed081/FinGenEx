import type BindComboParamList from "@/commonModels/BindComboParamList";
import { ref } from "vue";

function BindComboParam(ParamName:string,ParamDataType:string,ParamValue:string,ParamDirection:number)
{
    let objBindComboParam = ref<BindComboParamList>({ 
        ParamName : ParamName,
        ParamDataType : ParamDataType,
        ParamValue : ParamValue,
        ParamDirection : ParamDirection
        }).value;
        return objBindComboParam;
}

export default {
    BindComboParam
}

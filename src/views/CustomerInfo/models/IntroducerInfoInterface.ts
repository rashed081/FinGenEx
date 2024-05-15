import type ModelBase from "@/commonModels/ModelBase";

export default interface IntroducerInfoInterface extends ModelBase{
    INTRO_TYPE?: String;
    INTRO_EMPLOYEE_ID?: String;
    INTRO_PA_NO?: String;
    INTRO_ACCOUNT_BRANCH?: String;
    INTRO_ACCOUNT_NUMBER?: String;
    INTRO_DETAILS?: String;
    INTRO_ID?:String;
}
import type ModelBase from "@/commonModels/ModelBase";

export default interface CustomerInfoInterface extends ModelBase{
    CUSTOMER_ID? : Number;
    CUSTOMER_NAME?: String;
    MOTHER_NAME?: String;
    FATHER_NAME?: String;
    SPOUSE_NAME?: String;
    GENDER?:String;
    NID?:String;
    MARITAL_ST?:String;
    DATE_OF_BIRTH?:String;
    // New Field for Introducer
    INTRODUCER_TYPE?: String;
    INTRODUCER_EMPLOYEE_ID?: String;
    INTRODUCER_PA_NO?: String;
    INTRODUCER_ACC_BRANCH?: String;
    INTRODUCER_ACC_NO?: String;
    INTRODUCER_DETAILS?: String;
    // New field for Address List
    ADDRESS_TYPE?: String;
    ADDRESS_DETAILS?: String;
    CITY?:String;
    ZIP_CODE?:String;
    COUNTRY?:String;
    DIVISION?:String;
    DISTRICT?:String;
    THANA?:String;
    PHONE_NO?:String;
    MOBILE_NO?:String;
    EMAIL?:String;
}
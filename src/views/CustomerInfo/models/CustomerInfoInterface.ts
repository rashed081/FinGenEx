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
}
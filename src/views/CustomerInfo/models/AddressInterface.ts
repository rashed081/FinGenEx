import type ModelBase from "@/commonModels/ModelBase";

export default interface AddressInterface extends ModelBase{
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
import type ModelBase from "@/commonModels/ModelBase";

export default interface AddressInterface extends ModelBase{
    ADDRESS_TYPE_ID?: String;
    ADDRESS_TYPE_NM?:String;
    ADDRESS_DETAILS?: String;
    CITY?:String;
    ZIP_CODE?:String;
    COUNTRY_ID?:String;
    COUNTRY_NM?:String;
    DIVISION_ID?:String;
    DIVISION_NM?:String;
    DISTRICT_ID?:String;
    DISTRICT_NM?:String;
    THANA_ID?:String;
    THANA_NM?:String;
    PHONE_NO?:String;
    MOBILE_NO?:String;
    EMAIL?:String;
}
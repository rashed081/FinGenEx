import type ModelBase from "@/commonModels/ModelBase";
import type IntroducerInfoInterface from "./IntroducerInfoInterface";
import type AddressInterface from "./AddressInterface";

export default interface CustomerInfoInterface extends ModelBase{
    CUSTOMER_ID? : String;
    CUSTOMER_NID?:String;
    CUSTOMER_NAME?: String;
    MOTHERS_NAME?: String;
    FATHERS_NAME?: String;
    SPOUSE_NAME?: String;
    GENDER?:String;
    DATE_OF_BIRTH?:String;
    MARITAL_ST?:String;
    INTRODUCER?: IntroducerInfoInterface;
    ADDRESSES?: AddressInterface[];
}
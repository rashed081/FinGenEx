export default interface ModelBase{
      CloneObj?:String;
      isAdd?:boolean;
      isDelete?:boolean;
      isOld?:boolean;
      CreateByLoginId?:String;
      MakeByLoginId?:String;
      AuthByLoginId?:String;
      IsRequestSuccess ?: false;
      ERROR_CODE?:String;
      ERROR_MSG?:String;
      ROW_ID?:String;
      NFT_LOG_MSG?:String;
}
using Leadsoft.Utilities.CommonState;
namespace CorLoan.BLL.DTOs
{
    public class Address_DTO:ModelBase<Address_DTO>
    {

        public string? ADDRESS_ID { get; set; }
        public string? ADDRESS_TYPE_NM { get; set; }

        public string? ADDRESS_TYPE_ID { get; set; }
        public string? ADDRESS_DETAILS { get; set; }
        public string? CITY { get; set; }
        public string? ZIP_CODE { get; set; }
        public string? PHONE_NO { get; set; }
        public string? MOBILE_NO { get; set; }
        public string? EMAIL { get; set; }
        public string? CUSTOMER_ID { get; set; }
        public string? COUNTRY_ID { get; set; }
        public string? DISTRICT_ID { get; set; }
        public string? DIVISION_ID { get; set; }
        public string? THANA_ID { get; set; }
    }
}

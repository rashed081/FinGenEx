using CorLoan.DAL.Entities;
using Leadsoft.Utilities.CommonState;
namespace CorLoan.BLL.DTOs
{
    public class CustomerInfo_DTO : ModelBase<CustomerInfo_DTO>
    {
        public string? CUSTOMER_ID { get; set; }
        public string? CUSTOMER_NID { get; set; }
        public string? CUSTOMER_NAME { get; set; }
        public string? FATHERS_NAME { get; set; }
        public string? MOTHERS_NAME { get; set; }
        public string? SPOUSE_NAME { get; set; }
        public string? GENDER { get; set; }
        public string? DATE_OF_BIRTH { get; set; }
        public string? MARITAL_ST { get; set; }
        public Introducer INTRODUCER { get; set; }
        public Address[] ADDRESSES {get;set;}   
    }
}

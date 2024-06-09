using Leadsoft.Utilities.CommonState;

namespace CorLoan.BLL.DTOs
{
    public class IntroducerInfo_DTO :ModelBase<IntroducerInfo_DTO>
    {
        public string? INTRO_ID { get; set; }
        public string? CUSTOMER_ID { get; set; }
        public string? INTRO_TYPE { get; set; }
        public string? INTRO_ACCOUNT_BRANCH { get; set; }
        public string? INTRO_ACCOUNT_NUMBER { get; set; }
        public string? INTRO_DETAILS { get; set; }
        public string? INTRO_EMPLOYEE_ID { get; set; }
        public string? INTRO_PA_NO { get; set; }

    }
}

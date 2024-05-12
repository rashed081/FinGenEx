using Leadsoft.Utilities.CommonState;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorLoan.BLL.DTOs
{
    public class Sample_DTO : ModelBase<Sample_DTO>
    {
        public string? product_id {  get; set; }
        public string? Table_Filed_Name { get; set; }
        public string? CUSTOMER_ID { get; set; }
        public string? CUSTOMER_NAME { get; set; }
        public string? ADDRESS { get; set; }
        public string? CONTACT { get; set; }
        public string? EMAIL { get; set; }
        public string? IS_BANK { get; set; }
        public string? BANK_ID { get; set; }
        public string? AUTH_STATUS_ID { get; set; }
        public string? MAKE_BY { get; set; }
        public string? MAKE_DT { get; set; }
        public string? AUTH_1ST_BY { get; set; }
        public string? AUTH_1ST_DT { get; set; }
        public string? AUTH_2ND_BY { get; set; }
        public string? AUTH_2ND_DT { get; set; }
        public string? LAST_ACTION { get; set; }
        public string? Not_Table_Column { get; set; }
    }
}

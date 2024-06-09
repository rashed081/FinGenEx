using Leadsoft.Utilities.CommonState;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorLoan.DAL.Entities
{
    [Table("INTRODUCER_INFO_RONY")]
    public class Introducer: ModelBase<Introducer>
    {
        [Key]
        [ Column("INTRO_ID")]
        [Display(Name = "Introducer Id")]
        public string? INTRO_ID { get; set; }


        [Column("CUSTOMER_ID")]
        [Display(Name = "Customer id")]
        public string? CUSTOMER_ID { get; set; }

      
        [Column("INTRO_TYPE")]
        [Display(Name = "Introducer Type")]
        public string? INTRO_TYPE { get; set; }

        [Column("INTRO_ACCOUNT_BRANCH")]
        [Display(Name = "Introducer Account Branch")]
        public string? INTRO_ACCOUNT_BRANCH { get; set; }

        [Column("INTRO_ACCOUNT_NUMBER")]
        [Display(Name = "Introducer Account Number")]
        public string? INTRO_ACCOUNT_NUMBER { get; set; }

        [Column("INTRO_DETAILS")]
        [Display(Name = "Introducer Details")]
        public string? INTRO_DETAILS { get; set; }

        [Column("INTRO_EMPLOYEE_ID")]
        [Display(Name = "Introducer Employee ID")]
        public string? INTRO_EMPLOYEE_ID { get; set; }

        [Column("INTRO_PA_NO")]
        [Display(Name = "Introducer PA number")]
        public string? INTRO_PA_NO { get; set; }

    }
}

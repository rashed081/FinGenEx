using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Leadsoft.Utilities.CommonState;

namespace CorLoan.DAL.Entities
{
    [Table("CUSTOMER_INFO_RONY")]
    public class Customer : ModelBase<Customer>
    {       

        [Required]
        [Key, Column("CUSTOMER_ID")]
        [Display(Name = "Customer id")]
        public string? CUSTOMER_ID { get; set; }

        [Required]
        [Column("CUSTOMER_NID")]
        [Display(Name = "Customer nid")]
        public string? CUSTOMER_NID { get; set; }

        [Required]
        [Column("CUSTOMER_NAME")]
        [Display(Name = "Customer Name")]
        public string? CUSTOMER_NAME { get; set; }

        [Column("CUSTOMER_FATHERS_NAME")]
        [Display(Name = "Customer Fathers Name")]
        public string? CUSTOMER_FATHERS_NAME { get; set; }

        [Column("CUSTOMER_MOTHERS_NAME")]
        [Display(Name = "Customer Mothers Name")]
        public string? CUSTOMER_MOTHERS_NAME { get; set; }

        [Column("CUSTOMER_SPOUSE_NAME")]
        [Display(Name = "Customer Spouse Name")]
        public string? CUSTOMER_Spouse_NAME { get; set; }

        [Column("Gender")]
        [Display(Name = "Gender")]
        public string? Gender { get; set; }

        [Column("Date_of_birth")]
        [Display(Name = "Date_of_birth")]
        public string? Date_of_birth { get; set; }

        [Column("Marital_st")]
        [Display(Name = "Marital_status")]
        public string? Marital_Status { get; set; }

    }
}

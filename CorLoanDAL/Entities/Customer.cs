using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Leadsoft.Utilities.CommonState;

namespace CorLoan.DAL.Entities
{
    [Table("CUSTOMER_INFO_RONY")]
    public class Customer : ModelBase<Customer>
    {
        [Key]
        [ Column("CUSTOMER_ID")]
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

        [Column("FATHERS_NAME")]
        [Display(Name = "Customer Fathers Name")]
        public string? FATHERS_NAME { get; set; }

        [Column("MOTHERS_NAME")]
        [Display(Name = "Mothers Name")]
        public string? MOTHERS_NAME { get; set; }

        [Column("SPOUSE_NAME")]
        [Display(Name = "Spouse Name")]
        public string? SPOUSE_NAME { get; set; }

        [Column("GENDER")]
        [Display(Name = "Gender")]
        public string? GENDER { get; set; }

        [Column("DATE_OF_BIRTH")]
        [Display(Name = "Date_of_birth")]
        public string? DATE_OF_BIRTH { get; set; }

        [Column("MARITAL_ST")]
        [Display(Name = "Marital_status")]
        public string? MARITAL_ST { get; set; }

        //public Introducer? INTRODUCER { get; set; }

        [NotMapped]
        public Introducer? INTRODUCER { get; set; }

        [NotMapped]
        public Address[] ADDRESSES { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Leadsoft.Utilities.CommonState;

namespace CorLoan.DAL.Entities
{
    [Table("table_name")]
    public class Sample : ModelBase<Sample>
    {
        [Column("PRODUCT_ID")]
        [Display(Name = "Product Id")]
        public string? PRODUCT_ID { get; set; }
        [Column("TableColumnName")]
        [Display(Name = "Name for Authorization")]
        public string? Table_Filed_Name { get; set; }

        [Required]
        [Key, Column("CUSTOMER_ID")]
        [Display(Name = "Customer id")]
        public string? CUSTOMER_ID { get; set; }

        [Column("CUSTOMER_NAME")]
        [Display(Name = "Customer Name")]
        public string? CUSTOMER_NAME { get; set; }

        [Column("ADDRESS")]
        [Display(Name = "Address")]
        public string? ADDRESS { get; set; }
        [Column("CONTACT")]
        [Display(Name = "Contact")]
        public string? CONTACT { get; set; }
        [Column("EMAIL")]
        [Display(Name = "Email")]
        public string? EMAIL { get; set; }
        [Column("IS_BANK")]
        [Display(Name = "Is Bank")]
        public string? IS_BANK { get; set; }
        [Column("BANK_ID")]
        [Display(Name = "Bank id")]
        public string? BANK_ID { get; set; }
        [Column("AUTH_STATUS_ID")]
        [Display(Name = "Auth Status id")]
        public string? AUTH_STATUS_ID { get; set; }
        [Column("MAKE_BY")]
        [Display(Name = "Make by")]
        public string? MAKE_BY { get; set; }
        [Column("MAKE_DT")]
        [Display(Name = "Make dt")]
        public string? MAKE_DT { get; set; }
        [Column("AUTH_1ST_BY")]
        [Display(Name = "Auth 1st by")]
        public string? AUTH_1ST_BY { get; set; }
        [Column("AUTH_1ST_DT")]
        [Display(Name = "Auth 1st dt")]
        public string? AUTH_1ST_DT { get; set; }
        [Column("AUTH_2ND_BY")]
        [Display(Name = "Auth 2nd by")]
        public string? AUTH_2ND_BY { get; set; }
        [Column("AUTH_2ND_DT")]
        [Display(Name = "Auth 2nd dt")]
        public string? AUTH_2ND_DT { get; set; }
        [Column("LAST_ACTION")]
        [Display(Name = "Last Action")]
        public string? LAST_ACTION { get; set; }

        //if table does not have that column use NotMapped Attribute
        [NotMapped]
        public string? Not_Table_Column { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Leadsoft.Utilities.CommonState;


namespace CorLoan.DAL.Entities
{
    [Table("address_list_rony")]
    public class Address: ModelBase<Address>
    {
        [Key]
        [Column("ADDRESS_ID",Order=0)]
        [Display(Name = "Address ID,")]
        public string? ADDRESS_ID { get; set; }

        [Key]
        [Column("ADDRESS_TYPE_NM", Order = 1)]
        [Display(Name = "Address Type")]
        public string? ADDRESS_TYPE_NM { get; set; }

        
        [Column("ADDRESS_TYPE_ID")]
        [Display(Name = "Address Type Id")]
        public string? ADDRESS_TYPE_ID { get; set; }

        [Column("ADDRESS_DETAILS")]
        [Display(Name = "Address")]
        public string? ADDRESS_DETAILS{ get; set; }

        [Column("CITY")]
        [Display(Name = "City")]
        public string? CITY { get; set; }

        [Column("ZIP_CODE")]
        [Display(Name = "ZIP Code")]
        public string? ZIP_CODE { get; set; }

        [Column("PHONE_NO")]
        [Display(Name = "Phone Number")]
        public string? PHONE_NO { get; set; }

        [Column("MOBILE_NO")]
        [Display(Name = "Mobile Number")]
        public string? MOBILE_NO{ get; set; }

        [Column("EMAIL")]
        [Display(Name = "Email")]
        public string? EMAIL { get; set; }

        [Column("CUSTOMER_ID")]
        [Display(Name = "Customer ID")]
        public string? CUSTOMER_ID { get; set; }

        [Column("COUNTRY_ID")]
        [Display(Name = "Country ID")]
        public string? COUNTRY_ID { get; set; }

        [NotMapped]

        public string? COUNTRY_NM { get; set; }

        [Column("DISTRICT_ID")]
        [Display(Name = "District ID")]
        public string? DISTRICT_ID { get; set; }

        [NotMapped]
        public string? DISTRICT_NM { get; set; }

        [Column("DIVISION_ID")]
        [Display(Name = "Division ID")]
        public string? DIVISION_ID { get; set; }

        [NotMapped]
        public string? DIVISION_NM { get; set; }
        
        [Column("THANA_ID")]
        [Display(Name = "Thana ID")]
        public string? THANA_ID { get; set; }

        [NotMapped]
        public string? THANA_NM { get; set; }
    }
}

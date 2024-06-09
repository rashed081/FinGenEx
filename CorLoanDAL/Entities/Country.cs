using Leadsoft.Utilities.CommonState;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorLoan.DAL.Entities
{
    [Table("Country")]
    public class Country:ModelBase<Country>
    {
        [Column("COUNTRY_ID")]
        [Display(Name ="Country ID")]
        public string COUNTRY_ID { get; set; }

        [Column("COUNTRY_NM")]
        [Display(Name ="Country Name")]
        public string COUNTRY_NM { get; set; }

    }
}

using Leadsoft.Utilities.CommonState;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorLoan.DAL.Entities
{
    [Table("DISTRICT")]
    public class District : ModelBase<District>
    {
        [Column("DISTRICT_ID")]
        [Display(Name = "District ID")]
        public string DISTRICT_ID { get; set; }

        [Column("DISTRICT_NM")]
        [Display(Name = "District Name")]
        public string DISTRICT_NM { get; set; }

    }
}

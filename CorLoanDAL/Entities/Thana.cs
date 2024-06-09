using Leadsoft.Utilities.CommonState;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorLoan.DAL.Entities
{
    [Table("THANA")]
    public class Thana : ModelBase<Thana>
    {
        [Column("THANA_ID")]
        [Display(Name = "Thana ID")]
        public string THANA_ID { get; set; }

        [Column("THANA_NM")]
        [Display(Name = "Thana Name")]
        public string THANA_NM { get; set; }

    }
}

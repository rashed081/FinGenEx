using Leadsoft.Utilities.CommonState;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorLoan.DAL.Entities
{
    [Table("DIVISION")]
    public class Division : ModelBase<Division>
    {
        [Column("DIVISION_ID")]
        [Display(Name = "Division ID")]
        public string DIVISION_ID { get; set; }

        [Column("DIVISION_NM")]
        [Display(Name = "Division Name")]
        public string DIVISION_NM { get; set; }

    }
}

using CorLoan.BLL.DTOs;
using Leadsoft.Utilities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorLoan.BLL.ServiceContracts
{
    public interface ISampleService
    {
        Sample_DTO SampleGet(string pbranch_id, string paccount_no);
        Sample_DTO SamplePost(Sample_DTO obj_Sample_DTO, AuthParam authParam);
    }
}

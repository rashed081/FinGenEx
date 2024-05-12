using CorLoan.DAL.Entities;
using Leadsoft.Utilities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorLoan.DAL.RepositoryContracts
{
    public interface ISampleRepository
    {
        Sample SampleGet(string pbranch_id, string paccount_no);
        Sample SamplePost(Sample obj_Sample, AuthParam authParam);
    }
}

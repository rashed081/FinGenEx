using CorLoan.DAL.Entities;
using Leadsoft.Utilities.Models;

namespace CorLoan.DAL.RepositoryContracts
{
    public interface ICustomerIntoRepository
    {
        Customer CustomerPost(Customer obj_Sample, AuthParam authParam);
    }
}

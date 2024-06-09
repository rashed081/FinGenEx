using CorLoan.DAL.Entities;
using Leadsoft.Utilities.Models;

namespace CorLoan.DAL.RepositoryContracts
{
    public interface ICustomerInfoRepository
    {
        Customer CustomerPost(Customer obj_customerInfo, AuthParam authParam);
        Customer GetCustomerByID(string customer_id);
        List<Country> GetAllCountries();
        List<Division> GetDivisions(string pcountry_id);
        List<District> GetDistricts(string pdivision_id);
        List<Thana> GetThanas(string pdistrict_id);

    }
}

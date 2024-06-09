using CorLoan.BLL.DTOs;
using CorLoan.DAL.Entities;
using Leadsoft.Utilities.Models;

namespace CorLoan.BLL.ServiceContracts
{
    public interface ICustomerInfoSevice
    {
        CustomerInfo_DTO GetCustomerInfoByID(string customer_id);
        CustomerInfo_DTO CustomerInfoPost(CustomerInfo_DTO obj_customerInfo, AuthParam authParam);
        List<Country> GetAllCountries();
        List<Division> GetDivisions(string pcountry_id);
        List<District> GetDistricts(string pdivision_id);
        List<Thana> GetThanas(string pdistrict_id);
    }
}

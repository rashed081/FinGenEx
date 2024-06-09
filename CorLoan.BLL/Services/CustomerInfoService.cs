using AutoMapper;
using CorLoan.BLL.DTOs;
using CorLoan.BLL.ServiceContracts;
using CorLoan.DAL.Entities;
using CorLoan.DAL.RepositoryContracts;
using Leadsoft.Utilities.Models;

namespace CorLoan.BLL.Services
{
    public class CustomerInfoService : ICustomerInfoSevice
    {
        private readonly ICustomerInfoRepository _customerInfoRepository;
        private readonly IMapper _mapper;

        public CustomerInfoService(ICustomerInfoRepository customerInfoRepository, IMapper mapper)
        {
            _customerInfoRepository = customerInfoRepository;
            _mapper = mapper;
        }

        public CustomerInfo_DTO GetCustomerInfoByID(string customer_id)
        {
            return _mapper.Map<Customer, CustomerInfo_DTO>(_customerInfoRepository.GetCustomerByID(customer_id));
        }
        public CustomerInfo_DTO CustomerInfoPost(CustomerInfo_DTO obj_customerInfo, AuthParam authParam)
        {
            return _mapper.Map<Customer, CustomerInfo_DTO>
                (_customerInfoRepository.CustomerPost(_mapper.Map<CustomerInfo_DTO, Customer>(obj_customerInfo), authParam));
        }

        public List<Country> GetAllCountries()
        {
            return _customerInfoRepository.GetAllCountries();

        }
        public List<Division> GetDivisions(string pcountry_id)
        {
            return _customerInfoRepository.GetDivisions(pcountry_id);
        }

        public List<District> GetDistricts(string pdivision_id)
        {
            return _customerInfoRepository.GetDistricts(pdivision_id);
        }

        public List<Thana> GetThanas(string pdistrict_id)
        {
            return _customerInfoRepository.GetThanas(pdistrict_id);
        }
    }
}

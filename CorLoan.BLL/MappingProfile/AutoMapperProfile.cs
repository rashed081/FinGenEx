using AutoMapper;
using CorLoan.BLL.DTOs;
using CorLoan.DAL.Entities;

namespace CorLoan.BLL.MappingProfile
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Customer, CustomerInfo_DTO>().ReverseMap();
            CreateMap<Introducer, IntroducerInfo_DTO>().ReverseMap();
            CreateMap<Address, Address_DTO>().ReverseMap();
        }
    }
}

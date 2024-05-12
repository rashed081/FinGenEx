using AutoMapper;
using CorLoan.BLL.DTOs;
using CorLoan.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CorLoan.BLL.MappingProfile
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Sample, Sample_DTO>().ReverseMap();
        }
    }
}

using AutoMapper;
using CorLoan.BLL.DTOs;
using CorLoan.BLL.ServiceContracts;
using CorLoan.DAL.Entities;
using CorLoan.DAL.RepositoryContracts;
using Leadsoft.Utilities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorLoan.BLL.Services
{
    public class SampleService : ISampleService
    {
        private readonly ISampleRepository _sampleRepository;
        private readonly IMapper _mapper;

        public SampleService(ISampleRepository sampleRepository, IMapper mapper)
        {
            _sampleRepository = sampleRepository;
            _mapper = mapper;
        }
        public Sample_DTO SampleGet(string pbranch_id, string paccount_no)
        {
            return _mapper.Map<Sample, Sample_DTO>(_sampleRepository.SampleGet(pbranch_id, paccount_no));
        }

        public Sample_DTO SamplePost(Sample_DTO obj_Sample_DTO, AuthParam authParam)
        {
            return _mapper.Map<Sample, Sample_DTO>(_sampleRepository.SamplePost(_mapper.Map<Sample_DTO, Sample>(obj_Sample_DTO), authParam));
        }
    }
}

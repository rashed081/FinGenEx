using CorLoan.BLL.DTOs;
using CorLoan.BLL.ServiceContracts;
using Leadsoft.Utilities.Common;
using Leadsoft.Utilities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CorLoan.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class SampleController : ControllerBase
    {
        private readonly ISampleService _sampleService;
        public SampleController(ISampleService sampleService)
        {
            _sampleService = sampleService;
        }
        [HttpGet]
        public IActionResult SampleGet(string requestString)
        {
            APIServiceResponse objResponse = new APIServiceResponse();
            if (requestString == null)
            {
                objResponse.ResponseStatus = false;
                objResponse.ResponseMessage = "Request is null";
                return BadRequest(objResponse);
            }
            APIServiceRequest objRequest = CommonAPIFormat.GetDeserializedRequest(requestString);
            var reqBusinessData = JsonConvert.DeserializeObject(objRequest.BusinessData.ToString());

            Sample_DTO result = _sampleService.SampleGet(reqBusinessData.pbranch_id.ToString(), reqBusinessData.paccount_no.ToString());
            if (result != null)
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithBizData(objRequest, result);
                return Ok(objResponse);
            }
            else
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithErrorMsg(objRequest, "");
                return BadRequest(objResponse);
            }

        }

        [HttpPost]
        public IActionResult SamplePost(APIServiceRequest objRequest)
        {
            APIServiceResponse objResponse = new APIServiceResponse();
            try
            {
                AuthParam authParam = new AuthParam
                {
                    UserId = objRequest.UserId,
                    FunctionId = objRequest.FunctionId,
                    BranchId = objRequest.BranchId
                };
                Sample_DTO obj_Sample_DTO = JsonConvert.DeserializeObject<Sample_DTO>(objRequest.BusinessData.ToString());

                Sample_DTO result = _sampleService.SamplePost(obj_Sample_DTO, authParam);

                objResponse = CommonAPIFormat.CreateAPIResponseWithBizData(objRequest, result);
                return Ok(objResponse);
            }
            catch (Exception ex)
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithErrorMsg(objRequest, ex.Message);
                return BadRequest(objResponse);
            }



        }
    }
}

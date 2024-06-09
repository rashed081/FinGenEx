using CorLoan.BLL.DTOs;
using CorLoan.BLL.ServiceContracts;
using CorLoan.DAL.Entities;
using Leadsoft.Utilities.Common;
using Leadsoft.Utilities.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CorLoan.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CustomerInfoController:ControllerBase
    {
        private readonly ICustomerInfoSevice _customerInfoService;
        public CustomerInfoController(ICustomerInfoSevice customerInfoSevice)
        {
            _customerInfoService = customerInfoSevice;
        }
        [HttpGet]
        public IActionResult GetCustomerInfoByID(string requestString)
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

            CustomerInfo_DTO result = 
                _customerInfoService.GetCustomerInfoByID(reqBusinessData.customer_id.ToString());
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

        [HttpGet]
        public IActionResult GetALlCountries()
       {
            List<Country> countries = _customerInfoService.GetAllCountries();
            if (countries != null && countries.Any())
            {
                APIServiceRequest request = new APIServiceRequest
                {
                    RequestId = Guid.NewGuid().ToString(),
                    UserId = "123",
                    BranchId = "456"
                };

                var response = CommonAPIFormat.CreateAPIResponseWithBizData(request, countries);
                return Ok(response);
            }
            else
            {
                APIServiceRequest request = new APIServiceRequest
                {
                    RequestId = Guid.NewGuid().ToString(),
                    UserId = "123",
                    BranchId = "456"
                };

                var response = CommonAPIFormat.CreateAPIResponseWithErrorMsg(request, "No data found");
                return BadRequest(response);
            }
        }

        [HttpGet]
        public IActionResult GetDivisions(string requestString)
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

            List<Division> divisions = _customerInfoService.GetDivisions(reqBusinessData.country_id.ToString());

            if (divisions != null)
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithBizData(objRequest, divisions);
                return Ok(objResponse);
            }
            else
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithErrorMsg(objRequest, "");
                return BadRequest(objResponse);
            }
        }

        [HttpGet]
        public IActionResult GetDistricts(string requestString)
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

            List<District> districts = _customerInfoService.GetDistricts(reqBusinessData.division_id.ToString());

            if (districts != null)
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithBizData(objRequest, districts);
                return Ok(objResponse);
            }
            else
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithErrorMsg(objRequest, "");
                return BadRequest(objResponse);
            }
        }

        [HttpGet]
        public IActionResult GetThanas(string requestString)
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

            List<Thana> thanas = _customerInfoService.GetThanas(reqBusinessData.district_id.ToString());

            if (thanas != null)
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithBizData(objRequest, thanas);
                return Ok(objResponse);
            }
            else
            {
                objResponse = CommonAPIFormat.CreateAPIResponseWithErrorMsg(objRequest, "");
                return BadRequest(objResponse);
            }
        }

        [HttpPost]
        public IActionResult PostCustomerInfo(APIServiceRequest objRequest)
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

                //var myJsonResponse = objRequest.BusinessData.ToString().Trim().TrimStart('{').TrimEnd('}');
                CustomerInfo_DTO obj_customerInfo = JsonConvert.DeserializeObject<CustomerInfo_DTO>(objRequest.BusinessData.ToString());

                CustomerInfo_DTO result = _customerInfoService.CustomerInfoPost(obj_customerInfo, authParam);

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

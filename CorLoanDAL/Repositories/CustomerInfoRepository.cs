using CorLoan.DAL.Entities;
using CorLoan.DAL.RepositoryContracts;
using Dapper;
using Leadsoft.Authorization.AuthDBAccess.NFT.Contracts;
using Leadsoft.DBContext;
using Leadsoft.DBContext.ContextHelper;
using Leadsoft.Utilities.Common;
using Leadsoft.Utilities.Helpers;
using Leadsoft.Utilities.Models;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System.Data;

namespace CorLoan.DAL.Repositories
{
    public class CustomerInfoRepository:ICustomerInfoRepository
    {
        private readonly DatabaseContextReadOnly _dbConnection;
        private readonly AppSettings _appSettings;
        private readonly ICoreAuthorizeSaveLogService _coreAuthorizeSaveLogService;

        public CustomerInfoRepository(DatabaseContextReadOnly dbConnection, IOptions<AppSettings> appSettings, 
                                        ICoreAuthorizeSaveLogService coreAuthorizeSaveLogService)
        {
            _dbConnection = dbConnection;
            _appSettings = appSettings.Value;
            _coreAuthorizeSaveLogService = coreAuthorizeSaveLogService;
        }
        public Customer GetCustomerByID(string customer_id)
        {
            Customer obj_customerInfo = new Customer();
            try
            {
                var param = new OracleDynamicParameters();
                //param.Add("PBRANCH_ID", OracleDbType.NVarchar2, ParameterDirection.Input, pbranch_id);
                param.Add("p_customer_id", OracleDbType.NVarchar2, ParameterDirection.Input, customer_id);
                param.Add("presult_cur", OracleDbType.RefCursor, ParameterDirection.Output, DBNull.Value, size: 3200);
                param.Add("perror_code", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                param.Add("perror_message", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);

                string customerGetQuery= _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_CUSTOMER_BY_ID";
                obj_customerInfo = _dbConnection.Db.Query<Customer>(customerGetQuery, param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                string introducerGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_INTRODUCER_BY_ID";
                obj_customerInfo.INTRODUCER = _dbConnection.Db.Query<Introducer>(introducerGetQuery, param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                string addressGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_ADDRESS_BY_ID";
                obj_customerInfo.ADDRESSES = _dbConnection.Db.Query<Address>(addressGetQuery, param, commandType: CommandType.StoredProcedure).ToArray();


                if (obj_customerInfo != null)
                {
                    obj_customerInfo.ERROR_MSG = param.Get<string>("presult_cur");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return obj_customerInfo;
        }
        public Customer CustomerPost(Customer obj_customerInfo, AuthParam authParam)
        {
            
            using (IDbTransaction transaction = _dbConnection.Db.BeginTransaction())
            {
                try
                {
                    var param = new OracleDynamicParameters();
                    if (obj_customerInfo.isAdd)
                    {
                        param.Add("p_customer_id", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                        param.Add("p_customer_nid", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.CUSTOMER_NID);
                        param.Add("p_customer_name", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.CUSTOMER_NAME);
                        param.Add("p_mothers_name", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.MOTHERS_NAME);
                        param.Add("p_fathers_name", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.FATHERS_NAME);
                        param.Add("p_spouse_name", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.SPOUSE_NAME);
                        param.Add("p_gender", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.GENDER);
                        param.Add("p_date_of_birth", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.DATE_OF_BIRTH);
                        param.Add("p_marital_status", OracleDbType.NVarchar2, ParameterDirection.Input, obj_customerInfo.MARITAL_ST);
                        param.Add("p_make_by", OracleDbType.NVarchar2, ParameterDirection.Input, authParam.UserId);
                        param.Add("perror_code", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                        param.Add("perror_message", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                        

                        //CUSTOMER_INFO_HANDLER INSERT_CUSTOMER_INFO
                        string query = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.INSERT_CUSTOMER_INFO";
                        _dbConnection.Db.Query(query, param, commandType: CommandType.StoredProcedure);

                        obj_customerInfo.CUSTOMER_ID = param.Get<string>("p_customer_id");
                        if(param.Get<string>("perror_message") == "null")
                            obj_customerInfo.ERROR_MSG = param.Get<string>("perror_message");

                        if (!string.IsNullOrEmpty(obj_customerInfo.ERROR_MSG) && obj_customerInfo.ERROR_MSG != "null")
                        {
                            throw new Exception(obj_customerInfo.ERROR_MSG);
                        }
                        if (string.IsNullOrEmpty(obj_customerInfo.ERROR_MSG) || obj_customerInfo.ERROR_MSG == "null")
                        {
                            authParam.Action_Status = Leadsoft_Constants.AddAuthStatus;
                            authParam.Remarks = "CUSTOMER ID:" + obj_customerInfo.CUSTOMER_ID;
                            obj_customerInfo.IsRequestSuccess = true;
                            IntroducerPost(obj_customerInfo.INTRODUCER, authParam, obj_customerInfo.CUSTOMER_ID, transaction);
                            AddressPost(obj_customerInfo.ADDRESSES, authParam, obj_customerInfo.CUSTOMER_ID, transaction);
                        }
                        else
                        {
                            transaction.Rollback();
                            return obj_customerInfo;
                        }

                    }
                    else if (obj_customerInfo.isOld && obj_customerInfo.isDelete)
                    {
                        authParam.Action_Status = Leadsoft_Constants.DeleteAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_customerInfo.CUSTOMER_ID;
                        obj_customerInfo.IsRequestSuccess = true;
                    }
                    else
                    {
                        authParam.Action_Status = Leadsoft_Constants.EditAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_customerInfo.CUSTOMER_ID;
                        obj_customerInfo.IsRequestSuccess = true;
                        IntroducerPost(obj_customerInfo.INTRODUCER, authParam, obj_customerInfo.CUSTOMER_ID, transaction);
                        AddressPost(obj_customerInfo.ADDRESSES, authParam, obj_customerInfo.CUSTOMER_ID, transaction);
                        //var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_customerInfo, authParam, ((int)ORMType.Dapper).ToString());
                        var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_customerInfo, authParam.BranchId, authParam.FunctionId, authParam.Remarks, authParam.Action_Status, authParam.UserId, ((int)ORMType.Dapper).ToString());
                    }

                    //if (obj_customerInfo.ERROR_MSG == "null")
                    if(string.IsNullOrEmpty(obj_customerInfo.ERROR_MSG) || obj_customerInfo.ERROR_MSG == "null")
                    {
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }
                    return obj_customerInfo;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
                finally
                {
                    transaction.Dispose();
                }
            }
        }
        public Introducer IntroducerPost(Introducer obj_introducerInfo, AuthParam authParam, string customer_id, IDbTransaction transaction)
        {
            try
            {
                var param = new OracleDynamicParameters();
                if (obj_introducerInfo.isAdd)
                {
                    param.Add("p_intro_type", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_TYPE);
                    param.Add("p_intro_branch", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_ACCOUNT_BRANCH);
                    param.Add("p_intro_acc_no", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_ACCOUNT_NUMBER);
                    param.Add("p_intro_details", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_DETAILS);
                    param.Add("p_customer_ID", OracleDbType.NVarchar2, ParameterDirection.Input, customer_id);
                    param.Add("p_intro_pa_no", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_PA_NO);
                    param.Add("p_intro_employee_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_introducerInfo.INTRO_EMPLOYEE_ID);
                    param.Add("p_make_by", OracleDbType.NVarchar2, ParameterDirection.Input, authParam.UserId);
                    param.Add("p_intro_id", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                    param.Add("perror_code", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                    param.Add("perror_message", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);


                    string query = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.INSERT_INTRODUCER_INFO";
                    _dbConnection.Db.Query(query, param, commandType: CommandType.StoredProcedure);

                    obj_introducerInfo.INTRO_ID = param.Get<string>("p_intro_id");
                    obj_introducerInfo.ERROR_MSG = param.Get<string>("perror_message");

                    if (!string.IsNullOrEmpty(obj_introducerInfo.ERROR_MSG) && obj_introducerInfo.ERROR_MSG != "null")
                    {
                        throw new Exception(obj_introducerInfo.ERROR_MSG);
                    }
                    if (string.IsNullOrEmpty(obj_introducerInfo.ERROR_MSG) || obj_introducerInfo.ERROR_MSG == "null")
                    {
                        authParam.Action_Status = Leadsoft_Constants.AddAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_introducerInfo.CUSTOMER_ID;
                        obj_introducerInfo.IsRequestSuccess = true;
                    }
                    else
                    {
                        transaction.Rollback();
                        return obj_introducerInfo;
                    }
                }
                else if (obj_introducerInfo.isOld && obj_introducerInfo.isDelete)
                {
                    authParam.Action_Status = Leadsoft_Constants.DeleteAuthStatus;
                    authParam.Remarks = "CUSTOMER ID:" + obj_introducerInfo.CUSTOMER_ID;
                    obj_introducerInfo.IsRequestSuccess = true;
                }
                else
                {
                    authParam.Action_Status = Leadsoft_Constants.EditAuthStatus;
                    authParam.Remarks = "Introducer ID:" + obj_introducerInfo.INTRO_ID;
                    obj_introducerInfo.IsRequestSuccess = true;
                    var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_introducerInfo,authParam.BranchId,authParam.FunctionId,authParam.Remarks,authParam.Action_Status,authParam.UserId, ((int)ORMType.Dapper).ToString());

                }
                return obj_introducerInfo;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }
        }

        public Address[] AddressPost(Address[] obj_addressInfoList, AuthParam authParam, string customer_id, IDbTransaction transaction)
        {
            List<Address> addresses = new List<Address>();
            try
            {
                foreach (var obj_addressInfo in obj_addressInfoList)
                {
                    var param = new OracleDynamicParameters();
                    if (obj_addressInfo.isAdd)
                    {
                        param.Add("paddress_id", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                        param.Add("paddress_type_nm", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.ADDRESS_TYPE_NM);
                        param.Add("paddress_type_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.ADDRESS_TYPE_ID);
                        param.Add("paddress_details", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.ADDRESS_DETAILS);
                        param.Add("pcity", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.CITY);
                        param.Add("pzip_code", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.ZIP_CODE);
                        param.Add("pphone_no", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.PHONE_NO);
                        param.Add("pmobile_no", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.MOBILE_NO);
                        param.Add("pemail", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.EMAIL);
                        param.Add("pcountry_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.COUNTRY_ID);
                        param.Add("pdistrict_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.DISTRICT_ID);
                        param.Add("pdivision_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.DIVISION_ID);
                        param.Add("pthana_id", OracleDbType.NVarchar2, ParameterDirection.Input, obj_addressInfo.THANA_ID);
                        param.Add("pcustomer_id", OracleDbType.NVarchar2, ParameterDirection.Input, customer_id);
                        param.Add("pmade_by", OracleDbType.NVarchar2, ParameterDirection.Input, authParam.UserId);
                        param.Add("perror_code", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);
                        param.Add("perror_message", OracleDbType.NVarchar2, ParameterDirection.Output, DBNull.Value, size: 32000);

                        string query = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.INSERT_ADDRESS_INFO";
                        _dbConnection.Db.Query(query, param, commandType: CommandType.StoredProcedure);

                        obj_addressInfo.ADDRESS_ID = param.Get<string>("paddress_id");
                        obj_addressInfo.ERROR_MSG = param.Get<string>("perror_message");

                        if (!string.IsNullOrEmpty(obj_addressInfo.ERROR_MSG) && obj_addressInfo.ERROR_MSG != "null")
                        {
                            throw new Exception(obj_addressInfo.ERROR_MSG);
                        }
                        if (string.IsNullOrEmpty(obj_addressInfo.ERROR_MSG) || obj_addressInfo.ERROR_MSG == "null")
                        {
                            authParam.Action_Status = Leadsoft_Constants.AddAuthStatus;
                            authParam.Remarks = "CUSTOMER ID:" + obj_addressInfo.CUSTOMER_ID;
                            obj_addressInfo.IsRequestSuccess = true;
                        }
                        else
                        {
                            transaction.Rollback();
                            return obj_addressInfoList;
                        }

                        addresses.Add(obj_addressInfo);
                    }

                    else if (obj_addressInfo.isOld && obj_addressInfo.isDelete)
                    {
                        authParam.Action_Status = Leadsoft_Constants.DeleteAuthStatus;
                        authParam.Remarks = "ADDRESS ID:" + obj_addressInfo.ADDRESS_ID;
                        obj_addressInfo.IsRequestSuccess = true;
                    }
                    else
                    {
                        authParam.Action_Status = Leadsoft_Constants.EditAuthStatus;
                        authParam.Remarks = "Address ID:" + obj_addressInfo.ADDRESS_ID;
                        obj_addressInfo.IsRequestSuccess = true;
                        var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_addressInfo, authParam.BranchId, authParam.FunctionId, authParam.Remarks, authParam.Action_Status, authParam.UserId, ((int)ORMType.Dapper).ToString());

                    }
                }
                return addresses.ToArray();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Country> GetAllCountries()
        {
            List<Country> countryList = new List<Country>();
            try
            {
                var param = new OracleDynamicParameters();
                param.Add("presult_cur", OracleDbType.RefCursor, ParameterDirection.Output, DBNull.Value, size: 3200);

                string countryGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_ALL_COUNTRIES";
                countryList = _dbConnection.Db.Query<Country>(countryGetQuery, param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return countryList;
        }

        public List<Division> GetDivisions(string pcountry_id)
        {
            List<Division> divisionList = new List<Division>();
            try
            {
                var param = new OracleDynamicParameters();
                param.Add("presult_cur", OracleDbType.RefCursor, ParameterDirection.Output, DBNull.Value, size: 3200);
                param.Add("pcountry_id", OracleDbType.NVarchar2, ParameterDirection.Input, pcountry_id);

                string divisionGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_DIVISIONS";
                divisionList = _dbConnection.Db.Query<Division>(divisionGetQuery, param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return divisionList;
        }

        public List<District> GetDistricts(string pdivision_id)
        {
            List<District> districtList = new List<District>();
            try
            {
                var param = new OracleDynamicParameters();
                param.Add("presult_cur", OracleDbType.RefCursor, ParameterDirection.Output, DBNull.Value, size: 3200);
                param.Add("pdivision_id", OracleDbType.NVarchar2, ParameterDirection.Input, pdivision_id);

                string divisionGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_DISTRICTS";
                districtList = _dbConnection.Db.Query<District>(divisionGetQuery, param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return districtList;
        }

        public List<Thana> GetThanas(string pdistrict_id)
        {
            List<Thana> thanaList = new List<Thana>();
            try
            {
                var param = new OracleDynamicParameters();
                param.Add("presult_cur", OracleDbType.RefCursor, ParameterDirection.Output, DBNull.Value, size: 3200);
                param.Add("pdistrict_id", OracleDbType.NVarchar2, ParameterDirection.Input, pdistrict_id);

                string divisionGetQuery = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.GET_THANAS";
                thanaList = _dbConnection.Db.Query<Thana>(divisionGetQuery, param, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return thanaList;
        }
    }
}


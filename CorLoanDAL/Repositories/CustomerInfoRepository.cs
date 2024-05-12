using CorLoan.DAL.Entities;
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
    public class CustomerInfoRepository
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

        public Customer SamplePost(Customer obj_Customer, AuthParam authParam)
        {
            using (IDbTransaction transaction = _dbConnection.Db.BeginTransaction())
            {
                try
                {
                    var param = new OracleDynamicParameters();
                    if (obj_Customer.isAdd)
                    {
                        param.Add("PCUSTOMER_ID", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_ID);
                        param.Add("PCUSTOMER_NAME", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_NAME);
                        param.Add("PNID", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_NID);
                        param.Add("PFATHER_NAME", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_FATHERS_NAME);
                        param.Add("PMOTHER_NAME", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_MOTHERS_NAME);
                        param.Add("PSPOUSE_NAME", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.CUSTOMER_Spouse_NAME);
                        param.Add("PDATE_OF_BIRTH", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.Date_of_birth);
                        param.Add("PGENDER", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.Gender);
                        param.Add("PMARITAL_ST", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Customer.Marital_Status);

                        string query = _appSettings.SpPrefix + "CUSTOMER_INFO_HANDLER.INSERT_CUSTOMER_INFO";
                        _dbConnection.Db.Query(query, param, commandType: CommandType.StoredProcedure);

                        obj_Customer.CUSTOMER_ID = param.Get<string>("PCUSTOMER_ID");
                        obj_Customer.ROW_ID = param.Get<string>("PROW_ID");
                        obj_Customer.ERROR_MSG = param.Get<string>("PERRORMESSAGE");

                        if (!string.IsNullOrEmpty(obj_Customer.ERROR_MSG) && obj_Customer.ERROR_MSG != "null")
                        {
                            throw new Exception(obj_Customer.ERROR_MSG);
                        }
                        if (string.IsNullOrEmpty(obj_Customer.ERROR_MSG) || obj_Customer.ERROR_MSG == "null")
                        {
                            authParam.Action_Status = Leadsoft_Constants.AddAuthStatus;
                            authParam.Remarks = "CUSTOMER ID:" + obj_Customer.CUSTOMER_ID;
                            obj_Customer.IsRequestSuccess = true;
                        }
                        else
                        {
                            transaction.Rollback();
                            return obj_Customer;
                        }
                    }
                    else if (obj_Customer.isOld && obj_Customer.isDelete)
                    {
                        authParam.Action_Status = Leadsoft_Constants.DeleteAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_Customer.CUSTOMER_ID;
                        obj_Customer.IsRequestSuccess = true;
                    }
                    else
                    {
                        authParam.Action_Status = Leadsoft_Constants.EditAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_Customer.CUSTOMER_ID;
                        obj_Customer.IsRequestSuccess = true;
                    }
                    var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_Customer, authParam, nameof(ORMType.Dapper));
                    if (result != null)
                    {
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }
                    return obj_Customer;
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
    }
}
}

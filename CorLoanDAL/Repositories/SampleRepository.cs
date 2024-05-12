using CorLoan.DAL.Entities;
using Leadsoft.Authorization.AuthDBAccess.NFT.Contracts;
using Leadsoft.DBContext.ContextHelper;
using Leadsoft.DBContext;
using Leadsoft.Utilities.Common;
using Leadsoft.Utilities.Helpers;
using Leadsoft.Utilities.Models;
using Microsoft.Extensions.Options;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CorLoan.DAL.RepositoryContracts;
using Dapper;

namespace CorLoan.DAL.Repositories
{
    public class SampleRepository : ISampleRepository
    {
        private readonly DatabaseContextReadOnly _dbConnection;
        private readonly AppSettings _appSettings;
        private readonly ICoreAuthorizeSaveLogService _coreAuthorizeSaveLogService;

        public SampleRepository(DatabaseContextReadOnly dbConnection, IOptions<AppSettings> appSettings, ICoreAuthorizeSaveLogService coreAuthorizeSaveLogService)
        {
            _dbConnection = dbConnection;
            _appSettings = appSettings.Value;
            _coreAuthorizeSaveLogService = coreAuthorizeSaveLogService;
        }


        public Sample SampleGet(string pbranch_id, string paccount_no)
        {
            Sample obj_Sample = new Sample();
            try
            {
                var param = new OracleDynamicParameters();
                param.Add("PBRANCH_ID", OracleDbType.NVarchar2, ParameterDirection.Input, pbranch_id);
                param.Add("PACC_NO", OracleDbType.NVarchar2, ParameterDirection.Input, paccount_no);
                param.Add("PRESULT_SET_CUR", OracleDbType.RefCursor, ParameterDirection.Output, size: 3200);

                string query = _appSettings.SpPrefix + "client_ac.get_account_address";

                obj_Sample = _dbConnection.Db.Query<Sample>(query, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                
                if(obj_Sample != null)
                {
                    obj_Sample.ERROR_MSG = param.Get<string>("PRESULT_SET_CUR");
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return obj_Sample;
        }

        public Sample SamplePost(Sample obj_Sample, AuthParam authParam)
        {
            using (IDbTransaction transaction = _dbConnection.Db.BeginTransaction())
            {
                try
                {
                    var param = new OracleDynamicParameters();
                    if (obj_Sample.isAdd)
                    {
                        param.Add("PCUSTOMER_ID", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.CUSTOMER_ID);
                        param.Add("PCUSTOMER_NAME", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.CUSTOMER_NAME);
                        param.Add("PADDRESS", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.ADDRESS);
                        param.Add("PCONTACT", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.CONTACT);
                        param.Add("PEMAIL", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.EMAIL);
                        param.Add("PIS_BANK", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.IS_BANK);
                        param.Add("PBANK_ID", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.BANK_ID);
                        param.Add("PUSER_ID", OracleDbType.NVarchar2, ParameterDirection.Input, obj_Sample.MAKE_BY);
                        param.Add("PAGENT_ID", OracleDbType.NVarchar2, ParameterDirection.Output, size: 32000);
                        param.Add("PROW_ID", OracleDbType.NVarchar2, ParameterDirection.Output, size: 32000);
                        param.Add("PERRORCODE", OracleDbType.NVarchar2, ParameterDirection.Output, size: 32000);
                        param.Add("PERRORMESSAGE", OracleDbType.NVarchar2, ParameterDirection.Output, size: 32000);

                        string query = _appSettings.SpPrefix + "packagename.streprocedurename";
                        _dbConnection.Db.Query(query, param, commandType: CommandType.StoredProcedure);

                        obj_Sample.CUSTOMER_ID = param.Get<string>("PCUSTOMER_ID");
                        obj_Sample.ROW_ID = param.Get<string>("PROW_ID");
                        obj_Sample.ERROR_MSG = param.Get<string>("PERRORMESSAGE");

                        if (!string.IsNullOrEmpty(obj_Sample.ERROR_MSG) && obj_Sample.ERROR_MSG != "null")
                        {
                            throw new Exception(obj_Sample.ERROR_MSG);
                        }
                        if (string.IsNullOrEmpty(obj_Sample.ERROR_MSG) || obj_Sample.ERROR_MSG == "null")
                        {
                            authParam.Action_Status = Leadsoft_Constants.AddAuthStatus;
                            authParam.Remarks = "CUSTOMER ID:" + obj_Sample.CUSTOMER_ID;
                            obj_Sample.IsRequestSuccess = true;
                        }
                        else
                        {
                            transaction.Rollback();
                            return obj_Sample;
                        }
                    }
                    else if (obj_Sample.isOld && obj_Sample.isDelete)
                    {
                        authParam.Action_Status = Leadsoft_Constants.DeleteAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_Sample.CUSTOMER_ID;
                        obj_Sample.IsRequestSuccess = true;
                    }
                    else
                    {
                        authParam.Action_Status = Leadsoft_Constants.EditAuthStatus;
                        authParam.Remarks = "CUSTOMER ID:" + obj_Sample.CUSTOMER_ID;
                        obj_Sample.IsRequestSuccess = true;
                    }
                    var result = _coreAuthorizeSaveLogService.CreateNftAuthLogUsingSP(obj_Sample, authParam, nameof(ORMType.Dapper));
                    if (result != null)
                    {
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }
                    return obj_Sample;
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

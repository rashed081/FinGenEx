
using Leadsoft.TokenHandler.TokenGenerators;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Enyim.Caching.Configuration;
using Leadsoft.TokenHandler.CacheManager;
using System.Collections.Generic;
using Leadsoft.LoggerService;
using Leadsoft.Authorization.AuthDBAccess.NFT.Contracts;
using Leadsoft.Authorization.AuthDBAccess.NFT.Repositories;
using Leadsoft.DBContext;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using CorLoan.BLL.MappingProfile;
using Leadsoft.Utilities.Common;
using CorLoan.BLL.ServiceContracts;
using CorLoan.BLL.Services;
using CorLoan.DAL.RepositoryContracts;
using CorLoan.DAL.Repositories;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace CorLoan.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services, string corsPolicy)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin()//WithOrigins(Gateway)
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });
        }
        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options =>
            {
            });
        }
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
            services.AddSingleton<ILoggerManager, LoggerManager>();

        }
        public static void ConfigureJWTAuthentication(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddScoped<AccessTokenGenerator>();
            string cacheServerAddress = configuration["enyimMemcached:Address"];
            int cacheServerPort = Convert.ToInt32(configuration["enyimMemcached:Port"]);

            //var cacheServer = configuration.GetSection("enyimMemcached");
            //cacheServer.GetValue<string>("Address");

            services.AddEnyimMemcached(options =>
            {
                options.Servers = new List<Server>() {
                new Server
                    {
                        Address = cacheServerAddress,
                        Port = cacheServerPort
                    }
                };
            });
            services.AddSingleton<ICacheManager, MemcachedManager>();
        }
        public static void ConfigureOracleContext(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DatabaseConUltimus");
            //connectionString = JsonSerializer.Serialize(connectionString);
            //connectionString = JObject.Parse(connectionString).ToString();

            string oracleVersion = configuration.GetValue<string>("Oracleversion");
            if (!string.IsNullOrEmpty(oracleVersion))
            {
                services.AddDbContext<DatabaseContext>(option =>
                {
                    option.UseOracle(connectionString,
                        o =>
                        {
                            o.UseOracleSQLCompatibility(oracleVersion);
                           
                        });
                });
            }
            else
            {
                services.AddDbContext<DatabaseContext>(options =>
                {
                    options.UseOracle(connectionString);

                });
            }
            DatabaseContextReadOnly dbConReadOnly = new DatabaseContextReadOnly(connectionString);
            services.AddScoped<DatabaseContextReadOnly>(provider => dbConReadOnly);
        }

        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddTransient<ICoreAuthorizeSaveLogService, CoreAuthorizeSaveLogService>();
            services.AddTransient<ICoreAuthorizeGenerateLogService, CoreAuthorizeGenerateLogService>();
            services.AddScoped<DBExecutorHelper, DBExecutorHelper>();
            services.AddScoped<ISampleService, SampleService>();
            services.AddScoped<ISampleRepository, SampleRepository>();
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            MapperConfiguration mapperConfig = new MapperConfiguration(mapConfig => {
                mapConfig.AddProfile(new AutoMapperProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}


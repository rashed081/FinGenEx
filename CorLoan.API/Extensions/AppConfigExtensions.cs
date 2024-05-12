using Microsoft.AspNetCore.Builder;
using Leadsoft.Utilities.Common;
using Leadsoft.TokenHandler.TokenValidators;

namespace CorLoan.Extensions
{
    public static class AppConfigExtensions
    {
        public static void ConfigureExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandler>();
        }
        public static void ConfigureJWTMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<JwtMiddleware>();
        }
    }
}

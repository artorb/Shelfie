using System.Text;
using API.Services;
using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    // public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    public static IServiceCollection AddIdentityServices(this IServiceCollection services)
    {
        services.AddIdentityCore<ApplicationUser>(opt =>
            {
                opt.SignIn.RequireConfirmedAccount = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequiredLength = 5;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = false;
            })
            .AddEntityFrameworkStores<ShelfyContext>()
            .AddSignInManager<SignInManager<ApplicationUser>>();

        // services.AddIdentityCore<ApplicationUser>(options =>
        //         {
        //             options.SignIn.RequireConfirmedAccount = false;
        //             options.Password.RequireDigit = false;
        //             options.Password.RequiredLength = 1;
        //             options.Password.RequireLowercase = false;
        //             options.Password.RequireUppercase = false;
        //             options.Password.RequireNonAlphanumeric = false;
        //             // options.User.RequireUniqueEmail = false;
        //         }
        //     )
        //     .AddSignInManager<SignInManager<ApplicationUser>>()
        //     .AddEntityFrameworkStores<ShelfyContext>();
        // .AddDefaultTokenProviders();
        // services.AddControllersWithViews();

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("LengthOf12SecretKey"));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        services.AddScoped<TokenService>();

        return services;
    }
}
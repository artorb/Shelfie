using App.Ingredients;
using App.Recipes;
using App.Storages;
using Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Mapper;
using Persistence.Repositories;

namespace API.Extensions;

public static class AppServiceExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services)
    {
        services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.ReturnHttpNotAcceptable = true;
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddNewtonsoftJson()
            .AddXmlDataContractSerializerFormatters();
        
        // services.AddControllers(opt => opt.ReturnHttpNotAcceptable = true)
        //     .AddNewtonsoftJson()
        //     .AddXmlDataContractSerializerFormatters();
        services.AddEndpointsApiExplorer();
        services.AddHttpClient();


        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddCors(opt =>
            opt.AddPolicy("CorsPolicy", policy =>
                policy.AllowAnyMethod().AllowAnyHeader()
                    // .WithOrigins("http://localhost:3000")));
                    .AllowAnyOrigin()));

        services.AddMediatR(typeof(ListAllIngredients.Handler).Assembly, typeof(ListAllStorages.Handler).Assembly, typeof(ListAllRecipes.Handler).Assembly);
        // services.AddMediatR(typeof(ListAllStorages.Handler).Assembly);
        services.AddAutoMapper(typeof(MapperProfile).Assembly);

        services.AddSwaggerGen();

        return services;
    }

    public static IServiceCollection AddSqlConnection(this IServiceCollection services, string connection)
    {
        services.AddDbContext<ShelfyContext>(options =>
            options.UseNpgsql(connection).LogTo(Console.WriteLine, LogLevel.Information));

        return services;
    }
}
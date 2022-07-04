using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.SeedData;

namespace API.Extensions;

public static class AppExtensions
{
    public static async Task<WebApplication> SeedBaseData(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var service = scope.ServiceProvider;
        var ctx = service.GetRequiredService<ShelfyContext>();

        // await ctx.Database.EnsureDeletedAsync();
        // await ctx.Database.MigrateAsync();
        await SeedData.InitAsync(ctx, service, userManager);

        return app;
    }
}
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.SeedData;

public class SeedData
{
    private static ShelfyContext _context = null!;
    private static UserManager<ApplicationUser> _userManager;

    public static async Task InitAsync(ShelfyContext context, IServiceProvider services,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;

        await _context.SaveChangesAsync();
    }

    private static async Task<IEnumerable<ApplicationUser>> InitUsers()
    {
        var pass = "123aBc";
        var users = new List<ApplicationUser>();

        if (!_userManager.Users.Any())
        {
            users.Add(new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(), Name = "Artem", UserName = "ArtemUser", Email = "artem@mail.com",
            });
        }

        foreach (var user in users)
        {
            await _userManager.CreateAsync(user, $"{user.Name.ToLower()}{pass}");
        }

        return await Task.FromResult(users);
    }

    private static async Task<IEnumerable<Ingredient>> InitIngredients()
    {
        var pasta = new Ingredient
        {
            Name = "Pasta",
            AmountUnits = 5,
            Calories = 300,
            Carbs = 40,
            ColorTag = "amber",
            ExpirationDate = DateTime.UtcNow.AddDays(60),
            Fats = 10,
            Id = Guid.NewGuid(),
            Picture = "",
            Proteins = 13
        };
        var carrot = new Ingredient
        {
            Name = "Carrot",
            AmountUnits = 2,
            Calories = 30,
            Carbs = 12,
            ColorTag = "green",
            ExpirationDate = DateTime.UtcNow.AddDays(90),
            Fats = 2,
            Id = Guid.NewGuid(),
            Picture = "",
            Proteins = 2
        };
        var rice = new Ingredient
        {
            Name = "Rice",
            AmountUnits = 1,
            Calories = 312,
            Carbs = 50,
            ColorTag = "slate",
            ExpirationDate = DateTime.UtcNow.AddDays(120),
            Fats = 4,
            Id = Guid.NewGuid(),
            Picture = "",
            Proteins = 10
        };
        var tomatoPaste = new Ingredient
        {
            Name = "Tomato Paste",
            AmountUnits = 5,
            Calories = 12,
            Carbs = 2,
            ColorTag = "red",
            ExpirationDate = DateTime.UtcNow.AddDays(320),
            Fats = 3,
            Id = Guid.NewGuid(),
            Picture = "",
            Proteins = 5
        };

        var list = new List<Ingredient> {pasta, carrot, rice, tomatoPaste};

        return await Task.FromResult(list);
    }
}
using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ShelfyContext : IdentityDbContext<ApplicationUser>
{
    public virtual DbSet<Storage> Storages { get; set; }
    public virtual DbSet<Ingredient> Ingredients { get; set; }
    public virtual DbSet<Recipe> Recipes { get; set; }

    public ShelfyContext(DbContextOptions<ShelfyContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>()
            .HasMany<Storage>(i => i.Storages)
            .WithOne(i => i.ApplicationUser)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<ApplicationUser>()
            .HasMany<Ingredient>(i => i.Ingredients)
            .WithOne(i => i.ApplicationUser)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Recipe>()
            .HasMany<Ingredient>(b => b.Ingredients)
            .WithMany(c => c.Recipes);

        builder.Entity<Ingredient>()
            .HasOne<Storage>(i => i.Storage)
            .WithMany(c => c.Ingredients);

        builder.Entity<Ingredient>()
            .HasMany(i => i.Recipes)
            .WithMany(c => c.Ingredients);
    }
}
using Microsoft.EntityFrameworkCore;
using RecipeCollection.API.Models;

namespace RecipeCollection.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Recipe> Recipes => Set<Recipe>();
}
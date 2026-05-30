using System.ComponentModel.DataAnnotations;

namespace RecipeCollection.API.Models;

public class Recipe
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; }

    [Required]
    public string Ingredients { get; set; }

    [Required]
    public int CookingTime { get; set; }

    [Required]
    public string Category { get; set; }

    public string? ImageUrl { get; set; }
}
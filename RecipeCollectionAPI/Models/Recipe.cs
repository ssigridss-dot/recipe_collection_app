using System.ComponentModel.DataAnnotations;

namespace RecipeCollectionAPI.Models;

public class Recipe
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = "";

    [Required]
    [MaxLength(100)]
    public string Category { get; set; } = "";

    [Required]
    public string Ingredients { get; set; } = "";

    [Required]
    public string Instructions { get; set; } = "";

    [Range(1, 1000)]
    public int CookingTime { get; set; }
}
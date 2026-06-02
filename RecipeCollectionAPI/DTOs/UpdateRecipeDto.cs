using System.ComponentModel.DataAnnotations;

namespace RecipeCollection.API.DTOs;

public class UpdateRecipeDto
{
    [Required(ErrorMessage = "Recipe name is required.")]
    [StringLength(100, ErrorMessage = "Recipe name cannot exceed 100 characters.")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = "Ingredients are required.")]
    [MinLength(5, ErrorMessage = "Ingredients must contain at least 5 characters.")]
    public string Ingredients { get; set; } = "";

    [Required(ErrorMessage = "Instructions are required.")]
    [MinLength(10, ErrorMessage = "Instructions must contain at least 10 characters.")]
    public string Instructions { get; set; } = "";

    [Range(1, 1440, ErrorMessage = "Cooking time must be between 1 and 1440 minutes.")]
    public int CookingTime { get; set; }

    [Required(ErrorMessage = "Category is required.")]
    [StringLength(50, ErrorMessage = "Category cannot exceed 50 characters.")]
    public string Category { get; set; } = "";
}
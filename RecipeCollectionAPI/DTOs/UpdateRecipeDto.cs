namespace RecipeCollection.API.DTOs;

public class UpdateRecipeDto
{
    public string Name { get; set; } = "";
    public string Ingredients { get; set; } = "";
    public string Instructions { get; set; } = "";
    public int CookingTime { get; set; }
    public string Category { get; set; } = "";
}
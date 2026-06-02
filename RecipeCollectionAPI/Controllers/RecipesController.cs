using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeCollection.API.Data;
using RecipeCollection.API.DTOs;
using RecipeCollection.API.Models;

namespace RecipeCollection.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecipesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecipesController(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes()
    {
        var recipes = await _context.Recipes
            .Select(r => new RecipeDto
            {
                Id = r.Id,
                Name = r.Name,
                Ingredients = r.Ingredients,
                Instructions = r.Instructions,
                CookingTime = r.CookingTime,
                Category = r.Category,
                ImageUrl = r.ImageUrl
            })
            .ToListAsync();

        return Ok(recipes);
    }

    // GET BY ID

    [HttpGet("{id}")]
    public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        return new RecipeDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Ingredients = recipe.Ingredients,
            Instructions = recipe.Instructions,
            CookingTime = recipe.CookingTime,
            Category = recipe.Category,
            ImageUrl = recipe.ImageUrl
        };
    }

    // CREATE

    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(
        [FromForm] CreateRecipeDto dto,
        IFormFile? image)
    {
        string? imageUrl = null;

        if (image != null)
        {
            var fileName =
                Guid.NewGuid() +
                Path.GetExtension(image.FileName);

            var folderPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "images",
                "recipes");

            Directory.CreateDirectory(folderPath);

            var filePath =
                Path.Combine(
                    folderPath,
                    fileName);

            using var stream =
                new FileStream(
                    filePath,
                    FileMode.Create);

            await image.CopyToAsync(stream);

            imageUrl =
                "/images/recipes/" +
                fileName;
        }

        var recipe = new Recipe
        {
            Name = dto.Name,
            Ingredients = dto.Ingredients,
            Instructions = dto.Instructions,
            CookingTime = dto.CookingTime,
            Category = dto.Category,
            ImageUrl = imageUrl
        };

        _context.Recipes.Add(recipe);

        await _context.SaveChangesAsync();

        var result = new RecipeDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Ingredients = recipe.Ingredients,
            Instructions = recipe.Instructions,
            CookingTime = recipe.CookingTime,
            Category = recipe.Category,
            ImageUrl = recipe.ImageUrl
        };

        return CreatedAtAction(
            nameof(GetRecipe),
            new { id = recipe.Id },
            result);
    }

    // UPDATE

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(
        int id,
        [FromForm] UpdateRecipeDto dto,
        IFormFile? image)
    {
        var recipe =
            await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        recipe.Name = dto.Name;
        recipe.Ingredients = dto.Ingredients;
        recipe.Instructions = dto.Instructions;
        recipe.CookingTime = dto.CookingTime;
        recipe.Category = dto.Category;

        if (image != null)
        {
            if (!string.IsNullOrEmpty(recipe.ImageUrl))
            {
                var oldImagePath =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        recipe.ImageUrl.TrimStart('/'));

                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            var fileName =
                Guid.NewGuid() +
                Path.GetExtension(image.FileName);

            var folderPath =
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images",
                    "recipes");

            Directory.CreateDirectory(folderPath);

            var filePath =
                Path.Combine(
                    folderPath,
                    fileName);

            using var stream =
                new FileStream(
                    filePath,
                    FileMode.Create);

            await image.CopyToAsync(stream);

            recipe.ImageUrl =
                "/images/recipes/" +
                fileName;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe =
            await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        if (!string.IsNullOrEmpty(recipe.ImageUrl))
        {
            var imagePath =
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    recipe.ImageUrl.TrimStart('/'));

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }

        _context.Recipes.Remove(recipe);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
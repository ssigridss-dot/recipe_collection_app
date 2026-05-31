using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeCollection.API.Data;
using RecipeCollection.API.Models;
using RecipeCollection.API.DTOs;

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
            Instructions = recipe.Instructions,
            CookingTime = recipe.CookingTime,
            Category = recipe.Category,
            ImageUrl = recipe.ImageUrl
        };
    }

    // CREATE + IMAGE UPLOAD
    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(
        [FromForm] CreateRecipeDto dto,
        IFormFile? image)
    {
        string? imageUrl = null;

        if (image != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);

            var path = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot/images/recipes",
                fileName);

            using var stream = new FileStream(path, FileMode.Create);
            await image.CopyToAsync(stream);

            imageUrl = "/images/recipes/" + fileName;
        }

        var recipe = new Recipe
        {
            Name = dto.Name,
            Instructions = dto.Instructions,
            Ingredients = dto.Ingredients,
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
            Instructions = recipe.Instructions,
            CookingTime = recipe.CookingTime,
            Category = recipe.Category,
            ImageUrl = recipe.ImageUrl
        };

        return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, result);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(int id, UpdateRecipeDto dto)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        recipe.Name = dto.Name;
        recipe.Instructions = dto.Instructions;
        recipe.Ingredients = dto.Ingredients;
        recipe.CookingTime = dto.CookingTime;
        recipe.Category = dto.Category;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        // delete image file too
        if (!string.IsNullOrEmpty(recipe.ImageUrl))
        {
            var fullPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                recipe.ImageUrl.TrimStart('/'));

            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }

        _context.Recipes.Remove(recipe);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
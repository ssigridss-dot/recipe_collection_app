using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeCollection.API.Data;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
    {
        return await _context.Recipes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        return recipe;
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
    {
        _context.Recipes.Add(recipe);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRecipe),
            new { id = recipe.Id },
            recipe);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(
        int id,
        Recipe recipe)
    {
        if (id != recipe.Id)
            return BadRequest();

        _context.Entry(recipe).State =
            EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
            return NotFound();

        _context.Recipes.Remove(recipe);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
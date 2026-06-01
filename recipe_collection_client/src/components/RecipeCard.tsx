import type { Recipe } from "../types/Recipe";

interface Props {
    recipe: Recipe;
    onDelete: (id: number) => void;
}

function RecipeCard({ recipe, onDelete }: Props) {
    return (
        <div className="recipe-card">

            <img
                src={recipe.imageUrl}
                alt={recipe.name}
            />

            <h3>{recipe.name}</h3>

            <p>{recipe.cookingTime}</p>

            <p>{recipe.ingredients}</p>

            <p>{recipe.instructions}</p>

            <p>
                <strong>Category:</strong> {recipe.category}
            </p>

            <button
                onClick={() =>
                    window.location.href =
                    `/edit/${recipe.id}`
                }
            >
                Edit
            </button>

            <button
                onClick={() => onDelete(recipe.id)}
            >
                Delete
            </button>

        </div>
    );
}

export default RecipeCard;
import type { Recipe } from "../types/Recipe";
import { Link } from "react-router-dom";

interface Props {
    recipe: Recipe;
    onDelete: (id: number) => void;
}

function RecipeCard({
    recipe,
    onDelete
}: Props) {

    const imageUrl =
        recipe.imageUrl
            ? `https://localhost:7060${recipe.imageUrl}`
            : "";

    return (

        <div className="recipe-card">

            {recipe.imageUrl && (

                <Link
                    to={`/recipe/${recipe.id}`}
                >

                    <img
                        className="recipe-image"
                        src={imageUrl}
                        alt={recipe.name}
                    />

                </Link>

            )}

            <div className="recipe-content">

                <Link
                    to={`/recipe/${recipe.id}`}
                    className="recipe-link"
                >

                    <h2>
                        {recipe.name}
                    </h2>

                </Link>

                <div className="recipe-info">

                    <span className="badge">

                        {recipe.category}

                    </span>

                    <span>

                        ⏱ {recipe.cookingTime} min

                    </span>

                </div>

                <div className="recipe-actions">

                    <Link
                        to={`/edit/${recipe.id}`}
                    >

                        <button
                            className="edit-btn"
                        >
                            Edit
                        </button>

                    </Link>

                    <button
                        className="delete-btn"
                        onClick={() =>
                            onDelete(recipe.id)
                        }
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}

export default RecipeCard;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipeApi from "../api/recipeApi";
import type { Recipe } from "../types/Recipe";
import { toast } from "react-toastify";

function RecipeDetailsPage() {

    const { id } = useParams();

    const [recipe, setRecipe] =
        useState<Recipe | null>(null);

    useEffect(() => {

        const loadRecipe = async () => {

            try {

                const response =
                    await recipeApi.get(
                        `/recipes/${id}`
                    );

                setRecipe(
                    response.data
                );

            }
            catch {

                toast.error(
                    "Failed to load recipe."
                );

            }
        };

        loadRecipe();

    }, [id]);

    if (!recipe) {

        return <p>Loading...</p>;

    }

    const imageUrl =
        recipe.imageUrl
            ? `https://localhost:7060${recipe.imageUrl}`
            : "";

    return (

        <div className="details-container">

            <h1>{recipe.name}</h1>

            {recipe.imageUrl && (

                <img
                    src={imageUrl}
                    alt={recipe.name}
                    className="details-image"
                />

            )}

            <div className="details-info">

                <p>
                    <strong>Category:</strong>
                    {" "}
                    {recipe.category}
                </p>

                <p>
                    <strong>Cooking Time:</strong>
                    {" "}
                    {recipe.cookingTime} min
                </p>

            </div>

            <h2>Ingredients</h2>

            <div className="details-box">

                {recipe.ingredients}

            </div>

            <h2>Instructions</h2>

            <div className="details-box">

                {recipe.instructions}

            </div>

        </div>

    );
}

export default RecipeDetailsPage;
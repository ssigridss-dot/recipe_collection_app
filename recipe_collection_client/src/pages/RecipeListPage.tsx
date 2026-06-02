import { useEffect, useState } from "react";
import recipeApi from "../api/recipeApi";
import type { Recipe } from "../types/Recipe";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-toastify";

function RecipeListPage() {

    const [recipes, setRecipes] =
        useState<Recipe[]>([]);

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    useEffect(() => {

        const fetchRecipes = async () => {

            try {

                const response =
                    await recipeApi.get(
                        "/recipes"
                    );

                setRecipes(
                    response.data
                );

            }
            catch {

                toast.error(
                    "Failed to load recipes"
                );

            }
        };

        fetchRecipes();

    }, []);

    const deleteRecipe =
        async (id: number) => {

            const confirmed =
                window.confirm(
                    "Delete recipe?"
                );

            if (!confirmed)
                return;

            try {

                await recipeApi.delete(
                    `/recipes/${id}`
                );

                setRecipes(
                    recipes.filter(
                        recipe =>
                            recipe.id !== id
                    )
                );

                toast.success(
                    "Recipe deleted"
                );

            }
            catch {

                toast.error(
                    "Delete failed"
                );

            }
        };

    const categories = [

        "All",

        ...Array.from(
            new Set(
                recipes.map(
                    recipe =>
                        recipe.category
                )
            )
        )

    ];

    const filteredRecipes =
        recipes.filter(recipe => {

            const matchesSearch =
                recipe.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =
                selectedCategory === "All" ||
                recipe.category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    return (

        <div>

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <select
                    value={selectedCategory}
                    onChange={(e) =>
                        setSelectedCategory(
                            e.target.value
                        )
                    }
                >

                    {categories.map(
                        category => (

                            <option
                                key={category}
                                value={category}
                            >

                                {category}

                            </option>

                        )
                    )}

                </select>

            </div>

            {filteredRecipes.length === 0 && (

                <p
                    style={{
                        textAlign: "center"
                    }}
                >
                    No recipes found.
                </p>

            )}

            <div className="recipe-grid">

                {filteredRecipes.map(
                    recipe => (

                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onDelete={
                                deleteRecipe
                            }
                        />

                    )
                )}

            </div>

        </div>

    );
}

export default RecipeListPage;
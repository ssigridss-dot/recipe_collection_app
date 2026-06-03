import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import recipeApi from "../api/recipeApi";
import type { Recipe } from "../types/Recipe";
import { toast } from "react-toastify";

function EditRecipePage() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [recipe, setRecipe] =
        useState<Recipe>();

    useEffect(() => {

        const loadRecipe =
            async () => {

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
                        "Retsepti ei õnnestunud laadida."
                    );
                }
            };

        loadRecipe();

    }, [id]);

    const updateRecipe =
        async (
            formData: FormData
        ) => {

            try {

                await recipeApi.put(
                    `/recipes/${id}`,
                    formData
                );

                toast.success(
                    "Retsept edukalt muudetud."
                );

                navigate("/");

            }
            catch (error: unknown) {

                if (
                    typeof error === "object" &&
                    error !== null &&
                    "response" in error
                ) {

                    const axiosError = error as {
                        response?: {
                            data?: {
                                errors?: Record<
                                    string,
                                    string[]
                                >;
                            };
                        };
                    };

                    if (
                        axiosError.response?.data?.errors
                    ) {

                        const errors =
                            Object.values(
                                axiosError.response.data.errors
                            ).flat();

                        errors.forEach((err) =>
                            toast.error(err)
                        );

                        return;
                    }
                }

                toast.error(
                    "Retsepti ei õnnestunud muuta."
                );
            }
        };

    if (!recipe) {

        return (
            <p>
                Laen...
            </p>
        );

    }

    return (

        <>
            <h1 className="page-title">
                Muuda retsepti
            </h1>

            <RecipeForm
                initialData={recipe}
                onSubmit={
                    updateRecipe
                }
            />
        </>

    );
}

export default EditRecipePage;
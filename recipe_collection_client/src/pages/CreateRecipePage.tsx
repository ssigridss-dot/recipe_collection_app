import RecipeForm from "../components/RecipeForm";
import recipeApi from "../api/recipeApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateRecipePage() {

    const navigate =
        useNavigate();

    const createRecipe =
        async (
            formData: FormData
        ) => {

            try {

                await recipeApi.post(
                    "/recipes",
                    formData
                );

                toast.success(
                    "Retsept lisatud."
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
                    "Retsepti ei õnnestunud lisada."
                );
            }
        };

    return (

        <>
            <h1 className="page-title">
                Lisa retsept
            </h1>

            <RecipeForm
                onSubmit={
                    createRecipe
                }
            />
        </>

    );
}

export default CreateRecipePage;
import { useState } from "react";
import type { Recipe } from "../types/Recipe";

interface Props {
    initialData?: Recipe;
    onSubmit: (formData: FormData) => void;
}

function RecipeForm({
    initialData,
    onSubmit
}: Props) {

    const [name, setName] =
        useState(initialData?.name || "");

    const [ingredients, setIngredients] =
        useState(initialData?.ingredients || "");

    const [instructions, setInstructions] =
        useState(initialData?.instructions || "");

    const [cookingTime, setCookingTime] =
        useState(
            initialData?.cookingTime?.toString()
            || ""
        );

    const [category, setCategory] =
        useState(initialData?.category || "");

    const [image, setImage] =
        useState<File | null>(null);

    const [nameError, setNameError] =
        useState("");

    const [ingredientsError, setIngredientsError] =
        useState("");

    const [instructionsError, setInstructionsError] =
        useState("");

    const [cookingTimeError, setCookingTimeError] =
        useState("");

    const [categoryError, setCategoryError] =
        useState("");

    const validateName = (
        value: string
    ) => {

        if (value.trim().length < 3) {

            setNameError(
                "Recipe name must contain at least 3 characters."
            );

            return false;
        }

        setNameError("");
        return true;
    };

    const validateIngredients = (
        value: string
    ) => {

        if (value.trim().length < 5) {

            setIngredientsError(
                "Ingredients must contain at least 5 characters."
            );

            return false;
        }

        setIngredientsError("");
        return true;
    };

    const validateInstructions = (
        value: string
    ) => {

        if (value.trim().length < 10) {

            setInstructionsError(
                "Instructions must contain at least 10 characters."
            );

            return false;
        }

        setInstructionsError("");
        return true;
    };

    const validateCookingTime = (
        value: string
    ) => {

        if (
            value.trim() === "" ||
            Number(value) < 1
        ) {

            setCookingTimeError(
                "Cooking time must be greater than 0."
            );

            return false;
        }

        setCookingTimeError("");
        return true;
    };

    const validateCategory = (
        value: string
    ) => {

        if (value.trim().length < 2) {

            setCategoryError(
                "Category must contain at least 2 characters."
            );

            return false;
        }

        setCategoryError("");
        return true;
    };

    const submitHandler = (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        const isValid =
            validateName(name) &&
            validateIngredients(ingredients) &&
            validateInstructions(instructions) &&
            validateCookingTime(cookingTime) &&
            validateCategory(category);

        if (!isValid) {
            return;
        }

        const formData = new FormData();

        formData.append(
            "name",
            name
        );

        formData.append(
            "ingredients",
            ingredients
        );

        formData.append(
            "instructions",
            instructions
        );

        formData.append(
            "cookingTime",
            cookingTime
        );

        formData.append(
            "category",
            category
        );

        if (image) {

            formData.append(
                "image",
                image
            );

        }

        onSubmit(formData);
    };

    return (

        <form onSubmit={submitHandler}>

            <input
                type="text"
                placeholder="Recipe Name"
                value={name}
                onChange={(e) => {

                    setName(
                        e.target.value
                    );

                    validateName(
                        e.target.value
                    );

                }}
            />

            {nameError && (
                <p className="field-error">
                    {nameError}
                </p>
            )}

            <textarea
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) => {

                    setIngredients(
                        e.target.value
                    );

                    validateIngredients(
                        e.target.value
                    );

                }}
            />

            {ingredientsError && (
                <p className="field-error">
                    {ingredientsError}
                </p>
            )}

            <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => {

                    setInstructions(
                        e.target.value
                    );

                    validateInstructions(
                        e.target.value
                    );

                }}
            />

            {instructionsError && (
                <p className="field-error">
                    {instructionsError}
                </p>
            )}

            <input
                type="number"
                placeholder="Cooking Time"
                value={cookingTime}
                onChange={(e) => {

                    setCookingTime(
                        e.target.value
                    );

                    validateCookingTime(
                        e.target.value
                    );

                }}
            />

            {cookingTimeError && (
                <p className="field-error">
                    {cookingTimeError}
                </p>
            )}

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => {

                    setCategory(
                        e.target.value
                    );

                    validateCategory(
                        e.target.value
                    );

                }}
            />

            {categoryError && (
                <p className="field-error">
                    {categoryError}
                </p>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    if (
                        e.target.files &&
                        e.target.files.length > 0
                    ) {

                        setImage(
                            e.target.files[0]
                        );

                    }

                }}
            />

            <button type="submit">
                Save Recipe
            </button>

        </form>

    );
}

export default RecipeForm;